import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'
// 拦截请求
// mock的用法，就是导入mockjs模块，创建Mock对象，使用Mock对象的mock方法，第一个参数是拦截的api，第二个就是个数据本身，这里第二个数据就是个对象而已。然后在主js里引入就好了。
// 你也可以去fastmock网站里做一个线上api
Mock.mock('/home/getHomeData', homeApi.getHomeData)
Mock.mock('/home/getCountData', homeApi.getCountData)
Mock.mock('/home/getChartData', 'get', homeApi.getChartData)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.addUser)
Mock.mock(/user\/edit/, 'put', userApi.updateUser)
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)