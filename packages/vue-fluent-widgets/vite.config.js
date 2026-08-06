import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-package-types',
      writeBundle(outputOptions) {
        const outputDirectory = outputOptions.dir || resolve(__dirname, 'dist')
        mkdirSync(outputDirectory, { recursive: true })
        copyFileSync(resolve(__dirname, 'src/index.d.ts'), resolve(outputDirectory, 'index.d.ts'))
      }
    }
  ],
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
          '@iconify/vue': 'IconifyVue',
          'vue-router': 'VueRouter'
        },
        exports: 'named'
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
