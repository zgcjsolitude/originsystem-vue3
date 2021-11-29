import axios from "axios";
import { ElMessage } from 'element-plus';
import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // =============================
    /* 管理员操作 api */
    // 登录
    async _Login({ userName, userPassword }) {
        try {
            let res = await axios.post('/adminuser/login', { userName, userPassword });
            let { code, data, message } = res.data;
            if (code === 200) {
                ElMessage.success(message);
                return { code, data }
            }
            ElMessage.warning(message);
            return { code: -1, data: {} }
        } catch(err) {
            ElMessage.warning('登录异常');
            return { code: -1, data: {} }
        }
    },
    // 登录刷新
    async _Loginmsg({ userName, userPassword }) {
        try {
            let res = await axios.post('/adminuser/loginmsg', { userName, userPassword });
            let { code, data, message } = res.data;
            if (code === 200) {
                return { code, data }
            }
            ElMessage.warning(message);
            return { code: -1, data: {} }
        } catch(err) {
            ElMessage.warning('登录刷新异常');
            return { code: -1, data: {} }
        }
    },
    // 退出登录
    async _Logout({ userName }) {  
        try {
            let res = await axios.post('/adminuser/logout', userName);
            let { code, data, message } = res.data;
            if (code === 200) {
                ElMessage.success(message);
                return { code, data }
            }
            ElMessage.warning(message);
            return { code: -1, data: {} }
        } catch(err) {
            ElMessage.warning('退出登录异常');
            return { code: -1, data: {} }
        }
    },

    // =============================
    /* 其他 api */
    // 网站页面信息数据改 - 访问记录+1
	Modify_webpagemsg_visitingTime({ pageCode }) {
        return handleGetData('/webpagemsg/modify_visitingtime', { pageCode }, false, '网站页面访问记录', 'cdur');
	},
}