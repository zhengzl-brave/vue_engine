<template>
  <div class="detail-wrap" v-if="info">
    <div class="cont" v-html="info.body"></div>
    <div class="footer">
      <span @click="handleLeft"><van-icon name="arrow-left" /></span>
      <span><van-icon name="chat-o" badge="9" /></span>
      <span><van-icon name="like-o" badge="9" /></span>
      <span @click="handleStore" :class="{ 'has-store': isStore }"><van-icon name="star-o" /></span>
      <span><van-icon name="ellipsis" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from '@/api/modules/news';
import { DetailState } from '../interface';
import router from '@/router';
import { useLikeStore } from '@/stores/modules/store';
import { useGlobalStore } from '@/stores/modules/global';
import { showFailToast, showSuccessToast } from 'vant';
const likeStore = useLikeStore();
const globalStore = useGlobalStore();
const { token, currentRoute } = storeToRefs(globalStore);
const { storeList } = storeToRefs(likeStore);

const route = useRoute();
const state = reactive<DetailState>({
  info: null
});
const { info } = toRefs(state);

// 获取新闻详情内容
const getNewDetail = async () => {
  const res = await request.queryNewsInfo(route.params.id as string);
  state.info = res;
  loadStyle(res.css);
  // 加载图片 这里需要nextTick 因为需要等元素加载完成后才去操作dom
  nextTick(() => {
    loadImg(res.image);
  });
};
getNewDetail();

// 接口返回的样式link添加上去
let link: HTMLLinkElement | null = null;
const loadStyle = (cssList: string[]) => {
  if (!Array.isArray(cssList)) return;
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssList[0];
  document.head.appendChild(link);
};

// 加载图片
const loadImg = (img: string) => {
  let imgPlaceHolder = document.querySelector('.img-place-holder');
  if (!imgPlaceHolder) return;
  let tempImg = new Image();
  tempImg.src = img;
  tempImg.onload = () => {
    imgPlaceHolder?.appendChild(tempImg);
  };
  tempImg.onerror = () => {
    let parent = imgPlaceHolder?.parentNode;
    parent?.parentNode?.removeChild(parent);
  };
};

// 判断是否是收藏状态
const isStore = computed(() => {
  if (!storeList.value) return false;
  return storeList.value.some(item => item.news.id === route.params.id);
});

// 点击收藏
const handleStore = async () => {
  if (!token.value) {
    showFailToast('请先完成登录');
    router.push({ path: '/login', replace: true });
    return;
  }

  // 已收藏的相当于点击后删除该收藏项
  if (isStore.value) {
    let item = storeList.value.find(item => +item.news.id === +route.params.id);
    if (!item) return;
    const res = await request.storeRemove(item.id);
    if (+res.code !== 0) {
      return showFailToast('操作失败');
    }
    likeStore.removeOneStore(item.id);
    return showSuccessToast('取消收藏成功');
  }

  // 未收藏的点击后添加收藏项
  try {
    const res = await request.store({
      newsId: route.params.id as string
    });
    if (+res.code !== 0) {
      return showFailToast('操作失败');
    }
    showSuccessToast('添加收藏成功');
    await likeStore.getStoreList();
  } catch (_) {}
};

// 点击左侧返回按钮
const handleLeft = () => {
  if (currentRoute.value === '/login') {
    router.push('/home');
    return;
  }
  router.go(-1);
};

// 初始化加载pinia中收藏列表用于判断是否收藏了
onMounted(async () => {
  if (token.value) {
    await likeStore.getStoreList();
  }
});
onBeforeUnmount(() => {
  if (link) document.head.removeChild(link);
});
</script>

<style lang="scss" scoped>
.detail-wrap {
  :deep(.content-wrap) {
    .img-place-holder {
      height: 375px;
    }
    .content-inner {
      margin-bottom: 50px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    padding: 0;
    background: #dddddd;
    span {
      font-size: 24px;
      color: rgb(0 0 0 / 80%);
    }
    .has-store {
      color: blue;
    }
    :deep(.van-icon) {
      .van-badge {
        color: rgb(0 0 0 / 60%);
        background: unset;
        border: unset;
      }
      .van-badge--top-right {
        right: -4px;
      }
    }
  }
}
</style>
