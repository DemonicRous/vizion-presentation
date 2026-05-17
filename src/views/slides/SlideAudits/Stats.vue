<template>
  <div class="stats">
    <h2 class="slide-subtitle">Статистика аудитов</h2>
    <div class="stats-grid">
      <div class="stat-card"><span ref="totalCounter" class="stat-number">0</span><span class="stat-label">Всего аудитов</span></div>
      <div class="stat-card"><span ref="completedCounter" class="stat-number">0</span><span class="stat-label">Завершено</span></div>
      <div class="stat-card"><span ref="inProgressCounter" class="stat-number">0</span><span class="stat-label">В процессе</span></div>
      <div class="stat-card"><span ref="monthlyCounter" class="stat-number">0</span><span class="stat-label">За месяц</span></div>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
      <div v-if="chartLoading" class="chart-preloader">
        <div class="loader-dots"><span></span><span></span><span></span></div>
        <p>Загрузка статистики...</p>
      </div>
    </div>
    <p class="chart-note">Распределение аудитов по статусам</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { isDark, getChartColors, updateChartTheme } from '@/utils'

// Данные из диплома (раздел 2.3.2)
const total = 42
const completed = 28
const inProgress = 10
const monthly = 14

const totalCounter = ref(null)
const completedCounter = ref(null)
const inProgressCounter = ref(null)
const monthlyCounter = ref(null)

const chartCanvas = ref(null)
let chartInstance = null
const chartLoading = ref(true)

const targetData = [12, 28, 10, 14] // draft, completed, in_progress, cancelled (упрощённо)
const labels = ['Черновики', 'Завершены', 'В процессе', 'Отменены']

const createChart = () => {
  if (!chartCanvas.value) return
  const colors = getChartColors()
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Количество аудитов',
        data: [0, 0, 0, 0],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
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
  if (chartInstance) { chartInstance.destroy(); chartInstance = null }
}

const animateNumber = (element, target, duration = 1500) => {
  if (!element) return
  let start = 0
  const step = (timestamp) => {
    if (!start) start = timestamp
    const progress = Math.min((timestamp - start) / duration, 1)
    const value = Math.floor(progress * target)
    element.innerText = value
    if (progress < 1) requestAnimationFrame(step)
    else element.innerText = target
  }
  requestAnimationFrame(step)
}

let observer = null
onMounted(() => {
  createChart()
  setTimeout(() => {
    animateChart()
    chartLoading.value = false
  }, 2500)

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(totalCounter.value, total)
        animateNumber(completedCounter.value, completed)
        animateNumber(inProgressCounter.value, inProgress)
        animateNumber(monthlyCounter.value, monthly)
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

watch(isDark, () => {
  if (chartInstance) updateChartTheme(chartInstance)
  else {
    createChart()
    chartLoading.value = true
    setTimeout(() => { animateChart(); chartLoading.value = false }, 2500)
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
  background: linear-gradient(135deg, #8b5cf6, #c084fc);
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
canvas { width: 100%; height: 100%; }
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
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  z-index: 2;
}
.dark .chart-preloader { background: rgba(15,23,42,0.8); }
.loader-dots { display: flex; gap: 8px; margin-bottom: 0.8rem; }
.loader-dots span {
  width: 12px; height: 12px; background-color: #8b5cf6; border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}
.loader-dots span:nth-child(1) { animation-delay: -0.32s; }
.loader-dots span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%,80%,100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
.chart-preloader p { color: #1e293b; font-size: 0.9rem; }
.dark .chart-preloader p { color: #cbd5e1; }
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