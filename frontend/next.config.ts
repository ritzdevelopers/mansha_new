import type { NextConfig } from "next";
import path from "path";

const backendOrigin = (
  process.env.API_PROXY_TARGET || "https://mansha-backend-ov04.onrender.com"
).replace(/\/+$/, "");

const frontendDir = __dirname;
const workspaceRoot = path.join(__dirname, "..");
const frontendModules = path.join(frontendDir, "node_modules");
const tailwindcssDir = path.join(frontendModules, "tailwindcss");

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
    config.resolve.modules = [
      frontendModules,
      ...(config.resolve.modules || ["node_modules"]),
    ];
    return config;
  },
  serverExternalPackages: ["lightningcss", "detect-libc"],
  experimental: {
    // Vercel uses multiple export workers; Next 16 can crash prerendering
    // /_global-error when workers race. Match the stable local 1-worker build.
    staticGenerationRetryCount: 3,
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
