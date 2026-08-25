const path = require("path");

const backendOrigin = (
  process.env.API_PROXY_TARGET || "https://mansha-backend-ov04.onrender.com"
).replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Git root is `mansha_new/`; keep module/CSS resolution in `frontend/`.
  turbopack: {
    root: path.join(__dirname),
    resolveAlias: {
      lightningcss: path.join(__dirname, "node_modules", "lightningcss"),
      "detect-libc": path.join(__dirname, "node_modules", "detect-libc"),
    },
  },
  serverExternalPackages: ["lightningcss", "detect-libc"],
  images: {
    unoptimized: true,
  },
  transpilePackages: ["jodit-react", "jodit"],
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
