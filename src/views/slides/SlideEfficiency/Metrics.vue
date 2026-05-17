<template>
    <div class="metrics">
      <h2 class="slide-subtitle">Ключевые показатели эффективности</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <span ref="timeReduce" class="metric-number">0</span>
          <span class="metric-unit">%</span>
          <span class="metric-label">сокращение времени на KPI</span>
        </div>
        <div class="metric-card">
          <span ref="taskDiscipline" class="metric-number">0</span>
          <span class="metric-unit">%</span>
          <span class="metric-label">рост дисциплины задач</span>
        </div>
        <div class="metric-card">
          <span ref="errorReduce" class="metric-number">0</span>
          <span class="metric-unit">%</span>
          <span class="metric-label">снижение ошибок при расчётах</span>
        </div>
        <div class="metric-card">
          <span ref="dataLoss" class="metric-number">0</span>
          <span class="metric-unit">%</span>
          <span class="metric-label">потерь данных аудитов</span>
        </div>
      </div>
      <div class="extra-metrics">
        <div class="metric-card">
          <span ref="yearlySavings" class="metric-number">0</span>
          <span class="metric-unit">тыс. руб.</span>
          <span class="metric-label">годовая экономия</span>
        </div>
        <div class="metric-card">
          <span ref="payback" class="metric-number">0</span>
          <span class="metric-unit">дней</span>
          <span class="metric-label">срок окупаемости</span>
        </div>
      </div>
      <p class="metrics-note">*По сравнению с ручными процессами (Excel, бумажные журналы)</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const timeReduce = ref(null)
  const taskDiscipline = ref(null)
  const errorReduce = ref(null)
  const dataLoss = ref(null)
  const yearlySavings = ref(null)
  const payback = ref(null)
  
  const animateNumber = (el, target, duration = 1500) => {
    if (!el) return
    let start = 0
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = Math.floor(progress * target)
      el.innerText = value
      if (progress < 1) requestAnimationFrame(step)
      else el.innerText = target
    }
    requestAnimationFrame(step)
  }
  
  let observer = null
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(timeReduce.value, 98)
          animateNumber(taskDiscipline.value, 40)
          animateNumber(errorReduce.value, 100)
          animateNumber(dataLoss.value, 100)
          animateNumber(yearlySavings.value, 906)
          animateNumber(payback.value, 19)
          if (observer) observer.disconnect()
        }
      })
    }, { threshold: 0.3 })
    const grid = document.querySelector('.metrics-grid')
    if (grid) observer.observe(grid)
  })
  </script>
  
  <style scoped>
  .metrics { text-align: center; }
  .slide-subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }
  .dark .slide-subtitle { color: #f8fafc; }
  .metrics-grid, .extra-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .extra-metrics {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .metric-card {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1.5rem;
    padding: 1rem;
    text-align: center;
    transition: transform 0.2s;
  }
  .dark .metric-card {
    background: rgba(15, 23, 42, 0.5);
  }
  .metric-card:hover {
    transform: translateY(-4px);
  }
  .metric-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
  }
  .metric-unit {
    font-size: 1.2rem;
    font-weight: 600;
    color: #475569;
    margin-left: 0.2rem;
  }
  .dark .metric-unit { color: #94a3b8; }
  .metric-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #475569;
    margin-top: 0.3rem;
  }
  .dark .metric-label { color: #94a3b8; }
  .metrics-note {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 1rem;
  }
  .dark .metrics-note { color: #94a3b8; }
  @media (max-width: 768px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .extra-metrics { grid-template-columns: 1fr; }
  }
  </style>