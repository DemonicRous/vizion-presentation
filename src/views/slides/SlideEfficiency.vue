<template>
    <div class="slide-efficiency">
      <div class="content-wrapper-relative">
        <Transition name="sub-slide" mode="out-in">
          <div class="content-wrapper" :key="subIndex">
            <component :is="currentComponent" />
          </div>
        </Transition>
      </div>
  
      <div class="sub-nav">
        <button class="sub-nav-btn up" :class="{ disabled: subIndex === 0 }" @click="changeSub(-1)" :disabled="subIndex === 0">▲</button>
        <span class="sub-index">{{ subIndex + 1 }} / {{ subCount }}</span>
        <button class="sub-nav-btn down" :class="{ disabled: subIndex === subCount - 1 }" @click="changeSub(1)" :disabled="subIndex === subCount - 1">▼</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Metrics from './SlideEfficiency/Metrics.vue'
  import Savings from './SlideEfficiency/Savings.vue'
  import Future from './SlideEfficiency/Future.vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const subIndex = computed(() => parseInt(route.query.sub) || 0)
  const subComponents = [Metrics, Savings, Future]
  const subCount = subComponents.length
  const currentComponent = computed(() => subComponents[subIndex.value] || Metrics)
  
  const changeSub = (delta) => {
    const newIndex = subIndex.value + delta
    if (newIndex >= 0 && newIndex < subCount) {
      router.push({ query: { sub: newIndex } })
    }
  }
  
  const handleKeydown = (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); changeSub(-1) }
    if (e.key === 'ArrowDown') { e.preventDefault(); changeSub(1) }
  }
  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
  </script>
  
  <style scoped>
  .slide-efficiency {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    position: relative;
    box-sizing: border-box;
  }
  .content-wrapper-relative {
    position: relative;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 65vh;
  }
  .content-wrapper {
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.15);
    transition: none;
  }
  .dark .content-wrapper {
    background: rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.4);
  }
  .sub-slide-enter-active,
  .sub-slide-leave-active {
    transition: all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  .sub-slide-enter-from {
    opacity: 0;
    transform: translateY(18px);
  }
  .sub-slide-leave-to {
    opacity: 0;
    transform: translateY(-18px);
  }
  .sub-nav {
    position: fixed;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    z-index: 20;
  }
  .sub-nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #1e293b;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .dark .sub-nav-btn {
    background: rgba(15, 23, 42, 0.7);
    border-color: rgba(255, 255, 255, 0.2);
    color: #cbd5e1;
  }
  .sub-nav-btn:hover:not(.disabled) {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.9);
  }
  .dark .sub-nav-btn:hover:not(.disabled) {
    background: rgba(30, 41, 59, 0.9);
  }
  .sub-nav-btn.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .sub-index {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1e293b;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
  }
  .dark .sub-index {
    color: #cbd5e1;
    background: rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 768px) {
    .sub-nav { right: 0.5rem; }
    .sub-nav-btn { width: 36px; height: 36px; font-size: 1rem; }
    .sub-index { font-size: 0.7rem; }
  }
  </style>