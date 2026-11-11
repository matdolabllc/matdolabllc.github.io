# matdolab.com

The Matdo Lab website, built with [Astro](https://astro.build) and Tailwind CSS.
Every push to `main` is built and published to GitHub Pages by
`.github/workflows/deploy.yml`.

## Commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies (Node 22.12 or newer)    |
| `npm run dev`     | Local dev server at http://localhost:4321     |
| `npm run build`   | Build the site into `dist/`                   |
| `npm run preview` | Serve the built `dist/` locally               |

## Layout

```
.
├── src/                    Site source
│   ├── pages/              One file per URL
│   │   ├── index, about, contact, check, grade
│   │   ├── grade/try       Invite-only Grade trial (noindex)
│   │   ├── privacy/        privacy/check, privacy/grade
│   │   ├── terms/          terms/check, terms/grade
│   │   └── support/        support/check, support/grade
│   ├── components/         Shared Astro components
│   ├── layouts/            Page shell (head, header, footer)
│   ├── data/  lib/         Content data and helpers
│   ├── styles/global.css   Tailwind entry and site styles
│   └── consts.ts           Site-wide constants
├── public/                 Copied to the site as-is
│   ├── demo/               Films, tutorials, screenshots, illustrations
│   ├── logos/  og/         Brand marks and social share cards
│   └── CNAME               Custom domain for GitHub Pages
├── design/                 Working sources; not published
│   ├── illustration-prompts/   Image prompts and briefs
│   │   └── home-product-cards/ Home page card rounds (v1–v6)
│   ├── mobile-video/       Portrait Grade film pipeline (see its README)
│   ├── share-cards/        Renders public/og/*.jpg
│   ├── screenshots/        Raw device captures (superseded/ = retired)
│   └── notes/              Positioning and copy notes
└── astro.config.mjs        Site URL, redirects, sitemap
```

`dist/`, `.astro/` and `node_modules/` are generated and ignored by git.

## Branches

- `main`: the live site.
- `check-1.4.0-legal`: Check page text for 1.4.0 (seven languages).
  Merge into `main` once 1.4.0 is approved.
