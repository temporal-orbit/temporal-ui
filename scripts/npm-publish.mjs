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
	return { packagePath, packageJson: JSON.parse(readFileSync(packagePath, "utf8")) };
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

function run(command, cwd = rootDir) {
	execSync(command, { cwd, stdio: "inherit", env: process.env });
}

console.log("Building packages...");
run("bun run build");

let publishedAny = false;

for (const packageDir of PUBLISHABLE_PACKAGES) {
	const { packageJson } = readPackageJson(packageDir);
	const { name, version } = packageJson;

	if (!name || !version) {
		console.error(`Missing name or version in ${packageDir}/package.json`);
		process.exit(1);
	}

	if (isPublishedOnNpm(name, version)) {
		console.log(`Skipping ${name}@${version} (already on npm)`);
		continue;
	}

	console.log(`Publishing ${name}@${version}...`);
	const packageRoot = resolve(rootDir, packageDir);
	run("npm publish --access public --provenance", packageRoot);
	console.log(`New tag: ${name}@${version}`);
	publishedAny = true;
}

if (publishedAny) {
	console.log("Creating git tags...");
	run("changeset tag");
} else {
	console.log("No new packages to publish.");
}
