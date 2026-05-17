<template>
    <div class="slide-architecture">
      <div class="content-wrapper">
        <h2 class="section-title fade-in delay-1">Архитектура и технологии</h2>
  
        <!-- Верхняя строка: клиентская и серверная части -->
        <div class="two-columns fade-in delay-2">
          <!-- Клиентская часть -->
          <div class="tech-card">
            <h3 class="card-title">Клиентская часть</h3>
            <div class="tech-list">
              <div class="tech-item">
                <div class="tech-icon"><VueIcon /></div>
                <div class="tech-info">
                  <h4>Vue 3</h4>
                  <p>Composition API, реактивность, компонентный подход</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon"><InertiaIcon /></div>
                <div class="tech-info">
                  <h4>Inertia.js</h4>
                  <p>SPA‑подход без отдельного API, маршрутизация</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon"><TailwindIcon /></div>
                <div class="tech-info">
                  <h4>Tailwind CSS</h4>
                  <p>Утилитарный CSS, тёмная тема, адаптивность</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Серверная часть -->
          <div class="tech-card">
            <h3 class="card-title">Серверная часть</h3>
            <div class="tech-list">
              <div class="tech-item">
                <div class="tech-icon"><LaravelIcon /></div>
                <div class="tech-info">
                  <h4>Laravel 13</h4>
                  <p>PHP 8.3, Eloquent ORM, миграции, artisan</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon"><MysqlIcon /></div>
                <div class="tech-info">
                  <h4>MySQL 8.0</h4>
                  <p>Реляционная СУБД, индексы, транзакции</p>
                </div>
              </div>
              <div class="tech-item">
                <div class="tech-icon"><NginxIcon /></div>
                <div class="tech-info">
                  <h4>Nginx + PHP‑FPM</h4>
                  <p>Веб‑сервер, обработка запросов, статика</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Отдельная карточка "Инструменты разработки" (в новой строке, на всю ширину, но с такой же структурой) -->
        <div class="full-width-card fade-in delay-3">
          <h3 class="card-title">Инструменты разработки</h3>
          <div class="tools-list">
            <div class="tech-item">
              <div class="tech-icon"><ComposerIcon /></div>
              <div class="tech-info">
                <h4>Composer</h4>
                <p>Менеджер зависимостей для PHP</p>
              </div>
            </div>
            <div class="tech-item">
              <div class="tech-icon"><NpmIcon /></div>
              <div class="tech-info">
                <h4>NPM</h4>
                <p>Менеджер пакетов для JavaScript</p>
              </div>
            </div>
            <div class="tech-item">
              <div class="tech-icon"><ViteIcon /></div>
              <div class="tech-info">
                <h4>Vite</h4>
                <p>Сборщик фронтенда, быстрая разработка</p>
              </div>
            </div>
            <div class="tech-item">
              <div class="tech-icon"><PhpunitIcon /></div>
              <div class="tech-info">
                <h4>PHPUnit</h4>
                <p>Модульное тестирование</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import LaravelIcon from '@/components/icons/LaravelIcon.vue'
  import VueIcon from '@/components/icons/VueIcon.vue'
  import InertiaIcon from '@/components/icons/InertiaIcon.vue'
  import TailwindIcon from '@/components/icons/TailwindIcon.vue'
  import MysqlIcon from '@/components/icons/MysqlIcon.vue'
  import NginxIcon from '@/components/icons/NginxIcon.vue'
  import ComposerIcon from '@/components/icons/ComposerIcon.vue'
  import NpmIcon from '@/components/icons/NpmIcon.vue'
  import ViteIcon from '@/components/icons/ViteIcon.vue'
  import PhpunitIcon from '@/components/icons/PhpunitIcon.vue'
  </script>
  
  <style scoped>
  .slide-architecture {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    box-sizing: border-box;
  }
  
  .content-wrapper {
    max-width: 1400px;
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
  
  .section-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #0f172a;
  }
  
  .dark .section-title {
    color: #f8fafc;
  }
  
  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tech-card,
  .full-width-card {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1.5rem;
    padding: 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
  }
  
  .dark .tech-card,
  .dark .full-width-card {
    background: rgba(15, 23, 42, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .tech-card:hover,
  .full-width-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.2);
  }
  
  .dark .tech-card:hover,
  .dark .full-width-card:hover {
    background: rgba(30, 41, 59, 0.7);
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #1e293b;
    border-bottom: 2px solid #3b82f6;
    display: inline-block;
    width: auto;
    padding-bottom: 0.25rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .dark .card-title {
    color: #e2e8f0;
    border-bottom-color: #60a5fa;
  }
  
  .tech-list,
  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .tech-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 1rem;
    padding: 0.6rem 0.8rem;
    transition: background 0.2s;
  }
  
  .dark .tech-item {
    background: rgba(0, 0, 0, 0.3);
  }
  
  .tech-item:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  .dark .tech-item:hover {
    background: rgba(30, 41, 59, 0.6);
  }
  
  .tech-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  
  .tech-icon:hover {
    transform: scale(1.05);
  }
  
  .dark .tech-icon {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .tech-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .tech-info h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.2rem;
    color: #0f172a;
  }
  
  .dark .tech-info h4 {
    color: #f1f5f9;
  }
  
  .tech-info p {
    font-size: 0.8rem;
    line-height: 1.3;
    color: #334155;
  }
  
  .dark .tech-info p {
    color: #cbd5e1;
  }
  
  .tools-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  @media (max-width: 900px) {
    .two-columns {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .tools-list {
      grid-template-columns: 1fr;
    }
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
  </style>