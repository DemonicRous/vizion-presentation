<template>
  <div class="overview">
    <h2 class="slide-subtitle">Выездные аудиты</h2>
    <div class="features-grid">
      <div class="feature-card" v-for="feature in features" :key="feature.title">
        <div class="icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  { icon: '📸', title: 'Фотографии и вложения', description: 'Загрузка изображений, документов, чертежей – всё в одной карточке аудита' },
  { icon: '📄', title: 'PDF‑отчёт', description: 'Автоматическая генерация отчёта с встроенными фотографиями и комментариями' },
  { icon: '📍', title: 'Геолокация', description: 'Автоматическая фиксация координат при создании аудита' },
  { icon: '✍️', title: 'Электронная подпись', description: 'Подтверждение завершения аудита подписью ответственного' },
  { icon: '💬', title: 'Комментарии', description: 'Обсуждение результатов с возможностью прикреплять файлы' },
  { icon: '🔍', title: 'Поиск и фильтрация', description: 'Быстрый поиск по названию, клиенту, дате и статусу' }
]
</script>

<style scoped>
.overview { text-align: center; }
.slide-subtitle {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #0f172a;
}
.dark .slide-subtitle { color: #f8fafc; }
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}
.feature-card {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1.2rem;
  padding: 1.2rem;
  text-align: left;
  transition: transform 0.2s, background 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.dark .feature-card {
  background: rgba(15, 23, 42, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}
.feature-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.5);
}
.dark .feature-card:hover {
  background: rgba(30, 41, 59, 0.6);
}
.icon { font-size: 2.2rem; margin-bottom: 0.5rem; }
.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #0f172a;
}
.dark .feature-card h3 { color: #f1f5f9; }
.feature-card p {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #334155;
}
.dark .feature-card p { color: #cbd5e1; }
@media (max-width: 900px) {
  .features-grid { grid-template-columns: 1fr; }
}
</style>