// import OSadminUserDMs from '@/views/OSadmin/pages/UserDMs/index.vue'

export default [
    { path: "/TextCollection", redirect: '/TextCollection/index' }, 
    { 
        path: "/TextCollection", component: () => import('@/views/TextCollection/pmd-index.vue'),
        children: [
            {
                path: 'index', 
                name: 'TextCollectionIndex', 
                component: () => import('@/views/TextCollection/pmd-pages/TextModelList/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: '' }
                    ]
                },
            }, 
            {
                path: 'textList/:modelUuid?', 
                name: 'TextCollectionTextList', 
                component: () => import('@/views/TextCollection/pmd-pages/TextList/index.vue'),
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: '' }
                    ]
                },
            }, 
        ]
    },
]