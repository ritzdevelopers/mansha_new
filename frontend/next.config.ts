const path = require("path");

const backendOrigin = (
  process.env.API_PROXY_TARGET || "https://mansha-backend-ov04.onrender.com"
).replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Git root is `mansha_new/`; keep module/CSS resolution in `frontend/`.
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: {
    root: path.join(__dirname),
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
