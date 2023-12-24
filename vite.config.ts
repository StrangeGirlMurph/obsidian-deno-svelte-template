import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import builtins from "builtin-modules";
import { PluginOption, defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	return {
		plugins: [svelte({ preprocess: vitePreprocess() }) as PluginOption],
		build: {
			lib: {
				entry: "src/main",
				formats: ["cjs"],
			},
			rollupOptions: {
				output: {
					entryFileNames: "main.js",
					assetFileNames: "styles.css",
				},
				external: [
					"obsidian",
					"electron",
					"@codemirror/autocomplete",
					"@codemirror/collab",
					"@codemirror/commands",
					"@codemirror/language",
					"@codemirror/lint",
					"@codemirror/search",
					"@codemirror/state",
					"@codemirror/view",
					"@lezer/common",
					"@lezer/highlight",
					"@lezer/lr",
					...builtins,
				],
			},
			outDir: ".",
			emptyOutDir: false,
			sourcemap: "inline",
		},
	};
});
