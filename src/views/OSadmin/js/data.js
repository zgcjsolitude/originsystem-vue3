export const menuListOpt = [
    { 
        icon: 'el-icon-s-custom', 
        label: 'Personal', 
        path: '/osadmin/index',
        authority: false,
        children: [] 
    },
    { 
        icon: 'el-icon-s-claim', 
        label: 'PersonalSpace', 
        path: '',
        authority: '2',
        children: [ 
            { 
                icon: '', 
                label: 'BlogSpace',
                path: '/osadmin/BlogSpace',
                authority: '2-1',
            },
            { 
                icon: '', 
                label: 'UserExtract',
                path: '/osadmin/userextract',
                authority: '2-2',
            },
            { 
                icon: '', 
                label: 'UserDataMsgSetting',
                path: '/osadmin/UserDataMsg',
                authority: '2-3',
            },
        ] 
    },
    { 
        icon: 'el-icon-s-management', 
        label: 'SystemCenter', 
        path: '',
        authority: '3',
        children: [
            { 
                icon: '', 
                label: 'SystemExtract',
                path: '/osadmin/systemextract',
                authority: '3-1',
            },
            { 
                icon: '', 
                label: 'SystemMsg',
                path: '/osadmin/systemmsg',
                authority: '3-2',
            },
            { 
                icon: '', 
                label: 'PageManager',
                path: '/osadmin/PageManager',
                authority: '3-3',
            },
        ] 
    },
    { 
        icon: 'el-icon-s-promotion', 
        label: 'SystemBuilder', 
        path: '',
        authority: '1',
        children: [
            { 
                icon: '', 
                label: 'Administrator',
                path: '/osadmin/BuilderUserSet',
                authority: '1-1',
            },
        ] 
    },
    { 
        icon: 'el-icon-s-data', 
        label: 'WebsiteGuard', 
        path: '',
        authority: '4',
        children: [
            { 
                icon: '', 
                label: 'WebAccessMonitoring',
                path: '/osadmin/WebAccessMonitoring',
                authority: '4-1',
            },
        ] 
    }
]