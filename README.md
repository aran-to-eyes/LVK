# Low Vision Kreis – Standalone Frontend

A clean, static Vue 3 single-page application that rebuilds the [low-vision-kreis.de](https://www.low-vision-kreis.de/) website outside of its original CMS.

The primary reason this project exists is to support a **custom interactive nearest-partner finder** that the original CMS cannot deliver.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot-module reload |
| `npm run build` | Build optimised static output to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Stack

- **Vite 5** – build tool and dev server
- **Vue 3** – Composition API with `<script setup>` syntax
- **Vue Router 4** – hash-history routing (no server config needed)
- **Papa Parse** – runtime CSV parsing for the partner dataset
- **Fuse.js** – optional fuzzy city name matching in the gazetteer lookup

No TypeScript, no Tailwind, no UI kit, no SSR framework.

---

## Deployment

The `npm run build` output in `dist/` is a fully self-contained static site.
Deploy to any static host: Netlify, Vercel, GitHub Pages, plain nginx, etc.

Routing uses `createWebHashHistory` by default, so `/#/experts-near-you` style URLs work without any server rewrite rules.

To switch to clean `/experts-near-you` URLs, see [`docs/deployment.md`](docs/deployment.md).

---

## Partner Dataset

`public/data/Lowvision-partner_Stand_2023-5-010.csv`

This semicolon-delimited CSV is the live source of truth.
Replace or extend it to update the partner list. No rebuild is required — the app fetches it at runtime.

See [`docs/content-maintenance.md`](docs/content-maintenance.md) for details.

---

## Nearest-Partner Search

Users enter a German city name or 5-digit postal code.
The app resolves that input against a local gazetteer (`public/data/de-postal-gazetteer.json`),
computes Haversine distances to all partners, and returns the **3 nearest** results.

No external geocoding API is required. An optional fallback geocoder can be enabled via
an environment variable. See [`docs/search-system.md`](docs/search-system.md).

---

## Documentation

| File | Topic |
|---|---|
| [`docs/project-overview.md`](docs/project-overview.md) | Architecture, rationale, technology decisions |
| [`docs/file-index.md`](docs/file-index.md) | Every file in the project with a short description |
| [`docs/component-index.md`](docs/component-index.md) | All Vue components, their props and purpose |
| [`docs/content-maintenance.md`](docs/content-maintenance.md) | How to update text, partners, downloads |
| [`docs/search-system.md`](docs/search-system.md) | How the nearest-partner search works end-to-end |
| [`docs/deployment.md`](docs/deployment.md) | Build, deploy, routing configuration |
