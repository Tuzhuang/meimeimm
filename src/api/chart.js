// 讲数据概览页面的接口封装到单独的js文件中

// 导入抽取后的接口请求
import request from '@/utilis/request.js';

// 获取数据面板的接口
export function getData(){
    return request({
        method:'post',
        url:'/data/title'
    })
}

//企业题目数据统计的接口
export function getStatistics(){
    return request({
        method:'post',
        url:'/data/statistics'
    })
}