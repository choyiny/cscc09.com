/// <reference types="vitest" />

import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import * as fs from 'fs';

const lectures = fs.readdirSync('./src/content/lectures');
const coursework = fs.readdirSync('./src/content/coursework');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: "src/assets",
  build: {
    target: ["es2020"],
  },
  resolve: {
    mainFields: ["module"],
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => [
          "/",
          "/lectures",
          ...lectures.map(post => `/lectures/${post.replace('.md', '')}`),
          ...coursework.map(post => `/work/${post.replace('.md', '')}`),
          "/work",
          "/team",
          "/resources",
        ],
        sitemap: {
          host: "https://cscc09.com",
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test.ts"],
    include: ["**/*.spec.ts"],
  },
  define: {
    "import.meta.vitest": mode !== "production",
  },
}));
