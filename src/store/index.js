// 导入vue
import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';

// 注册使用
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        // 存数据
        username:'',
        avatar:''
    },
    mutations:{
        // 存方法
        usernameChange(state,val){
            state.username = val;
        },
        avatarChange(state,val){
            state.avatar = val;
        }
    }
})

// 暴露出去
export default store;