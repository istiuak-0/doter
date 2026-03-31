import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import vueDevTools from "vite-plugin-vue-devtools";
import ui from '@nuxt/ui/vite'
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    ui(),
    electron([
      {
        entry: "src/electron/main.ts",
      },
      {
        entry: "src/electron/preload.ts",
      },
    ]),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: command === "build" ? "./" : "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));
