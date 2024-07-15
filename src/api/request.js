import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '请求异常，稍后重试'

 const service = axios.create({
    baseURL: config.baseApi
 })

//  在请求前做的事情
 service.interceptors.request.use((req) => {
    // 可以自定义header
    // jwt-token认证的时候
    return req
 })

//  在请求后做的事情
 service.interceptors.response.use((res) => {
    const {code, data, msg} = res.data
    console.log(res.data)
    if (code == 200) {
    return data
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
 })

//  封装核心函数
 function request(options) {
    // 如果options没定义method，那就默认用get方法
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    // 对mock处理
    let isMock = config.mock
    // 如果传过来的options有mock选项，那就按照options为准
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    // 对线上环境做处理
    if (config.env == 'pro') {
        // 如果是线上环境，不使用mock
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
 }

 export default request