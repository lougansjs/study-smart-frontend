import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src/") }]
  },
})