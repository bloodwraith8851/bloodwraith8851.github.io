/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '.',
  trailingSlash: true,
}

module.exports = nextConfig 