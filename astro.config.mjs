// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Your final URL. Used for the sitemap / canonical links.
  // This is your GitHub Pages user-site URL. Change it if you add a custom domain.
  site: 'https://matdolabllc.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});
