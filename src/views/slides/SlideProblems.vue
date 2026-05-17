<template>
    <div class="slide-problems">
      <div class="content-wrapper">
        <h2 class="section-title fade-in delay-1">Актуальность проекта</h2>
  
        <div class="problems-list fade-in delay-2">
          <div class="problem-item">
            <div class="icon">⏳</div>
            <div class="text">
              <h3>Ручной расчёт KPI</h3>
              <p>Excel-таблицы и бумажные журналы → 2–3 часа в месяц на сотрудника, ошибки 5–10%</p>
            </div>
          </div>
          <div class="problem-item">
            <div class="icon">📁</div>
            <div class="text">
              <h3>Потеря данных аудитов</h3>
              <p>Фотографии и заметки разрознены, поиск занимает 15–20 мин, зафиксированы полные потери</p>
            </div>
          </div>
          <div class="problem-item">
            <div class="icon">🧩</div>
            <div class="text">
              <h3>Отсутствие системы задач</h3>
              <p>Устные поручения, мессенджеры, email → 20% поручений теряются, сроки срываются</p>
            </div>
          </div>
          <div class="problem-item">
            <div class="icon">📊</div>
            <div class="text">
              <h3>Непрозрачность управления</h3>
              <p>Руководитель не видит текущую загрузку, прогресс задач, накопленные баллы</p>
            </div>
          </div>
        </div>
  
        <div class="stats-preview fade-in delay-3" ref="statsRef">
          <div class="stat">
            <span class="stat-number"><span ref="counter1">0</span>%</span>
            <span class="stat-label">сокращение времени на KPI</span>
          </div>
          <div class="stat">
            <span class="stat-number"><span ref="counter2">0</span>%</span>
            <span class="stat-label">потерь данных аудитов</span>
          </div>
          <div class="stat">
            <span class="stat-number"><span ref="counter3">0</span>%</span>
            <span class="stat-label">рост дисциплины задач</span>
          </div>
        </div>
  
        <p class="footnote fade-in delay-4">*расчётные показатели после внедрения GofraLub</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const statsRef = ref(null)
  const counter1 = ref(null)
  const counter2 = ref(null)
  const counter3 = ref(null)
  
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
  
  const startCounters = () => {
    animateNumber(counter1.value, 98)
    animateNumber(counter2.value, 0)
    animateNumber(counter3.value, 40)
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters()
        observer.disconnect()
      }
    })
  }, { threshold: 0.3 })
  
  onMounted(() => {
    if (statsRef.value) observer.observe(statsRef.value)
  })
  </script>
  
  <style scoped>
  .slide-problems {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .content-wrapper {
    max-width: 1300px;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  
  .dark .content-wrapper {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.4);
  }
  
  .section-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #0f172a;
  }
  
  .dark .section-title {
    color: #f8fafc;
  }
  
  .problems-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
    text-align: left;
  }
  
  .problem-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    border-radius: 1.5rem;
    padding: 1.25rem 1.5rem;
    transition: transform 0.2s, background 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .dark .problem-item {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .problem-item:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.8);
  }
  
  .dark .problem-item:hover {
    background: rgba(30, 41, 59, 0.8);
  }
  
  .icon {
    font-size: 2.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  }
  
  .dark .icon {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .text {
    flex: 1;
  }
  
  .text h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }
  
  .dark .text h3 {
    color: #f1f5f9;
  }
  
  .text p {
    font-size: 1.125rem;
    line-height: 1.45;
    color: #334155;
  }
  
  .dark .text p {
    color: #cbd5e1;
  }
  
  .stats-preview {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin: 2rem 0;
    flex-wrap: wrap;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    display: block;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    color: #475569;
    display: block;
    margin-top: 0.5rem;
  }
  
  .dark .stat-label {
    color: #94a3b8;
  }
  
  .footnote {
    font-size: 0.85rem;
    color: #64748b;
    margin-top: 1rem;
  }
  
  .dark .footnote {
    color: #94a3b8;
  }
  
  .fade-in {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    opacity: 0;
  }
  
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.35s; }
  .delay-4 { animation-delay: 0.5s; }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 768px) {
    .section-title { font-size: 2rem; }
    .problem-item { padding: 1rem; gap: 1rem; }
    .icon { width: 48px; height: 48px; font-size: 2rem; }
    .text h3 { font-size: 1.2rem; }
    .text p { font-size: 1rem; }
    .stat-number { font-size: 2rem; }
    .stat-label { font-size: 0.8rem; }
  }
  </style>