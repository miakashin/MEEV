/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove output: 'export' for Vercel deployment
  // Enable server components by default
  experimental: {
    // Enable server actions
    serverActions: true,
    // Optimize package imports for server components
    optimizePackageImports: ['nodemailer'],
  },
  images: {
    // Enable image optimization for Vercel
    domains: ['vercel.com'],
  },
  // Enable trailing slashes for consistent URLs
  trailingSlash: true,
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
};

module.exports = nextConfig;