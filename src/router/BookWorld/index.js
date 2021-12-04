const BookWorld = () => import('@/views/BookWorld/index.vue')
import OriginWorld from './OriginWorld'

export default [
    { path: "/BookWorld", redirect: '/BookWorld/index' },
    { 
        path: "/BookWorld/index", component: BookWorld,
        meta: {
            title: 'OS-BookWorld',
        }, 
    },
    ...OriginWorld
]