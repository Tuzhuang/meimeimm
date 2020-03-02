// 导入vue
import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';

// 注册使用
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 存数据
        username: '',
        avatar: '',
        role: '' // 用来存当前用户的角色
    },
    mutations: {
        // 存方法
        usernameChange(state, val) {
            state.username = val;
        },
        avatarChange(state, val) {
            state.avatar = val;
        },
        // 专门用来修改当前用户角色的方法
        roleChange(state, val) {
            state.role = val;
        }
    }
})

// 暴露出去
export default store;