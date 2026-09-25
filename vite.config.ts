import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

import seoPrerender from "./scripts/seo-prerender";

export default defineConfig({
  server: { port: 5175 },
  assetsInclude: ["**/*.glb"],
  plugins: [react(), seoPrerender()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
