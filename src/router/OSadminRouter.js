// import OSadminUserDMs from '@/views/OSadmin/pages/UserDMs/index.vue'

export default [
    { path: "/osadmin", redirect: '/osadmin/index' }, 
    { 
        path: "/osadmin", component: () => import('@/views/OSadmin/index.vue'),
        children: [
            {
                path: 'index', component: () => import('@/views/OSadmin/pages/Index/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'JUR1635434543074' }
                    ]
                },
            }, 
            {
                path: 'BM-BlogSpace', component: () => import('@/views/OSadmin/pages/Business/BlogSpace/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            },
            {
                path: 'BM-BookWorld', component: () => import('@/views/OSadmin/pages/Business/BookWorld/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            },
            {
                path: 'BM-ExtractNote', component: () => import('@/views/OSadmin/pages/Business/ExtractNote/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            },
            {
                path: 'HomeSetting', component: () => import('@/views/OSadmin/pages/SystemCenter/HomeSetting/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: '' }
                    ]
                },
            }, 
            {
                path: 'BusinessSetting', component: () => import('@/views/OSadmin/pages/SystemCenter/BusinessSetting/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: '' }
                    ]
                },
            }, 
            {
                path: 'PageManager', component: () => import('@/views/OSadmin/pages/SystemCenter/PageManager/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'TUS1635435212159' }
                    ]
                },
            }, 
            {
                path: 'BuilderUserSet', component: () => import('@/views/OSadmin/pages/BuilderUser/BuilderUserSet/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'VPM1635435279691' }
                    ]
                },
            }, 
            {
                path: 'WebAccessMonitoring', component: () => import('@/views/OSadmin/pages/WebsiteGuard/WebAccessMonitoring/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'XBR1635435367117' }
                    ]
                },
            }, 
        ]
    },
]