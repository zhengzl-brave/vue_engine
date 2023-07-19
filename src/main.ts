import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/stores';
import * as Icons from '@element-plus/icons-vue';
// reset style
import '@/styles/reset.scss';
// import 'amfe-flexible'; // 这个放在移动端不合适，放大出问题
import 'lib-flexible';
import 'vant/lib/index.css';

const app = createApp(App);

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
// pinia store
app.use(store);

// vue router
app.use(router);
app.mount('#app');
