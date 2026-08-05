import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueFluentWidgets',
      fileName: 'vue-fluent-widgets'
    },
    rollupOptions: {
      external: ['vue', '@iconify/vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          '@iconify/vue': 'IconifyVue'
        }
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})