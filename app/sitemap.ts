import type { MetadataRoute } from 'next';
import { absolute, route, locales, sections } from '@/lib/site';
import { notes, projects } from '@/lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.flatMap((lang) =>
      ['', ...sections, ...projects.map((p) => `projects/${p.slug}`)].map(
        (path) => ({ url: absolute(route(lang, path)) }),
      ),
    ),
    ...notes().map((n) => ({
      url: absolute(route(n.lang, `notes/${n.slug}`)),
    })),
  ];
}
