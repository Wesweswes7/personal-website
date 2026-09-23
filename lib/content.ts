import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import rawProjects from '@/data/projects.json';
import type { Locale, Localized } from './site';

export type Project = {
  id: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  progress: 'planned' | 'ongoing' | 'completed';
  category: string;
  title: Localized;
  summary: Localized;
  contribution: Localized;
  methods?: Localized;
  results?: Localized;
  tags?: string[];
  repository?: string;
  documentation?: string;
  demo?: string;
  updatedAt: string;
};
export type Note = {
  slug: string;
  lang: Locale;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  body: string;
};
export const projects = (rawProjects as Project[]).filter(
  (p) => p.status === 'published',
);
export function notes(lang?: Locale): Note[] {
  const folder = path.join(process.cwd(), 'content', 'notes');
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(folder, file), 'utf8'),
      );
      if (data.status !== 'published' || (lang && data.lang !== lang))
        return [];
      return [
        {
          ...data,
          date: String(data.date),
          tags: data.tags ?? [],
          body: content,
        } as Note,
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function projectBody(slug: string, lang: Locale) {
  if (!/^[a-z0-9-]+$/.test(slug)) return '';
  const file = path.join(
    process.cwd(),
    'content',
    'projects',
    `${slug}.${lang}.md`,
  );
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}
export function noteSlugs() {
  return [...new Set(notes().map((n) => n.slug))];
}
