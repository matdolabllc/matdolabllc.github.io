// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Your final URL. Used for the sitemap / canonical links.
  site: 'https://matdolab.com',
  redirects: {
    '/privacy': '/privacy/check',
    '/terms': '/terms/check',
    '/grade/privacy': '/privacy/grade',
    '/grade/terms': '/terms/grade',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
