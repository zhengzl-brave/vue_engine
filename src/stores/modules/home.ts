import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';

export const useHomeStore = defineStore({
  id: 'demo-home',
  state: () => ({}),
  getters: {},
  actions: {},

  // 如果不需要持久化存储就不用以下代码
  persist: piniaPersistConfig('demo-home')
});
