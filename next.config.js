/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/bloodwraith8851.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/bloodwraith8851.github.io/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 