import { defineConfig, PluginOption } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import "svelte";

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
        ],
      },
      outDir: ".",
      emptyOutDir: false,
      sourcemap: "inline",
    },
  };
});
