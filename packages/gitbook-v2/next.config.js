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
  },
  webpack: (config, { isServer }) => {
    // Ignore missing modules from gitbook package
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@gitbook/icons': false
    };
    return config;
  }
};

module.exports = nextConfig; 