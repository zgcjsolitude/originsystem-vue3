import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { ElMessage } from 'element-plus';
import service from '@/api/os-api'

import OSfrontRouter from './OSfrontRouter'
import OSadminRouter from './OSadminRouter'
import BlogSpaceRouter from './BlogSpaceRouter'
import WebDevelopGuideRouter from './WebDevelopGuide/index'
import TextCollection from './TextCollection';

import Test from '@/views/test.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", redirect: '/originsystem' }, 
        { path: "/index", redirect: '/originsystem' }, 
        { path: "/test", component: Test}, 
        ...OSfrontRouter,
        ...OSadminRouter,
        ...BlogSpaceRouter,
        ...WebDevelopGuideRouter,
        ...TextCollection
    ],
    strict: true,
})

import { store } from '../store/index';
router.beforeEach(async (to, from, next) => {
    // 网站名
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = 'OriginSystem'
    }

    // 用户登录和信息载入
    if (store && store.state && !store.state.storeLoading) {
        await store.dispatch('storeLoadEvent')
    }

    // 路由权限验证
    if (to?.meta?.requireAuth) {
        const userAuthority = store.state.userAuthority;
        if (Array.isArray(userAuthority) && userAuthority.length && userAuthority.includes(to.meta.requireAuth)) {
            return next()
        }

        ElMessage.warning('无权限查看页面');
        return next(false)
    } 

    next()
});

router.afterEach((to, from) => {
    // 页面埋点访问次数记录
    if (to?.meta?.pageCodeMap && to.meta.pageCodeMap.length > 0) {
        const pageCodeMap = to.meta.pageCodeMap;

        let pageCode = '';
        pageCodeMap.forEach(el => {
            if (el.tagList && !el.tagList.length && el.pageCode) {
                pageCode = el.pageCode;
            }
        });
        if (pageCode) {
            service.Modify_webpagemsg_visitingTime({ pageCode: pageCode })
        }
    }
});

export default router