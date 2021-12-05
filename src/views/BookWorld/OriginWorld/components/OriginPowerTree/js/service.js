import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_originpowerlist() {
        return handleGetData('/originpowerlist', {}, false, '获取源权体系表数据信息', 'only_array')
	},
}