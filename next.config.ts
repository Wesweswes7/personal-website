import type { NextConfig } from 'next';

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // The shared stylesheet is small (~6 KB gzip). Deliver it with the HTML to
  // remove a render-blocking request on high-latency connections.
  experimental: { inlineCss: true },
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  devIndicators: false,
  // Rebuild CSS for static exports: persistent local caches can retain old styles.
  webpack: (webpackConfig, { dev }) => {
    if (!dev) webpackConfig.cache = false;
    return webpackConfig;
  },
};
export default config;
