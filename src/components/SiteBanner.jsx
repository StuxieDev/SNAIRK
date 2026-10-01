import { useEffect, useRef, useState } from 'react';
import { DEV_MODE, SITE_NAME } from '../config.js';

// The shared StuxieDev site banner (see styles/banner.css). Only ever shown in dev mode here:
// the dev banner by default, and ?banner=soon,maintenance,site previews the others.
// It sits in the page flow (sticky), so it never covers anything, and keeps --banner-h in
// step with its real height so the sticky nav can sit just below it.
const ORDER = ['maintenance', 'soon', 'dev', 'site'];

const COPY = {
  maintenance: ['Maintenance', 'status', `${SITE_NAME} is being updated and will be back shortly.`],
  soon: ['Coming soon', 'status', `${SITE_NAME} is launching soon.`],
  dev: [
    'Dev mode',
    'note',
    <>
      Local preview of {SITE_NAME}. Run <code>dev-server.sh --no-dev-mode</code> to see it as production does.
    </>,
  ],
  site: ['Notice', 'note', <>A site notice for {SITE_NAME} appears here.</>],
};

export default function SiteBanner() {
  const [show, setShow] = useState([]);
  const box = useRef(null);

  useEffect(() => {
    if (!DEV_MODE) return;
    const wanted = ['dev'];
    const m = /[?&]banner=([^&]*)/.exec(window.location.search);
    if (m) {
      decodeURIComponent(m[1])
        .split(',')
        .map((v) => v.trim())
        .forEach((v) => ORDER.includes(v) && !wanted.includes(v) && wanted.push(v));
    }
    setShow(ORDER.filter((v) => wanted.includes(v)));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const el = box.current;
    if (!show.length || !el) return;
    root.classList.add('has-site-banner');
    const sync = () => root.style.setProperty('--banner-h', Math.ceil(el.getBoundingClientRect().height) + 'px');
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.classList.remove('has-site-banner');
      root.style.removeProperty('--banner-h');
    };
  }, [show]);

  if (!DEV_MODE || !show.length) return null;
  return (
    <div className="site-banners" data-site-banners ref={box}>
      {show.map((v) => (
        <div key={v} className={`site-banner site-banner--${v}`} role={COPY[v][1]}>
          <span className="site-banner-label">{COPY[v][0]}</span>
          <span className="site-banner-text">{COPY[v][2]}</span>
        </div>
      ))}
    </div>
  );
}
