'use client';

import Link from '@/components/site-link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  messages,
  route,
  basePath,
  type Locale,
  type Section,
} from '@/lib/site';

export function Navigation({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const t = messages(lang);
  const cleanPath =
    basePath && pathname.startsWith(basePath + '/')
      ? pathname.slice(basePath.length)
      : pathname;
  const rest = cleanPath
    .replace(/^\/(en|zh)(\/|$)/, '/')
    .replace(/^\/+|\/+$/g, '');
  const current = rest.split('/')[0];
  const other: Locale = lang === 'en' ? 'zh' : 'en';
  useEffect(() => {
    setOpen(false);
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (menu.current) menu.current.open = false;
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  const navLink = (key: Section | 'home', mobile = false) => (
    <Link
      key={key}
      href={route(lang, key === 'home' ? '' : key)}
      className={
        current === key || (!current && key === 'home') ? 'active' : ''
      }
      aria-current={
        current === key || (!current && key === 'home') ? 'page' : undefined
      }
      onClick={() => {
        setOpen(false);
        if (menu.current) menu.current.open = false;
      }}
    >
      {mobile && key === 'about' ? t.aboutMe : t.nav[key]}
    </Link>
  );
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className="header-inner container">
        <Link
          href={route(lang)}
          className="brand"
          aria-label={`${t.nav.home} — Zhongsheng Luo`}
        >
          <span className="monogram">
            ZL<span>.</span>
          </span>
          <span>Zhongsheng Luo</span>
        </Link>
        <nav className="desktop-nav" aria-label={t.menu}>
          {(['research', 'learning', 'projects', 'notes'] as Section[]).map(
            (k) => navLink(k),
          )}
          <details
            className="about-menu"
            ref={menu}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                e.currentTarget.open = false;
            }}
          >
            <summary
              className={
                ['about', 'experience', 'awards'].includes(current)
                  ? 'active'
                  : ''
              }
            >
              {t.nav.about}
              <span aria-hidden="true">⌄</span>
            </summary>
            <div className="dropdown">
              {(['about', 'experience', 'awards'] as Section[]).map((k) =>
                navLink(k, true),
              )}
            </div>
          </details>
          {navLink('contact')}
        </nav>
        <div className="header-tools">
          <Link
            href={route(other, rest)}
            className="language-switch"
            aria-label={t.language}
            hrefLang={other === 'zh' ? 'zh-CN' : 'en'}
          >
            <span className={lang === 'en' ? 'selected' : ''}>EN</span>
            <span className="language-divider">/</span>
            <span className={lang === 'zh' ? 'selected' : ''}>中文</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? t.close : t.menu}
            <span aria-hidden="true">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav container ${open ? 'is-open' : ''}`}
        aria-label={t.menu}
        hidden={!open}
      >
        {(
          [
            'home',
            'research',
            'learning',
            'projects',
            'notes',
            'about',
            'experience',
            'awards',
            'contact',
          ] as const
        ).map((k) => navLink(k, true))}
      </nav>
    </header>
  );
}
