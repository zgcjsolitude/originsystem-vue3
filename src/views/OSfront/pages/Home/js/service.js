import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_homeindexbgimglist() {  
        return handleGetData('/system/imgurlsetting/homeindexbgimglist', {}, false, '获取首页背景图列表', 'only_array');
    },
}