<template>
  <div class="overview">
    <h2 class="slide-subtitle">Система баллов KPI</h2>
    <div class="formula-card">
      <div class="formula">P = <span class="blue">B</span> + <span class="purple">A</span></div>
      <p class="formula-desc">Базовые баллы (B) + дополнительные баллы (A) за выполненную работу</p>
    </div>
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
  { icon: '🏷️', title: 'Иерархические категории', description: 'Родительская категория (базовые баллы) → дочерние работы (доп. баллы)' },
  { icon: '🧮', title: 'Автоматический расчёт', description: 'При выборе работ баллы начисляются автоматически по формуле P = B + A' },
  { icon: '📊', title: 'Подтверждение ведомости', description: 'Сотрудник подтверждает, руководитель утверждает – фиксация результата' },
  { icon: '📅', title: 'Месячные ведомости', description: 'Каждый месяц создаётся новая ведомость, доступна история' },
  { icon: '👥', title: 'Разделение по отделам', description: 'Конструкторы и дизайнеры имеют разные справочники категорий' },
  { icon: '📎', title: 'Экспорт в Excel/PDF', description: 'Выгрузка ведомости с детализацией по заявкам и вариантам' }
]
</script>

<style scoped>
.overview { text-align: center; }
.slide-subtitle {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #0f172a;
}
.dark .slide-subtitle { color: #f8fafc; }
.formula-card {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: inline-block;
  width: auto;
}
.dark .formula-card {
  background: rgba(15, 23, 42, 0.5);
}
.formula {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
}
.blue { color: #3b82f6; }
.purple { color: #8b5cf6; }
.formula-desc {
  font-size: 0.9rem;
  color: #475569;
  margin-top: 0.3rem;
}
.dark .formula-desc { color: #94a3b8; }
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 1rem;
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
.icon { font-size: 2rem; margin-bottom: 0.5rem; }
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
  .formula { font-size: 1.8rem; }
}
</style>