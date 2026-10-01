import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/syne/400.css';
import '@fontsource/syne/600.css';
import '@fontsource/syne/700.css';
import '@fontsource/syne/800.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import './styles/app.css';
import './styles/banner.css';
import './styles/extras.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// Built pages arrive pre-rendered and are hydrated; the dev server starts from an empty root.
if (root.children.length) hydrateRoot(root, app);
else createRoot(root).render(app);
