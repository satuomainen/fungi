import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), checker({typescript: true})],
  // build: {
  //   outDir: '../build', // adjust for easy deploy
  //   emptyOutDir: true,
  // },
  // base: '/fungi',
});
