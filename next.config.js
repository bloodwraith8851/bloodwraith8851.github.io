/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  assetPrefix: '.',
  basePath: '',
  trailingSlash: true,
  distDir: '.next'
}

module.exports = nextConfig 