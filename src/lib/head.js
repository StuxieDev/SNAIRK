import { SITE_URL, SITE_NAME, OG_IMAGE, TWITTER_HANDLE } from '../config.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// The <title> and social tags for one route, as an HTML string (used by the pre-renderer).
export function headHtml(route) {
  const url = SITE_URL + (route.path === '/404.html' ? '/' : route.path);
  const image = SITE_URL + OG_IMAGE;
  const robots = route.hidden ? '<meta name="robots" content="noindex"/>\n    ' : '';
  const refresh = route.redirect ? `<meta http-equiv="refresh" content="0; url=${route.redirect}"/>\n    ` : '';
  const canonical = route.redirect ? SITE_URL + route.redirect : url;
  return `<title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}"/>
    ${robots}${refresh}<link rel="canonical" href="${canonical}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="${SITE_NAME}"/>
    <meta property="og:title" content="${esc(route.title)}"/>
    <meta property="og:description" content="${esc(route.description)}"/>
    <meta property="og:url" content="${url}"/>
    <meta property="og:image" content="${image}"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:type" content="image/png"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${esc(route.title)}"/>
    <meta name="twitter:description" content="${esc(route.description)}"/>
    <meta name="twitter:image" content="${image}"/>
    <meta name="twitter:creator" content="${TWITTER_HANDLE}"/>`;
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Keeps the head in step with the route after client-side navigation.
export function applyHead(route) {
  document.title = route.title;
  const url = SITE_URL + route.path;
  setMeta('meta[name="description"]', 'content', route.description);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:title"]', 'content', route.title);
  setMeta('meta[property="og:description"]', 'content', route.description);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[name="twitter:title"]', 'content', route.title);
  setMeta('meta[name="twitter:description"]', 'content', route.description);
}
