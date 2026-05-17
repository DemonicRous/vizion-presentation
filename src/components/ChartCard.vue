<!-- src/components/ChartCard.vue -->
<template>
    <div class="glass-card rounded-2xl p-6 shadow-xl">
      <h3 v-if="title" class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{{ title }}</h3>
      <canvas ref="chartCanvas"></canvas>
      <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { Chart } from 'chart.js/auto'
  import { isDark, getChartColors, baseChartOptions, updateChartTheme } from '@/utils'
  
  const props = defineProps({
    type: { type: String, default: 'bar' }, // bar, line, pie, doughnut
    data: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  })
  
  const chartCanvas = ref(null)
  let chartInstance = null
  
  const createChart = () => {
    if (!chartCanvas.value) return
    const defaultOpts = baseChartOptions()
    const mergedOpts = { ...defaultOpts, ...props.options }
    chartInstance = new Chart(chartCanvas.value, {
      type: props.type,
      data: props.data,
      options: mergedOpts
    })
  }
  
  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  }
  
  onMounted(() => {
    createChart()
  })
  
  onUnmounted(() => {
    destroyChart()
  })
  
  // Обновление при изменении данных или темы
  watch(() => props.data, () => {
    if (chartInstance) {
      chartInstance.data = props.data
      chartInstance.update()
    }
  }, { deep: true })
  
  watch(isDark, () => {
    if (chartInstance) {
      updateChartTheme(chartInstance)
    }
  })
  </script>
  
  <style scoped>
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .dark .glass-card {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.08);
  }
  </style>