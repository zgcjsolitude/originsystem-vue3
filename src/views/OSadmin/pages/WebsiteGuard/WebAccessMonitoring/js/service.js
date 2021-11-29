import { handleGetData, handlePostData } from '@/utils/utils-api';

export default {
    // 获取网站页面配置数据信息
    Return_webpagemsglist_chart({ lv1Name, lv2Name, lv3Name, lv4Name, page = 1, num = 100 }, ErrorMsg = false) {
        return handleGetData('/webpagemsglist/chart', { lv1Name, lv2Name, lv3Name, lv4Name, page, num }, ErrorMsg, '获取网站页面配置数据信息')
    },
}