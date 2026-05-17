<template>
    <div class="nav-arrows">
      <!-- Вверх (активна, если есть под-слайд сверху) -->
      <button
        class="arrow up"
        :class="{ active: canGoUp, visible: hasSub }"
        @click="goUp"
        :disabled="!canGoUp"
        aria-label="Вверх"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7-7 7 7"/>
        </svg>
      </button>
  
      <!-- Левая -->
      <button
        class="arrow left"
        :class="{ active: canGoLeft }"
        @click="goLeft"
        :disabled="!canGoLeft"
        aria-label="Влево"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>
  
      <!-- Правая -->
      <button
        class="arrow right"
        :class="{ active: canGoRight }"
        @click="goRight"
        :disabled="!canGoRight"
        aria-label="Вправо"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
  
      <!-- Вниз (активна, если есть под-слайд снизу) -->
      <button
        class="arrow down"
        :class="{ active: canGoDown, visible: hasSub }"
        @click="goDown"
        :disabled="!canGoDown"
        aria-label="Вниз"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19V5M5 12l7 7 7-7"/>
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { slideNames } from '@/router'
  
  const router = useRouter()
  const route = useRoute()
  
  // Текущий индекс основного слайда
  const currentIndex = computed(() => {
    const currentPath = route.params.slide || 'intro'
    return slideNames.indexOf(currentPath)
  })
  
  // Наличие под-слайдов (заглушка – реальная логика через query.sub, пока всегда false)
  // TODO: заменить на проверку route.query.sub и наличия под-слайдов у текущего слайда
  const hasSub = computed(() => {
    // Пример: для слайдов tasks и efficiency есть под-слайды
    const slidesWithSub = ['tasks', 'efficiency']
    return slidesWithSub.includes(route.params.slide)
  })
  
  // Текущий индекс под-слайда (пока 0, но будет использоваться для стрелок вверх/вниз)
  const currentSubIndex = computed(() => parseInt(route.query.sub) || 0)
  const maxSubIndex = computed(() => {
    // Заглушка – вернём количество под-слайдов для текущего раздела
    // В реальном проекте нужно получать из конфигурации или computed
    return hasSub.value ? 3 : 1
  })
  
  // Доступные направления
  const canGoLeft = computed(() => currentIndex.value > 0)
  const canGoRight = computed(() => currentIndex.value < slideNames.length - 1)
  const canGoUp = computed(() => hasSub.value && currentSubIndex.value > 0)
  const canGoDown = computed(() => hasSub.value && currentSubIndex.value < maxSubIndex.value - 1)
  
  // Методы навигации
  const goLeft = () => {
    if (canGoLeft.value) {
      router.push({ name: 'slide', params: { slide: slideNames[currentIndex.value - 1] }, query: { sub: 0 } })
    }
  }
  
  const goRight = () => {
    if (canGoRight.value) {
      router.push({ name: 'slide', params: { slide: slideNames[currentIndex.value + 1] }, query: { sub: 0 } })
    }
  }
  
  const goUp = () => {
    if (canGoUp.value) {
      router.push({ query: { sub: currentSubIndex.value - 1 } })
    }
  }
  
  const goDown = () => {
    if (canGoDown.value) {
      router.push({ query: { sub: currentSubIndex.value + 1 } })
    }
  }
  </script>
  
  <style scoped>
  .nav-arrows {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
    display: grid;
    grid-template-columns: repeat(3, 44px);
    grid-template-rows: repeat(3, 44px);
    place-items: center;
    gap: 0;
    background: transparent;
    pointer-events: auto;
  }
  
  .arrow {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #1e293b;
    opacity: 0.4;
  }
  
  .dark .arrow {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.15);
    color: #cbd5e1;
  }
  
  .arrow.active {
    opacity: 1;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .dark .arrow.active {
    background: rgba(30, 41, 59, 0.9);
    border-color: #3b82f6;
  }
  
  .arrow.active:hover {
    transform: scale(1.05);
    background: white;
    border-color: #3b82f6;
  }
  
  .dark .arrow.active:hover {
    background: #1e293b;
  }
  
  .arrow svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }
  
  /* Расположение в сетке */
  .up {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .left {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  .right {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  .down {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
  
  /* Стрелки вверх/вниз видны только если есть под-слайды */
  .arrow.up, .arrow.down {
    visibility: hidden;
  }
  .arrow.up.visible, .arrow.down.visible {
    visibility: visible;
  }
  
  /* Адаптивность для мобильных */
  @media (max-width: 640px) {
    .nav-arrows {
      bottom: 16px;
      right: 16px;
      transform: scale(0.9);
    }
  }
  </style>