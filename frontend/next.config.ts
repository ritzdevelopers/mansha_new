/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Allow ngrok tunnel to load Next.js dev client assets (needed for FAQ clicks, etc.)
  allowedDevOrigins: [
    "wisely-serriform-lesly.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok.io",
  ],
};

module.exports = nextConfig;
