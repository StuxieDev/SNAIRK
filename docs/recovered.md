# Recovered from the v1.0.7 build

Source for this was `reference/v1.0.7-build/assets/index-xXDKpTbP.js` (277 KB, minified), plus `index.html`, `.htaccess` and `og.png`. No source maps or original source existed.

## What the bundle contains

React 19-style production runtime (`react`, `react-dom/client`, `react/jsx-runtime`) followed by the app: a single component (`Lh`) and its data. Styling is one CSS string injected through a `<style>` tag. **There is no three.js in the bundle** (no renderer, camera, scene or geometry code anywhere), so there was no 3D scene to recover and none was added. The one animated visual is the pulsing dot in the hero badge and the easter egg overlay animation.

## Recovered in full

- **Seven AIs**: ChatGPT (OpenAI, GPT-5.5), Claude (Anthropic, Opus 4.8), Gemini (Google, 3.5 Flash), Grok (xAI, Grok 4.3), Copilot (Microsoft, GPT-4o), Perplexity (Sonar Pro), Meta AI (Llama 4). For each: accent colour, tagline, one-line roast, persona prompt (see below), brand icon path, and a full chat skin (background, header, bubbles, input radius, font stack, placeholder, loading text, empty-state text, per-product disclaimer line).
- **Canned replies**: 69 per AI, 483 in total, verbatim. The demo picks one at random after a 400-900 ms "thinking" delay showing the per-AI loading text. Now `src/data/replies.js`.
- **Persona prompts**: each AI has a "You are a satirical parody of ..." system prompt. They are left over from an earlier version that called a model; the 1.0.7 demo never uses them. Kept in `src/data/ais.js`, unused.
- **Features** (6), **How it works** (3 steps), **Pricing** (4 tiers: Free but Very Limited $0, Pro but Still Limited $69 "Most popular ironically", Business for the Small Ones $420, Enterprise for the Mega Corps with No Budget $1,337), **FAQ** (12 entries), hero copy, nav, footer and disclaimer text.
- **Behaviour**: selected AI and light/dark theme persisted in `localStorage` (`snairk-ai`, `snairk-theme`; theme defaults to the system preference); a click counter (`snairk-clicks`) over the whole page where every 69th click shows an "Achievement Unlocked: Thoroughly Snarked" overlay and plays an audio file from `media.stuxie.dev`; the page accent colour follows the selected AI (Grok uses `#111` in light mode); a generated SVG favicon (lightning bolt in the accent colour); social meta tags set from JavaScript.
- **Styling**: palette (`#080808` page, `#060606` alternating sections, `#0c0c0c` cards, light `#f5f6f8`), fonts Bebas Neue (display), Syne (headings), Outfit (body), IBM Plex Mono (labels), layout, breakpoints (one, at 768px), and the full light-theme override block. Recovered as `src/styles/app.css`.
- **Domain**: `snairk.stux.dev` (footer link and `labs.stux.dev` / `stux.dev` links). Twitter creator `@StuxDev`. Copyright line "© 2026 SNAIRK. All snark reserved." gives 2026 as the start year.

## Not recoverable / judgement calls

- Original file names, component boundaries, comments and the Vite config. The component split in `src/` is new.
- The `.htaccess` was kept in spirit (indexes off, compression, caching) but the 404 now points at `/404.html`.
- Original title/description for pages other than the home page (there were no other pages).

## Differences in the rebuild (deliberate)

Self-hosted fonts instead of Google Fonts; "A Stux.Dev Labs Project" became "A StuxieDev Project"; the "Real AI-powered responses" line now says the snark is hand-written; accessibility fixes (real buttons, labelled chat form, ARIA on the FAQ, dialog semantics on the overlay, reduced motion); contrast raised for very dark grey text; FAQ answers no longer clipped at 180px; pricing buttons link to the demo. See `CHANGELOG.md`.
