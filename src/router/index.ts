/*
 * @Author: 阮志雄
 * @Date: 2022-09-28 15:56:03
 * @LastEditTime: 2022-09-30 11:14:17
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \web-gis-vue3\src\router\index.ts
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'leaflet',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/leaflet',
      name: 'leaflet',
      // route level code-splitting
      // this generates a separate chunk (leaflet.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LeafletView.vue'),
    },
    {
      path: '/Imgs3d',
      name: 'Imgs3d',
      // route level code-splitting
      // this generates a separate chunk (Imgs3d.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Imgs3d.vue'),
    },
  ],
})

export default router
