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
    // Allow all domains for now, you can restrict this in production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Enable optimization for local images
    domains: ['vercel.com', 'www.meevassist.com', 'localhost'],
    // Enable image optimization for local files
    unoptimized: false,
    // Ensure public directory is included
    path: '/_next/image',
    // Enable device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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