/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
  reactStrictMode: false,
  images: { unoptimized: true },
  // output: "export",
  trailingSlash: true,
};

module.exports = nextConfig;
