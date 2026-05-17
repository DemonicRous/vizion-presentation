<template>
    <div class="demo-container">
      <h2 class="slide-subtitle">Интерфейс модуля задач</h2>
      <div class="device-switcher">
        <button @click="setDevice('desktop')" :class="{ active: device === 'desktop' }">🖥️ Десктоп</button>
        <button @click="setDevice('laptop')" :class="{ active: device === 'laptop' }">💻 Ноутбук</button>
        <button @click="setDevice('mobile')" :class="{ active: device === 'mobile' }">📱 Телефон</button>
      </div>
      <div class="iframe-wrapper" :class="device" :style="{ height: iframeHeight }">
        <!-- Preloader: 3 анимированные точки -->
        <div v-if="loading" class="preloader">
          <div class="dot-spinner">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
        <iframe
          ref="iframeRef"
          :key="iframeKey"
          :src="iframeSrc"
          class="tasks-iframe"
          title="Интерфейс задач GofraLub"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          @load="onIframeLoad"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { isDark } from '@/utils/theme'
  
  const device = ref('desktop')
  const iframeKey = ref(0)
  const loading = ref(true)
  const iframeRef = ref(null)
  
  const setDevice = (d) => { device.value = d }
  
  const iframeHeight = computed(() => {
    switch (device.value) {
      case 'desktop': return '75vh'
      case 'laptop': return '70vh'
      default: return '85vh'
    }
  })
  
  // Добавляем случайный параметр, чтобы избежать кэширования при смене темы
  const iframeSrc = computed(() => `/tasks-standalone.html?theme=${isDark.value ? 'dark' : 'light'}&_=${Date.now()}`)
  
  const onIframeLoad = () => {
    // Добавляем небольшую задержку, чтобы прелоадер покрутился хотя бы 0.5 сек (для красоты)
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  
  // При смене темы сбрасываем loading и перезагружаем iframe
  watch(isDark, () => {
    loading.value = true
    iframeKey.value += 1
  })
  </script>
  
  <style scoped>
  .demo-container { text-align: center; }
  .slide-subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #0f172a;
  }
  .dark .slide-subtitle { color: #f8fafc; }
  .device-switcher {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .device-switcher button {
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s;
  }
  .dark .device-switcher button {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }
  .device-switcher button.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
  .iframe-wrapper {
    position: relative;
    margin: 0 auto;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    background: white;
    /* двойная рамка: внешняя и внутренняя */
    border: 2px solid rgba(0, 0, 0, 0.2);
    outline: 2px solid rgba(0, 0, 0, 0.05);
    outline-offset: 0;
  }
  .dark .iframe-wrapper {
    border: 2px solid rgba(255, 255, 255, 0.25);
    outline: 2px solid rgba(255, 255, 255, 0.08);
    background: #0f172a;
  }
  .iframe-wrapper.desktop { width: 100%; max-width: 1300px; }
  .iframe-wrapper.laptop { width: 100%; max-width: 1024px; }
  .iframe-wrapper.mobile { width: 100%; max-width: 480px; }
  .tasks-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    transition: opacity 0.2s;
  }
  .preloader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(4px);
    z-index: 2;
    border-radius: 1rem;
  }
  .dark .preloader {
    background: rgba(15, 23, 42, 0.92);
  }
  /* Три анимированные точки */
  .dot-spinner {
    display: flex;
    gap: 12px;
    margin-bottom: 1rem;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out both;
  }
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
  .dark .dot {
    background: #60a5fa;
  }
  .preloader p {
    color: #1e293b;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  .dark .preloader p {
    color: #cbd5e1;
  }
  </style>