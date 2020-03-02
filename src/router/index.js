// 抽取后的路由文件

// 导入vue组件
import Vue from 'vue';
// 导入路由组件
import vueRouter from 'vue-router';

// 导入其他子组件
import login from '../views/login/index';
import index from '@/views/index/index';
// 主页面的子路由
// 导入抽取后的子路由js文件
import childrenRoutes from '@/router/childrenRoutes.js';

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
        meta: { name: 'Face To Face  登录', roles: ['超级管理员', '管理员', '老师', '学生'] }
    },
    {
        path: '/index',  // 首页的路由
        component: index,
        meta: { title: 'Face To Face  主页', roles: ['超级管理员', '管理员', '老师', '学生'] },
        // 主页的子路由  抽取后的子路由
        children: childrenRoutes
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
                Message.warning('登录状态异常，请重新登录！');
                // 删除错误token请跳转到登录页
                removeToken();
                next('/login');  // 放行到登录页，可以直接传地址
                // 手动结束进度条
                NProgress.done();
            } else {
                // 不光要在状态码正确的时候才能登录，而且还要保证此账号是启用状态
                if (res.data.code === 200 && res.data.data.status == 1) {
                    // 给vuex中的数据赋值
                    store.commit('usernameChange', res.data.data.username);
                    store.commit('avatarChange', process.env.VUE_APP_URL + '/' + res.data.data.avatar);
                    // 获取到数据之后给vuex中的存储角色的变量赋值
                    store.commit('roleChange',res.data.data.role);
                    // 判断一下，只有在从login页面跳转过来的时候才需要弹框
                    if (from.path == '/login') {
                        // 弹框提示登录成功
                        Message.success("恭喜你，登录成功！");
                    }
                    // 除此之外，还要判断一下该用户的权限是否可以访问该访问的页面
                    if (!(to.meta.roles.includes(res.data.data.role))) {
                        // 说明不存在，该用户无法访问要弹框提示，并将地址跳转到访问前的路径下
                        Message.warning('很抱歉，目前来看，你的账号还没有为你开通访问该页面的权限');
                        // 跳转回来时候的页面
                        next(from.path);
                        // 手动关闭进度条
                        NProgress.done();
                    } else {
                        // next是一个函数，调用这个函数代表放行
                        next();
                    }
                } else {
                    // 否则就跳转回登录页，并弹出提示
                    next('/login');
                    Message.warning('此账号已被禁用，具体请联系管理员');
                    // 手动结束进度条
                    NProgress.done();
                }
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
    document.title = from.meta.title;
})

// 导出路由文件
export { router };