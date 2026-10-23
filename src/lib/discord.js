// Discord component embed: a custom link preview built from Discord components, read from a
// <script id="discord:component-embed" type="application/json"> in <head>. Open Graph tags stay as the fallback.
// Spec: https://docs.discord.com/developers/link-previews/component-embeds
import { SITE_URL, SITE_NAME } from '../config.js';

export const DISCORD_EMBED_MAX_BYTES = 3000;
export const DISCORD_ACCENT = '#10a37f';

// Escapes Discord markdown so data shows as plain text: inline formatting, link brackets and
// backslashes anywhere; headings, quotes and lists only at a line start.
export function discordMd(s) {
  return String(s)
    .replace(/([\\*_~`|[\]])/g, '\\$1')
    .replace(/^([#>-])/gm, '\\$1');
}

const text = (content) => ({ type: 10, content });

function buttons(links) {
  return {
    type: 1,
    components: Object.entries(links).map(([label, url]) => ({ type: 2, style: 5, label: label.slice(0, 80), url })),
  };
}

function section(markdown) {
  return { type: 9, components: [text(markdown)], accessory: { type: 11, media: { url: SITE_URL + '/icon-512.png' } } };
}

// Encodes a payload, or returns null when it is over Discord's 3,000-byte limit.
export function discordPayload(components, accent = DISCORD_ACCENT) {
  const payload = { component: { type: 17, accent_color: parseInt(accent.replace('#', ''), 16), components } };
  const json = JSON.stringify(payload).replace(/</g, '\\u003c'); // can't close the <script> early
  return new TextEncoder().encode(json).length > DISCORD_EMBED_MAX_BYTES ? null : json;
}

function embed(components) {
  const json = discordPayload(components);
  return json === null
    ? `<!-- discord:component-embed left out: over ${DISCORD_EMBED_MAX_BYTES} bytes -->`
    : `<script id="discord:component-embed" type="application/json">${json}</script>`;
}

const siteLabel = () => `-# [${SITE_NAME}](${SITE_URL}/)\n`;
const stripSite = (title) => title.replace(/ (—|-|\|) [^—|-]*$/, '');

// The embed for one route, or '' for the 404 page and redirect stubs.
export function discordEmbedHtml(route) {
  if (route.path === '/404.html' || route.redirect) return '';
  const url = SITE_URL + route.path;
  if (route.path === '/') {
    return embed([
      section(
        `# [${SITE_NAME}](${SITE_URL}/)\n**Eight AIs. Zero useful answers. Infinite snairk.**\n` +
          'A satirical parody of snarky AI chat products. No real AI, no data collected, no cookies.\n' +
          '-# Pick an AI, ask anything, get snairked.',
      ),
      buttons({ 'Get snairked': SITE_URL + '/', Changelogs: SITE_URL + '/changelogs/', 'Boring Legal Stuff': SITE_URL + '/legal/' }),
    ]);
  }
  return embed([
    section(`${siteLabel()}## [${discordMd(stripSite(route.title))}](${url})\n${discordMd(route.description)}`),
    buttons({ [`Open ${SITE_NAME}`]: SITE_URL + '/' }),
  ]);
}
