import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The version shown in the footer comes from VERSION.md, so a release only has to bump that file.
const version = readFileSync(new URL('./VERSION.md', import.meta.url), 'utf8').trim().replace(/^v/i, '');

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
});
