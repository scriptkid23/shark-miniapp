import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// https://vitejs.dev/config/
import mkcert from "vite-plugin-mkcert";
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
  },
  publicDir: "./public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        // NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
