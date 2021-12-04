import OriginWorld from '@/views/BookWorld/OriginWorld/index.vue'

export default [
    { 
        path: "/BookWorld/OriginWorld", component: OriginWorld,
        meta: {
            title: 'OS-OriginWorld',
        }, 
        children: [
            // {
            //     path: 'index', component: BlogSpaceHome,
            //     meta: {
            //         requireAuth: false,
            //         pageCodeMap: [
            //         ]
            //     },
            // }, 
        ]
    },
]