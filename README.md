# Zhongsheng Luo · Personal Website

A bilingual academic portfolio for Zhongsheng Luo (罗中圣), an undergraduate at Central China Normal University. Built with Next.js App Router and TypeScript, with static export for GitHub Pages.

[English homepage](https://wesweswes7.github.io/personal-website/en/) · [中文主页](https://wesweswes7.github.io/personal-website/zh/)

English is the default language. All nine core pages have Chinese counterparts. The supplied photograph is kept unchanged; the browser controls its framing.

## Run locally

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js. `/en/` and `/zh/` are the language entry points; `/` displays the English homepage.

## Build and preview

```sh
npm run build
npm run preview
```

The production output is in `out/`. The preview server normally uses port 4173. The build validates content before exporting the site. A type check can also be run with `npm run typecheck`.

## Content and documentation

- [内容维护指南（中文）](docs/CONTENT.zh-CN.md)
- [GitHub Pages 部署指南（中文）](docs/DEPLOYMENT.zh-CN.md)
- [Profile README draft](github-profile/README.md) · [中文版本](github-profile/README.zh-CN.md)
- [Repository organization](docs/REPOSITORIES.md)
- [Validation record](docs/VALIDATION.md)
- [Note template](docs/templates/note.md) · [Project template](docs/templates/project.json)

Structured content lives in `data/`; navigation and UI translations live in `messages/`. Long-form notes live in `content/notes/`, and optional project narratives live in `content/projects/`.

## Current content

The site contains the supplied education, interests, learning subjects, experiences, and awards. There are no invented projects, publications, or completed learning milestones. Missing CVs, role details, award years, and social profiles remain explicit pending items. See `data/todos.json`.

No CV download link is rendered until the matching local PDF is supplied. Draft and archived projects and notes are excluded from public pages. Empty project and notes pages describe the current state without linking to nonexistent work.

## Deployment

The included GitHub Actions workflow builds and deploys to GitHub Pages on pushes to `main`. Pages is enabled for this repository with GitHub Actions as its source. The workflow reads the site's origin and base path from GitHub's Pages configuration, supporting project sites, user sites, and configured custom domains.

For a manual build, set `NEXT_PUBLIC_SITE_URL` to the origin only, such as `https://wesweswes7.github.io`, and `NEXT_PUBLIC_BASE_PATH` to the project path, such as `/personal-website`. Both values must be set **before building**. Local development needs neither variable. The site URL in generated metadata is a deployment target, not proof that the site is already live.

## Showcase

The homepage introduces the author's identity, current learning, future exploration, and research interests. Research, Learning, About, Experience, Awards, Projects, Notes, and Contact provide the full archive.

## Rights

The personal photograph and biographical content are supplied for this website. No blanket open-source license has been applied to them. Choose an appropriate license for reusable code separately before external reuse.
