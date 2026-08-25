const path = require("path");

const backendOrigin = (
  process.env.API_PROXY_TARGET || "https://mansha-backend-ov04.onrender.com"
).replace(/\/+$/, "");

const frontendDir = __dirname;
const workspaceRoot = path.join(__dirname, "..");
const frontendModules = path.join(frontendDir, "node_modules");
const tailwindcssDir = path.join(frontendModules, "tailwindcss");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workspace root must be turbopack.root. Setting it to frontend makes CSS
  // @import "tailwindcss" resolve from mansha_new/ instead of frontend/.
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
    resolveAlias: {
      tailwindcss: tailwindcssDir,
    },
  },
  webpack: (config) => {
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

module.exports = nextConfig;
