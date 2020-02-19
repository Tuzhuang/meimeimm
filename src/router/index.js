// 抽取后的路由文件

// 导入vue组件
import Vue from 'vue';
// 导入路由组件
import vueRouter from 'vue-router';

// 注册路由
Vue.use(vueRouter);

// 设置路由规则
const routes = []

// 创建路由对象
const router = new vueRouter({
    // 设置路由规则
    routes
})

// 导出路由文件
export default router;