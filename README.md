<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/brand/logo-light.svg">
    <img src="public/brand/logo-light.svg" width="320" alt="SNAIRK">
  </picture>
</p>

# SNAIRK

### *Seven AIs. Zero answers. Infinite snairk.*

SNAIRK is a satirical parody of snarky AI chat products. Pick ChatGPT, Claude, Gemini, Grok, Copilot, Perplexity or Meta AI and get a canned, in-character brush-off in a chat window styled like the real thing. There is **no real AI**, nothing is sent anywhere, and it is **not affiliated** with any company it parodies.

- Vite, React and plain CSS; fonts self-hosted
- Every route is pre-rendered to static HTML and hydrated, so it hosts anywhere, including GitHub Pages
- Light and dark themes, keyboard accessible, reduced-motion aware, responsive from 360px
- No accounts, no ads, no analytics, no cookies

A personal [StuxieDev](https://stuxie.dev) project.

---

## Local development

```
./dev-server.sh                  # http://localhost:5173, dev mode on (shows the dev banner)
./dev-server.sh 3000 --no-dev-mode
```

On Windows use `dev-server.bat`. The script runs `npm install` the first time. It sets `VITE_DEV_MODE=1`, which shows the dev banner; `?banner=soon,maintenance,site` previews the other banner variants (dev only). Plain `npm run dev` works too, without the banner.

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Client build, SSR build, then pre-render every route into `dist/` |
| `npm run preview` | Serve `dist/` locally |

## Structure

```
src/
  data/         replies (69 per AI), AIs, chat themes, features, pricing, FAQ, steps
  components/   Nav, Footer, ChatShell, Icon, SiteBanner, EasterEgg, DocPage
  pages/        Home, Legal (hub + six pages), Changelogs, Sitemap / 404 / redirect
  lib/          changelog parser, head tags, colour helpers
  styles/       app.css (recovered look), banner.css, extras.css
  routes.js     every page, used by the router, sitemap and pre-renderer
  config.js     site URL, copyright start year, dev mode, version
scripts/        prerender.mjs (build), make-icons.mjs (one-off PNG generation)
public/         og.png, favicons, brand logos, CNAME, .htaccess
reference/      the original v1.0.7 build, kept for reference and never deployed
docs/           notes on what was recovered from that build
```

## Deployment (GitHub Pages)

1. In the repository settings, go to **Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. `.github/workflows/pages.yml` builds with Node and deploys `dist/`; pull requests only run the build.
3. Custom domain: the site URL lives in `src/config.js` (`SITE_URL`) and `public/CNAME` (currently `snairk.stuxie.dev`). Change both together if the domain changes. At your DNS provider, add a `CNAME` record for the subdomain pointing to `<owner>.github.io`, then set the custom domain in Pages settings and enable **Enforce HTTPS**.

`dist/` contains a real `index.html` per route, `404.html`, `sitemap.xml` and `robots.txt`. `public/.htaccess` is only for Apache hosting; GitHub Pages ignores it.

## Releasing

1. Update `CHANGELOG.md` (sections in the order Added, Changed, Fixed, Removed, Security, Deprecated)
2. Bump `VERSION.md`
3. Update this README if relevant
4. Run `./commit.sh` (or `commit.bat`): it reads `VERSION.md`, commits, and tags `vX.Y.Z`
5. `git push origin main --tags`

See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions.

## License

&copy; 2026 StuxieDev. All rights reserved. This repository is not licensed for reuse or redistribution. Third-party names and marks belong to their owners and are used only to identify what is parodied.
