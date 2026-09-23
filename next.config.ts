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
};
export default config;
