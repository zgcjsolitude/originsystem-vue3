import OriginWorld from '@/views/BookWorld/OriginWorld/index.vue'
import OriginWorldIndex from '@/views/BookWorld/OriginWorld/pages/index.vue'
import OriginWorldOriginPower from '@/views/BookWorld/OriginWorld/pages/OriginPower.vue'
import OriginWorldTimeLine from '@/views/BookWorld/OriginWorld/pages/TimeLine.vue'
import OriginWorldDictionary from '@/views/BookWorld/OriginWorld/pages/Dictionary.vue'

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
            {
                path: 'TimeLine', component: OriginWorldTimeLine,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            }, 
            {
                path: 'Dictionary', component: OriginWorldDictionary,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                    ]
                },
            }, 
        ]
    },
]