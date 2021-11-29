import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_systemmsglist({ sign, userName }, ErrorMsg = false) {  
        return handleGetData('/systemmsglist', { sign, userName }, ErrorMsg, '获取系统分组信息标识列表');
    },
    Add_systemmsg(data = {}, ErrorMsg = true) {  
        return handlePostData('/systemmsg/add', data, ErrorMsg, '增加系统分组信息标识')
    },
    Modify_systemmsg(data = {}, ErrorMsg = true) { 
        return handlePostData('/systemmsg/modify', data, ErrorMsg, '修改系统分组信息标识') 
    },
    Delete_systemmsg(data = {}, ErrorMsg = true) { 
        return handlePostData('/systemmsg/delete', data, ErrorMsg, '删除系统分组信息标识') 
    },
}