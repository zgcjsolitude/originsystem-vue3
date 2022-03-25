import { ref } from 'vue';
import service from '../service';

export const AppTextTreeHook = function() {
    let appTextTreeMapObj = {};
    const appTextTreeTable = ref([]);
    const appTextTreeTree = ref([]);
    const appTextTreeLoading = ref(false);
    async function getAppTextTreeData(appUuid, module) {
        appTextTreeLoading.value = true;
        appTextTreeTable.value = await service.Return_modelarticletreelist({ appUuid }, module);
        appTextTreeLoading.value = false;
        _handleDataTree(appTextTreeTable.value);
    }
    function _handleDataTree(appTextTree) {
        appTextTreeMapObj = {};
        appTextTree.forEach(el => {
            appTextTreeMapObj[el.id] = { ...el, children: [] };
        });
        Object.keys(appTextTreeMapObj).forEach(key => {
            if (appTextTreeMapObj[appTextTreeMapObj[key].parentId]) {
                appTextTreeMapObj[appTextTreeMapObj[key].parentId].children.push(appTextTreeMapObj[key]);
            } else {
                appTextTreeMapObj[appTextTreeMapObj[key].parentId] = { id: -1, children: [] };
                appTextTreeMapObj[appTextTreeMapObj[key].parentId].children.push(appTextTreeMapObj[key]);
            }
        });
        appTextTreeTree.value = appTextTreeMapObj[-1] ? appTextTreeMapObj[-1].children : [];
    }

    return {
        appTextTreeTable,
        appTextTreeMapObj,
        appTextTreeTree,
        appTextTreeLoading,
        getAppTextTreeData
    }
}
