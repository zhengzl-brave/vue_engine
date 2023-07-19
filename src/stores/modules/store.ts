import request from '@/api/modules/news';
import { defineStore } from 'pinia';
import { LikeStore } from '../interface';

export const useLikeStore = defineStore({
  id: 'demo-like',
  state: (): LikeStore => ({
    storeList: []
  }),
  getters: {},
  actions: {
    async getStoreList() {
      const res = await request.storeList();
      if (+res.code === 0) {
        this.storeList = res.data;
      }
    },
    removeOneStore(id: string | number) {
      this.storeList = this.storeList.filter(item => item.id !== id);
    }
  }
});
