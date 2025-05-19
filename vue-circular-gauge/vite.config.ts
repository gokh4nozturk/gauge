import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      beforeWriteFile: (filePath, content) => {
        return {
          filePath,
          content,
        }
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueCircularGauge',
      fileName: (format) => `vue-circular-gauge.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    sourcemap: true,
    // Reduce bloat from dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Ensure that terser doesn't discard license comments
    minify: 'terser',
    terserOptions: {
      format: {
        comments: 'some',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
