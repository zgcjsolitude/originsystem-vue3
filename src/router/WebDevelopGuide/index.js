const WebDevelopGuide = () => import('@/views/WebDevelopGuide/index.vue')

import { CjuiCompRouter } from './CjuiCompRouter';
import { CjuiStyleRouter } from './CjuiStyleRouter';

let cjuiCompRouterList = [];
CjuiCompRouter.forEach(el => {
    cjuiCompRouterList = [...cjuiCompRouterList, ...el.list];
});

let cjuiStyleRouterList = [];
CjuiStyleRouter.forEach(el => {
    cjuiStyleRouterList = [...cjuiStyleRouterList, ...el.list];
});

export default [
    { path: "/WebDevelopGuide", redirect: '/CjuiComponent' },
    { path: "/CjuiComponent", redirect: '/CjuiComponent/updateLog' },
    { 
        path: "/CjuiComponent", component: WebDevelopGuide,
        children: cjuiCompRouterList
    },
    { path: "/CjuiStyle", redirect: '/CjuiStyle/updateLog' },
    { 
        path: "/CjuiStyle", component: WebDevelopGuide,
        children: cjuiStyleRouterList
    },
]