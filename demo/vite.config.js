import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      {
        find: /^vue-fluent-widgets$/,
        replacement: fileURLToPath(
          new URL('../packages/vue-fluent-widgets/src/index.js', import.meta.url)
        )
      }
    ]
  },
  server: {
    port: 5174
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
