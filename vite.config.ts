import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginString from "vite-plugin-string";

export default defineConfig({
  base: "./",
  plugins: [react(), vitePluginString()],
  server: {
    host: "0.0.0.0",
    port: 4444,
  },
});
