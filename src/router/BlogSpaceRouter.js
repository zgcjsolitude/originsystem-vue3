const BlogSpace = () => import('@/views/BlogSpace/index.vue')
import BlogSpaceHome from '@/views/BlogSpace/pages/Home/index.vue'

export default [
    { path: "/BlogSpace", redirect: '/BlogSpace/index' },
    { 
        path: "/BlogSpace", component: BlogSpace,
        meta: {
            title: 'OS-BlogSpace',
        }, 
        children: [
            {
                path: 'index', component: BlogSpaceHome,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'RNE1633331239696' }
                    ]
                },
            }, 
        ]
    },
]