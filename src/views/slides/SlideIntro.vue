<template>
    <div class="slide-intro">
      <div class="content-wrapper">
        <!-- Логотип GofraLub -->
        <div class="logo-container fade-in delay-1">
          <div class="logo-group">
            <div class="logo-icon">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-part">Gofra</span>
              <span class="logo-part-highlight">Lub</span>
            </div>
          </div>
        </div>
  
        <h1 class="main-title fade-in delay-2">
          Проектирование и разработка веб-приложения<br>
          для автоматизации работы Отдела развития фабрики «ЮжУралКартон»
        </h1>
  
        <div class="info-card fade-in delay-3">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Студент</span>
              <span class="info-value">Чернов Александр Алексеевич</span>
            </div>
            <div class="info-item">
              <span class="info-label">Группа</span>
              <span class="info-value">ИДО 3Б ПОАС 23-2 СБ</span>
            </div>
            <div class="info-item">
              <span class="info-label">Направление</span>
              <span class="info-value">09.03.01 Информатика и вычислительная техника</span>
            </div>
            <div class="info-item">
              <span class="info-label">Руководитель</span>
              <span class="info-value">Сурнина Н. М., д.э.н., профессор</span>
            </div>
          </div>
        </div>
  
        <div class="footer-info fade-in delay-4">
          <p class="university">Уральский государственный экономический университет (УрГЭУ)</p>
          <p class="year">Екатеринбург, 2026</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .slide-intro {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  /* Светлая тема (по умолчанию) */
  .content-wrapper {
    max-width: 1300px;
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2.5rem 2rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  
  /* Тёмная тема */
  .dark .content-wrapper {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.4);
  }
  
  .logo-container {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }
  
  .logo-group {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.05);
    padding: 8px 20px 8px 16px;
    border-radius: 60px;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .dark .logo-group {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  
  .logo-part {
    color: #1e293b;
  }
  
  .dark .logo-part {
    color: #f1f5f9;
  }
  
  .logo-part-highlight {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .main-title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 2rem;
    color: #0f172a;
  }
  
  .dark .main-title {
    color: #f8fafc;
  }
  
  .info-card {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 1.5rem;
    padding: 1.5rem 2rem;
    margin: 2rem 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .dark .info-card {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    text-align: left;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .info-label {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #475569;
  }
  
  .dark .info-label {
    color: #94a3b8;
  }
  
  .info-value {
    font-weight: 500;
    color: #0f172a;
    font-size: 1.1rem;
  }
  
  .dark .info-value {
    color: #e2e8f0;
  }
  
  .footer-info {
    margin-top: 1.5rem;
  }
  
  .university {
    font-size: 1rem;
    font-weight: 500;
    color: #334155;
  }
  
  .dark .university {
    color: #cbd5e1;
  }
  
  .year {
    font-size: 0.9rem;
    color: #64748b;
  }
  
  .dark .year {
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
    .content-wrapper { padding: 1.5rem; }
    .main-title { font-size: 1.5rem; }
    .info-grid { grid-template-columns: 1fr; }
    .info-value { font-size: 0.95rem; }
  }
  </style>