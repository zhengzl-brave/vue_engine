<template>
  <div v-if="info">
    <RouterLink :to="`/detail/${info.id}`">
      <div class="list-item">
        <div class="cont">
          <h3>{{ info.title }}</h3>
          <p v-if="info.hint">{{ info.hint }}</p>
        </div>
        <div class="pic">
          <img :src="images[0]" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { NewsItemProps } from '../interface';

// 外部传入一个对象信息
const props = withDefaults(defineProps<NewsItemProps>(), {
  info: null
});

// 因为该组件用于首页列表和收藏列表，两处图片格式不同，首页是images,收藏页是image,所以做了归一处理
const images = computed(() => {
  if (!props.info?.images) {
    props.info!.images = [props.info!.image!];
  }
  if (!Array.isArray(props.info!.images)) props.info!.images = [''];

  return props.info!.images;
});
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 14px;
  .cont {
    flex: 1;
    padding-right: 10px;
    h3 {
      display: -webkit-box;
      width: 100%;
      overflow: hidden;
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    p {
      padding-top: 5px;
      font-size: 12px;
      color: #999999;
    }
  }
  .pic {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
