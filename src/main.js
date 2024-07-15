// 导入全局样式
// import './assets/main.css'
import './assets/less/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock.js'
import api from './api/api.js'

const app = createApp(App)

// 注册创建icon的组件，icon的动态图表其实是一个组件来的，需要注册
// 通过:is属性在component这个占位标签上替换注册

// 导入Element-PLUS动态图标
// 导入完毕后，你就可以使用    
          // <component :is="value"></component>
// 的样式去注册一个动态图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


  
// 全局注册vue-echarts
import Echarts from "vue-echarts"
import * as echarts from "echarts"
app.component("v-chart",Echarts)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$api = api

// 将此时的本地Menu值获取，并且渲染页面和路由
store.commit("getMenu", router);

app.use(router).use(ElementPlus).use(store)
app.mount('#app')
