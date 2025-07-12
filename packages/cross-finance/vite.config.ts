import { defineConfig } from "vite";
import path from "path";
import { componentTagger } from "lovable-tagger";
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    federation({
      name: 'cross_finance_host', 
      remotes: {
        fx_compass: '/fx-compass-mfe/assets/remoteEntry.js',
        bybit_explorer: '/bybit-explorer-mfe/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'], // Share common dependencies
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
}));
