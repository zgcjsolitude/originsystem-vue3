import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // article cdur
    Return_articlelist({ classifyId = '', page = 1, num = 10}) {  
        return handleGetData('/project/bookworld/articlelist', { classifyId, page, num }, false, '获取章节列表');
    },
    Return_articlemsg({ _id }) {  
        return handleGetData('/project/bookworld/articlemsg', { _id }, true, '获取章节详情', 'only_array');
    },
    Add_article({ userName, userPassword, title, classifyId, classifyPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/article/add', { userName, userPassword, title, classifyId, classifyPath, intro, remarks }, ErrorMsg, '增加章节信息');
    },
    Modify_article({ userName, userPassword, _id, id, title, classifyId, classifyPath, htmlText, mdText, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/article/modify', { userName, userPassword, _id, id, title, classifyId, classifyPath, htmlText, intro, remarks }, ErrorMsg, '修改章节信息');
    },
    Delete_article({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/article/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除章节信息') 
    },
    // bookclass cdur
    Return_bookclasslist() {
        return handleGetData('/project/bookworld/bookclasslist', {}, false, '获取获取章节分组数据信息', 'only_array');
    },
    Add_bookclass({ userName, userPassword, name, level, type, parentId, parentPath, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/bookclass/add', { userName, userPassword, name, level, type, parentId, parentPath, remarks }, ErrorMsg, '增加章节分组数据信息'); 
    },
    Modify_bookclass({ userName, userPassword, _id, id, name, level, type, parentId, parentPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/bookclass/modify', { userName, userPassword, _id, id, name, level, type, parentId, parentPath, intro, remarks }, ErrorMsg, '修改章节分组数据信息'); 
    },
    Delete_bookclass({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/project/bookworld/bookclass/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除章节分组数据信息');
    },
}