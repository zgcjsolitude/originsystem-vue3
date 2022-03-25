export const menuListOpt = [
    { 
        icon: 'fa fa-user-circle', 
        label: 'Personal', 
        path: '/osadmin/index',
        authority: false,
        children: [] 
    },
    { 
        icon: 'fa fa-qrcode', 
        label: 'BusinessManagement', 
        path: '',
        // authority: '4',
        children: [
            { 
                icon: '', 
                label: 'BMapptextcollection',
                path: '/osadmin/BM-AppTextCollection',
                // authority: '4-1',
            },
        ] 
    },
    { 
        icon: 'fa fa-send', 
        label: 'SystemCenter', 
        path: '',
        // authority: '3',
        children: [
            { 
                icon: '', 
                label: 'SCHomeSetting',
                path: '/osadmin/HomeSetting',
                // authority: '3-1',
            },
            { 
                icon: '', 
                label: 'SCSystemTextCollection',
                path: '/osadmin/SC-SystemTextCollection',
                // authority: '4-1',
            },
        ] 
    },
    { 
        icon: 'fa fa-rebel', 
        label: 'SystemBuilder', 
        path: '',
        // authority: '1',
        children: [
            { 
                icon: '', 
                label: 'Administrator',
                path: '/osadmin/BuilderUserSet',
                // authority: '1-1',
            },
            // { 
            //     icon: '', 
            //     label: 'SBPageManager',
            //     path: '/osadmin/PageManager',
            //     // authority: '3-3',
            // },
        ] 
    },
    { 
        icon: 'fa fa-bar-chart', 
        label: 'WebsiteGuard', 
        path: '',
        // authority: '4',
        children: [
            { 
                icon: '', 
                label: 'WebAccessMonitoring',
                path: '/osadmin/WebAccessMonitoring',
                // authority: '4-1',
            },
        ] 
    }
]