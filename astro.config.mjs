// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Your final URL. Used for the sitemap / canonical links.
  site: 'https://matdolab.com',
  redirects: {
    '/support': '/support/check',
    '/grade/support': '/support/grade',
    '/privacy': '/privacy/check',
    '/terms': '/terms/check',
    '/grade/privacy': '/privacy/grade',
    '/grade/terms': '/terms/grade',
  },

  // /grade/try is invite-only (and noindex), so it stays out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/grade/try') })],

  vite: {
    plugins: [tailwindcss()],
  },
});
