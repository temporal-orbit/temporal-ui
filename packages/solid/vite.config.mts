/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid(), tailwindcss()],
	define: {
		"process.env": {},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
	},
});
