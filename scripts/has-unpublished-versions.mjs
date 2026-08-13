#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const PUBLISHABLE_PACKAGES = ["packages/core", "packages/react", "packages/solid"];

function readPackageJson(packageDir) {
	const packagePath = resolve(rootDir, packageDir, "package.json");
	return JSON.parse(readFileSync(packagePath, "utf8"));
}

function isPublishedOnNpm(name, version) {
	try {
		execSync(`npm view ${name}@${version} version --registry=https://registry.npmjs.org`, {
			stdio: ["ignore", "pipe", "ignore"],
		});
		return true;
	} catch {
		return false;
	}
}

const unpublished = PUBLISHABLE_PACKAGES.flatMap((packageDir) => {
	const { name, version } = readPackageJson(packageDir);
	if (!name || !version) {
		console.error(`Missing name or version in ${packageDir}/package.json`);
		process.exit(1);
	}

	if (isPublishedOnNpm(name, version)) {
		return [];
	}

	return [`${name}@${version}`];
});

if (unpublished.length === 0) {
	process.exit(1);
}

console.log(`Unpublished: ${unpublished.join(", ")}`);
process.exit(0);
