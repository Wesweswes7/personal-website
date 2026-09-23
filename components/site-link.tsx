import type { ComponentProps } from 'react';
import { asset } from '@/lib/site';

// Keep exported HTML links usable without JavaScript. Supporting browsers can
// prepare these documents through the intent-based speculation rules.
export default function SiteLink({ href, ...props }: ComponentProps<'a'>) {
  const internal = href?.startsWith('/') && !href.startsWith('//');
  const target = internal ? asset(href!) : href;
  const page =
    internal && /^\/(en|zh)(\/|$)/.test(href!) && !href!.includes('#');
  return (
    <a href={target} data-prefetch={page ? 'page' : undefined} {...props} />
  );
}
