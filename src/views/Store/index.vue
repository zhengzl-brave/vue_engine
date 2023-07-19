<template>
  <NavBarComp title="我的收藏" />
  <div class="store-wrap">
    <van-swipe-cell v-for="story in stores" :key="story.id">
      <NewsItem :info="story.news" />
      <template #right>
        <van-button square type="danger" text="删除" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script setup lang="ts">
import { useLikeStore } from '@/stores/modules/store';
import NewsItem from '@/components/NewsItem/index.vue';
import NavBarComp from '@/components/NavBar/index.vue';

const likeStore = useLikeStore();
const { storeList } = storeToRefs(likeStore);
const stores = computed(() => {
  return storeList.value;
});

// 收藏列表初始化加载pinia数据
onMounted(async () => {
  await likeStore.getStoreList();
});
</script>

<style lang="scss" scoped>
.store-wrap {
  padding: 5px 16px;
}
.delete-button {
  height: calc(100% - 14px);
}
</style>
