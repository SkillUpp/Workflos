/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  // output: "export",
  trailingSlash: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: "/community/:path*",
          destination: `http://localhost:3001/:path*`,
        },
        {
          source: "/ex-mml-chtml.js",
          destination: `/_next/static/chunks/ex-mml-chtml.js`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
