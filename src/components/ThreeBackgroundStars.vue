<template>
    <canvas ref="canvas" class="three-canvas"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import * as THREE from 'three'
  
  const props = defineProps({
    theme: {
      type: String,
      default: 'dark',
      validator: (v) => ['dark', 'light'].includes(v)
    },
    particleCount: {
      type: Number,
      default: 4000
    },
    hazeCount: {
      type: Number,
      default: 2000
    },
    coreRadius: {
      type: Number,
      default: 0.6
    },
    interactive: {
      type: Boolean,
      default: true
    },
    autoRotate: {
      type: Boolean,
      default: true
    }
  })
  
  // ----- Цветовые палитры для тем -----
  const THEME_PALETTES = {
    dark: {
      coreColor: 0x8b5cf6,
      coreEmissive: 0x4c1d95,
      particleInner: 0x8b5cf6,   // фиолетовый
      particleOuter: 0x60a5fa,   // голубой
      hazeColor: 0xa78bfa,
      lightColor: 0x8b5cf6,
      backLightColor: 0x3b82f6
    },
    light: {
      coreColor: 0xf9a8d4,       // розовый
      coreEmissive: 0xf472b6,
      particleInner: 0xf9a8d4,
      particleOuter: 0x93c5fd,   // светло‑голубой
      hazeColor: 0xfbcfe8,
      lightColor: 0xf9a8d4,
      backLightColor: 0x93c5fd
    }
  }
  
  const canvas = ref(null)
  let scene, camera, renderer
  let coreSphere, particleCloud, hazeCloud
  let pointLight, backLight
  let animationId = null
  let time = 0
  let mouseX = 0, mouseY = 0
  let isPageVisible = true
  
  // ----- Инициализация сцены (единоразово) -----
  const initScene = () => {
    if (!canvas.value) return
  
    scene = new THREE.Scene()
    scene.background = null
  
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 6)
    camera.lookAt(0, 0, 0)
  
    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // ограничиваем для производительности
  
    // ---- Центральное ядро ----
    const coreGeometry = new THREE.SphereGeometry(props.coreRadius, 64, 64)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x000000,
      roughness: 0.2,
      metalness: 0.8
    })
    coreSphere = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreSphere)
  
    // ---- Основное облако частиц ----
    const pGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(props.particleCount * 3)
    const colors = new Float32Array(props.particleCount * 3)
  
    for (let i = 0; i < props.particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = radius * Math.cos(phi)
  
      // временные цвета (будут переопределены в applyTheme)
      colors[i * 3] = 1
      colors[i * 3 + 1] = 1
      colors[i * 3 + 2] = 1
    }
  
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    particleCloud = new THREE.Points(pGeometry, particleMaterial)
    scene.add(particleCloud)
  
    // ---- Внешняя дымка ----
    const hGeometry = new THREE.BufferGeometry()
    const hPositions = new Float32Array(props.hazeCount * 3)
    for (let i = 0; i < props.hazeCount; i++) {
      const radius = 2.8 + Math.random() * 2.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      hPositions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
      hPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5
      hPositions[i * 3 + 2] = radius * Math.cos(phi)
    }
    hGeometry.setAttribute('position', new THREE.BufferAttribute(hPositions, 3))
    const hazeMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    hazeCloud = new THREE.Points(hGeometry, hazeMaterial)
    scene.add(hazeCloud)
  
    // ---- Освещение ----
    const ambientLight = new THREE.AmbientLight(0x222222)
    scene.add(ambientLight)
  
    pointLight = new THREE.PointLight(0xffffff, 1.2, 12)
    pointLight.position.set(1, 1, 2)
    scene.add(pointLight)
  
    backLight = new THREE.PointLight(0xffffff, 0.6)
    backLight.position.set(-1, -0.5, -2)
    scene.add(backLight)
  
    // Применяем начальную тему
    applyTheme(props.theme)
  }
  
  // ----- Применение цветовой темы -----
  const applyTheme = (theme) => {
    if (!coreSphere || !particleCloud || !hazeCloud) return
  
    const palette = THEME_PALETTES[theme]
  
    // Ядро
    coreSphere.material.color.set(palette.coreColor)
    coreSphere.material.emissive.set(palette.coreEmissive)
    coreSphere.material.emissiveIntensity = 0.9
  
    // Частицы (обновляем цвета в геометрии)
    const colorAttr = particleCloud.geometry.attributes.color
    const count = colorAttr.count
    const colorArray = colorAttr.array
    const inner = new THREE.Color(palette.particleInner)
    const outer = new THREE.Color(palette.particleOuter)
  
    for (let i = 0; i < count; i++) {
      // Вычисляем радиус из позиции (грубо, но для цвета достаточно)
      const x = particleCloud.geometry.attributes.position.getX(i)
      const y = particleCloud.geometry.attributes.position.getY(i)
      const z = particleCloud.geometry.attributes.position.getZ(i)
      const radius = Math.sqrt(x*x + y*y + z*z)
      const mixFactor = Math.min(Math.max((radius - 1.2) / 2.5, 0), 1)
      const mixed = inner.clone().lerp(outer, mixFactor)
      colorArray[i * 3]     = mixed.r
      colorArray[i * 3 + 1] = mixed.g
      colorArray[i * 3 + 2] = mixed.b
    }
    colorAttr.needsUpdate = true
  
    // Дымка
    hazeCloud.material.color.set(palette.hazeColor)
  
    // Освещение
    pointLight.color.set(palette.lightColor)
    backLight.color.set(palette.backLightColor)
  }
  
  // ----- Анимационный цикл -----
  const animate = () => {
    if (!isPageVisible || !renderer) {
      animationId = requestAnimationFrame(animate)
      return
    }
  
    animationId = requestAnimationFrame(animate)
    time += 0.008
  
    // Пульсация ядра
    const scale = 1 + Math.sin(time * 5) * 0.03
    coreSphere.scale.set(scale, scale, scale)
    coreSphere.material.emissiveIntensity = 0.8 + Math.sin(time * 4) * 0.2
  
    // Вращение облаков
    if (props.autoRotate && particleCloud) {
      particleCloud.rotation.y = time * 0.1
      particleCloud.rotation.x = Math.sin(time * 0.2) * 0.1
      hazeCloud.rotation.y = time * 0.05
      hazeCloud.rotation.x = Math.cos(time * 0.15) * 0.05
    }
  
    // Параллакс от мыши
    if (props.interactive) {
      const targetX = mouseX * 0.2
      const targetY = mouseY * 0.1
      camera.position.x += (targetX - camera.position.x) * 0.05
      camera.position.y += (-targetY - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)
    }
  
    renderer.render(scene, camera)
  }
  
  // ----- Обработчики событий -----
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = (e.clientY / window.innerHeight) * 2 - 1
  }
  
  const onResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  const onVisibilityChange = () => {
    isPageVisible = !document.hidden
  }
  
  // ----- Жизненный цикл -----
  onMounted(() => {
    // SSR safety
    if (typeof window === 'undefined') return
  
    initScene()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)
  
    animate()
  })
  
  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  
    // Очистка ресурсов
    if (particleCloud) {
      particleCloud.geometry.dispose()
      particleCloud.material.dispose()
    }
    if (hazeCloud) {
      hazeCloud.geometry.dispose()
      hazeCloud.material.dispose()
    }
    if (coreSphere) {
      coreSphere.geometry.dispose()
      coreSphere.material.dispose()
    }
    renderer?.dispose()
  })
  
  // Следим за сменой темы
  watch(() => props.theme, (newTheme) => {
    applyTheme(newTheme)
  })
  </script>
  
  <style scoped>
  .three-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }
  </style>