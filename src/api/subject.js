// 将subject页面的接口请求封装成方法

// 导入axios
import axios from 'axios';
// 导入获取token的方法
import { getToken } from '@/utilis/token'

// 克隆一个axios出来，用来存储基地址
let subjectRequest = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_URL,
    // 设置请求接口允许携带cookie
    withCredentials: true
})


// 设置axios统一请求拦截器设置请求头
// 添加请求拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 设置统一请求头
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 获取学科列表的数据
export function getSubData(params) {
    return subjectRequest({
        method: 'get',
        url: '/subject/list',
        params:params
    })
}


// 修改用户状态的接口
export function subStatus(id){
    return subjectRequest({
        method:'post',
        url:'/subject/status',
        data:{
            id:id
        }
    })
}


// 新增学科的接口
export function subjectAdd(data){
    return subjectRequest({
        method:'post',
        url:'/subject/add',
        data:data
    })
}


// 修改学科的接口
export function subjectEdit(data){
    return subjectRequest({
        method:'post',
        url:'/subject/edit',
        data:data
    })
}


// 删除学科的接口
export function subjectDel(data){
    return subjectRequest({
        method:'post',
        url:'/subject/remove',
        data:data
    })
}