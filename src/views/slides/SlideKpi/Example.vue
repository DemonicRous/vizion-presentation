<template>
  <div class="example">
    <h2 class="slide-subtitle">Пример расчёта баллов</h2>
    <div class="demo-card">
      <div class="demo-info">
        <p><strong>Сотрудник:</strong> Конструктор</p>
        <p><strong>Выбранная категория:</strong> Конструкция из каталога ФЕФКО (базовые баллы: 1.0)</p>
        <p><strong>Выбранные работы:</strong></p>
        <div class="work-list">
          <label v-for="work in works" :key="work.id" class="work-item">
            <input type="checkbox" v-model="selectedWorks" :value="work.id" />
            <span>{{ work.name }} <span class="points">(+{{ work.points }} баллов)</span></span>
          </label>
        </div>
        <div class="result">
          Итого баллов за вариант: <strong>{{ totalPoints }}</strong>
        </div>
      </div>
      <div class="demo-note">
        <p>✨ Формула: <strong>1.0 (базовые) + Σ дополнительных баллов</strong></p>
        <p>📌 В реальной системе выбор работ происходит через иерархический справочник</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const works = [
  { id: 1, name: 'Проектирование по размерам, чертежам клиента', points: 0 },
  { id: 2, name: 'Проектирование по образцам продукта клиента', points: 0.5 },
  { id: 3, name: 'Проектирование по образцам упаковки клиента', points: 0.5 },
  { id: 4, name: 'Конструкция из двух элементов крышка-дно', points: 0.5 }
]
const selectedWorks = ref([])
const basePoints = 1.0

const totalPoints = computed(() => {
  const additional = selectedWorks.value.reduce((sum, id) => {
    const work = works.find(w => w.id === id)
    return sum + (work ? work.points : 0)
  }, 0)
  return (basePoints + additional).toFixed(1)
})
</script>

<style scoped>
.example { text-align: center; }
.slide-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #0f172a;
}
.dark .slide-subtitle { color: #f8fafc; }
.demo-card {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1.5rem;
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
.dark .demo-card {
  background: rgba(15, 23, 42, 0.5);
}
.demo-info p {
  margin-bottom: 0.75rem;
  color: #1e293b;
}
.dark .demo-info p { color: #e2e8f0; }
.work-list {
  margin: 1rem 0;
}
.work-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #334155;
}
.dark .work-item { color: #cbd5e1; }
.work-item input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.points {
  font-size: 0.8rem;
  color: #3b82f6;
}
.result {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}
.demo-note {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
}
.dark .demo-note { color: #94a3b8; }
</style>