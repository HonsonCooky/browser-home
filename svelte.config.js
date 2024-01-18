import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs'
    }),
    paths: {
      base: '/browser-home'
    },
    target: '#svelte'
  }
};

export default config;
