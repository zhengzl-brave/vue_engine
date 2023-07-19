<template>
  <div class="header">
    <div class="left">
      <div class="date-wrap">
        <p>{{ day }}</p>
        <p>{{ month }}月</p>
      </div>
      <h2>知乎日报</h2>
    </div>
    <div class="right" @click="handleToPerosn">
      <img :src="userInfo ? userInfo.pic : timg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import timg from '@/assets/images/timg.jpg';
import router from '@/router';
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore();
const { userInfo } = storeToRefs(globalStore);

// 外部传入当天日期
const props = defineProps({
  today: String
});
const state = reactive({
  day: '',
  month: ''
});
const { day, month } = toRefs(state);
const chNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

// 监听props数据并对日期格式加工
watch(
  () => props.today,
  val => {
    if (val) {
      state.day = val.slice(-2);
      let monIdx = +val.substring(4, 6);
      state.month = chNum[monIdx];
    }
  }
);

// 点击右上角头像跳转个人主页
const handleToPerosn = () => {
  router.push('/personal');
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 16px;
  .left {
    display: flex;
    align-items: center;
    .date-wrap {
      padding-right: 12px;
      font-size: 16px;
      p {
        margin: 0;
        text-align: center;
      }
    }
    h2 {
      padding-left: 12px;
      font-size: 22px;
      border-left: 1px solid #cccccc;
    }
  }
  .right {
    width: 35px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
