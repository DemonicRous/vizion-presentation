import { createRouter, createWebHistory } from 'vue-router'

// Список слайдов для навигации (используется в NavigationBar)
export const slideNames = [
    'intro', 'problems', 'goals', 'architecture',
    'tasks', 'audits', 'scoring', 'efficiency', 'conclusion'
  ]

// Функция для динамического импорта компонентов слайдов
const loadSlide = (name) => {
  // имя компонента: SlideIntro.vue, SlideProblems.vue и т.д.
  return () => import(`../views/slides/Slide${capitalize(name)}.vue`)
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/:slide',
    name: 'slide',
    component: () => import('../views/HomeView.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      const slide = to.params.slide
      if (slideNames.includes(slide)) {
        next()
      } else {
        next('/intro')
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/intro'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router