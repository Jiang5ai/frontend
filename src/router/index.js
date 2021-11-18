import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from '../components/project/Project.vue'
import Module from '../components/module/Module.vue'
import testCase from '../components/Case/Case.vue'
import testTask from '../components/testTask/testTask.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Project',
        component: Project
    },
    {
        path: '/module',
        name: 'Module',
        component: Module
    },
    {
        path: '/case',
        name: 'testCase',
        component: testCase
    },
    {
        path: '/task',
        name: 'testTask',
        component: testTask
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
