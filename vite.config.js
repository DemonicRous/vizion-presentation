import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    open: true, // автоматически открывать браузер
    host: true, // доступ по локальной сети
    fs: {
      strict: false,
      allow: ['public']
    }
  },

  build: {
    target: 'es2022', // современные браузеры
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // выделяем Three.js в отдельный чанк (экономия при загрузке)
          three: ['three'],
          // Vue + роутер в один чанк
          vue: ['vue', 'vue-router'],
          // графики
          charts: ['chart.js'],
        },
      },
    },
    chunkSizeWarningLimit: 800, // предупреждение при больших чанках
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'three', 'chart.js', '@vueuse/core'],
    exclude: [], // если что-то надо исключить
  },

  esbuild: {
    // поддержка JSX (если вдруг понадобится)
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },

  css: {
    // удобная отладка CSS в dev-режиме
    devSourcemap: true,
  },
})
