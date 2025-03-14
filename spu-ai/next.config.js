/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Specify the output mode explicitly
  output: 'standalone',
  // Disable polling to prevent file system issues
  webpack: (config, { isServer }) => {
    // Add polyfills for browser-only features
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Add optimization settings
    config.watchOptions = {
      poll: false,
      ignored: ['**/node_modules', '**/.git'],
    };
    
    return config;
  },
  // Configure security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig 