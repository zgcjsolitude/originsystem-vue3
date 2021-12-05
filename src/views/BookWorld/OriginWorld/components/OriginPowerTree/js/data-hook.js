import { ref, reactive, onMounted, toRefs } from 'vue';
import service from './service';

export const OriginPowerDataHook = function() {
    let originObj = {};
    const originData = ref([]);
    const treeData = ref([]);
    const treeLoading = ref(false);
    async function getTreeData() {
        treeLoading.value = true;
        originData.value = await service.Return_originpowerlist();
        treeLoading.value = false;
        _handleDataTree(originData.value);
    }
    function _handleDataTree(data) {
        originObj = {};
        data.forEach(el => {
            originObj[el.id] = { ...el, children: [] };
        });
        Object.keys(originObj).forEach(key => {
            if (originObj[originObj[key].parentId]) {
                originObj[originObj[key].parentId].children.push(originObj[key]);
            } else {
                originObj[originObj[key].parentId] = { id: -1, children: [] };
                originObj[originObj[key].parentId].children.push(originObj[key]);
            }
        });
        treeData.value = originObj[-1] ? originObj[-1].children : [];
    }

    return {
        originData,
        originObj,
        treeData,
        treeLoading,
        getTreeData
    }
}
