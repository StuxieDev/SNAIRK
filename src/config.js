// Site-wide constants. Change the domain here (and public/CNAME) if the site moves.
export const SITE_URL = 'https://snairk.stuxie.dev';
export const SITE_NAME = 'SNAIRK';
export const TWITTER_HANDLE = '@StuxDev';
export const OG_IMAGE = '/og.png';

// First year of the copyright range. v1.0.7 of the bundle said "© 2026 SNAIRK".
export const START_YEAR = 2026;

// Set by dev-server.sh / dev-server.bat (VITE_DEV_MODE=1). Never true in a production build
// unless you build with the variable set on purpose.
export const DEV_MODE = import.meta.env.VITE_DEV_MODE === '1';

// Injected from VERSION.md by vite.config.js.
export const VERSION = __APP_VERSION__;

export const CONTACT_EMAIL = 'legal@stuxie.dev';
