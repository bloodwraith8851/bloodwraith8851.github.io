/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  basePath: '/bloodwraith8851.github.io',
  assetPrefix: '/bloodwraith8851.github.io/',
  trailingSlash: true,
}

module.exports = nextConfig 