/**
 * vite.config.js
 *
 * Vite build configuration for the Low Vision Kreis frontend.
 *
 * Key decisions:
 * - @vitejs/plugin-vue enables Vue 3 SFC compilation
 * - '@' alias maps to ./src so all imports are stable regardless of file depth
 * - base: '/' works for root deployments; change to '/subfolder/' for subdirectory deployments
 * - No SSR, no custom middleware — this is a pure static SPA
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  server: {
    // Bind to 0.0.0.0 so the dev server listens on all network interfaces,
    // not just localhost. This makes it reachable from other devices on the
    // same Wi-Fi or LAN — useful for testing on phones and tablets.
    // Vite will print both the localhost URL and your machine's local IP
    // (e.g. http://192.168.1.42:5173) when you run `npm run dev`.
    host: true
  },

  resolve: {
    
    alias: {
      // '@' resolves to the src directory for clean, depth-independent imports
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Root-relative base path. Change to '/low-vision-kreis/' if deploying to a subdirectory.
  base: '/',

  build: {
    // Output to dist/ (Vite default). Point your static host at this folder.
    outDir: 'dist',
    // Warn when individual chunks exceed 1 MB (the gazetteer JSON is the main risk)
    chunkSizeWarningLimit: 1200
  }
})
