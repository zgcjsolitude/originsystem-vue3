import OriginWorld from '@/views/BookWorld/OriginWorld/index.vue'
import OriginWorldIndex from '@/views/BookWorld/OriginWorld/pages/index.vue'
import OriginWorldOriginPower from '@/views/BookWorld/OriginWorld/pages/OriginPower.vue'

export default [
    { 
        path: "/BookWorld/OriginWorld", component: OriginWorld,
        meta: {
            title: 'OS-OriginWorld',
        }, 
        children: [
            {
                path: 'index', component: OriginWorldIndex,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            }, 
            {
                path: 'OriginPower', component: OriginWorldOriginPower,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            }, 
        ]
    },
]