/// <reference types="vitest" />

import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import * as fs from "fs";

const lectures = fs.readdirSync("./src/content/lectures");
const coursework = fs.readdirSync("./src/content/coursework");

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
      content: {
        highlighter: "prism",
        markedOptions: {
          extensions: [
            {
              hooks: {
                postprocess(html: string) {
                  // markedHighlight overrides the mermaid renderer and outputs
                  // <pre><code class="language-mermaid"> instead of <pre class="mermaid">.
                  // Convert it back so mermaid.js can find and render these blocks.
                  return html.replace(
                    /<pre><code class="language-mermaid">([\s\S]*?)\n<\/code><\/pre>/g,
                    (_, code) =>
                      `<pre class="mermaid">${code
                        .replace(/&amp;/g, "&")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")}</pre>`,
                  );
                },
              },
            },
          ],
        },
      },
      prerender: {
        routes: async () => [
          "/",
          "/lectures",
          ...lectures.map((post) => `/lectures/${post.replace(".md", "")}`),
          ...coursework.map((post) => `/work/${post.replace(".md", "")}`),
          "/work",
          "/team",
          "/resources",
          "/vm-access",
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
