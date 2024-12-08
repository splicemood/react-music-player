import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from "node:path";

export default defineConfig({
  base: '/react-music-player',
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  optimizeDeps: {
    include: ['highlightjs'],
  },
  build: {
    outDir: './build',
  },
  // for npm package usage delete following lines from here
  resolve: {
    alias: {
      '@splicemood/react-music-player': path.resolve(__dirname, '../../src/package'),
    },
  },
  // to here
});
