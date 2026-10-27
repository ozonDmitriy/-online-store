import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/homePage.vue'
import Catalog from '../pages/catalogPage.vue'
import Cart from '../pages/cartPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: Catalog },
  { path: '/cart', component: Cart },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: () => import('@/pages/cartPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
