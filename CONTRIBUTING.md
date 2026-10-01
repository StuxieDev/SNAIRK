<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/brand/logo-light.svg">
    <img src="public/brand/logo-light.svg" width="240" alt="SNAIRK">
  </picture>
</p>

# Contributing to SNAIRK

This is a personal project. The repository isn't open to public pull requests and, per the [License](README.md#license) section, isn't licensed for reuse. This document is for future-me, or anyone with write access, working on it consistently.

Questions: [hello@stuxie.dev](mailto:hello@stuxie.dev).

## Local setup

```
git clone <repo-url>
cd SNAIRK
./dev-server.sh
```

Needs Node 20.19 or newer. `dev-server.sh` (or `.bat`) installs dependencies on first run and starts Vite with dev mode on; pass `--no-dev-mode` to see the site as production does.

## Conventions

- **Function components, plain CSS.** No CSS-in-JS and no UI framework. The recovered look of the main page is `src/styles/app.css`; additions are in `src/styles/extras.css`.
- **Content is data.** Replies, AIs, chat themes, features, pricing and FAQ live in `src/data/`. Adding a joke reply is a one-line edit to `replies.js`.
- **Routes live in `src/routes.js`.** Adding a page means adding an entry there and a component in `App.jsx`'s page map. The router, sitemap page, `sitemap.xml` and pre-rendering all read the same list. Use trailing-slash paths (`/legal/privacy/`).
- **Every route is pre-rendered.** Keep components safe for server rendering: no `window`, `document` or `localStorage` during render, only in effects. Browser-only state (saved theme, saved AI) is applied after mount.
- **Keep it a parody.** Anything that looks like a claim about a real company should be obviously a joke, and the disclaimer stays visible on the main page.
- The footer version comes from `VERSION.md` at build time; `/changelogs/` renders `CHANGELOG.md` at build time.
- `reference/v1.0.7-build/` is the original compiled build. Don't edit it, and it is never deployed.

## Accessibility checks

Before a release: tab through the main page, check both themes, check at 360px wide, and check the animations stop under `prefers-reduced-motion`.

## Legal pages

All six live under `/legal/` (`privacy`, `terms`, `cookies`, `imprint`, `disclaimer`, `opt-out`) in `src/pages/Legal.jsx`. Keep them in sync with what the site actually does: if analytics, a form, or any new browser storage is ever added, the privacy and cookies pages need a real update.

## Versioning and changelog

- The version lives in `VERSION.md` (a bare version string). Bump it on every release
- Every release gets a `CHANGELOG.md` entry with `### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Security` and `### Deprecated` subsections, in that order, never a bare bullet list under a version heading
- `commit.sh` (bash) and `commit.bat` (Windows) read `VERSION.md` and handle the commit and `git tag`; don't hand-write the release commit or tag

## Deployment

Pushes to `main` build and deploy to GitHub Pages through `.github/workflows/pages.yml` (Pages source must be set to **GitHub Actions**). Pull requests only run the build. See the README for custom domain and DNS steps.

## Before committing

- Run `npm run build` and `npm run preview`, then click through the main page, the chat, a legal page, `/changelogs/` and `/sitemap/`
- Check the browser console is clean
