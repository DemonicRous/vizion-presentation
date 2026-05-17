/**
 * Форматирование чисел с плавающей точкой
 * @param {number} value - число
 * @param {number} decimals - знаков после запятой (по умолчанию 2)
 * @returns {string}
 */
export const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined) return '0'
    const num = Number(value)
    if (isNaN(num)) return '0'
    return num.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    })
  }
  
  /**
   * Форматирование баллов KPI (убирает .00, если целое)
   * @param {number} points
   * @returns {string}
   */
  export const formatPoints = (points) => {
    if (points === null || points === undefined) return '0'
    const num = Number(points)
    if (isNaN(num)) return '0'
    if (num % 1 === 0) return num.toString()
    return num.toFixed(2).replace(/\.?0+$/, '')
  }
  
  /**
   * Короткий формат даты: ДД.ММ.ГГГГ
   * @param {string|Date} date
   * @returns {string}
   */
  export const formatDateShort = (date) => {
    if (!date) return '—'
    const d = new Date(date)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('ru-RU')
  }
  
  /**
   * Полный формат даты + время
   * @param {string|Date} date
   * @returns {string}
   */
  export const formatDateTime = (date) => {
    if (!date) return '—'
    const d = new Date(date)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleString('ru-RU')
  }