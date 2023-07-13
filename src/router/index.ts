import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
