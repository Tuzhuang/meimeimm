// 将login页面的接口封装成方法，以便于其他页面的调用

// 先导入axios
import axios from 'axios';

// 用户登录接口
export function login(data) {
    return axios({
        method: 'post',
        url: process.env.VUE_APP_URL + '/login',
        data: data,
        // 允许携带cookie
        withCredentials: true
    })
}