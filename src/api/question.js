// 把题库列表的接口封装成一个js文件

// 导入抽取后的接口请求
import request from '@/utilis/request.js';


// 发布题目的接口
export function quesAdd(data){
    return request({
        method:'post',
        url:'/question/add',
        data:data
    })
}


// 获取题目信息的接口
export function quesInfo(data){
    return request({
        method:'post',
        url:'/question/one',
        data:data
    })
}


// 设置题目状态的接口
export function quesStatus(data){
    return request({
        method:'post',
        url:'/question/status',
        data:data
    })
}


// 删除题目的接口
export function quesRemove(data){
    return request({
        method:'post',
        url:'/question/remove',
        data:data
    })
}


// 编辑题目的接口
export function quesEdit(data){
    return request({
        method:'post',
        url:'/question/edit',
        data:data
    })
}


// 获取题目列表的接口
export function getQuesData(params){
    return request({
        method:'get',
        url:'/question/list',
        params:params
    })
}