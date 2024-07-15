/* 
    环境配置文件
    一般在企业级项目里面有三个环境
    开发环境、测试环境、线上环境
*/
const env = import.meta.env.MODE  ||  'pro'
const EnvConfig = {
    // 开发环境
    development: {
        baseApi: '',
        mockApi: '',
    },
    // 测试环境
    test: {
        baseApi: '',
        mockApi: '',
    },
    // 线上环境
    pro: {
        baseApi: '',
        mockApi: '',
    }
}

export default {
    env,
    // mock总开关，设置为True就调用mock的api
    mock:true,
    ...EnvConfig[env]
}