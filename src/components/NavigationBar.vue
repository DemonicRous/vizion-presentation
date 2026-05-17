<template>
    <div class="navigation-container">
      <div class="glass-panel">
        <button
          v-if="showArrows"
          @click="goPrev"
          class="nav-arrow"
          :disabled="isFirst"
          aria-label="Предыдущий"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
  
        <div class="indicators">
          <button
            v-for="(slide, idx) in slides"
            :key="slide.path"
            class="indicator"
            :class="{ active: currentIndex === idx, completed: idx < currentIndex }"
            @click="goToSlide(idx)"
          >
            <span class="indicator-dot"></span>
            <span class="indicator-label">{{ slide.title }}</span>
          </button>
        </div>
  
        <button
          v-if="showArrows"
          @click="goNext"
          class="nav-arrow"
          :disabled="isLast"
          aria-label="Следующий"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const slides = [
    { path: 'intro', title: 'Введение' },
    { path: 'problems', title: 'Актуальность' },
    { path: 'goals', title: 'Цели' },
    { path: 'architecture', title: 'Архитектура' },
    { path: 'tasks', title: 'Задачи' },
    { path: 'audits', title: 'Аудиты' },
    { path: 'kpi', title: 'KPI' },
    { path: 'efficiency', title: 'Эффективность' },
    { path: 'conclusion', title: 'Заключение' }
  ]
  
  const router = useRouter()
  const route = useRoute()
  
  const currentIndex = computed(() => {
    const current = route.params.slide || 'intro'
    return slides.findIndex(s => s.path === current)
  })
  
  const isFirst = computed(() => currentIndex.value === 0)
  const isLast = computed(() => currentIndex.value === slides.length - 1)
  
  const showArrows = ref(window.innerWidth < 640)
  
  const updateArrows = () => {
    showArrows.value = window.innerWidth < 640
  }
  
  const goToSlide = (index) => {
    if (index === currentIndex.value) return
    router.push({ name: 'slide', params: { slide: slides[index].path }, query: { sub: 0 } })
  }
  
  const goPrev = () => {
    if (!isFirst.value) goToSlide(currentIndex.value - 1)
  }
  
  const goNext = () => {
    if (!isLast.value) goToSlide(currentIndex.value + 1)
  }
  
  const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    }
  }
  
  onMounted(() => {
    window.addEventListener('resize', updateArrows)
    window.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateArrows)
    window.removeEventListener('keydown', handleKeydown)
  })
  </script>
  
  <style scoped>
  .navigation-container {
    position: fixed;
    bottom: 24px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 40;
    pointer-events: none;
  }
  
  .glass-panel {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(12px);
    border-radius: 60px;
    padding: 8px 16px;
    display: flex;
    gap: 12px;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    pointer-events: auto;
  }
  
  .dark .glass-panel {
    background: rgba(15, 23, 42, 0.8);
  }
  
  .indicators {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .indicator {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 4px;
  }
  
  .indicator-dot {
    display: block;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  .indicator.active .indicator-dot {
    width: 24px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
  }
  
  .indicator.completed .indicator-dot {
    background: #60a5fa;
  }
  
  .indicator-label {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    color: white;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
    pointer-events: none;
  }
  
  .indicator:hover .indicator-label {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }
  
  .nav-arrow {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.2s;
  }
  
  .nav-arrow:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  
  .nav-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 640px) {
    .indicators {
      gap: 8px;
    }
    .indicator-dot {
      width: 6px;
      height: 6px;
    }
    .indicator.active .indicator-dot {
      width: 18px;
    }
    .indicator-label {
      display: none;
    }
    .nav-arrow {
      width: 28px;
      height: 28px;
    }
  }
  </style>