import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_originpowerlist(ErrorMsg = false) {
        return handleGetData('/originpowerlist', {}, ErrorMsg, '获取源权体系表数据信息', 'only_array')
	},
	Add_originpower({ userName, userPassword, name, level, parentId, parentPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/originpower/add', { userName, userPassword, name, level, parentId, parentPath, intro, remarks }, ErrorMsg, '增加源权体系表数据信息') 
    },
	Modify_originpower({ userName, userPassword, _id, id, name, level, parentId, parentPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/originpower/modify', { userName, userPassword, _id, id, name, level, parentId, parentPath, intro, remarks }, ErrorMsg, '修改源权体系表数据信息') 
    },
	Delete_originpower({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/originpower/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除源权体系表数据信息') 
    },
}