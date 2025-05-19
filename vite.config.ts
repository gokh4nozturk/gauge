import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Improve chunk size for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@vueuse/core', 'motion-v'],
        },
      },
    },
    // Enable source maps in production for better error tracking
    sourcemap: true,
    // Optimize CSS in production
    cssMinify: 'lightningcss',
    // Optimize page loading with preload directives
    modulePreload: {
      polyfill: true,
    },
  },
  // Add proper preload headers
  server: {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  },
})
