import { ref, reactive, onMounted, toRefs } from 'vue';

export const OsaElTableHook = function(callback) {
	const tableData = ref([]);
	const tableLoading = ref(false);
	const pageSizes = ref([10, 20, 50, 100]);
    let pagination = reactive({
        size: 10,
        current: 1,
        totalCount: 0,
    });

    function sizeChange(size) {
        pagination.size = size;
        pagination.current = 1;
        updateTableData();
    }
    function currentChange(current) {
        pagination.current = current;
        updateTableData();
    }
    function refreshTableData() {
        pagination.current = 1;
        updateTableData();
    }
    function updateTableData() {
        callback();
    }

    return {
        tableData,
        tableLoading,
        pagination,
        pageSizes,
        sizeChange,
        currentChange,
        refreshTableData,
        updateTableData
    }
}