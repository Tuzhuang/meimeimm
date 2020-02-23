// 将register页面的接口封装成函数，以便于其他页面的调用

// 先导入axios
import axios from 'axios';

// 请求验证码的接口
export function sendsms(data) {
    return axios({
        method: 'post',
        url: process.env.VUE_APP_URL + "/sendsms",
        data: data,
        // 允许携带cookie        // axios如果发送跨域请求默认不会携带cookie，所以要额外加一个属性
        withCredentials: true
    })
}


// 注册的接口
export function register(data){
    return axios({
        method:'post',
        url:process.env.VUE_APP_URL+'/register',
        data:data,
        // 允许携带cookie
        withCredentials:true
    })
}