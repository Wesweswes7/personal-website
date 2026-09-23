import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Document } from '@/components/shell';
import { locales, isLocale } from '@/lib/site';
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Document lang={lang}>{children}</Document>;
}
