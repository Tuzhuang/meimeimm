// 抽取后的路由文件

// 导入vue组件
import Vue from 'vue';
// 导入路由组件
import vueRouter from 'vue-router';

// 导入其他子组件
import login from '../views/login/index';
// 注册路由
Vue.use(vueRouter);

// 设置路由规则
const routes = [
    {
        path:'/login',
        component:login
    }
]

// 创建路由对象
const router = new vueRouter({
    // 设置路由规则
    routes
})

// 导出路由文件
export {router};