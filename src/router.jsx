import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { normalizePath } from './routes.js';

// A very small client-side router: every route is also pre-rendered to its own HTML file,
// so this only has to handle in-app navigation without a page reload.
const RouterContext = createContext({ path: '/', navigate: () => {} });

export function Router({ initialPath, children }) {
  const [path, setPath] = useState(normalizePath(initialPath));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const url = new URL(to, window.location.origin);
    window.history[replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search + url.hash);
    setPath(normalizePath(url.pathname));
    if (!url.hash) window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

export function Link({ href, children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    // Only plain internal paths are handled here; anchors with a hash use the browser.
    if (!href.startsWith('/') || href.includes('#')) return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
