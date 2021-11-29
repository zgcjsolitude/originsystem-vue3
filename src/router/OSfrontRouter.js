// const OSfront = () => import('@/views/OriginSystem/front/index.vue')
import OSfront from '@/views/OSfront/index.vue'
import OSfrontHome from '@/views/OSfront/pages/Home/index.vue'
import OSfrontSystemGuide from '@/views/OSfront/pages/SystemGuide/index.vue'

export default [
    { path: "/originsystem", redirect: '/originsystem/index' }, 
    { 
        path: "/originsystem", component: OSfront,
        children: [
            {
                path: 'index', component: OSfrontHome,
                meta: {
                    title: 'OriginSystem',
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'SHX1633330423364' }
                    ]
                },
            }, 
            {
                path: 'SystemGuide', component: OSfrontSystemGuide,
                meta: {
                    title: 'OriginSystem',
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: '' }
                    ]
                },
            }, 
        ]
    },
]