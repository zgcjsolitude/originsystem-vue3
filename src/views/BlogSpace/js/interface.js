import axios from "axios";

export default {
	// =============================
	/* 可访问文档类读取 */
	async _Read_Common_File(url) {
        try {
            let res = await axios.get('/commonfiles/read?url=' + url);
            let { code, data } = res.data;
            if (code === 200) { 
                return data;
            }
            return ''
        } catch(err) {
            // Message({ type: "warning", message: "可访问文档类读取内部错误!!" });
            return ''
        }
	},
	/* end */
	// =============================
    // 获取用户数据信息，sign：allsign - 分组列表、 extractType - 摘录分组、blogClass - 博文分组、fileClass - 文件分组
	async _Return_usermsg({ sign, userName }, ErrorMsg = false) {  
        try {
            let res = await axios.get('/usermsg?sign=' + sign + '&userName=' + userName);
            let { code, data } = res.data;
            if (code === 200 && data.length > 0) { 
                return { data };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { data: [] };
        } catch(err) {
            let msgOpt = {
                blogClass: '博文分组',
            }
            ElMessage.warning(`获取${msgOpt[sign]}信息接口内部错误!!`);
            return { data: [] };
        }
	},
    // 文件设置信息获取，sign：blog - 博文列表
	async _Return_userfilemsglist({ userName, sign, className, page, num }) {  
        try {
            let res = await axios.get('/userfilemsglist?userName=' + userName + '&sign=' + sign + '&className=' + className + '&page=' + page + '&num=' + num);
            let { code, data } = res.data;
            if (code === 200 && data.length > 0) { 
                return data;
            }
            return []
        } catch(err) {
            // Message({ type: "warning", message: "文件设置信息获取内部错误!!" });
            return []
        }
	},
}