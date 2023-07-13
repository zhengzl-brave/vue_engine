import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/stores';
import * as Icons from '@element-plus/icons-vue';
// reset style
import '@/styles/reset.scss';

const app = createApp(App);

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
// vue router
app.use(router);
// pinia store
app.use(store);

app.mount('#app');
