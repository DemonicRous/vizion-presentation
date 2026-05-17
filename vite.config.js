// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

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
    open: true,
    host: true,
    fs: {
      strict: false,
      allow: ['public']
    }
  },

  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // ✅ Теперь это функция
        manualChunks(id) {
          // Выделяем Three.js в отдельный чанк
          if (id.includes('node_modules/three')) {
            return 'three'
          }
          // Vue + vue-router
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) {
            return 'vue'
          }
          // Chart.js
          if (id.includes('node_modules/chart.js')) {
            return 'charts'
          }
          // Остальные зависимости из node_modules — в общий vendor
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          // Код самого приложения разбивается автоматически
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', 'three', 'chart.js', '@vueuse/core'],
  },

  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },

  css: {
    devSourcemap: true,
  },
})