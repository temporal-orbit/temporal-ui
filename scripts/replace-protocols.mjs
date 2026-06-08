#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script to replace "workspace:*" dependencies with actual versions from core package
 * Can be called with a package.json path or auto-detect when called from package directory
 * Usage: node replace-protocols.mjs [path-to-package.json]
 */

function getCoreVersion() {
	const corePackagePath = resolve(__dirname, "../packages/core/package.json");
	try {
		const corePackage = JSON.parse(readFileSync(corePackagePath, "utf8"));
		return corePackage.version;
	} catch (error) {
		console.error("Error reading core package.json:", error.message);
		process.exit(1);
	}
}

function replaceWorkspaceDependencies(packagePath) {
	try {
		const packageContent = readFileSync(packagePath, "utf8");
		const packageJson = JSON.parse(packageContent);

		const coreVersion = getCoreVersion();
		let hasChanges = false;

		// Process dependencies
		if (packageJson.dependencies) {
			for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
				if (depVersion === "workspace:*") {
					packageJson.dependencies[depName] = coreVersion;
					hasChanges = true;
					console.log(`Replaced ${depName}: workspace:* -> ${coreVersion} in dependencies`);
				}
			}
		}

		// Process devDependencies
		if (packageJson.devDependencies) {
			for (const [depName, depVersion] of Object.entries(packageJson.devDependencies)) {
				if (depVersion === "workspace:*") {
					packageJson.devDependencies[depName] = coreVersion;
					hasChanges = true;
					console.log(`Replaced ${depName}: workspace:* -> ${coreVersion} in devDependencies`);
				}
			}
		}

		// Process peerDependencies
		if (packageJson.peerDependencies) {
			for (const [depName, depVersion] of Object.entries(packageJson.peerDependencies)) {
				if (depVersion === "workspace:*") {
					packageJson.peerDependencies[depName] = coreVersion;
					hasChanges = true;
					console.log(`Replaced ${depName}: workspace:* -> ${coreVersion} in peerDependencies`);
				}
			}
		}

		if (hasChanges) {
			writeFileSync(packagePath, JSON.stringify(packageJson, null, "\t") + "\n");
			console.log(`✅ Updated ${packagePath} with core version ${coreVersion}`);
		} else {
			console.log(`ℹ️  No workspace:* dependencies found in ${packagePath}`);
		}
	} catch (error) {
		console.error(`Error processing ${packagePath}:`, error.message);
		process.exit(1);
	}
}

// Main execution
let packagePath = process.argv[2];

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
		console.error("Usage: node replace-protocols.mjs [path-to-package.json]");
		console.error("Example: node replace-protocols.mjs packages/react/package.json");
		console.error(
			"Or run from within a package directory: node ../../scripts/replace-protocols.mjs",
		);
		process.exit(1);
	}
}

const resolvedPath = resolve(packagePath);
console.log(`Processing package.json: ${resolvedPath}`);
replaceWorkspaceDependencies(resolvedPath);
