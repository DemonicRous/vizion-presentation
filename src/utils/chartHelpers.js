import { isDark } from './theme'

/**
 * Получение цветовой схемы для графиков в зависимости от темы
 * @returns {object}
 */
export const getChartColors = () => {
  const textColor = isDark.value ? '#f1f5f9' : '#1e293b'
  const gridColor = isDark.value ? '#334155' : '#e2e8f0'
  return {
    text: textColor,
    grid: gridColor,
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
  }
}

/**
 * Базовая конфигурация для всех графиков (единый стиль)
 * @returns {object}
 */
export const baseChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: getChartColors().text,
        font: { family: 'Inter, system-ui', size: 12 },
      },
    },
    tooltip: {
      backgroundColor: isDark.value ? '#1e293b' : '#ffffff',
      titleColor: isDark.value ? '#f1f5f9' : '#0f172a',
      bodyColor: isDark.value ? '#cbd5e1' : '#334155',
    },
  },
  scales: {
    y: {
      grid: { color: getChartColors().grid },
      ticks: { color: getChartColors().text },
    },
    x: {
      grid: { color: getChartColors().grid },
      ticks: { color: getChartColors().text },
    },
  },
})

/**
 * Обновление стилей графиков при смене темы
 * @param {Chart} chartInstance
 */
export const updateChartTheme = (chartInstance) => {
  if (!chartInstance) return
  const colors = getChartColors()
  chartInstance.options.plugins.legend.labels.color = colors.text
  chartInstance.options.scales.y.ticks.color = colors.text
  chartInstance.options.scales.x.ticks.color = colors.text
  chartInstance.options.scales.y.grid.color = colors.grid
  chartInstance.options.scales.x.grid.color = colors.grid
  chartInstance.update()
}