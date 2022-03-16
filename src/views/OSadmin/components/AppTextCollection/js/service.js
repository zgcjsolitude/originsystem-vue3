import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // 模板配置 cdur
    Return_apptextmodel({ userId, page = 1, num = 10 }, apiTag = '') {  
        return handleGetData(`/${apiTag}/textcollection/modellist`, { userId, page, num }, false, '获取应用文集模板列表');
    },
    Return_apptextmodelconfig({ uuid }, apiTag = '') {  
        return handleGetData(`/${apiTag}/textcollection/modelconfig`, { uuid }, true, '获取应用文集模板配置信息', 'one_object');
    },
    Add_apptextmodel({ userId, userPassword, name, nameEn, intro, classifyType, listType, contentType }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/model/add`, { userId, userPassword, name, nameEn, intro, classifyType, listType, contentType }, ErrorMsg, '增加应用文集模板');
    },
    Modify_apptextmodel({ userId, userPassword, _id, id, uuid, name, nameEn, intro, classifyType, listType, contentType }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/model/modify`, { userId, userPassword, _id, id, uuid, name, nameEn, intro, classifyType, listType, contentType }, ErrorMsg, '修改应用文集模板信息');
    },
    Delete_apptextmodel({ userId, userPassword, _id, uuid }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/model/delete`, { userId, userPassword, _id, uuid }, ErrorMsg, '删除应用文集模板信息') 
    },
    // 文集分组 cdur
    Return_modelclassifylist({ appUuid }, apiTag = '') {
        return handleGetData(`/${apiTag}/textcollection/modelclassifylist`, { appUuid }, false, '获取应用文集分组数据信息', 'only_array');
    },
    Add_modelclassify({ userId, userPassword, appUuid, name, parentId, parentPath, level, type, tag, intro, remarks }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelclassify/add`, { userId, userPassword, appUuid, name, level, type, parentId, parentPath, tag, intro, remarks }, ErrorMsg, '增加应用文集分组数据信息'); 
    },
    Modify_modelclassify({ userId, userPassword, _id, id, name, parentId, type, tag, intro, remarks }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelclassify/modify`, { userId, userPassword, _id, id, name, parentId, type, tag, intro, remarks }, ErrorMsg, '修改应用文集分组数据信息'); 
    },
    Delete_modelclassify({ userId, userPassword, _id }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelclassify/delete`, { userId, userPassword, _id }, ErrorMsg, '删除应用文集分组数据信息');
    },
    // // 文集文章 cdur
    Return_modelarticlelist({ appUuid, classifyPath, page = 1, num = 10}, apiTag = '') {  
        return handleGetData(`/${apiTag}/textcollection/modelarticlelist`, { appUuid, classifyPath, page, num }, false, '获取文集文章列表');
    },
    Return_modelarticle({ _id }, apiTag = '') {  
        return handleGetData(`/${apiTag}/textcollection/modelarticlemsg`, { _id }, true, '获取文集文章详情', 'one_object');
    },
    Add_modelarticle({ userId, userPassword, appUuid, title, poet, classifyId, classifyPath, type, tag, textType, customText, htmlText, intro, remarks }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelarticle/add`, { userId, userPassword, appUuid, title, poet, classifyId, classifyPath, type, tag, textType, customText, htmlText, intro, remarks }, ErrorMsg, '增加文集文章信息');
    },
    Modify_modelarticle({ userId, userPassword, _id, id, title, poet, classifyId, classifyPath, type, tag, textType, customText, htmlText, intro, remarks }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelarticle/modify`, { userId, userPassword, _id, id, title, poet, classifyId, classifyPath, type, tag, textType, customText, htmlText, intro, remarks }, ErrorMsg, '修改文集文章信息');
    },
    Delete_modelarticle({ userId, userPassword, _id }, apiTag = '', ErrorMsg = true) { 
        return handlePostData(`/${apiTag}/textcollection/modelarticle/delete`, { userId, userPassword, _id }, ErrorMsg, '删除文集文章信息') 
    },
}