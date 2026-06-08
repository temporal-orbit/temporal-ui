#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to replace @temporal-ui/core dependency version back to "workspace:*"
 * Can be called with a package.json path or auto-detect when called from package directory
 * Usage: node restore-protocols.mjs [path-to-package.json]
 */

function restoreWorkspaceDependency(packagePath, dependencyName = "@temporal-ui/core") {
	try {
		const packageContent = readFileSync(packagePath, "utf8");
		const packageJson = JSON.parse(packageContent);

		let hasChanges = false;

		// Process dependencies
		if (packageJson.dependencies?.[dependencyName]) {
			const currentVersion = packageJson.dependencies[dependencyName];
			packageJson.dependencies[dependencyName] = "workspace:*";
			hasChanges = true;
			console.log(`Restored ${dependencyName}: ${currentVersion} -> workspace:* in dependencies`);
		}

		// Process devDependencies
		if (packageJson.devDependencies?.[dependencyName]) {
			const currentVersion = packageJson.devDependencies[dependencyName];
			packageJson.devDependencies[dependencyName] = "workspace:*";
			hasChanges = true;
			console.log(
				`Restored ${dependencyName}: ${currentVersion} -> workspace:* in devDependencies`,
			);
		}

		// Process peerDependencies
		if (packageJson.peerDependencies?.[dependencyName]) {
			const currentVersion = packageJson.peerDependencies[dependencyName];
			packageJson.peerDependencies[dependencyName] = "workspace:*";
			hasChanges = true;
			console.log(
				`Restored ${dependencyName}: ${currentVersion} -> workspace:* in peerDependencies`,
			);
		}

		if (hasChanges) {
			writeFileSync(packagePath, `${JSON.stringify(packageJson, null, "\t")}\n`);
			console.log(`✅ Updated ${packagePath} - restored ${dependencyName} to workspace:*`);
		} else {
			console.log(`ℹ️  Dependency "${dependencyName}" not found in ${packagePath}`);
		}
	} catch (error) {
		console.error(`Error processing ${packagePath}:`, error.message);
		process.exit(1);
	}
}

// Main execution
let packagePath = process.argv[2];
const dependencyName = process.argv[3] || "@temporal-ui/core";

// If no package.json path provided, try to auto-detect from current working directory
if (!packagePath) {
	const cwd = process.cwd();
	const localPackageJson = resolve(cwd, "package.json");

	try {
		// Check if we're in a package directory with package.json
		readFileSync(localPackageJson, "utf8");
		packagePath = localPackageJson;
		console.log(`Auto-detected package.json: ${packagePath}`);
	} catch (error) {
		console.error(error);
		console.error("Usage: node restore-protocols.mjs [path-to-package.json] [dependency-name]");
		console.error(
			"Example: node restore-protocols.mjs packages/react/package.json @temporal-ui/core",
		);
		console.error(
			"Or run from within a package directory: node ../../scripts/restore-protocols.mjs",
		);
		process.exit(1);
	}
}

const resolvedPath = resolve(packagePath);
console.log(`Processing package.json: ${resolvedPath}`);
console.log(`Restoring dependency: ${dependencyName}`);
restoreWorkspaceDependency(resolvedPath, dependencyName);
