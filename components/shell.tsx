import type { ReactNode } from 'react';
import { Navigation } from './navigation';
import { Footer } from './ui';
import { type Locale, asset } from '@/lib/site';
import '@/app/globals.css';

export function Document({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
      </head>
      <body>
        <Navigation lang={lang} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
