import { useSyncExternalStore } from 'react';
import { START_YEAR, VERSION } from '../config.js';
import { Link } from '../router.jsx';

const BUILD_YEAR = new Date().getFullYear();
const noop = () => () => {};

// "2026" in the first year, "2026–2027" afterwards. Computed in the browser so a page built
// last year still shows the right range; the server snapshot is the year of the build.
function Years() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{START_YEAR < year ? `${START_YEAR}–${year}` : year}</>;
}

const anchors = [
  ['pick', 'Pick Your AI'],
  ['demo', 'Demo'],
  ['features', 'Features'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div>
          {/* The header's logo (icon + wordmark in the selected AI's colour), greyed out until hovered */}
          <Link href="/" className="foot-logo">
            <svg width="30" height="30" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <rect width="100" height="100" rx="18" fill="var(--ink)" opacity="0.15" />
              <path d="M62 8L34 52h22L38 92 72 44H50Z" fill="var(--ink)" />
            </svg>
            SNAIRK
          </Link>
          <div className="foot-tag">Seven AIs. Zero useful answers. Infinite snairk.</div>
        </div>
        <nav className="foot-links" aria-label="Footer">
          {anchors.map(([id, label]) => (
            <a key={id} href={`/#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="foot-stux">
        <a className="brand-mark-link" href="https://stuxie.dev" target="_blank" rel="noopener noreferrer" aria-label="StuxieDev">
          <img className="brand-mark" src="https://global.media.stuxie.dev/logo.png" alt="StuxieDev" title="StuxieDev" height="28" />
        </a>
        <a className="foot-project" href="https://projects.stuxie.dev" target="_blank" rel="noopener noreferrer">
          A StuxieDev Project
        </a>
        <div className="made-with">
          Created with
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" focusable="false" className="made-with-love">
            <path fill="currentColor" d="M8 14.3 1.9 8.4A3.9 3.9 0 0 1 8 3.6a3.9 3.9 0 0 1 6.1 4.8z" />
          </svg>
          /
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" className="made-with-code">
            <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M5.2 4.2 1.4 8l3.8 3.8M10.8 4.2 14.6 8l-3.8 3.8M9.3 2.6 6.7 13.4" />
          </svg>
          /
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" className="made-with-coffee">
            <path fill="currentColor" d="M2 5.5h9.5v4.7A3.3 3.3 0 0 1 8.2 13.5H5.3A3.3 3.3 0 0 1 2 10.2zM11.5 6.4h1a2.2 2.2 0 0 1 0 4.4h-1.2l.2-1.5h1a.7.7 0 0 0 0-1.4h-1zM4.6 1.5c.9.8-.5 1.6.4 2.6h-1c-.9-1 .5-1.8-.4-2.6zM7.3 1.5c.9.8-.5 1.6.4 2.6h-1c-.9-1 .5-1.8-.4-2.6z" />
          </svg>
          <span className="sr-only"> love, code and coffee</span> by{' '}
          <a href="https://stuxie.dev" target="_blank" rel="noopener noreferrer">
            StuxieDev
          </a>
        </div>
      </div>

      <div className="foot-bot">
        <div className="foot-copy">
          © <Years /> StuxieDev. All snairk reserved.
        </div>
        <nav className="foot-links" aria-label="Site information">
          <Link href="/legal/">Boring Legal Stuff</Link>
          <Link href="/sitemap/">Sitemap</Link>
          <Link href="/changelogs/" className="foot-version" title={`Version ${VERSION}: changelogs`}>
            v{VERSION}
          </Link>
        </nav>
        <div className="foot-disc">
          Not affiliated with OpenAI, Google, Anthropic, xAI, Microsoft, Perplexity, or Meta. This is parody. Please don&apos;t sue us.
        </div>
      </div>
    </footer>
  );
}
