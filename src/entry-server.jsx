import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { routes, notFoundRoute, findRoute } from './routes.js';
export { headHtml } from './lib/head.js';
export { SITE_URL } from './config.js';

export function render(path) {
  return renderToString(<App initialPath={path} />);
}
