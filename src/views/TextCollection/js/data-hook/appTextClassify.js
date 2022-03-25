import { ref } from 'vue';
import service from '../service';

export const AppTextClassifyHook = function() {
    let appTextClassifyMapObj = {};
    const appTextClassifyTable = ref([]);
    const appTextClassifyTree = ref([]);
    const appTextClassifyLoading = ref(false);
    async function getAppTextClassifyData(appUuid, module) {
        appTextClassifyLoading.value = true;
        appTextClassifyTable.value = await service.Return_modelclassifylist({ appUuid }, module);
        appTextClassifyLoading.value = false;
        _handleDataTree(appTextClassifyTable.value);
    }
    function _handleDataTree(appTextClassify) {
        appTextClassifyMapObj = {};
        appTextClassify.forEach(el => {
            appTextClassifyMapObj[el.id] = { ...el, children: [] };
        });
        Object.keys(appTextClassifyMapObj).forEach(key => {
            if (appTextClassifyMapObj[appTextClassifyMapObj[key].parentId]) {
                appTextClassifyMapObj[appTextClassifyMapObj[key].parentId].children.push(appTextClassifyMapObj[key]);
            } else {
                appTextClassifyMapObj[appTextClassifyMapObj[key].parentId] = { id: -1, children: [] };
                appTextClassifyMapObj[appTextClassifyMapObj[key].parentId].children.push(appTextClassifyMapObj[key]);
            }
        });
        appTextClassifyTree.value = appTextClassifyMapObj[-1] ? appTextClassifyMapObj[-1].children : [];
    }

    return {
        appTextClassifyTable,
        appTextClassifyMapObj,
        appTextClassifyTree,
        appTextClassifyLoading,
        getAppTextClassifyData
    }
}
