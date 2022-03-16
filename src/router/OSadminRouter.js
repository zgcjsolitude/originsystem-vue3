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
                path: 'BM-AppTextCollection', component: () => import('@/views/OSadmin/pages/BM-AppTextCollection/index.vue'),
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
                path: 'SC-SystemTextCollection', component: () => import('@/views/OSadmin/pages/SC-SystemTextCollection/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
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