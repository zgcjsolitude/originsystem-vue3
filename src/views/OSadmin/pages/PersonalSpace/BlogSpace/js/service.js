import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    Return_userblog({ userName, sign = 'blog', className, page = 1, num = 10}, ErrorMsg = false) {  
        return handleGetData('/userfilemsglist', { userName, sign, className, page, num}, ErrorMsg, '获取用户博文列表');
    },
    Modify_userblog({ userName, userPassword, id, Class, Intro}, ErrorMsg = true) {  
        return handlePostData('/userfilemsg/modify', { userName, userPassword, id, Class, Intro}, ErrorMsg, '修改用户博文信息') 
    },
    Delete_userblog({ userName, userPassword, id, Sign, Url }, ErrorMsg = true) {  
        return handlePostData('/userfilemsg/delete', { userName, userPassword, id, Sign, Url }, ErrorMsg, '删除用户博文')
    },
    Return_userblogclass({ sign = 'blogClass', userName }, ErrorMsg = false) {  
        return handleGetData('/usermsg', { sign, userName }, ErrorMsg, '获取用户博文分组信息列表');
    },
    Add_userblogclass({ userName, userPassword, Sign = 'blogClass', Value }, ErrorMsg = true) {  
        return handlePostData('/usermsg/add', { userName, userPassword, Sign, Value }, ErrorMsg, '增加用户博文分组信息') 
    },
    Modify_userblogclass({ userName, userPassword, id, Value }, ErrorMsg = true) { 
        return handlePostData('/usermsg/modify', { userName, userPassword, id, Value }, ErrorMsg, '修改用户博文分组信息') 
    },
    Delete_userblogclass({ userName, userPassword, id }, ErrorMsg = true) { 
        return handlePostData('/usermsg/delete', { userName, userPassword, id }, ErrorMsg, '删除用户博文分组信息') 
    },
}