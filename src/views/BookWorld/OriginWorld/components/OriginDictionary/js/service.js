import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_dictionarylist() {
        return handleGetData('/dictionarylist', {}, false, '获取根源词典数据信息', 'only_array')
	},
	Add_dictionary({ userName, userPassword, world, tag, name, className1, className2, className3, className4, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/dictionary/add', { userName, userPassword, world, tag, name, className1, className2, className3, className4, intro, remarks }, ErrorMsg, '增加根源词典数据信息') 
    },
	Modify_dictionary({ userName, userPassword, _id, id, world, tag, name, className1, className2, className3, className4, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/dictionary/modify', { userName, userPassword, _id, id, world, tag, name, className1, className2, className3, className4, intro, remarks }, ErrorMsg, '修改根源词典数据信息') 
    },
	Delete_dictionary({ userName, userPassword, _id }, ErrorMsg = true) { 
        return handlePostData('/dictionary/delete', { userName, userPassword, _id }, ErrorMsg, '删除根源词典数据信息') 
    },
}