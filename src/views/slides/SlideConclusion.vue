<template>
    <div class="slide-conclusion">
      <ThreeBackgroundStars />
      <div class="content-wrapper-relative">
        <div class="content-wrapper">
          <h1 class="main-title fade-up">✨ Заключение</h1>
          <div class="conclusion-grid">
            <div class="text-block fade-up delay-1">
              <p>В ходе выполнения выпускной квалификационной работы достигнута поставленная цель – разработано и подготовлено к внедрению веб-приложение <strong>«GofraLub»</strong>, обеспечивающее централизацию ключевых рабочих процессов отдела развития ООО «Фабрика ЮжУралКартон».</p>
              <p>Решены все задачи: проведён анализ деятельности, спроектирована база данных, выбран современный стек технологий (Laravel 13 + Vue 3 + Inertia), реализованы модули аутентификации, управления задачами, выездных аудитов, расчёта KPI и администрирования.</p>
            </div>
            <div class="stats-block fade-up delay-2">
              <div class="stat-item">
                <span ref="savedTime" class="stat-number">0</span>
                <span class="stat-label">% сокращения времени на KPI</span>
              </div>
              <div class="stat-item">
                <span ref="errorReduction" class="stat-number">0</span>
                <span class="stat-label">% снижение ошибок расчёта</span>
              </div>
              <div class="stat-item">
                <span ref="yearlyEffect" class="stat-number">0</span>
                <span class="stat-label">тыс. ₽ годовая экономия</span>
              </div>
              <div class="stat-item">
                <span ref="paybackDays" class="stat-number">0</span>
                <span class="stat-label">дней окупаемости</span>
              </div>
            </div>
            <div class="quote-block fade-up delay-3">
              <p>«Внедрение GofraLub позволило перевести учёт KPI, аудиты и задачи в единую цифровую среду, повысив прозрачность и эффективность отдела развития.»</p>
              <span class="quote-author">— Сурнина Н.М., научный руководитель</span>
            </div>
            <div class="thanks-block fade-up delay-4">
              <p>Благодарю за внимание!<br>Проект готов к опытной эксплуатации.</p>
              <div class="tech-badge">Laravel 13 · Vue 3 · Inertia · Tailwind · MySQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import ThreeBackgroundStars from '@/components/ThreeBackgroundStars.vue'
  
  const savedTime = ref(null)
  const errorReduction = ref(null)
  const yearlyEffect = ref(null)
  const paybackDays = ref(null)
  
  const animateNumber = (element, target, duration = 2000, suffix = '') => {
    if (!element) return
    let start = 0
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const value = Math.floor(progress * target)
      element.innerText = value + suffix
      if (progress < 1) requestAnimationFrame(step)
      else element.innerText = target + suffix
    }
    requestAnimationFrame(step)
  }
  
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(savedTime.value, 98, 2000, '%')
          animateNumber(errorReduction.value, 100, 2000, '%')
          animateNumber(yearlyEffect.value, 906, 2000, '')
          animateNumber(paybackDays.value, 19, 2000, '')
          observer.disconnect()
        }
      })
    }, { threshold: 0.3 })
    const statsBlock = document.querySelector('.stats-block')
    if (statsBlock) observer.observe(statsBlock)
  })
  </script>
  
  <style scoped>
  .slide-conclusion {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    position: relative;
    box-sizing: border-box;
  }
  .content-wrapper-relative {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 10;
  }
  .content-wrapper {
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15);
  }
  .dark .content-wrapper {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.4);
  }
  .main-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #60a5fa, #c084fc);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.dark .main-title {
  background: linear-gradient(135deg, #60a5fa, #c084fc);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
  .conclusion-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .text-block p {
    font-size: 1rem;
    line-height: 1.5;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }
  .dark .text-block p {
    color: #cbd5e1;
  }
  .stats-block {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1.5rem;
    padding: 1rem;
  }
  .dark .stats-block {
    background: rgba(15, 23, 42, 0.5);
  }
  .stat-item {
    text-align: center;
  }
  .stat-number {
    display: block;
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #10b981, #3b82f6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  .stat-label {
    font-size: 0.7rem;
    font-weight: 500;
    color: #475569;
  }
  .dark .stat-label {
    color: #94a3b8;
  }
  .quote-block {
    background: rgba(59, 130, 246, 0.1);
    border-left: 4px solid #3b82f6;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    font-style: italic;
  }
  .dark .quote-block {
    background: rgba(59, 130, 246, 0.2);
  }
  .quote-block p {
    font-size: 1rem;
    color: #1e293b;
  }
  .dark .quote-block p {
    color: #e2e8f0;
  }
  .quote-author {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #64748b;
  }
  .thanks-block {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
    color: #0f172a;
  }
  .dark .thanks-block {
    color: #f1f5f9;
  }
  .tech-badge {
    margin-top: 0.75rem;
    font-size: 0.7rem;
    font-family: monospace;
    color: #3b82f6;
  }
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.25s; }
  .delay-3 { animation-delay: 0.4s; }
  .delay-4 { animation-delay: 0.55s; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 768px) {
    .stats-block { grid-template-columns: repeat(2, 1fr); }
    .main-title { font-size: 2rem; }
    .text-block p { font-size: 0.9rem; }
  }
  </style>