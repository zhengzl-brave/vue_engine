<template>
  <NavBarComp title="个人中心" />
  <div class="person" v-if="userInfo">
    <div class="info" @click="handleToUpdate">
      <img :src="userInfo.pic" />
      <p>{{ userInfo.name }}</p>
    </div>
    <div class="list">
      <router-link to="/store" class="item">
        <span>我的收藏</span>
        <span><van-icon name="arrow" /></span>
      </router-link>
      <div class="item" @click="logOut">
        <span>退出登录</span>
        <span><van-icon name="arrow" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarComp from '@/components/NavBar/index.vue';
import { useGlobalStore } from '@/stores/modules/global';
import router from '@/router';
const globalStore = useGlobalStore();
const { userInfo } = storeToRefs(globalStore);

// 退出登录
const logOut = () => {
  globalStore.removeUser();
  router.push({ path: '/login', replace: true });
};

// 点击头像跳转更新页面
const handleToUpdate = () => {
  router.push('/update');
};
</script>

<style lang="scss" scoped>
.person {
  padding: 30px 16px;
  .info {
    font-size: 16px;
    text-align: center;
    img {
      width: 120px;
      height: 120px;
      margin-bottom: 16px;
      border-radius: 50%;
    }
  }
  .list {
    padding-top: 50px;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      color: #000000;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
