import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // blog cdur
    Return_bloglist({ classifyId = '', page = 1, num = 10}) {  
        return handleGetData('/project/blogspace/bloglist', { classifyId, page, num }, false, '获取博文列表');
    },
    Return_blogmsg({ _id }) {  
        return handleGetData('/project/blogspace/blogmsg', { _id }, true, '获取博文详情', 'only_array');
    },
    Add_blog({ userName, userPassword, title, classifyId, classifyPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blog/add', { userName, userPassword, title, classifyId, classifyPath, intro, remarks }, ErrorMsg, '增加博文信息');
    },
    Modify_blog({ userName, userPassword, _id, id, title, classifyId, classifyPath, htmlText, mdText, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blog/modify', { userName, userPassword, _id, id, title, classifyId, classifyPath, htmlText, mdText, intro, remarks }, ErrorMsg, '修改博文信息');
    },
    Delete_blog({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blog/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除博文信息') 
    },
    // blogclass cdur
    Return_blogclasslist() {
        return handleGetData('/project/blogspace/blogclasslist', {}, false, '获取获取博文分组数据信息', 'only_array');
    },
    Add_blogclass({ userName, userPassword, name, level, parentId, parentPath, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blogclass/add', { userName, userPassword, name, level, parentId, parentPath, remarks }, ErrorMsg, '增加博客空间分组数据信息'); 
    },
    Modify_blogclass({ userName, userPassword, _id, id, name, level, parentId, parentPath, intro, remarks }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blogclass/modify', { userName, userPassword, _id, id, name, level, parentId, parentPath, intro, remarks }, ErrorMsg, '修改博客空间分组数据信息'); 
    },
    Delete_blogclass({ userName, userPassword, _id, id }, ErrorMsg = true) { 
        return handlePostData('/project/blogspace/blogclass/delete', { userName, userPassword, _id, id }, ErrorMsg, '删除博客空间分组数据信息');
    },
}