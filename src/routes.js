// Every page on the site. Used by the router, the pre-renderer, sitemap.xml and the /sitemap/ page.
export const routes = [
  {
    path: '/',
    page: 'home',
    title: 'SNAIRK — Seven AIs. Zero Answers. Infinite Judgment.',
    description:
      'Seven AI parodies. Zero useful answers. Pick ChatGPT, Claude, Gemini, Grok, Copilot, Perplexity, or Meta AI and get snairked.',
    label: 'Home',
    blurb: 'Pick an AI and get snairked.',
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    path: '/legal/',
    page: 'legal',
    title: 'Boring Legal Stuff — SNAIRK',
    description: 'Privacy, terms, cookies, imprint, disclaimer and opt-out information for the SNAIRK parody site.',
    label: 'Boring Legal Stuff',
    blurb: 'The stuff nobody reads but everybody needs.',
    changefreq: 'yearly',
    priority: '0.5',
  },
  {
    path: '/legal/privacy/',
    page: 'privacy',
    title: 'Privacy Policy — SNAIRK',
    description: 'SNAIRK is a static parody site. It collects no personal data.',
    label: 'Privacy Policy',
    blurb: 'What we collect (nothing) and why.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/legal/terms/',
    page: 'terms',
    title: 'Terms and Ethics — SNAIRK',
    description: 'The rules for using SNAIRK, a satirical parody that is not affiliated with any AI company.',
    label: 'Terms and Ethics',
    blurb: 'The rules for using the site, and for being a good sport.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/legal/cookies/',
    page: 'cookies',
    title: 'Cookies Policy — SNAIRK',
    description: 'SNAIRK sets no cookies. It remembers three preferences in your browser and nothing else.',
    label: 'Cookies Policy',
    blurb: 'No cookies. A few local preferences.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/legal/imprint/',
    page: 'imprint',
    title: 'Imprint — SNAIRK',
    description: 'Who operates SNAIRK and how to reach them.',
    label: 'Imprint',
    blurb: 'Who operates this site and how to reach them.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/legal/disclaimer/',
    page: 'disclaimer',
    title: 'Disclaimer — SNAIRK',
    description: 'SNAIRK is satire. It is not affiliated with OpenAI, Google, Anthropic, xAI, Microsoft, Perplexity or Meta.',
    label: 'Disclaimer',
    blurb: 'It is satire. We are not them. Please do not sue.',
    changefreq: 'yearly',
    priority: '0.5',
  },
  {
    path: '/legal/opt-out/',
    page: 'opt-out',
    title: 'Opt-Out Preferences — SNAIRK',
    description: 'There is nothing to sell, so there is nothing to opt out of. How to clear what SNAIRK remembers locally.',
    label: 'Opt-Out Preferences',
    blurb: 'Nothing to sell, nothing to opt out of.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/changelogs/',
    page: 'changelogs',
    title: 'Changelogs — SNAIRK',
    description: 'What changed in each release of SNAIRK.',
    label: 'Changelogs',
    blurb: 'What changed, release by release.',
    changefreq: 'monthly',
    priority: '0.4',
  },
  {
    path: '/sitemap/',
    page: 'sitemap',
    title: 'Sitemap — SNAIRK',
    description: 'Every page on SNAIRK.',
    label: 'Sitemap',
    blurb: 'Every page on the site.',
    changefreq: 'monthly',
    priority: '0.3',
  },
  // Not in the sitemap: /changelog/ only exists to send people to /changelogs/.
  {
    path: '/changelog/',
    page: 'redirect',
    redirect: '/changelogs/',
    title: 'Changelogs — SNAIRK',
    description: 'Redirecting to the changelogs.',
    hidden: true,
  },
];

export const legalPages = routes.filter((r) => r.path.startsWith('/legal/') && r.path !== '/legal/');

export function normalizePath(p) {
  let path = (p || '/').split(/[?#]/)[0].replace(/\/index\.html$/, '/');
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.endsWith('/')) path += '/';
  return path;
}

export function findRoute(p) {
  const path = normalizePath(p);
  return routes.find((r) => r.path === path) || null;
}

export const notFoundRoute = {
  path: '/404.html',
  page: 'notfound',
  title: 'Page not found — SNAIRK',
  description: 'That page does not exist. Neither does a useful answer.',
  hidden: true,
};
