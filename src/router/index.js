// 抽取后的路由文件

// 导入vue组件
import Vue from 'vue';
// 导入路由组件
import vueRouter from 'vue-router';

// 导入其他子组件
import login from '../views/login/index';
import index from '@/views/index/index';
// 主页面的子路由
import chart from '@/views/index/components/chart/chart';
import user from '@/views/index/components/user/user';
import business from '@/views/index/components/business/business';
import question from '@/views/index/components/question/question';
import subject from '@/views/index/components/subject/subject';


// 导入进度条NProgress插件和css文件
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 注册路由
Vue.use(vueRouter);

// 设置路由规则
const routes = [
    {
        path: '/login', // 登录页面的路由
        component: login
    },
    {
        path: '/index',  // 首页的路由
        component: index,
        children: [ // 主页的子路由
            {
                path: 'chart', // 子路由可以不加 / 
                component: chart
            },
            {
                path: 'user', // 子路由可以不加 / 
                component: user
            },
            {
                path: 'business', // 子路由可以不加 / 
                component: business
            },
            {
                path: 'question', // 子路由可以不加 / 
                component: question
            },
            {
                path: 'subject', // 子路由可以不加 / 
                component: subject
            }
        ]
    },
    { // 路由重定向
        path: '*',
        redirect: '/index' // 跳转的地址路径
    }
]

// 创建路由对象
const router = new vueRouter({
    // 设置路由规则
    routes
})


// 导航守卫
// 路由跳转前的钩子
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    // to 到哪里去
    // from 从哪里去
    // 他们两个都是一个对象，对象中的path 是他们的路径
    // 开启进度条
    NProgress.start();

    // next是一个函数，调用这个函数代表放行
    next();
})

// 路由跳转后的钩子 跳转后执行
router.afterEach(() => {
    // to and from are both route objects.
    // 结束进度条
    NProgress.done();
})

// 导出路由文件
export { router };