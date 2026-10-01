import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ais } from './data/ais.js';
import { accentFor, inkOn } from './lib/color.js';

// App-wide state: light/dark theme and the AI whose colour the whole page wears.
// Both are remembered in localStorage (the only thing this site stores; see the cookies page).
const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the preference just won't persist */
  }
};

export function AppProvider({ children }) {
  // Server and first client render both use the defaults; saved preferences are applied after mount
  // so the pre-rendered HTML hydrates cleanly. (The theme itself is set before paint by an inline
  // script in index.html, so there is no flash.)
  const [theme, setTheme] = useState('dark');
  const [ai, setAiState] = useState(ais[0]);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    const saved = ais.find((a) => a.id === read('snairk-ai'));
    if (saved) setAiState(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      write('snairk-theme', next);
      return next;
    });
  }, []);

  const setAi = useCallback((next) => {
    setAiState(next);
    write('snairk-ai', next.id);
  }, []);

  const accent = accentFor(ai, theme);
  const value = useMemo(
    () => ({ theme, toggleTheme, ai, setAi, accent, accentInk: inkOn(accent), accentFor: (a) => accentFor(a, theme) }),
    [theme, toggleTheme, ai, setAi, accent],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { read as readStorage, write as writeStorage };
