/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only enable static export for non-API routes
  output: 'export',
  // Disable static optimization for API routes
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/esbuild-linux-64/bin/esbuild',
      ],
    },
  },
  images: {
    unoptimized: true, // Disable Image Optimization API as it's not needed for static export
  },
  trailingSlash: true, // Ensure trailing slashes for static export
  // Add basePath if your site is served from a subdirectory
  // basePath: '/your-base-path',
  // Configure webpack to handle Node.js modules
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: 'mock',
        child_process: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig