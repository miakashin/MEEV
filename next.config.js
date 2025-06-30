/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Disable Image Optimization API as it's not needed for static export
  },
  trailingSlash: true, // Ensure trailing slashes for static export
  // Add basePath if your site is served from a subdirectory
  // basePath: '/your-base-path',
}

module.exports = nextConfig