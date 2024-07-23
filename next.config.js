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
          source: "/product/:id",
          destination: "/product/[id]",
        },
      ],
    };
  },
};

module.exports = nextConfig;
