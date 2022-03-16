import { ElMessage } from 'element-plus';
import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // 用户注册
    User_register({ license, name, password, confirmPassword }, ErrorMsg = true) { 
        return handlePostData('/user/register', { license, name, password, confirmPassword }, ErrorMsg, '注册用户');
    },
    // 用户登录
    User_login({ userName, userPassword }, ErrorMsg = true) { 
        return handlePostData('/user/login', { userName, userPassword }, ErrorMsg, '登录用户');
    },
    // 用户登录
    User_loginmsg({ userId, userPassword }, ErrorMsg = true) { 
        return handlePostData('/user/loginmsg', { userId, userPassword }, ErrorMsg, '载入用户信息');
    },
    // 退出登录
    User_logout({ userId, userName, userPassword }, ErrorMsg = true) { 
        return handlePostData('/user/logout', { userId, userName, userPassword }, ErrorMsg, '退出登录');
    },
}