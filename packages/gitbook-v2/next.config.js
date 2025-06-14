/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out to fix API Routes and Middleware errors
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    useCache: true
  }
};

module.exports = nextConfig; 