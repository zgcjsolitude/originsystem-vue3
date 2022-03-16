import axios from "axios";
import { ElMessage } from 'element-plus';
import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // =============================
    /* 其他 api */
    // 网站页面信息数据改 - 访问记录+1
	Modify_webpagemsg_visitingTime({ pageCode }) {
        return handleGetData('/webpagemsg/modify_visitingtime', { pageCode }, false, '网站页面访问记录', 'cdur');
	},
}