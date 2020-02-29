// 将subject页面的接口请求封装成方法

// 导入抽取后的接口请求
import request from '@/utilis/request.js';


// 获取学科列表的数据
export function getSubData(params) {
    return request({
        method: 'get',
        url: '/subject/list',
        params:params
    })
}


// 修改用户状态的接口
export function subStatus(id){
    return request({
        method:'post',
        url:'/subject/status',
        data:{
            id:id
        }
    })
}


// 新增学科的接口
export function subjectAdd(data){
    return request({
        method:'post',
        url:'/subject/add',
        data:data
    })
}


// 修改学科的接口
export function subjectEdit(data){
    return request({
        method:'post',
        url:'/subject/edit',
        data:data
    })
}


// 删除学科的接口
export function subjectDel(data){
    return request({
        method:'post',
        url:'/subject/remove',
        data:data
    })
}