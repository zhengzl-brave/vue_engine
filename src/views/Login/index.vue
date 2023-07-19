<template>
  <div class="login-wrap">
    <NavBarComp title="登录/注册" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          center
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" :disabled="disabled" @click="sendCode">{{ codeText }}</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import NavBarComp from '@/components/NavBar/index.vue';
import request from '@/api/modules/news';
import { showFailToast, showSuccessToast } from 'vant';
import { useGlobalStore } from '@/stores/modules/global';
import router from '@/router';

const globalStore = useGlobalStore();
const { currentRoute } = storeToRefs(globalStore);

// 登录的状态数据
const state = reactive({
  phone: '',
  code: '',
  codeText: '发送验证码',
  disabled: false
});
const { phone, code, codeText, disabled } = toRefs(state);

let timer: number | null = null,
  num = 31;

// 验证码倒计时及文本状态变更
const countDown = () => {
  num--;
  if (num === 0) {
    clearInterval(Number(timer));
    timer = null;
    state.codeText = '发送验证码';
    state.disabled = false;
    return;
  }
  state.codeText = `${num}秒后重发`;
};

// 发送验证码
const sendCode = async () => {
  try {
    const res = await request.sendPhoneCode({
      phone: state.phone
    });
    if (+res.code! !== 0) {
      showFailToast('发送失败');
    }
    showSuccessToast('发送成功');
    state.disabled = true;
    countDown();
    if (!timer) timer = Number(setInterval(countDown, 1000));
  } catch (_) {
    showFailToast('发送失败');
  }
};

// 提交登录
const onSubmit = async () => {
  try {
    const res = await request.login({
      phone: state.phone,
      code: state.code
    });
    if (+res.code !== 0) {
      showFailToast('登录失败');
    }
    // 存储token
    globalStore.setGlobalState('token', res.token);
    showSuccessToast('登录成功');
    // 登录后重新加载pinia用户数据
    await globalStore.queryUserInfoAsync();
    router.push({ path: currentRoute.value, replace: true });
  } catch (_) {}
};

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>

<style lang="scss" scoped></style>
