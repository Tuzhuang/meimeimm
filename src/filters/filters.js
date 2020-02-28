// 导入vue
import Vue from 'vue';
// 导入monent插件
import moment from 'moment';


Vue.filter('filterTime',function(value){
    return moment(value).format('YYYY-MM-DD');
})