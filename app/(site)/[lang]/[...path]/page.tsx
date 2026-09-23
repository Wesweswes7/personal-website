import { notFound } from 'next/navigation';
import {
  SectionPage,
  ProjectPage,
  NotePage,
  TranslationPage,
} from '@/components/pages';
import {
  isLocale,
  sections,
  messages,
  metadata,
  type Section,
  absolute,
  route,
} from '@/lib/site';
import { notes, projects, noteSlugs } from '@/lib/content';
type Props = { params: Promise<{ lang: string; path: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...sections.map((s) => ({ path: [s] })),
    ...projects.map((p) => ({ path: ['projects', p.slug] })),
    ...noteSlugs().map((slug) => ({ path: ['notes', slug] })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const { lang, path } = await params;
  if (!isLocale(lang)) notFound();
  if (path.length === 1 && sections.includes(path[0] as Section))
    return metadata(lang, messages(lang).nav[path[0] as Section], path[0]);
  if (path[0] === 'projects') {
    const p = projects.find((p) => p.slug === path[1]);
    if (p)
      return metadata(lang, p.title[lang], path.join('/'), p.summary[lang]);
  }
  if (path[0] === 'notes') {
    const note = notes(lang).find((n) => n.slug === path[1]);
    if (!note)
      return {
        title:
          lang === 'en'
            ? 'Translation forthcoming | Zhongsheng Luo'
            : '译文待补充 | 罗中圣',
        robots: { index: false, follow: true },
      };
    const translated = notes().filter((n) => n.slug === note.slug);
    const languages = Object.fromEntries(
      translated.map((n) => [
        n.lang === 'zh' ? 'zh-CN' : 'en',
        absolute(route(n.lang, path.join('/'))),
      ]),
    );
    return {
      ...metadata(lang, note.title, path.join('/'), note.summary),
      alternates: {
        canonical: absolute(route(lang, path.join('/'))),
        languages,
      },
    };
  }
  notFound();
}
export default async function Page({ params }: Props) {
  const { lang, path } = await params;
  if (!isLocale(lang)) notFound();
  if (path.length === 1 && sections.includes(path[0] as Section))
    return <SectionPage lang={lang} section={path[0] as Section} />;
  if (path.length === 2 && path[0] === 'projects') {
    const p = projects.find((p) => p.slug === path[1]);
    if (p) return <ProjectPage lang={lang} project={p} />;
  }
  if (path.length === 2 && path[0] === 'notes') {
    const note = notes(lang).find((n) => n.slug === path[1]);
    if (note) return <NotePage lang={lang} note={note} />;
    const original = notes().find((n) => n.slug === path[1]);
    if (original)
      return (
        <TranslationPage slug={path[1]} lang={lang} original={original.lang} />
      );
  }
  notFound();
}
