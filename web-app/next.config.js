/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js"],
  swcMinify: true,
  transpilePackages: ["nextjs-components"],
};

module.exports = nextConfig;