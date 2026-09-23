import { notFound } from 'next/navigation';
import { HomePage } from '@/components/pages';
import { isLocale, metadata } from '@/lib/site';
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return metadata(lang);
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage lang={lang} />;
}
