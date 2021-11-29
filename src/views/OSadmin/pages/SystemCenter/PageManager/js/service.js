import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
	Return_webpagemsglist({ lv1Name, lv2Name, lv3Name, lv4Name, page = 1, num = 10 }, ErrorMsg = false) {
        return handleGetData('/webpagemsglist', { lv1Name, lv2Name, lv3Name, lv4Name, page, num }, ErrorMsg, '获取网站页面配置数据信息')
	},
	Add_webpagemsg({ userName, userPassword, name, path, lv1Name, lv2Name, lv3Name, lv4Name, remarks }, ErrorMsg = true) { 
        return handlePostData('/webpagemsg/add', { userName, userPassword, name, path, lv1Name, lv2Name, lv3Name, lv4Name, remarks }, ErrorMsg, '增加网站页面配置数据信息') 
    },
	Modify_webpagemsg({ userName, userPassword, _id, name, path, lv1Name, lv2Name, lv3Name, lv4Name, remarks }, ErrorMsg = true) { 
        return handlePostData('/webpagemsg/modify', { userName, userPassword, _id, name, path, lv1Name, lv2Name, lv3Name, lv4Name, remarks }, ErrorMsg, '修改网站页面配置数据信息') 
    },
	Delete_webpagemsg({ userName, userPassword, _id }, ErrorMsg = true) { 
        return handlePostData('/webpagemsg/delete', { userName, userPassword, _id }, ErrorMsg, '删除网站页面配置数据信息') 
    },
	Return_webpageclasslist(ErrorMsg = false) {
        return handleGetData('/webpageclasslist', {}, ErrorMsg, '获取网站页面级别分类数据信息', 'only_array')
	},
	Add_webpageclass({ userName, userPassword, name, level, parentId, parentPath, remarks }, ErrorMsg = true) { 
        return handlePostData('/webpageclass/add', { userName, userPassword, name, level, parentId, parentPath, remarks }, ErrorMsg, '增加网站页面级别分类数据数据信息') 
    },
	Modify_webpageclass({ userName, userPassword, _id, id, name, level, parentId, parentPath, remarks }, ErrorMsg = true) { 
        return handlePostData('/webpageclass/modify', { userName, userPassword, _id, id, name, level, parentId, parentPath, remarks }, ErrorMsg, '修改网站页面级别分类数据数据信息') 
    },
	Delete_webpageclass({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/webpageclass/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除网站页面级别分类数据数据信息') 
    },
}