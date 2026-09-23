import type { ComponentProps } from 'react';
import { asset } from '@/lib/site';

// Native navigation works with exported HTML on any static host and avoids
// framework prefetch requests that require Next-specific server behavior.
export default function SiteLink({ href, ...props }: ComponentProps<'a'>) {
  const target =
    href?.startsWith('/') && !href.startsWith('//') ? asset(href) : href;
  return <a href={target} {...props} />;
}
