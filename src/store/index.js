import { createStore } from 'vuex'
export default createStore({
    // Store里的state，并不支持长久化存储，一刷新就会变成初始值了
    state: {
        isCollapse:true,
        currentMenu:null,
        menu:[],
        tabsList: [
            {
                path: "/",
                name: "home",
                label: '首页',
                icon: 'home'
            }
        ]
    },
    // 调用mutaitions修改state公共数据。
    // mutations 是 Vuex 中修改 state 的唯一途径。
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name == 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                // 寻找tabslists，是否存在当前val的值，是否早就存在于tabsList里
                let result = state.tabsList.findIndex(item=>item.name === val.name)
                // 如果为-1，说明tabslist没有当前val的值，把它放进state里
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            // splice方法，数组的添加和删除，有多个参数， (index, nums, val1, val2)
            // 其中index为要操作的的索引起始位置，当nums为n的时候，就从改index索引为起始位置，往后删除(当写上val1和val2的时候就替换val1, val2)nums个元素。
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            // 因为浏览器刷新，会导致state消失，在这里我们做本地存储化。
            localStorage.setItem('menu', JSON.stringify(val))
        },
        // 根据menu的状态，获取此时menu的状态并将对应的路由功能，实现到导航栏里面。
        getMenu(state, router) {
            // 如果从来没有登陆过，本地会没有本地存储对应menu的键值对，退出函数停止渲染导航栏。
            if (!localStorage.getItem('menu')) {
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                // 拥有孩子路由的路由，对他的孩子路由进行处理，每一个孩子都添加路由的component属性
                if(item.children) {
                    item.children = item.children.map(item => {
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(url)
                    return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            })
            // 根据menu的状态，将处理过后的路由放到路由里。
            menuArray.forEach(item => {
                router.addRoute('home1', item)
            })
        },
        
    }
})