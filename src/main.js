import Vue from 'vue'
import App from './App.vue'
// 导入抽取后的路由文件
import {router} from './router/index';
// 导入element-ui组件及css文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局的初始化样式
import './style/base.css';

// 注册使用element-ui
Vue.use(ElementUI);


Vue.config.productionTip = false


// 挂载到vue实例里
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
