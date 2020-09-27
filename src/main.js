import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 样式
import App from "./App.vue";
import router from "./router";
import './permission'
Vue.use(ElementUI)
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.VUE_APP_BASE_API)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
