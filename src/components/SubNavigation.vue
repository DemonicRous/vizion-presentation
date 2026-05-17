<!-- src/components/SubNavigation.vue -->
<template>
    <div v-if="hasSub && subCount > 1" class="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3">
      <button
        @click="onUp"
        class="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
        :disabled="currentSub === 0"
      >
        <ArrowUp class="w-5 h-5" />
      </button>
      <span class="text-sm text-center text-gray-700 dark:text-gray-300 font-mono">
        {{ currentSub + 1 }} / {{ subCount }}
      </span>
      <button
        @click="onDown"
        class="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
        :disabled="currentSub === subCount - 1"
      >
        <ArrowDown class="w-5 h-5" />
      </button>
    </div>
  </template>
  
  <script setup>
  import ArrowUp from './icons/ArrowUp.vue'
  import ArrowDown from './icons/ArrowDown.vue'
  
  const props = defineProps({
    hasSub: { type: Boolean, default: false },
    subCount: { type: Number, default: 0 },
    currentSub: { type: Number, default: 0 }
  })
  
  const emit = defineEmits(['up', 'down'])
  
  const onUp = () => emit('up')
  const onDown = () => emit('down')
  </script>