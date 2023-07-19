<template>
  <van-nav-bar :title="title" left-arrow left-text="返回" @click-left="onClickLeft" />
</template>

<script setup lang="ts">
import router from '@/router';
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore();
const { currentRoute } = storeToRefs(globalStore);
defineProps({
  title: String
});

// navbar点击返回,登录页需要特殊处理下，因为登录是用repalce: true 直接覆盖了原有history路径
const onClickLeft = () => {
  if (currentRoute.value !== '/login') {
    router.push(currentRoute.value);
    return;
  }
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
