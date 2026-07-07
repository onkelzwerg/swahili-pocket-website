import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

// Standard TanStack Start build for Cloudflare Workers.
// nitro (cloudflare-module preset) produces the SSR worker in dist/server +
// static assets in dist/client. TanStack Start's server entry is redirected to
// src/server.ts (our SSR error wrapper). nitro only runs on build, not on dev.
export default defineConfig(({ command }) => ({
  server: { host: "::", port: 8080 },
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    // Avoid duplicate React/Query copies leaking into the client bundle.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      server: { entry: "server" },
    }),
    ...(command === "build"
      ? [
          nitro({
            preset: "cloudflare-module",
            output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
            cloudflare: { nodeCompat: true, deployConfig: true },
          }),
        ]
      : []),
    viteReact(),
  ],
}));
