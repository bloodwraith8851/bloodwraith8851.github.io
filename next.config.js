/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: './',
  trailingSlash: true,
}

module.exports = nextConfig 