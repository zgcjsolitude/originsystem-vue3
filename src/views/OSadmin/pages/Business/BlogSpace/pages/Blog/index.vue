<template>
    <div class="BM-BS-blog">
        <div class="d-flex">
            <el-cascader class="flex-item" size="small" placeholder="博文分组选择"
                v-model="filterParams.classify" 
                :options="blogclassTree" 
                :props="filterProps.classifyProps" 
                @change="classifyChange">
            </el-cascader>
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

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :blogclassTree="blogclassTree" @updateData="updateData" />

        <EditMdDialog v-model:visible="editMdDialog" :formModelParams="editDrawerParams" />
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit, Document } from '@element-plus/icons';

import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';
import { BlogClassDataHook } from '../../js/data-hook/blogClass';
import service from '../../js/service';

import EditDrawer from './EditDrawer.vue';
import EditMdDialog from './EditMdDialog.vue';

const clientHeight = document.body.clientHeight;

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const { blogclassTree, getBlogClassData } = BlogClassDataHook();
const filterParams = reactive({
    classify: [],
});
const filterProps = {
    classifyProps: {
        value: 'id',
        label: 'name'
    },
};
function classifyChange() {
    refreshTableData();
}

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_bloglist({
        parentId: '',
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
        label: 'ID',
        width: '80',
    }, 
    {
        prop: 'title',
        label: '博文名称',
        minWidth: '200',
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
        align: 'center',
        label: '编辑',
        width: '100',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-icon style="cursor:pointer;margin-right:5px;" size={16} onClick={() => openModifyDrawer(row)}><Edit /></el-icon>
                    <el-icon style="cursor:pointer;" size={16} onClick={() => openMdDialog(row)}><Document /></el-icon>
                </div>
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
    editDrawerParams._title = '添加博文信息';
    editDrawer.value = true;
}
function openModifyDrawer(row) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改博文信息';
    Object.keys(row).forEach(key => {
        editDrawerParams[key] = row[key];
    });
    editDrawer.value = true;
}
const editMdDialog = ref(false);
function openMdDialog(row) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改博文信息';
    Object.keys(row).forEach(key => {
        editDrawerParams[key] = row[key];
    });
    editMdDialog.value = true;
}

function updateData() {
    refreshTableData();
}

onMounted(() => {
    refreshTableData();
    getBlogClassData();
});
</script>
