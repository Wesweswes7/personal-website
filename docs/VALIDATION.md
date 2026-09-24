# Validation record

## Visual redesign and new project URL — 2026-09-24

Current release target: [Wesweswes7/zhongshengluo06](https://github.com/Wesweswes7/zhongshengluo06), with the website at [https://wesweswes7.github.io/zhongshengluo06/](https://wesweswes7.github.io/zhongshengluo06/). **The repository rename and local project-path QA are confirmed; deployment and live verification are in progress.** The user chose to keep this project URL. This release does not provide redirects from the former Pages project URLs. An HTTP 200 response from the renamed project alone is not evidence that the redesigned build is live.

- The local redesign uses a large photographic cover, serif headings, generous spacing, fine separators, and white/navy styling. The author's name and academic identity remain unchanged.
- The cover contains **two photographs only**: the original conference photograph and the retouched waterside photograph. The podium photograph is excluded from the cover. No separate photo pages or gallery navigation were added.
- The initial redesign checks ran on a local build without a project prefix. A subsequent production build under `/zhongshengluo06/` passed the full 18-page matrix at viewport widths of 1440, 390, and 320 pixels. All 18 internal destinations, document languages, language switching with page retention, mobile menus, Escape handling, desktop About navigation, the English default root, and unknown-route 404 behavior passed. The new-project report contains no layout/link issues or browser errors.
- Both language versions passed carousel checks at all three widths under the new `/zhongshengluo06/` base path: two slides, previous/next wraparound, direct dot selection, keyboard arrows, stable frame height, loaded images, and no horizontal overflow. The waterside image is not requested until selected; the podium image is never requested by the cover. The initial photograph remains available with JavaScript disabled. No photo-detail route appears in the sitemap, and the removed photo-detail URL returns 404.

Local evidence is retained outside the website source in the task's `work/` directory: `qa-new-project.json`, `qa_carousel.cjs`, and `carousel-checks.json`. The earlier `qa-redesign.json` covers the prior local root-path build. Root-path redirect experiments are superseded and are not part of this release.

## Earlier homepage photo carousel — 2026-09-24

The following records the earlier three-photo layout, which is superseded by the two-photo local redesign above.

- Three photos share the existing homepage frame: the original conference image and two AI-retouched additions. No photo detail routes or gallery navigation were added.
- The production static build, TypeScript, content validation and formatting checks passed.
- English and Chinese homepages passed browser checks at 1440, 390 and 320 pixels: previous/next wraparound, direct dot selection, keyboard arrows, stable frame height, no horizontal overflow, and no failed resources or browser errors.
- Network checks confirmed the two new photos are not requested until selected. Responsive WebP variants are approximately 30–245 KB; JPEG fallback files are approximately 143–323 KB.
- The first photo remains present without JavaScript. Mobile layout uses a full photo frame with 44-pixel controls. Desktop and mobile screenshots were visually reviewed.
- Production Webpack caching is disabled after a local incremental build reused stale CSS. A full recompilation included the current styles and passed the checks above; this affects build time only.

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

## Historical live deployment — former project URL

- Repository: [Wesweswes7/personal-website](https://github.com/Wesweswes7/personal-website).
- Website: [English](https://wesweswes7.github.io/personal-website/en/) · [中文](https://wesweswes7.github.io/personal-website/zh/).
- [First deployment](https://github.com/Wesweswes7/personal-website/actions/runs/35867044435): build and deploy both passed.
- HTTP checks passed for the root, all 18 core pages, 18 internal destinations, and 11 referenced assets. Document languages, canonical URLs, base paths, sitemap, and the unknown-route 404 were checked.
- The deployed photograph's SHA-256 matches the approved local photograph.
- The first live Playwright navigation timed out on the local connection. The browser interaction and responsive checks above refer to the local production build with the same project base path; the live checks used direct HTTPS requests.

## Remaining content

- CV files, formal experience roles, official award titles/years, and optional academic profile links remain pending.
- The original user-supplied photograph is retained without image editing; CSS controls framing.
