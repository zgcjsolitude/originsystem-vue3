import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_userwordlist({ userName, sign, className, page = 1, num = 10}, ErrorMsg = false) {
        return handleGetData('/userwordlist', { userName, sign, className, page, num}, ErrorMsg, '获取用户摘录信息列表');
    },
    Add_userword(data = {}, ErrorMsg = true) {  
        return handlePostData('/userword/add', data, ErrorMsg, '增加用户摘录信息');
    },
    Modify_userword(data = {}, ErrorMsg = true) { 
        return handlePostData('/userword/modify', data, ErrorMsg, '修改用户摘录信息') 
    },
    Delete_userword(data = {}, ErrorMsg = true) { 
        return handlePostData('/userword/delete', data, ErrorMsg, '删除用户摘录信息') 
    },
    Return_userextracttype({ sign = 'extractType', userName }, ErrorMsg = false) {  
        return handleGetData('/usermsg', { sign, userName }, ErrorMsg, '获取用户摘录分组信息列表');
    },
    Add_userextracttype({ userName, userPassword, Sign = 'extractType', Value }, ErrorMsg = true) {  
        return handlePostData('/usermsg/add', { userName, userPassword, Sign, Value }, ErrorMsg, '增加用户摘录分组信息') 
    },
    Modify_userextracttype({ userName, userPassword, id, Value }, ErrorMsg = true) { 
        return handlePostData('/usermsg/modify', { userName, userPassword, id, Value }, ErrorMsg, '修改用户摘录分组信息') 
    },
    Delete_userextracttype({ userName, userPassword, id }, ErrorMsg = true) { 
        return handlePostData('/usermsg/delete', { userName, userPassword, id }, ErrorMsg, '删除用户摘录分组信息') 
    },
}