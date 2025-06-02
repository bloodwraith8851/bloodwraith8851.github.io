/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '.',
  trailingSlash: true,
  distDir: 'dist',
  // If your repository name is different from your GitHub username,
  // uncomment and update the following line:
  // basePath: '/your-repo-name',
}

module.exports = nextConfig 