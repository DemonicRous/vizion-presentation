<template>
  <div class="stats">
    <h2 class="slide-subtitle">Баллы за март 2026</h2>
    <div class="stats-grid">
      <div class="stat-card"><span ref="constructorTotal" class="stat-number">0</span><span class="stat-label">Конструкторы (сумма)</span></div>
      <div class="stat-card"><span ref="designerTotal" class="stat-number">0</span><span class="stat-label">Дизайнеры (сумма)</span></div>
      <div class="stat-card"><span ref="constructorAvg" class="stat-number">0</span><span class="stat-label">Средний балл (констр.)</span></div>
      <div class="stat-card"><span ref="designerAvg" class="stat-number">0</span><span class="stat-label">Средний балл (диз.)</span></div>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
      <div v-if="chartLoading" class="chart-preloader">
        <div class="loader-dots"><span></span><span></span><span></span></div>
        <p>Загрузка статистики...</p>
      </div>
    </div>
    <p class="chart-note">Распределение баллов по сотрудникам (пример)</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { isDark, getChartColors, updateChartTheme } from '@/utils'

// Данные из диплома (можно заменить на реальные)
const constructorTotalValue = 247
const designerTotalValue = 186
const constructorAvgValue = 61.8
const designerAvgValue = 62.0

const constructorTotal = ref(null)
const designerTotal = ref(null)
const constructorAvg = ref(null)
const designerAvg = ref(null)

const chartCanvas = ref(null)
let chartInstance = null
const chartLoading = ref(true)

const labels = ['Иванов (констр.)', 'Петров (констр.)', 'Сидоров (констр.)', 'Кузнецов (диз.)', 'Смирнова (диз.)']
const pointsData = [82, 63, 102, 58, 128]

const createChart = () => {
  if (!chartCanvas.value) return
  const colors = getChartColors()
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Начислено баллов',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { labels: { color: colors.text } } },
      scales: {
        y: { grid: { color: colors.grid }, ticks: { color: colors.text, stepSize: 20 } },
        x: { ticks: { color: colors.text, maxRotation: 45 } }
      }
    }
  })
}

const animateChart = () => {
  if (!chartInstance) return
  chartInstance.data.datasets[0].data = pointsData
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
        animateNumber(constructorTotal.value, constructorTotalValue)
        animateNumber(designerTotal.value, designerTotalValue)
        animateNumber(constructorAvg.value, constructorAvgValue)
        animateNumber(designerAvg.value, designerAvgValue)
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
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
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
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
}
.dark .stat-label { color: #94a3b8; }
.chart-container {
  position: relative;
  max-width: 800px;
  margin: 1rem auto;
  height: 320px;
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
  .chart-container { height: 260px; }
}
</style>