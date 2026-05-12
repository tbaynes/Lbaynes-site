# lesliebaynes.com

Personal website for Leslie Baynes — biblical scholar, author of *Between Interpretation and Imagination: C. S. Lewis and the Bible* (Eerdmans, 2025), and Professor of Religious Studies at Missouri State University.

## 🚀 First-time deployment

**See `DEPLOYMENT.md` for the complete step-by-step deploy guide.** Start there.

## Stack

- **Framework:** [Astro](https://astro.build) 4.x
- **Host:** Netlify (free tier)
- **Content editing:** [Decap CMS](https://decapcms.org) at `/admin`
- **DNS / Registrar:** Cloudflare
- **Email forwarding:** ImprovMX
- **Analytics:** Cloudflare Web Analytics + Microsoft Clarity

## Local development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs to `./dist/`. Netlify handles this automatically on push to `main`.

## Project structure

```
lbaynes-site/
├── public/                     ← static assets served as-is
│   ├── admin/                  ← Decap CMS entry point
│   │   ├── index.html
│   │   └── config.yml          ← CMS collection schemas
│   ├── images/                 ← headshots, book cover, uploads
│   └── favicon.svg
├── src/
│   ├── components/             ← Nav, Footer
│   ├── content/
│   │   ├── config.ts           ← Zod schemas for collections
│   │   ├── endorsements/       ← 9 book endorsements (markdown)
│   │   ├── podcasts/           ← 17 appearances (markdown)
│   │   └── writing/            ← 6 essays/articles (markdown)
│   ├── layouts/
│   │   └── Base.astro          ← HTML shell, meta tags, fonts
│   ├── pages/                  ← one file per route
│   │   ├── index.astro         ← Home
│   │   ├── book.astro          ← Book page
│   │   ├── about.astro         ← About
│   │   ├── media.astro         ← Media & Speaking
│   │   ├── writing.astro       ← Writing
│   │   └── contact.astro       ← Contact
│   └── styles/
│       └── global.css          ← design system
├── astro.config.mjs
├── netlify.toml                ← build & redirect config
├── package.json
├── DEPLOYMENT.md               ← ★ deployment guide
└── README.md                   ← this file
```

## Editing content

**Leslie edits via Decap CMS** at `https://lesliebaynes.com/admin`.

Three content collections:
- **Podcast Appearances** — `src/content/podcasts/`
- **Book Endorsements** — `src/content/endorsements/`
- **Writing** — `src/content/writing/`

Commits happen automatically on save. Site rebuilds in about 60 seconds after each save.

## Design system

All design tokens are CSS variables in `src/styles/global.css`.

- **Typography:** Fraunces (display) + Source Serif 4 (body) via Google Fonts
- **Palette:** Ivory backgrounds, oxblood accents, sepia secondaries, warm charcoal text
- **Italics policy:** only for book titles, blockquotes, and conventional typography. No decorative italics.

## Cost

**~$10/year** for domain renewal. Everything else is free.

---

Built for Leslie Baynes, 2026.
