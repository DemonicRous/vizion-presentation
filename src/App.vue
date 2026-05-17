<template>
  <div class="app">
    <ThreeBackground />
    <router-view />
    <NavigationBar />
    <NavigationArrows />
    <!-- Кнопка переключения темы – теперь в левом верхнем углу, чтобы не мешать стрелкам -->
    <div class="theme-toggle-wrapper">
      <button @click="toggleTheme" class="theme-toggle-btn" :class="{ 'dark-theme': isDark }">
        <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import ThreeBackground from '@/components/ThreeBackground.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import NavigationArrows from '@/components/NavigationArrows.vue'
import { isDark, toggleTheme } from '@/utils/theme'
</script>

<style scoped>
.theme-toggle-wrapper {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
}
.theme-toggle-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.theme-toggle-btn:hover {
  transform: scale(1.05);
  background: white;
}
.theme-toggle-btn.dark-theme {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  color: #f1f5f9;
}
.theme-toggle-btn.dark-theme:hover {
  background: #1e293b;
}
</style>