import type { MetadataRoute } from 'next';
import { absolute, route, locales } from '@/lib/site';
import { notes, projects, visibleSections } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.flatMap((lang) =>
      [
        '',
        ...visibleSections(lang),
        ...projects.map((p) => `projects/${p.slug}`),
      ].map((path) => ({ url: absolute(route(lang, path)) })),
    ),
    ...notes().map((n) => ({
      url: absolute(route(n.lang, `notes/${n.slug}`)),
    })),
  ];
}
