import { ref, watchEffect } from 'vue'

export const isDark = ref(localStorage.getItem('theme') === 'dark')

export const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

export const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
}

export const initTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    // по умолчанию тёмная тема, если не задано
    isDark.value = true
  }
  applyTheme()
}

// автоматически вызываем при импорте (или в main.js)
initTheme()