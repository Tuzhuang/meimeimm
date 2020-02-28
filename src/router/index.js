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
// 导入请求用户信息的info方法
import { info } from '@/api/index.js';
// 导入element-ui单独的消息提示弹框
import { Message } from 'element-ui';
// 导入删除token的方法
import { getToken, removeToken } from '@/utilis/token.js';

// 导入vuex文件
import store from '@/store/index'


// 注册路由
Vue.use(vueRouter);

// 路由白名单
let whiteRouter = ['/login'];

// 设置路由规则
const routes = [
    {
        path: '/login', // 登录页面的路由
        component: login,
        meta:{name:'Face To Face  登录'}
    },
    {
        path: '/index',  // 首页的路由
        component: index,
        meta:{name:'Face To Face  主页'},
        children: [ // 主页的子路由
            {
                path: 'chart', // 子路由可以不加 / 
                component: chart,
                meta:{name:'Face To Face  数据概览'}
            },
            {
                path: 'user', // 子路由可以不加 / 
                component: user,
                meta:{name:'Face To Face  用户列表'}
            },
            {
                path: 'business', // 子路由可以不加 / 
                component: business,
                meta:{name:'Face To Face  题库列表'}
            },
            {
                path: 'question', // 子路由可以不加 / 
                component: question,
                meta:{name:'Face To Face  企业列表'}
            },
            {
                path: 'subject', // 子路由可以不加 / 
                component: subject,
                meta:{name:'Face To Face  学科列表'}
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

    // 进行未登录判断，先判断要去的页面是不是登录页，如果是就放行，不是就进行判断
    if (whiteRouter.includes(to.path)) {
        next();
    } else {
        // 调用获取用户信息的接口判断是否登录成功
        info().then(res => {
            // console.log(res);
            if (getToken() == null) {
                // 说明没有登录，提示信息并跳转到登录页
                Message.error('你还没有登录，请先登录再进入官网！');
                next('/login'); // 可以直接写要放行的页面
            } else if (res.data.code != 200) {
                // 说明登录信息异常，那就跳转到登录页，并且弹框提示，并删除错误token
                Message.error('登录状态异常，请重新登录！');
                // 删除错误token请跳转到登录页
                removeToken();
                next('/login');  // 放行到登录页，可以直接传地址
                // 手动结束进度条
                NProgress.done();
            } else {
                if(res.data.code === 200){
                    // 给vuex中的数据赋值
                    store.commit('usernameChange',res.data.data.username);
                    store.commit('avatarChange',process.env.VUE_APP_URL+'/'+ res.data.data.avatar);
                }
                // next是一个函数，调用这个函数代表放行
                next();
            }
        })
    }


})

// 路由跳转后的钩子 跳转后执行
router.afterEach((from) => {
    // to and from are both route objects.
    // 结束进度条
    NProgress.done();

    // 根据路由元信息来设置页面的title
    // console.log(from.meta.name);
    document.title = from.meta.name;
})

// 导出路由文件
export { router };