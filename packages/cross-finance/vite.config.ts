import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  plugins: [
    react(),
    federation({
      name: 'cross_finance_host',
      remotes: {
        'fx-compass': mode === 'production' 
          ? '/fx-compass-mfe/assets/remoteEntry.js'
          : 'http://localhost:8081/assets/remoteEntry.js',
        'bybit-explorer': mode === 'production'
          ? '/bybit-explorer-mfe/assets/remoteEntry.js'
          : 'http://localhost:8082/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
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
