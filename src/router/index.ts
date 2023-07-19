import { useGlobalStore } from '@/stores/modules/global';
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
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      title: 'Detail'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/Personal/index.vue'),
    meta: {
      title: 'Personal',
      auth: true
    }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/Store/index.vue'),
    meta: {
      title: 'Store',
      auth: true
    }
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('@/views/Update/index.vue'),
    meta: {
      title: 'Update',
      auth: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore();
  const { token } = storeToRefs(globalStore);
  globalStore.setGlobalState('currentRoute', from.fullPath);
  if (to.meta.auth) {
    if (token.value) {
      return next();
    } else {
      return next({ path: `/login`, replace: true });
    }
  }
  next();
});
export default router;
