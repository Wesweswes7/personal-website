import Link from '@/components/site-link';
import type { ReactNode } from 'react';
import profile from '@/data/profile.json';
import { asset, messages, route, type Locale } from '@/lib/site';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="arrow"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function CV({
  lang,
  button = false,
}: {
  lang: Locale;
  button?: boolean;
}) {
  const t = messages(lang);
  const cv = (profile.cv as Record<Locale, string | null>)[lang];
  return cv ? (
    <a
      href={asset(cv)}
      className={button ? 'button button-light' : 'text-link'}
      download
    >
      {t.downloadCV}
      <Arrow diagonal />
    </a>
  ) : (
    <span className="cv-pending" title={t.cvHelp}>
      <svg
        width="15"
        height="18"
        viewBox="0 0 20 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M3 1h9l5 5v16H3ZM12 1v6h5M6 12h8M6 16h8" />
      </svg>
      {t.cvPending}
    </span>
  );
}
export function SectionHeading({
  label,
  title,
  href,
  link,
}: {
  label: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {href && link && <TextLink href={href}>{link}</TextLink>}
    </div>
  );
}
export function PageHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
    </div>
  );
}
export function EmptyState({
  title,
  text,
  compact = false,
}: {
  title: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <div className={`empty-state ${compact ? 'compact' : ''}`}>
      <span className="empty-symbol" aria-hidden="true">
        [ &nbsp; ]
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
export function ConceptGraph() {
  const points = [
    [25, 52],
    [61, 22],
    [61, 82],
    [100, 49],
    [134, 12],
    [143, 76],
    [187, 38],
    [189, 106],
    [104, 110],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [3, 4],
    [3, 5],
    [3, 8],
    [4, 6],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 7],
    [7, 8],
  ];
  return (
    <svg
      className="concept-graph"
      aria-hidden="true"
      viewBox="0 0 220 128"
      fill="none"
    >
      {edges.map(([a, b], i) => (
        <path
          key={i}
          d={`M${points[a].join(' ')}L${points[b].join(' ')}`}
          stroke="currentColor"
          opacity=".3"
        />
      ))}
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 3 ? 5 : 3}
          fill={i === 3 ? 'currentColor' : 'white'}
          stroke="currentColor"
        />
      ))}
    </svg>
  );
}
export function ContactStrip({ lang }: { lang: Locale }) {
  const t = messages(lang);
  return (
    <section className="contact-strip">
      <div>
        <p className="eyebrow">{t.contactLabel}</p>
        <h2>{t.contactHeading}</h2>
        <p>{t.contactIntro}</p>
      </div>
      <div className="contact-links">
        <a className="text-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <Arrow diagonal />
        </a>
        <a
          className="text-link muted-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub / {profile.githubUsername}
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
export function Footer({ lang }: { lang: Locale }) {
  const t = messages(lang);
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link href={route(lang)} className="footer-name">
          Zhongsheng Luo <span>罗中圣</span>
        </Link>
        <p>{t.footerLine}</p>
      </div>
      <nav aria-label={lang === 'en' ? 'Footer navigation' : '页脚导航'}>
        {Object.entries(t.nav).map(([key, label]) => (
          <Link key={key} href={route(lang, key === 'home' ? '' : key)}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="footer-bottom">
        <span>
          © {new Date(profile.updatedAt).getFullYear()} Zhongsheng Luo
        </span>
        <span>
          {t.updated} · {profile.updatedAt}
        </span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub <Arrow diagonal />
        </a>
      </div>
    </footer>
  );
}
