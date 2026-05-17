<template>
    <div class="development">
      <h2 class="slide-subtitle">Социальный эффект и развитие</h2>
      <div class="two-columns">
        <div class="card">
          <h3>👥 Социальные эффекты</h3>
          <ul>
            <li>Прозрачная система мотивации (исключён субъективизм)</li>
            <li>Снижение стресса от рутины и потери данных</li>
            <li>Упрощение коммуникации между отделами продаж и развития</li>
            <li>Автоматическое напоминание о незаполненных ведомостях</li>
          </ul>
        </div>
        <div class="card">
          <h3>🚀 Планы развития</h3>
          <ul>
            <li>Интеграция с 1С через REST API</li>
            <li>Telegram‑бот для уведомлений и быстрого ввода задач</li>
            <li>Расширенная аналитика (дашборды с ECharts / Chart.js)</li>
            <li>AI‑ассистент «Боксик» – распознавание категорий KPI по фото</li>
            <li>Мобильное PWA для работы с аудитами с камеры</li>
          </ul>
        </div>
      </div>
      <p class="dev-note">* Функционал будет дорабатываться с учётом пожеланий сотрудников</p>
    </div>
  </template>
  
  <style scoped>
  .development { text-align: center; }
  .slide-subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }
  .dark .slide-subtitle { color: #f8fafc; }
  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  .card {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1.5rem;
    padding: 1.2rem;
    text-align: left;
  }
  .dark .card {
    background: rgba(15, 23, 42, 0.5);
  }
  .card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: #0f172a;
  }
  .dark .card h3 { color: #f1f5f9; }
  .card ul {
    list-style: none;
    padding-left: 0;
  }
  .card li {
    margin-bottom: 0.6rem;
    padding-left: 1.2rem;
    position: relative;
    color: #334155;
    font-size: 0.9rem;
  }
  .dark .card li { color: #cbd5e1; }
  .card li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }
  .dev-note {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 1rem;
  }
  .dark .dev-note { color: #94a3b8; }
  @media (max-width: 768px) {
    .two-columns { grid-template-columns: 1fr; gap: 1rem; }
  }
  </style>