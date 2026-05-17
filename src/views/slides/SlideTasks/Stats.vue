<template>
    <div class="stats">
      <h2 class="slide-subtitle">Статистика задач</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number"><span ref="totalTasksCounter">0</span></span>
          <span class="stat-label">Всего задач</span>
        </div>
        <div class="stat-card">
          <span class="stat-number"><span ref="activeTasksCounter">0</span></span>
          <span class="stat-label">Активных</span>
        </div>
        <div class="stat-card">
          <span class="stat-number"><span ref="overdueTasksCounter">0</span></span>
          <span class="stat-label">Просрочено</span>
        </div>
        <div class="stat-card">
          <span class="stat-number"><span ref="completionRateCounter">0</span>%</span>
          <span class="stat-label">Выполнено</span>
        </div>
      </div>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
        <div v-if="chartLoading" class="chart-preloader">
          <div class="loader-dots"><span></span><span></span><span></span></div>
          <p>Загрузка графика...</p>
        </div>
      </div>
      <p class="chart-note">Распределение задач по статусам</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { Chart } from 'chart.js/auto'
  import { isDark, getChartColors, updateChartTheme } from '@/utils'
  
  const totalTasks = 75
  const activeTasks = 53
  const overdueTasks = 4
  const completionRate = 18
  
  const chartCanvas = ref(null)
  let chartInstance = null
  const chartLoading = ref(true)
  
  // Ссылки на элементы счётчиков
  const totalTasksCounter = ref(null)
  const activeTasksCounter = ref(null)
  const overdueTasksCounter = ref(null)
  const completionRateCounter = ref(null)
  
  const targetData = [12, 18, 23, 8, 14]
  const labels = ['Бэклог', 'К выполнению', 'В работе', 'На проверке', 'Выполнено']
  
  const createChart = () => {
    if (!chartCanvas.value) return
    const colors = getChartColors()
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Количество задач',
          data: [0, 0, 0, 0, 0],
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { labels: { color: colors.text } } },
        scales: {
          y: { grid: { color: colors.grid }, ticks: { color: colors.text, stepSize: 5 } },
          x: { grid: { color: colors.grid }, ticks: { color: colors.text } }
        }
      }
    })
  }
  
  const animateChart = () => {
    if (!chartInstance) return
    chartInstance.data.datasets[0].data = targetData
    chartInstance.update()
  }
  
  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  }
  
  // Анимация чисел от 0 до целевого значения
  const animateNumber = (element, target, duration = 1500) => {
    if (!element) return
    let start = 0
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = Math.floor(progress * target)
      element.innerText = value
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        element.innerText = target
      }
    }
    requestAnimationFrame(step)
  }
  
  // Запуск анимации чисел при появлении блока статистики
  let observer = null
  const startCounters = () => {
    animateNumber(totalTasksCounter.value, totalTasks)
    animateNumber(activeTasksCounter.value, activeTasks)
    animateNumber(overdueTasksCounter.value, overdueTasks)
    animateNumber(completionRateCounter.value, completionRate)
  }
  
  onMounted(() => {
    // Создаём график с нулевыми столбцами
    createChart()
    // Через 2.5 секунды запускаем анимацию столбцов и скрываем прелоадер
    setTimeout(() => {
      animateChart()
      chartLoading.value = false
    }, 2500)
  
    // Наблюдатель за появлением блока статистики
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters()
          if (observer) observer.disconnect()
        }
      })
    }, { threshold: 0.3 })
    const statsGrid = document.querySelector('.stats-grid')
    if (statsGrid) observer.observe(statsGrid)
  })
  
  onUnmounted(() => {
    destroyChart()
    if (observer) observer.disconnect()
  })
  
  // При смене темы обновляем цвета графика или пересоздаём его
  watch(isDark, () => {
    if (chartInstance) {
      updateChartTheme(chartInstance)
    } else {
      createChart()
      chartLoading.value = true
      setTimeout(() => {
        animateChart()
        chartLoading.value = false
      }, 2500)
    }
  })
  </script>
  
  <style scoped>
  .stats { text-align: center; }
  .slide-subtitle {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }
  .dark .slide-subtitle { color: #f8fafc; }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .stat-card {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
    padding: 1rem;
  }
  .dark .stat-card { background: rgba(15, 23, 42, 0.5); }
  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    display: block;
  }
  .stat-label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #475569;
  }
  .dark .stat-label { color: #94a3b8; }
  .chart-container {
    position: relative;
    max-width: 700px;
    margin: 1rem auto;
    height: 300px;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  .chart-preloader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    border-radius: 0.75rem;
    z-index: 2;
  }
  .dark .chart-preloader {
    background: rgba(15, 23, 42, 0.8);
  }
  .loader-dots {
    display: flex;
    gap: 8px;
    margin-bottom: 0.8rem;
  }
  .loader-dots span {
    width: 12px;
    height: 12px;
    background-color: #3b82f6;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
  .loader-dots span:nth-child(2) { animation-delay: -0.16s; }
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
  }
  .chart-preloader p {
    color: #1e293b;
    font-size: 0.9rem;
  }
  .dark .chart-preloader p {
    color: #cbd5e1;
  }
  .chart-note {
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 0.5rem;
  }
  .dark .chart-note { color: #94a3b8; }
  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .chart-container { height: 250px; }
  }
  </style>