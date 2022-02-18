import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_extractlist({ userName, classify = '', page = 1, num = 10}) {  
        return handleGetData('/project/extractnote/extractlist', { userName, classify, page, num }, false, '获取摘录列表');
    },
    Add_extract({ userName, userPassword, title, content, contentType, classify, poet, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/extractnote/extract/add', { userName, userPassword, title, content, contentType, classify, poet, intro, remarks }, ErrorMsg, '增加摘录信息');
    },
    Modify_extract({ userName, userPassword, _id, title, content, contentType, classify, poet, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/extractnote/extract/modify', { userName, userPassword, _id, title, content, contentType, classify, poet, intro, remarks }, ErrorMsg, '修改摘录信息');
    },
    Delete_extract({ userName, userPassword, _id }, ErrorMsg = true) { 
        return handlePostData('/project/extractnote/extract/delete', { userName, userPassword, _id }, ErrorMsg, '删除摘录信息') 
    },
}