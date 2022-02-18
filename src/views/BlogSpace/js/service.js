import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // blog cdur
    Return_bloglist({ classifyId = '', page = 1, num = 10}) {  
        return handleGetData('/project/blogspace/bloglist', { classifyId, page, num }, false, '获取博文列表');
    },
    Return_blogmsg({ _id }) {  
        return handleGetData('/project/blogspace/blogmsg', { _id }, true, '获取博文详情', 'one_object');
    },
}