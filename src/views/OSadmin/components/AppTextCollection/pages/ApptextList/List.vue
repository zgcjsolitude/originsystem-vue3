<template>
    <div>
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
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject, toRefs, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit, Document } from '@element-plus/icons';

import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';

import service from '../../js/service';

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
    config: {
        type: Object,
        default: () => ({}),
    },
    classifyPath: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['openModifyDrawer', 'openTextTool']);

const { appUuid, config, classifyPath } = toRefs(props);

const clientHeight = document.body.clientHeight;

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_modelarticlelist({
        appUuid: appUuid.value,
        classifyPath: classifyPath.value,
        page: pagination.current,
        num: pagination.size,
    }, module.value);
    tableLoading.value = false;
    tableData.value = data;
    pagination.total = count;
}
const columns = computed(() => [
    {
        prop: 'id',
        label: 'ID',
        width: '80',
    }, 
    {
        prop: 'title',
        label: '标题',
        minWidth: '200',
    }, 
    {
        prop: 'poet',
        label: '作者',
        minWidth: '150',
    }, 
    {
        prop: 'classifyId',
        label: '分组',
        width: '120',
    },  
    {
        prop: 'classifyPath',
        label: '分组路径',
        width: '120',
    }, 
    {
        prop: 'intro',
        label: '简介',
        minWidth: '150',
    }, 
    {
        prop: 'remarks',
        label: '备注',
        minWidth: '150',
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
                return <div>
                    <el-icon style="cursor:pointer;margin-right:5px;" size={16} onClick={() => openModifyDrawer(row)}><Edit /></el-icon>
                    <el-icon style="cursor:pointer;" size={16} onClick={() => openTextDialog(row)}><Document /></el-icon>
                </div>
            }
        }
    }
]);

function openModifyDrawer(row) {
    emit('openModifyDrawer', row);
}

function openTextDialog(row) {
    emit('openTextTool', row);
}

onMounted(() => {
    getTableData();
});
</script>

