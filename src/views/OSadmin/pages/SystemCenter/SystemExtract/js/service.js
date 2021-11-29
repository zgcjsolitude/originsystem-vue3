import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_systemextractlist({ sign, userName }, ErrorMsg = false) {
        return handleGetData('/systemextractlist', { sign, userName }, ErrorMsg, '获取系统摘录数据列表');
    },
    Add_systemextract(data = {}, ErrorMsg = true) {  
        return handlePostData('/systemextract/add', data, ErrorMsg, '增加系统摘录数据');
    },
    Modify_systemextract(data = {}, ErrorMsg = true) { 
        return handlePostData('/systemextract/modify', data, ErrorMsg, '修改系统摘录数据') 
    },
    Delete_systemextract(data = {}, ErrorMsg = true) { 
        return handlePostData('/systemextract/delete', data, ErrorMsg, '删除系统摘录数据') 
    },
    Return_systemmsglist({ sign = 'extractType', userName }, ErrorMsg = false) {  
        return handleGetData('/systemmsglist', { sign, userName }, ErrorMsg, '获取系统摘录分组信息列表');
    },
    Add_systemextracttype({ userName, userPassword, Sign = 'extractType', Value }, ErrorMsg = true) {  
        return handlePostData('/systemmsg/add', { userName, userPassword, Sign, Value }, ErrorMsg, '增加系统摘录分组信息') 
    },
    Modify_systemextracttype({ userName, userPassword, id, Value }, ErrorMsg = true) { 
        return handlePostData('/systemmsg/modify', { userName, userPassword, id, Value }, ErrorMsg, '修改系统摘录分组信息') 
    },
    Delete_systemextracttype({ userName, userPassword, id }, ErrorMsg = true) { 
        return handlePostData('/systemmsg/delete', { userName, userPassword, id }, ErrorMsg, '删除系统摘录分组信息') 
    },
}