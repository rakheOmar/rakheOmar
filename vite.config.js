import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Newsreader:wght@400&family=IBM+Plex+Mono:wght@400&display=swap",
    ]),
    Sitemap({
      hostname: "https://rakheomar.me",
      dynamicRoutes: ["/", "/blog"],
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 9000,
  },
  build: {
    sourcemap: true,
  },
});
