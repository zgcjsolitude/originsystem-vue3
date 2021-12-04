export const CjuiCompRouter = [
    {
        title: "开发指南",
        list: [
            {
                title: "更新日志",
                path: 'updateLog',
                fullPath: '/CjuiComponent/updateLog',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/updateLog.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'UUC1633331459749' }
                    ]
                },
            },
        ],
    },
    {
        title: "公共组件",
        list: [
            {
                title: "WaterFall 瀑布流",
                path: 'packages-waterfall',
                fullPath: '/CjuiComponent/packages-waterfall',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/packages/Waterfall.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
            {
                title: "Nav 导航",
                path: 'packages-nav',
                fullPath: '/CjuiComponent/packages-nav',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/packages/Nav.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
            {
                title: "Loading 载入",
                path: 'packages-loading',
                fullPath: '/CjuiComponent/packages-loading',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/packages/LoadingTheme.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
            {
                title: "FontAnimation 文字动效",
                path: 'packages-fontanimation',
                fullPath: '/CjuiComponent/packages-fontanimation',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/packages/FontAnimation.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
            {
                title: "RandomCode 随机验证码",
                path: 'packages-randomcode',
                fullPath: '/CjuiComponent/packages-randomcode',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/packages/RandomCode.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
        ],
    },
    {
        title: "PC 组件",
        list: [
            {
                title: "Layout 布局",
                path: 'pc-structure',
                fullPath: '/CjuiComponent/pc-structure',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/pcmodel/structure.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'OWR1633434054607' }
                    ]
                },
            },
            {
                title: "Pages 页面",
                path: 'pc-pages',
                fullPath: '/CjuiComponent/pc-pages',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/pcmodel/pages.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                        { tagList: [], tagValueList: [], pageCode: 'EVU1633434282385' }
                    ]
                },
            },
        ],
    },
    {
        title: "PMD 组件",
        list: [
            {
                title: "Layout 布局",
                path: 'pmd-structure',
                fullPath: '/CjuiComponent/pmd-structure',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/pmdmodel/structure.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
        ],
    },
    {
        title: "WebUI 组件",
        list: [
            {
                title: "Particles 粒子动效",
                path: 'webui-particles',
                fullPath: '/CjuiComponent/webui-particles',
                component: () => import('@/views/WebDevelopGuide/pages/CjuiComp/webui/particles.vue'),
                show: true,
                meta: {
                    title: 'Cjui-Component',
                    pageCodeMap: [
                    ]
                },
            },
        ],
    },
]