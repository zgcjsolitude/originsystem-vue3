import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_webpageclasslist() {
        return handleGetData('/webpageclasslist', {}, false, '获取网站页面级别分类数据信息', 'only_array')
	},
}