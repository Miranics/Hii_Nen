/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  // Force deployment refresh - CSP update for Render backend
  experimental: {
    forceSwcTransforms: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development' 
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://trusted-cdn.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "img-src 'self' data: https:",
                  "connect-src 'self' https://*.supabase.co wss://*.supabase.co ws://localhost:* http://localhost:* https://*.onrender.com",
                  "frame-src 'none'",
                  "object-src 'none'",
                  "base-uri 'self'"
                ].join('; ')
              : [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' https://trusted-cdn.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "img-src 'self' data: https:",
                  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.onrender.com https://hiinen-backend.onrender.com",
                  "frame-src 'none'",
                  "object-src 'none'",
                  "base-uri 'self'"
                ].join('; ')
          }
        ]
      }
    ]
  }
};

export default nextConfig;
