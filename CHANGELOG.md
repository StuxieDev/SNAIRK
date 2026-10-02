# Changelog

All notable changes to SNAIRK are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.2.4

### Fixed
- The logo icon in the header and footer is the same height as the "SNAIRK" lettering and lines up with it; it was taller than the letters

## v1.2.3

### Changed
- The slogan is "Seven AIs. Zero useful answers. Infinite snairk." everywhere

## v1.2.2

### Changed
- One slogan everywhere: "Seven AIs. Zero answers. Infinite snairk." The home page and page title said "Zero useful answers. Infinite judgment." while the footer already said "Infinite snairk"

## v1.2.1

### Fixed
- The footer logo matches the header's: the lightning icon and "SNAIRK" wordmark in the selected AI's colour (larger, greyed out until you hover over it), instead of the fixed brand-file version, which used different colours and lettering

## v1.2.0

### Changed
- The footer shows the SNAIRK icon and logo instead of plain "SNAIRK" text, greyed out until you hover over it (the right version for the light and dark themes), and it links home
- "Snark" is "Snairk" and "Snarked" is "Snairked" throughout the site: "Get Snairked", "Thoroughly Snairked", "Powered by Snairk 1.0", "Infinite snairk", "All snairk reserved" and the rest ("snarky", describing the products being parodied, stays)

## v1.1.0

### Added
- Hosting on GitHub Pages at [snairk.stuxie.dev](https://snairk.stuxie.dev): every route is pre-rendered to its own page, deployed by `.github/workflows/pages.yml`
- The source project: Vite and React (function components) with plain CSS, replacing the compiled bundle that was all that existed. Canned replies, AI personas, chat themes, features, pricing and FAQ are plain data files in `src/data/`
- Boring Legal Stuff at `/legal/` with Privacy Policy, Terms and Ethics, Cookies Policy, Imprint, Disclaimer and Opt-Out Preferences, written for a parody site: it is satire, not affiliated with the companies it mocks, has no real AI and collects no data
- A Changelogs page at `/changelogs/` rendering this file with colour-coded section badges (Added, Changed, Fixed, Removed, Security, Deprecated, always in that order); `/changelog/` redirects to it
- A Sitemap page at `/sitemap/`, plus `sitemap.xml` and `robots.txt` generated at build time
- Every route is pre-rendered to its own HTML file (and a `404.html`), then hydrated, so the site works on GitHub Pages without a rewrite rule
- GitHub Actions workflow for building and deploying to GitHub Pages, and a CI build on pushes and pull requests
- The shared StuxieDev site banner as a React component; the dev banner shows in dev mode, and `?banner=soon,maintenance,site` previews the others (dev only)
- `dev-server.sh` and `dev-server.bat`, which run the Vite dev server with dev mode on (`--no-dev-mode` to opt out)
- The StuxieDev footer: logo, "A StuxieDev Project", "Created with love, code and coffee by StuxieDev", a runtime copyright range, the version linking to the changelogs, Sitemap and Boring Legal Stuff
- A visible parody disclaimer in the hero as well as the footer
- A logo (icon and wordmark, light and dark), favicons and an Apple touch icon
- README, CONTRIBUTING, VERSION.md, LICENSE and the `commit.sh` / `commit.bat` release scripts

### Changed
- "A Stux.Dev Labs Project" is now "A StuxieDev Project", and copyright is StuxieDev's, as a personal project
- Fonts (Bebas Neue, Syne, Outfit, IBM Plex Mono) are self-hosted instead of loaded from Google Fonts
- Social tags use the site's absolute URL and are set per page instead of from the browser location
- The demo no longer claims "Real AI-powered responses"; it says the snark is hand-written with no actual AI
- Text colours were lifted to meet contrast guidelines on both themes, and button text picks a readable colour for each AI's accent
- Pricing buttons take you back to the demo instead of doing nothing

### Fixed
- AI cards, the FAQ and the theme toggle are real buttons with the right ARIA state, so the page works from the keyboard
- FAQ answers are no longer clipped at 180px
- Changing AI while a reply is loading no longer leaves a stale loading state
- The chat is a labelled form, and replies are announced to screen readers
- Animations and smooth scrolling respect reduced-motion settings
- The 69-click overlay is a proper dialog: focus moves to it and Escape closes it
- The layout holds down to 360px wide

### Removed
- The unused Google Fonts import and the "Built by Stux.Dev" and snairk.stux.dev footer links

## v1.0.7

### Added
- The build as found before this repo was set up: a compiled Vite, React and CSS-in-JS bundle with seven parody AIs (ChatGPT, Claude, Gemini, Grok, Copilot, Perplexity, Meta AI), a themed demo chat with canned replies, features, pricing, FAQ, a light and dark theme and a 69-click easter egg
