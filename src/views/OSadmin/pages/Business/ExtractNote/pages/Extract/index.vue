<template>
    <div class="BM-BW-bookclass">
        <div class="d-flex">
            <el-button class="flex-item ml-auto" size="small" type="primary" @click="openAddDrawer">
                <i class="el-icon-plus"></i>
            </el-button>
        </div>

        <cjui-el-table border
            :height="clientHeight - 210"
            :loading="tableLoading"
            :columns="columns"
            :table-data="tableData"
            :pagination="pagination"
            :paginationClass="storeProfilesgetter"
            @sizeChange="sizeChange"
            @currentChange="currentChange">
        </cjui-el-table>

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" @updateData="updateData" />
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons';

import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';
import service from '../../js/service';

import EditDrawer from './EditDrawer.vue';

const clientHeight = document.body.clientHeight;

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_extractlist({
        userName: userName.value,
        page: pagination.current,
        num: pagination.size,
    });
    tableData.value = data;
    pagination.total = count;
    tableLoading.value = false;
}

const columns = computed(() => [
    {
        prop: 'id',
        label: '摘录ID',
        width: '80',
    }, 
    {
        prop: 'title',
        label: '摘录标题',
        minWidth: '120',
    }, 
    {
        prop: 'poet',
        label: '作者',
        minWidth: '120',
    }, 
    {
        prop: 'classify',
        label: '类别',
        width: '100',
    }, 
    {
        prop: 'content',
        label: '内容',
        minWidth: '200',
    }, 
    {
        prop: 'intro',
        label: '简记',
        minWidth: '200',
    }, 
    {
        prop: 'updater',
        label: '更新人',
        width: '120',
    }, 
    {
        prop: 'updatedTime',
        label: '更新时间',
        width: '200',
    }, 
    {
        fixed: 'right',
        align: 'center',
        label: '编辑',
        width: '100',
        slots: {
            default: ({ row }) => {
                return <el-icon style="cursor:pointer;" size={16} onClick={() => openModifyDrawer(row)}><Edit /></el-icon>
            }
        }
    }
]);

const editDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加摘录';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改摘录信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}

function updateData() {
    refreshTableData();
}


onMounted(() => {
    refreshTableData();
});
</script>
