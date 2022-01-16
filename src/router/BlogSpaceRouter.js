const BlogSpace = () => import('@/views/BlogSpace/index.vue')
import BlogSpaceHome from '@/views/BlogSpace/pages/Home/index.vue'
import BlogSpaceArticle from '@/views/BlogSpace/pages/Article/index.vue'
import BlogSpaceClassify from '@/views/BlogSpace/pages/Classify/index.vue'

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
            {
                path: 'article', component: BlogSpaceArticle,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            }, 
            {
                path: 'classify', component: BlogSpaceClassify,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'OVF1635433769903' }
                    ]
                },
            }, 
        ]
    },
]