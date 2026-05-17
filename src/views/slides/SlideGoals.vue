<template>
    <div class="slide-goals">
      <div class="content-wrapper">
        <h2 class="section-title fade-in delay-1">Цели и задачи проекта</h2>
  
        <!-- Блок целей -->
        <div class="goals-block fade-in delay-2">
          <h3 class="block-subtitle">Основные цели</h3>
          <div class="goals-list">
            <div class="goal-item">
              <div class="icon">🎯</div>
              <div class="text">
                <h4>Автоматизация ключевых процессов</h4>
                <p>Учёт KPI, документирование аудитов, управление задачами – всё в единой системе</p>
              </div>
            </div>
            <div class="goal-item">
              <div class="icon">📈</div>
              <div class="text">
                <h4>Повышение эффективности отдела развития</h4>
                <p>Сокращение временных затрат, снижение ошибок, объективная мотивация сотрудников</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Блок задач (два столбца) -->
        <div class="tasks-block fade-in delay-3">
          <h3 class="block-subtitle">Ключевые задачи</h3>
          <div class="tasks-grid">
            <div class="task-item">
              <div class="icon">🖧</div>
              <div class="text">
                <h4>Централизованное хранение</h4>
                <p>Заявки, варианты конструкций/дизайна, аудиты, задачи — всё в одной базе</p>
              </div>
            </div>
            <div class="task-item">
              <div class="icon">⚙️</div>
              <div class="text">
                <h4>Автоматический расчёт KPI</h4>
                <p>Формула P = B + A, иерархический справочник категорий</p>
              </div>
            </div>
            <div class="task-item">
              <div class="icon">📋</div>
              <div class="text">
                <h4>Управление задачами</h4>
                <p>Подзадачи, комментарии, история изменений, контроль сроков</p>
              </div>
            </div>
            <div class="task-item">
              <div class="icon">📸</div>
              <div class="text">
                <h4>Документирование аудитов</h4>
                <p>Загрузка фото, PDF-отчёты, геолокация, электронная подпись</p>
              </div>
            </div>
            <div class="task-item">
              <div class="icon">🔐</div>
              <div class="text">
                <h4>Разграничение доступа</h4>
                <p>Роли admin, manager, user + двухэтапная верификация</p>
              </div>
            </div>
            <div class="task-item">
              <div class="icon">📎</div>
              <div class="text">
                <h4>Экспорт отчётности</h4>
                <p>Выгрузка в Excel и PDF (ведомости, сводки, аудиты)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .slide-goals {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    box-sizing: border-box;
  }
  
  .content-wrapper {
    max-width: 1500px;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2rem;
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
    font-size: 3rem; /* 48px */
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #0f172a;
  }
  
  .dark .section-title {
    color: #f8fafc;
  }
  
  .block-subtitle {
    font-size: 1.8rem; /* ~28px */
    font-weight: 600;
    margin: 1rem 0 0.75rem 0;
    text-align: left;
    color: #1e293b;
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
  }
  
  .dark .block-subtitle {
    color: #e2e8f0;
    border-left-color: #60a5fa;
  }
  
  /* Цели – один столбец */
  .goals-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .goal-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    border-radius: 1.5rem;
    padding: 1.25rem 1.5rem;
    transition: transform 0.2s, background 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-align: left;
  }
  
  .dark .goal-item {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .goal-item:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.8);
  }
  
  .dark .goal-item:hover {
    background: rgba(30, 41, 59, 0.8);
  }
  
  .icon {
    font-size: 2.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    line-height: 1;
  }
  
  .dark .icon {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .text {
    flex: 1;
  }
  
  .text h4 {
    font-size: 1.5rem; /* 24px */
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }
  
  .dark .text h4 {
    color: #f1f5f9;
  }
  
  .text p {
    font-size: 1.125rem; /* 18px */
    line-height: 1.45;
    color: #334155;
  }
  
  .dark .text p {
    color: #cbd5e1;
  }
  
  /* Задачи – два столбца */
  .tasks-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-top: 0.5rem;
  }
  
  .task-item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    border-radius: 1.5rem;
    padding: 1rem 1.25rem;
    transition: transform 0.2s, background 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.05);
    text-align: left;
  }
  
  .dark .task-item {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .task-item:hover {
    transform: translateX(4px);
    background: rgba(255, 255, 255, 0.8);
  }
  
  .dark .task-item:hover {
    background: rgba(30, 41, 59, 0.8);
  }
  
  .task-item .icon {
    font-size: 2.4rem;
    width: 56px;
    height: 56px;
  }
  
  .task-item .text h4 {
    font-size: 1.3rem; /* ~21px, чтобы влезло, но можно увеличить до 1.4rem при желании */
    margin-bottom: 0.3rem;
  }
  
  .task-item .text p {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  .fade-in {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    opacity: 0;
  }
  
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.35s; }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 1000px) {
    .tasks-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .section-title { font-size: 2rem; }
    .block-subtitle { font-size: 1.4rem; }
    .goal-item, .task-item { padding: 0.75rem 1rem; gap: 1rem; }
    .icon { width: 48px; height: 48px; font-size: 2rem; }
    .text h4 { font-size: 1.2rem; }
    .text p { font-size: 0.95rem; }
  }
  </style>