/* 
    对整个项目api的管理
*/
import request from './request'

export default {
    getTableData(params) {
        return request({
            url: '/home/getHomeData',
            method: 'get',
            mock: true,
            data: params,
        })
    },
    getCountData(params) {
        return request({
            url:'/home/getCountData',
            method: 'get',
            mock: true,
            data: params
        })
    },
    getChartData(params) {
        return request({
            url:'/home/getChartData',
            method: 'get',
            mock: true,
            data: params
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: false,
            data: params
            // {total: 0, page: 1}
        })
    },
    addUser(params) {
        return request({
            url: '/user/addUser',
            method: 'post',
            mock: false,
            data: params
        })
    },
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'put',
            mock: false,
            data: params
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            mock: false,
            data: params
        })
    },
    // 根据用户名的不同 返回不一样的菜单列表
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            mock:false,
            data: params
        })
    }
}