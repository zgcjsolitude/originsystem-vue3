import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_usermsg({ sign, userName }, ErrorMsg = false) {  
        return handleGetData('/usermsg', { sign, userName }, ErrorMsg, '获取用户分组信息标识列表');
    },
    Add_usermsg({ userName, userPassword, Sign, Value, Content, Beizhu }, ErrorMsg = true) {  
        return handlePostData('/usermsg/add', { userName, userPassword, Sign, Value, Content, Beizhu }, ErrorMsg, '增加用户分组信息标识')
    },
    Modify_usermsg({ userName, userPassword, id, Sign, Value, Content, Beizhu }, ErrorMsg = true) { 
        return handlePostData('/usermsg/modify', { userName, userPassword, id, Sign, Value, Content, Beizhu }, ErrorMsg, '修改用户分组信息标识') 
    },
    Delete_usermsg({ userName, userPassword, id }, ErrorMsg = true) { 
        return handlePostData('/usermsg/delete', { userName, userPassword, id }, ErrorMsg, '删除用户分组信息标识') 
    },
}