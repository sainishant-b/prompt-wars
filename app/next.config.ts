import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a self-contained server in `.next/standalone` for minimal Docker image
  output: "standalone",
  // Strict mode catches React anti-patterns at dev time
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this folder so a parent lockfile (e.g. one in
  // your home directory) is not auto-detected as the project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
