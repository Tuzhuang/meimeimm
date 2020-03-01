// 讲user页面的接口请求抽取成方法

// 导入抽取后的axios设置
import request from '@/utilis/request.js';


// 获取用户列表的接口
export function getUserData(params){
    return request({
        method:'get',
        url:'/user/list',
        params:params
    })
}


// 设置用户状态的接口
export function userStatus(data){
    return request({
        method:'post',
        url:'/user/status',
        data:data
    })
}


// 设置新增用户的接口
export function userAdd(data){
    return request({
        method:'post',
        url:'/user/add',
        data:data
    })
}


// 设置用户编辑的接口
export function userEdit(data){
    return request({
        method:'post',
        url:'/user/edit',
        data:data
    })
}


// 删除用户的接口
export function userDel(data){
    return request({
        method:'post',
        url:'/user/remove',
        data:data
    })
}