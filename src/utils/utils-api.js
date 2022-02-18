import axios from 'axios';
import { ElMessage } from 'element-plus';

export const handleGetData = async (url, params, ErrorMsg = false, title = '', type = 'pagination_array') => {
    if (type === 'pagination_array') {
        try {
            const res = await axios.get(url, { params });
            const { code, data, count, message } = res.data;
            if (code === 200 && data.length > 0) { 
                return { data, count };
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return { data: [], count: 0 }
        } catch(err) {
            if (ErrorMsg) {
                ElMessage.warning(`${title}接口内部错误!!`);
            }
            return { data: [], count: 0 }
        }

    } else if (type === 'only_array') {
        try {
            const res = await axios.get(url, { params });
            const { code, data, message } = res.data;
            if (code === 200 && data.length > 0) { 
                return data;
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return []
        } catch(err) {
            if (ErrorMsg) {
                ElMessage.warning(`${title}接口内部错误!!`);
            }
            return []
        }

    } else if (type === 'one_object') {
        try {
            const res = await axios.get(url, { params });
            const { code, data, message } = res.data;
            if (code === 200 && data.length > 0) { 
                return data[0];
            }
            if (ErrorMsg) {
                ElMessage.error(message);
            }
            return {}
        } catch(err) {
            if (ErrorMsg) {
                ElMessage.warning(`${title}接口内部错误!!`);
            }
            return {}
        }

    } else if (type === 'cdur') {
        try {
            const res = await axios.get(url, { params });
            const { code, message } = res.data;
            if (code !== 200 && ErrorMsg) {
                ElMessage.error(message);
            }
            return { code, message };
        } catch(err) {
            if (ErrorMsg) {
                ElMessage.warning(`${title}接口内部错误!!`);
            }
            return { code: -1, message: `${title}接口内部错误!!` };
        }

    }
}

export const handlePostData = async (url, params, ErrorMsg = false, title = '') => {
    try {
        const res = await axios.post(url, params);
        const { code, message } = res.data;
        if (code !== 200 && ErrorMsg) {
            ElMessage.error(message);
        }
        return { code, message };
    } catch(err) {
        if (ErrorMsg) {
            ElMessage.warning(`${title}接口内部错误!!`);
        }
        return { code: -1, message: `${title}接口内部错误!!` };
    }
}
