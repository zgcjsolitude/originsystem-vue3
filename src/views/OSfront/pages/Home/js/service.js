import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_homeindexbgimg() {  
        return handleGetData('/systemmsglist', { value: 'originsystemhomeindexbgimg' }, false, '获取首页背景图列表', 'only_array');
    },
}