import { ref } from 'vue';
import service from '../service';

export const BookClassDataHook = function() {
    let bookclassMapObj = {};
    const bookclassTable = ref([]);
    const bookclassTree = ref([]);
    const bookclassLoading = ref(false);
    async function getBookClassData() {
        bookclassLoading.value = true;
        bookclassTable.value = await service.Return_bookclasslist();
        bookclassLoading.value = false;
        _handleDataTree(bookclassTable.value);
    }
    function _handleDataTree(bookclass) {
        bookclassMapObj = {};
        bookclass.forEach(el => {
            bookclassMapObj[el.id] = { ...el, children: [] };
        });
        Object.keys(bookclassMapObj).forEach(key => {
            if (bookclassMapObj[bookclassMapObj[key].parentId]) {
                bookclassMapObj[bookclassMapObj[key].parentId].children.push(bookclassMapObj[key]);
            } else {
                bookclassMapObj[bookclassMapObj[key].parentId] = { id: -1, children: [] };
                bookclassMapObj[bookclassMapObj[key].parentId].children.push(bookclassMapObj[key]);
            }
        });
        bookclassTree.value = bookclassMapObj[-1] ? bookclassMapObj[-1].children : [];
    }

    return {
        bookclassTable,
        bookclassMapObj,
        bookclassTree,
        bookclassLoading,
        getBookClassData
    }
}
