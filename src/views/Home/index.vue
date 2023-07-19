<template>
  <div class="home-wrap">
    <Header :today="today" />
    <div class="swiper">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="item in banners" :key="item.id">
          <img :src="item.image" />
          <div class="info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.hint }}</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list-wrap">
      <div class="day-item" v-for="(item, index) in newsList" :key="index">
        <van-divider content-position="left" v-if="index !== 0">{{ item.date }}</van-divider>
        <NewsItem v-for="story in item.stories" :key="story.id" :info="story" />
      </div>
      <div class="loadMore" ref="loadMore" :style="{ display: newsList.length === 0 ? 'none' : 'block' }">
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { News } from '@/api/interface';
import request from '@/api/modules/news';
import Header from '@/components/Header/index.vue';
import NewsItem from '@/components/NewsItem/index.vue';

// state响应式数据
const state = reactive<News.StateType>({
  banners: [],
  newsList: [],
  today: ''
});
const { banners, newsList, today } = toRefs(state);

// 获取loadMore
const loadMore = ref<HTMLDivElement>();

// 获取轮播数据、新闻列表数据
const getNewsList = async () => {
  const res = await request.queryNewsLatest();
  state.banners = res.top_stories;
  state.newsList.push({ date: res.date, stories: res.stories });
  state.today = res.date;
};
getNewsList();

// 监听loadmore视口展示加载数据
let ob: IntersectionObserver | null = null;
const loadingObserve = () => {
  ob = new IntersectionObserver(async entries => {
    let { isIntersecting } = entries[0];

    if (isIntersecting) {
      let time = state.newsList[state.newsList.length - 1]?.date;
      let res = await request.queryNewsBefore(time);
      state.newsList.push(res);
    }
  });
  ob.observe(loadMore.value as HTMLDivElement);
};

// 生命周期执行
onMounted(() => {
  loadingObserve();
});
onBeforeUnmount(() => {
  ob!.unobserve(loadMore.value as HTMLDivElement);
  ob = null;
  state.newsList = [];
});
</script>

<style lang="scss" scoped>
.home-wrap {
  .swiper {
    position: relative;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
    }
    .info {
      position: absolute;
      bottom: 20px;
      left: 20px;
      h3 {
        font-size: 18px;
        color: #ffffff;
      }
      p {
        padding-top: 8px;
        font-size: 12px;
        color: rgb(255 255 255 / 70%);
      }
    }
  }
  :deep(.van-swipe) {
    height: 100%;
    .van-swipe__indicators {
      left: 85%;
      .van-swipe__indicator {
        border-radius: 3px;
      }
      .van-swipe__indicator--active {
        width: 18px;
      }
    }
  }
  .list-wrap {
    padding: 10px 16px;
  }
}
</style>
