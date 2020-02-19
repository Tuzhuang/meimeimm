import Vue from 'vue'
import App from './App.vue'
// 导入抽取后的路由文件
import router from './router/index';


Vue.config.productionTip = false


// 挂载到vue实例里
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
