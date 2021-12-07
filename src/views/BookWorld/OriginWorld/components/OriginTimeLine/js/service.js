import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_timelinelist() {
        return handleGetData('/timelinelist', {}, false, '获取源星时间线表数据信息', 'only_array')
	},
	Add_timeline({ userName, userPassword, world, tag, year, month, day, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/timeline/add', { userName, userPassword, world, tag, year, month, day, intro, remarks }, ErrorMsg, '增加源星时间线表数据信息') 
    },
	Modify_timeline({ userName, userPassword, _id, id, world, tag, year, month, day, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/timeline/modify', { userName, userPassword, _id, id, world, tag, year, month, day, intro, remarks }, ErrorMsg, '修改源星时间线表数据信息') 
    },
	Delete_timeline({ userName, userPassword, _id }, ErrorMsg = true) { 
        return handlePostData('/timeline/delete', { userName, userPassword, _id }, ErrorMsg, '删除源星时间线表数据信息') 
    },
}