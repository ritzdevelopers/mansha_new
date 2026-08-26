import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const backendOrigin = (
  process.env.API_PROXY_TARGET || "https://mansha-backend-ov04.onrender.com"
).replace(/\/+$/, "");

const frontendDir = __dirname;
const workspaceRoot = path.join(__dirname, "..");
const frontendModules = path.join(frontendDir, "node_modules");
const workspaceModules = path.join(workspaceRoot, "node_modules");

function pkgDir(name: string) {
  const local = path.join(frontendModules, name);
  const root = path.join(workspaceModules, name);
  if (fs.existsSync(local)) return local;
  if (fs.existsSync(root)) return root;
  return name;
}

const tailwindcssDir = pkgDir("tailwindcss");

const nextConfig: NextConfig = {
  // Workspace root must be turbopack.root. Setting it to frontend makes CSS
  // @import "tailwindcss" resolve from mansha_new/ instead of frontend/.
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      tailwindcss: tailwindcssDir,
    },
  },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindcssDir,
    };
    return config;
  },
  serverExternalPackages: ["lightningcss", "detect-libc"],
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 50,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
  // Allow ngrok tunnel to load Next.js dev client assets (needed for FAQ clicks, etc.)
  allowedDevOrigins: [
    "wisely-serriform-lesly.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok.io",
  ],
};

export default nextConfig;
