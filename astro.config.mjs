// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Your final URL. Used for the sitemap / canonical links.
  site: 'https://matdolab.com',

  vite: {
    plugins: [tailwindcss()],
  },
});
