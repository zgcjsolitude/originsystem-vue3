// const OSfront = () => import('@/views/OriginSystem/front/index.vue')
import OSadmin from '@/views/OSadmin/index.vue'
import OSadminIndex from '@/views/OSadmin/pages/Index/index.vue'
import OSadminBlogSpace from '@/views/OSadmin/pages/PersonalSpace/BlogSpace/index.vue'
import OSadminUserExtract from '@/views/OSadmin/pages/PersonalSpace/UserExtract/index.vue'
import OSadminUserDataMsg from '@/views/OSadmin/pages/PersonalSpace/UserDataMsg/index.vue'
import OSadminUserDMs from '@/views/OSadmin/pages/UserDMs/index.vue'
import OSadminSystemMsg from '@/views/OSadmin/pages/SystemCenter/SystemMsg/index.vue'
import OSadminSystemExtract from '@/views/OSadmin/pages/SystemCenter/SystemExtract/index.vue'
import OSadminPageManager from '@/views/OSadmin/pages/SystemCenter/PageManager/index.vue'
import OSadminBuilderUserSet from '@/views/OSadmin/pages/BuilderUser/BuilderUserSet/index.vue'
import OSadminWebAccessMonitoring from '@/views/OSadmin/pages/WebsiteGuard/WebAccessMonitoring/index.vue'

export default [
    { path: "/osadmin", redirect: '/osadmin/index' }, 
    { 
        path: "/osadmin", component: OSadmin,
        children: [
            {
                path: 'index', component: OSadminIndex,
                meta: {
                    requireAuth: false,
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'JUR1635434543074' }
                    ]
                },
            }, 
            {
                path: 'BlogSpace', component: OSadminBlogSpace,
                meta: {
                    requireAuth: '2-1',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'KAJ1635434627174' }
                    ]
                },
            }, 
            {
                path: 'userextract', component: OSadminUserExtract,
                meta: {
                    requireAuth: '2-2',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'RPR1635434704133' }
                    ]
                },
            }, 
            {
                path: 'UserDataMsg', component: OSadminUserDataMsg,
                meta: {
                    requireAuth: '2-3',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'CRS1635434757794' }
                    ]
                },
            }, 
            {
                path: 'systemmsg', component: OSadminSystemMsg,
                meta: {
                    requireAuth: '3-2',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'PHP1635435053936' }
                    ]
                },
            }, 
            {
                path: 'systemextract', component: OSadminSystemExtract,
                meta: {
                    requireAuth: '3-1',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'OWJ1635435149692' }
                    ]
                },
            },  
            {
                path: 'PageManager', component: OSadminPageManager,
                meta: {
                    requireAuth: '3-3',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'TUS1635435212159' }
                    ]
                },
            }, 
            {
                path: 'BuilderUserSet', component: OSadminBuilderUserSet,
                meta: {
                    requireAuth: '1-1',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'VPM1635435279691' }
                    ]
                },
            }, 
            {
                path: 'WebAccessMonitoring', component: OSadminWebAccessMonitoring,
                meta: {
                    requireAuth: '4-1',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'XBR1635435367117' }
                    ]
                },
            }, 
        ]
    },
]