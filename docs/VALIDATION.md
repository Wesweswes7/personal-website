# Validation record

Date: 2026-09-23. Local tests used Windows, Node.js 24, and Microsoft Edge through Playwright. The GitHub Pages workflow also built and deployed successfully using Node.js 22 on GitHub's Ubuntu runner.

## Production build

- Next.js 16.3.6 static export: passed.
- TypeScript check: passed.
- Content validation: passed; the release has zero published projects and zero notes, matching the supplied information.
- Prettier check: passed.
- Root URL renders English; English and Chinese pages have the correct document language.

## Browser checks

All 18 core pages (nine pages × two languages) were checked at viewport widths of 1440, 390, and 320 pixels. The same matrix was checked in an isolated project build using the `/personal-website` base path.

- No horizontal overflow, missing images, empty anchor placeholders, or uncaught browser exceptions were found.
- All core internal links returned successful responses.
- Language switching retained the current page.
- Mobile navigation opened, closed after navigation, and closed with Escape.
- Desktop About navigation reached the Awards page.
- Unknown URLs returned 404.

Initial static-host testing found failed framework RSC prefetch requests. Internal links now use native document navigation to exported HTML, with the deployment base path applied centrally. Rechecking found no failed resource requests. This trades client-side page transitions for straightforward static-host behavior.

## Future content checks

Only the separate validation copy received test entries. The release source and output contain none of these entries.

Twenty-one assertions passed, covering generated English and Chinese project pages, Markdown tables, deployment-aware canonical URLs and internal links, language switching within an article, a missing-translation page with `noindex`, an original-language link, sitemap exclusion of missing translations, and exclusion of draft notes and projects from both exported pages and the sitemap. These also verify that published projects and notes restore their navigation entries and homepage sections in both languages.

## Loading and navigation update

- Rechecked all 18 pages at 1440, 390, and 320 pixels with the project base path: no failed links, missing images, horizontal overflow, or browser exceptions.
- Empty project/note entries are absent from the header, mobile menu, footer, homepage, and related links. Their existing URLs still return 200 with `noindex`; empty archives are excluded from the sitemap.
- Both language homepages lead to research interests and contact. Missing CVs, publications, and academic profiles no longer produce placeholder panels.
- The browser made zero external CSS requests: the shared stylesheet is inlined. This saves a render-blocking round trip, with the trade-off of a larger HTML response and no independently cached stylesheet. Next.js's inline CSS option is experimental and should be rechecked after framework upgrades.
- The site-specific navigation JavaScript chunk decreased from about 11.6 KB to 3.3 KB uncompressed (about 5.1 KB to 1.4 KB gzip). Shared React/Next.js runtime chunks remain; these numbers are not the total page script size.
- Intent-based document prefetch was observed reaching `Ready`, then `PrefetchResponseUsed` on navigation. Full prerender was disabled by the automated browser's DevTools session, so the prefetch fallback is verified; full prerender acceleration is not claimed from this test.
- Language switching, browser back navigation, menu interaction, and ordinary navigation with JavaScript disabled passed. Unsupported or resource-constrained browsers may decline speculative loading without breaking links.
- Local click timings are not an estimate of public GitHub Pages speed. Network latency remains dependent on the visitor's connection.

## Live deployment

- Repository: [Wesweswes7/personal-website](https://github.com/Wesweswes7/personal-website).
- Website: [English](https://wesweswes7.github.io/personal-website/en/) · [中文](https://wesweswes7.github.io/personal-website/zh/).
- [First deployment](https://github.com/Wesweswes7/personal-website/actions/runs/35867044435): build and deploy both passed.
- HTTP checks passed for the root, all 18 core pages, 18 internal destinations, and 11 referenced assets. Document languages, canonical URLs, base paths, sitemap, and the unknown-route 404 were checked.
- The deployed photograph's SHA-256 matches the approved local photograph.
- The first live Playwright navigation timed out on the local connection. The browser interaction and responsive checks above refer to the local production build with the same project base path; the live checks used direct HTTPS requests.

## Remaining content

- CV files, formal experience roles, official award titles/years, and optional academic profile links remain pending.
- The original user-supplied photograph is retained without image editing; CSS controls framing.
