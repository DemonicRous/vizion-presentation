<template>
    <div class="savings">
      <h2 class="slide-subtitle">Экономическая эффективность</h2>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
        <div v-if="chartLoading" class="chart-preloader">
          <div class="loader-dots"><span></span><span></span><span></span></div>
          <p>Загрузка графика...</p>
        </div>
      </div>
      <div class="info-block">
        <div class="info-item">
          <span class="info-value">906 480 ₽</span>
          <span class="info-label">годовая экономия</span>
        </div>
        <div class="info-item">
          <span class="info-value">19 дней</span>
          <span class="info-label">срок окупаемости</span>
        </div>
        <div class="info-item">
          <span class="info-value">~0,5 млн ₽</span>
          <span class="info-label">экономия за полгода</span>
        </div>
      </div>
      <p class="savings-note">*Расчёт выполнен по методике из учебного пособия [19]</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { Chart } from 'chart.js/auto'
  import { isDark, getChartColors } from '@/utils'
  
  const chartCanvas = ref(null)
  let chartInstance = null
  const chartLoading = ref(true)
  
  const createChart = () => {
    if (!chartCanvas.value) return
    const colors = getChartColors()
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Расчёт KPI', 'Формирование отчётов', 'Поиск информации', 'Контроль задач'],
        datasets: [
          {
            label: 'До внедрения (часов/мес)',
            data: [2.5, 1.5, 20, 5],
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderRadius: 8
          },
          {
            label: 'После внедрения (часов/мес)',
            data: [0.03, 0.08, 8, 1],
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { labels: { color: colors.text, font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} ч` } }
        },
        scales: {
          y: { grid: { color: colors.grid }, ticks: { color: colors.text }, title: { display: true, text: 'Часы в месяц', color: colors.text } },
          x: { ticks: { color: colors.text, maxRotation: 25 } }
        }
      }
    })
  }
  
  const destroyChart = () => {
    if (chartInstance) { chartInstance.destroy(); chartInstance = null }
  }
  
  onMounted(() => {
    createChart()
    setTimeout(() => { chartLoading.value = false }, 2500)
  })
  onUnmounted(() => destroyChart())
  watch(isDark, () => {
    if (chartInstance) {
      const colors = getChartColors()
      chartInstance.options.plugins.legend.labels.color = colors.text
      chartInstance.options.scales.y.ticks.color = colors.text
      chartInstance.options.scales.x.ticks.color = colors.text
      chartInstance.options.scales.y.grid.color = colors.grid
      chartInstance.options.scales.x.grid.color = colors.grid
      chartInstance.update()
    }
  })
  </script>
  
  <style scoped>
  .savings { text-align: center; }
  .slide-subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #0f172a;
  }
  .dark .slide-subtitle { color: #f8fafc; }
  .chart-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
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
    width: 12px; height: 12px; background-color: #3b82f6; border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
  .loader-dots span:nth-child(2) { animation-delay: -0.16s; }
  @keyframes bounce {
    0%,80%,100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
  }
  .info-block {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
  .info-item {
    text-align: center;
    background: rgba(255,255,255,0.3);
    border-radius: 1rem;
    padding: 0.8rem 1.2rem;
  }
  .dark .info-item { background: rgba(15,23,42,0.5); }
  .info-value {
    font-size: 1.4rem;
    font-weight: 800;
    color: #10b981;
    display: block;
  }
  .dark .info-value { color: #34d399; }
  .info-label {
    font-size: 0.75rem;
    color: #475569;
  }
  .dark .info-label { color: #94a3b8; }
  .savings-note {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 1rem;
  }
  .dark .savings-note { color: #94a3b8; }
  @media (max-width: 768px) {
    .chart-container { height: 260px; }
    .info-block { gap: 1rem; }
  }
  </style>