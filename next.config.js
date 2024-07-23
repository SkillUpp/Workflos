/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: "/product/:id",
        destination: "/product/[id]",
      },
    ];
  },
};

module.exports = nextConfig;
