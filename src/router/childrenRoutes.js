// 把路由的子路由抽取成单独的js文件

// 导入子路由文件
import chart from '@/views/index/components/chart/chart';
import user from '@/views/index/components/user/user';
import business from '@/views/index/components/business/business';
import question from '@/views/index/components/question/question';
import subject from '@/views/index/components/subject/subject';


// 导出
export default [{
    path: 'chart', // 子路由可以不加 / 
    component: chart,
    meta: { name: '数据概览', icon: 'el-icon-pie-chart', title: 'Face To Face  数据概览', roles: ['超级管理员', '管理员'] }
},
{
    path: 'user', // 子路由可以不加 / 
    component: user,
    meta: { name: '用户列表', icon: 'el-icon-user', title: 'Face To Face  用户列表', roles: ['超级管理员', '管理员'] }
},
{
    path: 'question', // 子路由可以不加 / 
    component: question,
    meta: { name: '题库列表', icon: 'el-icon-notebook-1', title: 'Face To Face  题库列表', roles: ['超级管理员', '管理员', '老师', '学生'] }
},
{
    path: 'business', // 子路由可以不加 / 
    component: business,
    meta: { name: '企业列表', icon: 'el-icon-edit-outline', title: 'Face To Face  企业列表', roles: ['超级管理员', '管理员', '老师'] }
},
{
    path: 'subject', // 子路由可以不加 / 
    component: subject,
    meta: { name: '学科列表', icon: 'el-icon-office-building', title: 'Face To Face  学科列表', roles: ['超级管理员', '管理员', '老师', '学生'] }
}]