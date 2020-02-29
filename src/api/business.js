// 将business页面的接口请求封装成方法

// 导入抽取后的接口请求
import request from '@/utilis/request.js';


// 请求企业列表数据的方法
export function getBusiData(params){
    return request({
        method:'get',
        url:'/enterprise/list',
        params:params
    })

}


// 修改企业状态的接口
export function busiStatus(data){
    return request({
        method:'post',
        url:'/enterprise/status',
        data:data
    })
}


// 新增企业的接口
export function businessAdd(data){
    return request({
        method:'post',
        url:'/enterprise/add',
        data:data
    })
}


// 修改企业的接口
export function businessEdit(data){
    return request({
        method:'post',
        url:'/enterprise/edit',
        data:data
    })
}


// 删除企业的接口
export function businessDel(data){
    return request({
        method:'post',
        url:'/enterprise/remove',
        data:data
    })
}