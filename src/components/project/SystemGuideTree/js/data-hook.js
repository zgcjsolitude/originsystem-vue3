import { ref, reactive, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import service from './service';

export const PageClassDataHook = function() {
    const treeData = ref([]);
    const originData = ref([]);
    const treeLoading = ref(false);
    async function getTreeData() {
        treeLoading.value = true;
        originData.value = await service.Return_webpageclasslist();
        treeLoading.value = false;
        _handleDataTree(originData.value);
    }
    function _handleDataTree(data) {
        let obj = {};
        data.forEach(el => {
            obj[el.id] = { ...el, children: [] };
        });
        Object.keys(obj).forEach(key => {
            if (obj[obj[key].parentId]) {
                obj[obj[key].parentId].children.push(obj[key]);
            } else {
                obj[obj[key].parentId] = { id: -1, children: [] };
                obj[obj[key].parentId].children.push(obj[key]);
            }
        });
        treeData.value = obj[-1] ? obj[-1].children : [];
    }

    return {
        treeData,
        originData,
        treeLoading,
        getTreeData
    }
}
