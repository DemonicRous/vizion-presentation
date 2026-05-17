<template>
  <div class="pdf-demo">
    <h2 class="slide-subtitle">Пример PDF‑отчёта</h2>
    <div class="pdf-container">
      <div v-if="loading" class="pdf-preloader">
        <div class="loader-dots"><span></span><span></span><span></span></div>
        <p>Загрузка отчёта...</p>
      </div>
      <iframe :key="pdfKey" :src="pdfSrc" class="pdf-iframe" @load="onIframeLoad"></iframe>
    </div>
    <p class="pdf-note">* Сгенерирован автоматически после завершения аудита</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { isDark } from '@/utils/theme'

const loading = ref(true)
const pdfKey = ref(0)

const pdfSrc = ref(`/audit-report-demo.html?theme=${isDark.value ? 'dark' : 'light'}`)

const onIframeLoad = () => {
  setTimeout(() => { loading.value = false }, 200)
}

watch(isDark, () => {
  loading.value = true
  pdfKey.value += 1
  pdfSrc.value = `/audit-report-demo.html?theme=${isDark.value ? 'dark' : 'light'}&_=${Date.now()}`
})
</script>

<style scoped>
.pdf-demo { text-align: center; }
.slide-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #0f172a;
}
.dark .slide-subtitle { color: #f8fafc; }
.pdf-container {
  position: relative;
  width: 100%;
  height: 70vh;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  background: white;
}
.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.pdf-preloader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
  z-index: 2;
}
.dark .pdf-preloader {
  background: rgba(15,23,42,0.9);
}
.loader-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 0.8rem;
}
.loader-dots span {
  width: 12px;
  height: 12px;
  background-color: #3b82f6;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}
.loader-dots span:nth-child(1) { animation-delay: -0.32s; }
.loader-dots span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%,80%,100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
.pdf-preloader p {
  color: #1e293b;
  font-size: 0.9rem;
}
.dark .pdf-preloader p { color: #cbd5e1; }
.pdf-note {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.5rem;
}
.dark .pdf-note { color: #94a3b8; }
@media (max-width: 768px) {
  .pdf-container { height: 55vh; }
}
</style>