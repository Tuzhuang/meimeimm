// 将关于token的方法全部抽取在这里

// 设置一个token的常量
const TOKENKEY = 'mmtoken';


// 存储token的方法
export function setToken(token){
    window.localStorage.setItem(TOKENKEY,token);
}


// 取出token的方法
export function getToken(){
    return window.localStorage.getItem(TOKENKEY);
}


// 删除token的方法
export function removeToken(){
    window.localStorage.removeItem(TOKENKEY);
}