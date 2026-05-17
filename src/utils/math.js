/**
 * Вычисление процента от числа
 * @param {number} part - часть
 * @param {number} total - целое
 * @returns {number}
 */
export const percent = (part, total) => {
    if (total === 0) return 0
    return Math.round((part / total) * 100)
  }
  
  /**
   * Округление до заданного количества знаков
   * @param {number} value
   * @param {number} precision
   * @returns {number}
   */
  export const round = (value, precision = 2) => {
    const factor = Math.pow(10, precision)
    return Math.round(value * factor) / factor
  }
  
  /**
   * Сумма массива чисел
   * @param {number[]} arr
   * @returns {number}
   */
  export const sum = (arr) => arr.reduce((acc, val) => acc + (val || 0), 0)