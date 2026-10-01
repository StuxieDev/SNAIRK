import { useCallback, useEffect, useState } from 'react';
import { AppProvider, readStorage, useApp, writeStorage } from './AppContext.jsx';
import EasterEgg from './components/EasterEgg.jsx';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';
import SiteBanner from './components/SiteBanner.jsx';
import { applyHead } from './lib/head.js';
import { Router, useRouter } from './router.jsx';
import { findRoute, notFoundRoute } from './routes.js';
import Changelogs from './pages/Changelogs.jsx';
import Home from './pages/Home.jsx';
import * as Legal from './pages/Legal.jsx';
import { NotFound, Redirect, Sitemap } from './pages/Misc.jsx';

const EGG_AUDIO = 'https://media.stuxie.dev/audio/fuck-you.mp3';

const pages = {
  home: Home,
  legal: Legal.LegalHub,
  privacy: Legal.Privacy,
  terms: Legal.Terms,
  cookies: Legal.Cookies,
  imprint: Legal.Imprint,
  disclaimer: Legal.Disclaimer,
  'opt-out': Legal.OptOut,
  changelogs: Changelogs,
  sitemap: Sitemap,
};

function Shell() {
  const { accent, accentInk, ai } = useApp();
  const { path } = useRouter();
  const route = findRoute(path) || notFoundRoute;
  const [egg, setEgg] = useState(false);

  useEffect(() => {
    if (route !== notFoundRoute) applyHead(route);
    else document.title = notFoundRoute.title;
  }, [route]);

  // The favicon is the lightning bolt in the selected AI's colour, as in the original.
  useEffect(() => {
    const link = document.getElementById('favicon');
    if (!link) return;
    const bg = document.documentElement.getAttribute('data-theme') === 'light' ? '%23f5f6f8' : '%23080808';
    link.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='${bg}'/><path d='M62 8L34 52h22L38 92 72 44H50Z' fill='${encodeURIComponent(accent)}'/></svg>`;
  }, [accent]);

  // Easter egg: every 69th click anywhere on the page.
  useEffect(() => {
    let clicks = parseInt(readStorage('snairk-clicks') || '0', 10) || 0;
    const onClick = (e) => {
      if (e.target.closest?.('.egg')) return;
      clicks += 1;
      writeStorage('snairk-clicks', String(clicks));
      if (clicks % 69 === 0) {
        setEgg(true);
        new Audio(EGG_AUDIO).play().catch(() => {});
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const closeEgg = useCallback(() => setEgg(false), []);
  const Page = route.page === 'redirect' ? null : pages[route.page] || NotFound;

  return (
    <div className="sn" style={{ '--a': accent, '--on-a': accentInk }} data-ai={ai.id}>
      <SiteBanner />
      <a className="skip" href="#main">
        Skip to content
      </a>
      {egg && <EasterEgg onClose={closeEgg} />}
      <Nav />
      <main id="main">{Page ? <Page /> : <Redirect to={route.redirect} />}</main>
      <Footer />
    </div>
  );
}

export default function App({ initialPath }) {
  return (
    <Router initialPath={initialPath}>
      <AppProvider>
        <Shell />
      </AppProvider>
    </Router>
  );
}

