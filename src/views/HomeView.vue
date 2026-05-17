<template>
    <Transition name="fade-scale" mode="out-in">
      <component
        :is="currentComponent"
        :key="$route.params.slide"
        :sub-index="subIndex"
      />
    </Transition>
  </template>
  
  <script setup>
  import { computed, defineAsyncComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import { slideNames } from '@/router'
  
  const route = useRoute()
  const slideName = computed(() => route.params.slide || 'intro')
  const subIndex = computed(() => parseInt(route.query.sub) || 0)
  
  // Динамический импорт компонента слайда
  const currentComponent = computed(() => {
    const name = slideName.value
    const componentName = name.charAt(0).toUpperCase() + name.slice(1)
    return defineAsyncComponent(() => import(`@/views/slides/Slide${componentName}.vue`))
  })
  </script>
  
  <style scoped>
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  }
  .fade-scale-enter-from {
    opacity: 0;
    transform: scale(0.96);
  }
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(1.02);
  }
  </style>