<template>
  <NavBarComp title="修改信息" />
  <div class="update-wrap">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="images" :max-count="1" :after-read="uploadImg" />
          </template>
        </van-field>

        <van-field v-model="userName" name="姓名" label="姓名" :rules="[{ required: true, message: '请填写用户名' }]" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import NavBarComp from '@/components/NavBar/index.vue';
import { useGlobalStore } from '@/stores/modules/global';
import request from '@/api/modules/news';
import { showFailToast, showSuccessToast } from 'vant';
import router from '@/router';
const globalStore = useGlobalStore();
const { userInfo } = storeToRefs(globalStore);

// 更新页面状态数据
const state = reactive({
  images: [
    {
      url: userInfo.value?.pic
    }
  ],
  userName: userInfo.value?.name
});
const { images, userName } = toRefs(state);

// 上传图片
const uploadImg = async (fileObj: any) => {
  try {
    let res = await request.upload(fileObj.file);
    if (+res.code !== 0) {
      return showFailToast('上传失败');
    }
    state.images = [
      {
        url: res.pic
      }
    ];
  } catch (_) {}
};

// 提交更新信息
const onSubmit = async () => {
  if (state.images.length === 0) {
    return showFailToast('请先上传图片');
  }
  try {
    const res = await request.userUpdate({
      username: state.userName?.trim() as string,
      pic: state.images[0].url as string
    });
    if (+res.code !== 0) {
      return showFailToast('修改信息失败');
    }
    showSuccessToast('修改信息成功');
    // 同步pinia数据
    globalStore.queryUserInfoAsync();
    router.go(-1);
  } catch (error) {}
};
</script>

<style lang="scss" scoped></style>
