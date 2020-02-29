// 把接口同样的部分抽取出来

// 导入axios
import axios from 'axios';
// 导入获取token的方法
import {getToken} from '@/utilis/token';


// 克隆一个axios出来用来设置统一的基地址
let request = axios.create({
    // 基地址
    baseURL : process.env.VUE_APP_URL,
    // 设置允许携带cokkie
    withCredentials: true
})


// axios拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 设置请求头，添加token
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 暴露出去
export default request;