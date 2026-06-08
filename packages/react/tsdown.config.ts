// noinspection JSUnusedGlobalSymbols

import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/components/*/index.ts",
		"src/hooks/*/index.ts",
		"src/utils/*/index.ts",
	],
	dts: true,
	platform: "browser",
	deps: {
		alwaysBundle: ["lucide-react"],
	},
});
