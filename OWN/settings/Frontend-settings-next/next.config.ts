import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
