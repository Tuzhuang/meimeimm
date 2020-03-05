import Vue from 'vue'
import App from './App.vue'
// 导入抽取后的路由文件
import { router } from './router/index';
// 导入element-ui组件及css文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局的初始化样式
import './style/base.css';
// 导入vuex文件
import store from '@/store/index';
// 导入全局过滤器
import '@/filters/filters.js'
// 导入全局封装好的学科列表下拉框插件
import subjectSelect from '@/components/subjectSelect.vue';
// 导入全局封装好的企业列表下拉框插件
import businessSelect from '@/components/businessSelect.vue';
// 导入全局封装好的城市级联框插件
import ChinaArea from '@/views/index/components/question/components/ChinaArea.vue'
// 导入全局封装好的wangEditor插件
import wangEditor from '@/views/index/components/question/components/wangEditor.vue';
// 导入全局封装好的单选框组插件
import optionItem from '@/views/index/components/question/components/optionItem.vue';
// 导入全局封装好的视频解析的插件
import videoUpload from '@/views/index/components/question/components/videoUpload.vue'


// 注册使用全局插件
Vue.component('subjectSelect', subjectSelect);
Vue.component('businessSelect', businessSelect);
Vue.component('ChinaArea', ChinaArea);
Vue.component('wangEditor',wangEditor);
Vue.component('optionItem',optionItem);
Vue.component('videoUpload',videoUpload);


// 注册使用element-ui
Vue.use(ElementUI);


Vue.config.productionTip = false


// 挂载到vue实例里
new Vue({
  router,
  // 挂载vuex
  store,
  render: h => h(App),
}).$mount('#app')


// 服务器线上地址
// http://183.237.67.218:3002