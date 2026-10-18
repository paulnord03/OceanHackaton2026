import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    watch: {
      ignored: ['**/tortue-game/**'], // Ignore le sous-dossier en conflit
    },
  },
  optimizeDeps: {
    entries: ['index.html'], // Forcer le scan uniquement sur l'index principal
  },
});