<template>
  <!-- element 版本 -->
  <!-- <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider> -->

  <router-view></router-view>
</template>

<script setup lang="ts">
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';
// const locale = computed(() => {
//   return zhCn;
// });

/* 处理最大宽度 */
(function () {
  const handleMax = function handleMax() {
    let html = document.documentElement,
      root = document.getElementById('app') as HTMLElement,
      deviceW = html.clientWidth;
    root.style.maxWidth = '750px';
    if (deviceW >= 750) {
      html.style.fontSize = '75px';
    }
  };
  handleMax();
})();
</script>

<style lang="scss">
html,
body {
  height: 100%;
  background: #eeeeee;
}
#app {
  min-height: 100%;
  margin: 0 auto;
  background: #ffffff;
}
</style>
