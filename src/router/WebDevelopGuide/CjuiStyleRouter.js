export const CjuiStyleRouter = [
    {
        title: "开发指南",
        list: [
            {
                title: "更新日志",
                path: 'updateLog',
                fullPath: '/CjuiStyle/updateLog',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/updateLog.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'TDM1633331743744' }
                    ]
                },
            },
        ],
    },
    {
        title: "样式收藏",
        list: [
            {
                title: "渐变",
                path: 'gradientStyle',
                fullPath: '/CjuiStyle/gradientStyle',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/css/gradientStyle.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'VFN1635434009840' }
                    ]
                },
            },
            {
                title: "滤镜",
                path: 'filterStyle',
                fullPath: '/CjuiStyle/filterStyle',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/css/filterStyle.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'ZMJ1635434071142' }
                    ]
                },
            },
        ],
    },
    {
        title: "样式技巧",
        list: [
            {
                title: "形状",
                path: 'shapeStyle',
                fullPath: '/CjuiStyle/shapeStyle',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/css/shapeStyle.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'RWT1635434119664' }
                    ]
                },
            },
            {
                title: "边框",
                path: 'borderStyle',
                fullPath: '/CjuiStyle/borderStyle',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/css/borderStyle.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'VHO1635434162289' }
                    ]
                },
            },
            {
                title: "背景",
                path: 'backgroundStyle',
                fullPath: '/CjuiStyle/backgroundStyle',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiStyle/css/backgroundStyle.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Style',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'WFW1635434210903' }
                    ]
                },
            },
        ],
    },
]