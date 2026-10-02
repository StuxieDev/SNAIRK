import { useEffect } from 'react';
import DocPage from '../components/DocPage.jsx';
import { Link, useRouter } from '../router.jsx';
import { routes } from '../routes.js';

export function Sitemap() {
  const pages = routes.filter((r) => !r.hidden);
  return (
    <DocPage title="Sitemap" lead="Every page on SNAIRK. There aren't many." crumbs={[['/', 'Home']]} current="Sitemap">
      <ul className="sitemap-list">
        {pages.map((p) => (
          <li key={p.path}>
            <Link href={p.path}>{p.label}</Link>
            <small>{p.blurb}</small>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 24 }}>
        Looking for the machine-readable version? It&apos;s at <a href="/sitemap.xml">/sitemap.xml</a>.
      </p>
    </DocPage>
  );
}

export function NotFound() {
  return (
    <DocPage title="Page not found" lead="That page doesn't exist. Neither does a useful answer, but at least this one is honest." crumbs={[['/', 'Home']]} current="404">
      <p>
        <Link href="/">Back to the snairk</Link> · <Link href="/sitemap/">Sitemap</Link>
      </p>
    </DocPage>
  );
}

// /changelog/ is a stub that sends visitors to /changelogs/ (the built page also has a meta refresh).
export function Redirect({ to }) {
  const { navigate } = useRouter();
  useEffect(() => navigate(to, { replace: true }), [navigate, to]);
  return (
    <DocPage title="Redirecting…" crumbs={[['/', 'Home']]} current="Redirecting">
      <p>
        Taking you to <Link href={to}>{to}</Link>.
      </p>
    </DocPage>
  );
}
