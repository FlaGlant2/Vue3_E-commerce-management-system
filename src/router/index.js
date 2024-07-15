import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
        {
        path:"/",
        name: "login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/Main",
        name: 'home1',
        redirect: "/home",
        component: () => import('../views/Main.vue'),
        children:[]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router