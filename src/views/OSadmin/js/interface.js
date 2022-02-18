import axios from "axios";
import { ElMessage } from 'element-plus';

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
    // 文件设置信息获取，sign：blog - 博文列表
    async _Return_userfilemsglist({ userName, sign, className, page = 1, num = 10}, ErrorMsg = false) {  
        try {
            let res = await axios.get('/userfilemsglist?userName=' + userName + '&sign=' + sign + '&className=' + className + '&page=' + page + '&num=' + num);
            let { code, data, count, message } = res.data;
            if (code === 200 && data.length > 0) { 
                return { data, count };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { data: [], count: 0 }
        } catch(err) {
            let msgOpt = {
                sign: '博文列表',
            }
            ElMessage.warning(`获取${msgOpt[sign]}信息接口内部错误!!`);
            return { data: [], count: 0 }
        }
    },
    // 用户文件夹及文件获取
    async _Return_userfolderlist(data = {}, ErrorMsg = false) {  
        try {
            let res = await axios.post('/userfolderlist', data);
            let { code, data1, data2, message } = res.data;
            if (code === 200) { 
                return { code, data1, data2 };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { code: -1, data1: [], data2: [] };
        } catch(err) {
            ElMessage.error('获取用户文件夹及文件信息内部错误!!');
            return { code: -1, data1: [], data2: [] };
        }
    },
    // 用户文件夹添加
    async _Add_userfolder(data = {}) {  
        try {
            let res = await axios.post('/userfolder/add', data);
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '增加根源系统数据信息接口内部错误!!' };
        }
    },
    // 建设人获取管理员列表
    async _Return_adminuserlist({ userName, userPassword }, ErrorMsg = false) {  
        try {
            let res = await axios.post('/adminuserlist', {
                userName,
                userPassword
            });
            let { code, data, message } = res.data;
            if (code === 200 && data.length > 0) { 
                return { data };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { data: [] };
        } catch(err) {
            ElMessage.error("获取管理员列表内部错误!!");
            return { data: [] };
        }
    },
    // 添加用户
    async _Add_adminuser(data = {}) {  
        try {
            let res = await axios.post('/adminuser/add', data);
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '添加用户接口内部错误!!' };
        }
    },
    // 修改用户
    async _Modify_adminuser(data = {}) {  
        try {
            let res = await axios.post('/adminuser/modify', data);
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '修改用户接口内部错误!!' };
        } 
    },
    // 启用停用管理员
    async _Modify_adminuserstatus(data = {}) {  
        try {
            let res = await axios.post('/adminuser/statuschange', data)
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '修改用户接口内部错误!!' };
        } 
    },
    // 删除管理员
    async _Delete_adminuser(data = {}) {  
        try {
            let res = await axios.post('/adminuser/delete', data);
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '删除系统摘录数据接口内部错误!!' };
        }
    },
    // 获取权限层次列表
    async _Return_authlistcomplex(data = {}, ErrorMsg = false) {  
        try {
            let res = await axios.post('/authlistcomplex', data);
            let { code, data1, data2, message } = res.data;
            if (code === 200) { 
                return { code, data1, data2 };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { code: -1, data1: [], data2: [] };
        } catch(err) {
            ElMessage.error('获取获取权限层次列表信息内部错误!!');
            return { code: -1, data1: [], data2: [] };
        }
    },
    // 管理员授权
    async _Modify_adminuserauth(data = {}) {  
        try {
            let res = await axios.post('/adminuser/authchange', data);
            let { code, message } = res.data;
            return { code, message };
        } catch(err) {
            return { code: -1, message: '修改用户接口内部错误!!' };
        } 
    },
}