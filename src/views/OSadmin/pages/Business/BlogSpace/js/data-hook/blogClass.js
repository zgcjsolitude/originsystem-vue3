import { ref, reactive, onMounted, toRefs } from 'vue';
import service from '../service';

export const BlogClassDataHook = function() {
    let blogclassObj = {};
    const blogclassData = ref([]);
    const blogclassTree = ref([]);
    const blogclassLoading = ref(false);
    async function getBlogClassData() {
        blogclassLoading.value = true;
        blogclassData.value = await service.Return_blogclasslist();
        blogclassLoading.value = false;
        _handleDataTree(blogclassData.value);
    }
    function _handleDataTree(data) {
        blogclassObj = {};
        data.forEach(el => {
            blogclassObj[el.id] = { ...el, children: [] };
        });
        Object.keys(blogclassObj).forEach(key => {
            if (blogclassObj[blogclassObj[key].parentId]) {
                blogclassObj[blogclassObj[key].parentId].children.push(blogclassObj[key]);
            } else {
                blogclassObj[blogclassObj[key].parentId] = { id: -1, children: [] };
                blogclassObj[blogclassObj[key].parentId].children.push(blogclassObj[key]);
            }
        });
        blogclassTree.value = blogclassObj[-1] ? blogclassObj[-1].children : [];
    }

    return {
        blogclassData,
        blogclassObj,
        blogclassTree,
        blogclassLoading,
        getBlogClassData
    }
}
