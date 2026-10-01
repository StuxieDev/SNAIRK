// Renders the favicon / touch-icon PNGs from public/brand/icon.svg.
// Not part of the build: the PNGs are committed. Re-run only if the icon changes.
//
//   PUPPETEER_DIR=/path/to/node_modules BROWSER=/path/to/chrome-or-edge node scripts/make-icons.mjs
//
// (puppeteer is deliberately not a project dependency.)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const dir = process.env.PUPPETEER_DIR;
const executablePath = process.env.BROWSER;
if (!dir || !executablePath) throw new Error('Set PUPPETEER_DIR and BROWSER (see the comment at the top).');
const puppeteer = createRequire(join(dir, 'x.js'))('puppeteer-core');

const svg = readFileSync(new URL('../public/brand/icon.svg', import.meta.url), 'utf8');
const targets = [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
for (const [name, size] of targets) {
  await page.setViewport({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace(/width="200" height="200"/, `width="${size}" height="${size}"`)}</body></html>`,
  );
  const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  writeFileSync(new URL(`../public/${name}`, import.meta.url), png);
  console.log('wrote', name);
}
await browser.close();
