import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import electron from "vite-plugin-electron";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    electron([
      {
        // Main process entry
        entry: "src/electron/main.ts",
        vite: {
          build: {
            outDir: "dist-electron",
            rollupOptions: {
              output: {
                format: "esm",
              },
            },
          },
        },
      },
      {
        // Preload script
        entry: "src/electron/preload.ts",
        onstart(options) {
          options.reload();
        },
        vite: {
          build: {
            outDir: "dist-electron",
            rollupOptions: {
              output: {
                format: "commonjs",
              },
            },
          },
        },
      },
    ]),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: process.env.ELECTRON === "true" ? "./" : "/",
  build: {
    outDir: "dist",
    target: "esnext",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
