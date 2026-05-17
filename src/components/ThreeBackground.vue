<template>
    <div class="three-container">
      <canvas ref="canvas" class="three-canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import * as THREE from 'three'
  import { isDark } from '@/utils/theme'
  
  const canvas = ref(null)
  let scene, camera, renderer
  let particleSystem, outerSystem
  let animationId = null
  let targetRotation = { x: 0, y: 0 }
  let currentRotation = { x: 0, y: 0 }
  
  const palettes = {
    dark: {
      colors: [0x3b82f6, 0x8b5cf6, 0x60a5fa, 0xa78bfa, 0x4f46e5],
      bg: 0x0a0f1a,
      opacity: 0.65,
      size: 0.075,
      blending: THREE.AdditiveBlending,
      brightness: [0.5, 0.9]
    },
    light: {
      colors: [0x3b82f6, 0x7c3aed, 0x6366f1, 0x8b5cf6, 0x4f46e5],
      bg: 0xf0f4fa,
      opacity: 0.55,
      size: 0.07,
      blending: THREE.NormalBlending,
      brightness: [0.7, 1.0]
    }
  }
  
  const getPalette = () => isDark.value ? palettes.dark : palettes.light
  
  const generatePositions = (count, radiusMin, radiusMax) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radiusMin + Math.random() * (radiusMax - radiusMin)
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i*3+2] = r * Math.cos(phi)
    }
    return positions
  }
  
  const applyColors = (points) => {
    const palette = getPalette()
    const count = points.geometry.attributes.position.count
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const hex = palette.colors[Math.floor(Math.random() * palette.colors.length)]
      const color = new THREE.Color(hex)
      const bright = palette.brightness[0] + Math.random() * (palette.brightness[1] - palette.brightness[0])
      colors[i*3] = color.r * bright
      colors[i*3+1] = color.g * bright
      colors[i*3+2] = color.b * bright
    }
    points.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }
  
  const createParticleLayer = (count, radiusMin, radiusMax, sizeFactor) => {
    const positions = generatePositions(count, radiusMin, radiusMax)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const palette = getPalette()
    const material = new THREE.PointsMaterial({
      size: palette.size * sizeFactor,
      vertexColors: true,
      transparent: true,
      opacity: palette.opacity,
      blending: palette.blending
    })
    const points = new THREE.Points(geometry, material)
    applyColors(points)
    return points
  }
  
  const init = () => {
    if (!canvas.value) return
    const palette = getPalette()
  
    scene = new THREE.Scene()
    scene.background = new THREE.Color(palette.bg)
  
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 6.5)
  
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
    particleSystem = createParticleLayer(2400, 4.2, 6.2, 1.0)
    outerSystem = createParticleLayer(1400, 7.2, 9.0, 0.65)
    scene.add(particleSystem)
    scene.add(outerSystem)
  
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      update()
      renderer.render(scene, camera)
    }
    animate()
  }
  
  let time = 0
  const update = () => {
    time += 0.01
  
    const easing = 0.05
    currentRotation.x += (targetRotation.x - currentRotation.x) * easing
    currentRotation.y += (targetRotation.y - currentRotation.y) * easing
    const maxAngle = 0.35
    camera.position.x = currentRotation.x * 1.2
    camera.position.y = -currentRotation.y * 0.9
    camera.lookAt(0, 0, 0)
  
    particleSystem.rotation.y = time * 0.06
    particleSystem.rotation.x = Math.sin(time * 0.04) * 0.1
    outerSystem.rotation.y = time * 0.04
    outerSystem.rotation.x = Math.cos(time * 0.03) * 0.07
  
    const pulse = 0.6 + Math.sin(time * 1.6) * 0.2
    const palette = getPalette()
    particleSystem.material.opacity = palette.opacity * pulse
    outerSystem.material.opacity = palette.opacity * 0.6 * pulse
  }
  
  const onMouseMove = (e) => {
    targetRotation.x = (e.clientX / window.innerWidth) * 0.8 - 0.4
    targetRotation.y = (e.clientY / window.innerHeight) * 0.5 - 0.25
  }
  
  const onResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  const updateTheme = () => {
    const palette = getPalette()
    scene.background = new THREE.Color(palette.bg)
  
    const updateLayer = (layer, sizeFactor) => {
      if (!layer) return
      layer.material.size = palette.size * sizeFactor
      layer.material.opacity = palette.opacity
      layer.material.blending = palette.blending
      applyColors(layer)
    }
    updateLayer(particleSystem, 1.0)
    updateLayer(outerSystem, 0.65)
  }
  
  onMounted(() => {
    init()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
  })
  
  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer?.dispose()
  })
  
  watch(isDark, () => {
    updateTheme()
  })
  </script>
  
  <style scoped>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }
  .three-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  </style>