import { defineStore } from 'pinia';
import piniaPersistConfig from '@/config/piniaPersist';
import { GlobalState } from '../interface';
import request from '@/api/modules/news';

export const useGlobalStore = defineStore({
  id: 'demo-global',
  state: (): GlobalState => ({
    token: '',
    userInfo: null,
    currentRoute: ''
  }),
  getters: {},
  actions: {
    setGlobalState(key: keyof GlobalState, val: any) {
      this.$patch({ [key]: val });
    },
    async queryUserInfoAsync() {
      const res = await request.queryUserInfo();
      if (+res.code === 0) {
        this.userInfo = res.data;
      }
    },
    removeUser() {
      this.$patch({ token: '', userInfo: null });
    }
  },

  // 如果不需要持久化存储就不用以下代码
  persist: piniaPersistConfig('demo-global')
});
