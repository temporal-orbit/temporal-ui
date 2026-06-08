import path from "node:path";
import { defineMain } from "storybook-solidjs-vite";

const getAbsolutePath = (packageName: string): string =>
	path
		.dirname(import.meta.resolve(path.join(packageName, "package.json")))
		.replace(/^file:\/\//, "");

export default defineMain({
	framework: {
		name: "storybook-solidjs-vite",
		options: {
			docgen: false,
			// docgen: {
			// Enabled by default, but you can configure or disable it:
			//  see https://github.com/styleguidist/react-docgen-typescript#options
			// },
		},
	},
	addons: [
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-themes"),
	],
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
});
