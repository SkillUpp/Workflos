/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "out",
  reactStrictMode: false,
  images: { unoptimized: true },
  // output: "export",
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.aitracker.ai/:path*", // 代理 API 请求
      },
    ];
  },
};

module.exports = nextConfig;
