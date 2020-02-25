// 将index主页面的接口封装成方法

// 导入axios
import axios from 'axios';
// 导入抽取后的token函数方法
import { getToken } from '@/utilis/token.js';


// 克隆一个axios对象出来，
// 他的名字叫indexRequest
// 它有一些初始基因，就是设置了基地址，以及请求头携带token
// 所以以后，如果要是通过indexRequest这个对象去发送请求，就会自动有基地址和请求头方法
let indexRequest = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // // 请求头携带token  这里携带token的话，会在项目一运行就请求token，那如果是第一次的话，是没有token，是会报错的
    // headers: {
    //     token: getToken()  // 调用去token方法获取token
    // }
})


// axios的请求拦截器
indexRequest.interceptors.request.use(function(config){
    // config参数就是被拦截下来的请求的配置
    // window.console.log(config)

    // 我们只需要在config里面的headers加一个token就可以；就代表这次请求有token了
    config.headers.token = getToken();
    return config;
},function(error){
    // 对请求的错误做些什么
    return Promise.reject(error);
})



// 获取用户信息的接口
export function info() {
    // return axios({
    //     method: 'get',
    //     url: process.env.VUE_APP_URL + '/info',
    //     headers: {
    //         token: getToken()  // 调用去token方法获取token
    //     }
    // })

    return indexRequest({
        method: 'get',
        url: '/info'
    })
}


// 退出登录的接口
export function logout() {
    // return axios({
    //     method:'get',
    //     url:process.env.VUE_APP_URL+'/logout',
    //     headers:{
    //         token:getToken()  // 调用去token方法获取token
    //     }
    // })

    return indexRequest({
        method: 'get',
        url: '/logout'
    })
}