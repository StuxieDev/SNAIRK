// Post-build step: renders every route to its own static HTML file (dist/<route>/index.html),
// so each URL answers 200 on GitHub Pages with real content, then hydrates in the browser.
// Also writes dist/404.html, dist/sitemap.xml and dist/robots.txt.
//
// Run by `npm run build` after the client build (dist/) and the SSR build (.ssr/).
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, '.ssr');

const bundle = (await readdir(ssrDir)).find((f) => /^entry-server.m?js$/.test(f));
if (!bundle) throw new Error('SSR bundle not found in .ssr/ (run the SSR build first)');
const { render, routes, notFoundRoute, headHtml, SITE_URL } = await import(pathToFileURL(join(ssrDir, bundle)).href);

const template = await readFile(join(dist, 'index.html'), 'utf8');

function page(route, path) {
  let html = template.replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, headHtml(route));
  html = html.replace('<!--app-html-->', render(path));
  return html;
}

for (const route of routes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(route, route.path));
}

// 404.html: GitHub Pages serves it for any unknown URL. The client router sees the real URL and
// keeps rendering "not found", so the pre-rendered markup and the hydrated page agree.
await writeFile(join(dist, '404.html'), page(notFoundRoute, '/404.html'));

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .filter((r) => !r.hidden)
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} routes + 404.html, sitemap.xml, robots.txt`);
