<template>
    <div class="PageMsgSetting">
        <div class="OSA-flex-box">
            <div class="flex-left">
                <el-button class="flex-item" size="small" type="primary" @click="openAddDrawer">新增</el-button>
            </div>
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

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" @updateTableData="updateTableData" />
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';

import EditDrawer from './editDrawer.vue';

import service from '../../js/service';
import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';

const clientHeight = document.body.clientHeight;

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_webpagemsglist({
        lv1Name: '',
        lv2Name: '',
        lv3Name: '',
        lv4Name: '',
    });
    tableLoading.value = false;
    tableData.value = data;
    pagination.total = count;
}

const columns = computed(() => [
    {
        prop: 'name',
        minWidth: '150',
        label: '页面名称',
    },
    {
        prop: 'pageCode',
        minWidth: '160',
        label: '页面编码',
    },
    {
        prop: 'path',
        minWidth: '180',
        label: '页面路径',
    },
    {
        prop: 'lv1Name',
        width: '130',
        label: '页面一级分类',
    },
    {
        prop: 'lv2Name',
        width: '130',
        label: '页面二级分类',
    },
    {
        prop: 'lv3Name',
        width: '130',
        label: '页面三级分类',
    },
    {
        prop: 'lv4Name',
        width: '130',
        label: '页面四级分类',
    },
    {
        prop: 'visitingTime',
        minWidth: '100',
        label: '访问次数',
    },
    {
        prop: 'updater',
        width: '130',
        label: '更新人',
    },
    {
        align: 'center',
        label: '操作',
        width: '180',
        fixed: 'right',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-button size="small" type="primary" onClick={() => openModifyDrawer(row)}>
                        修改
                    </el-button>
                    <el-button size="small" type="danger" onClick={() => deleteColumn(row)}>
                        删除
                    </el-button>
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
    editDrawerParams._title = '添加页面信息';
    editDrawer.value = true;
}
function openModifyDrawer(row) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改添加页面信息';
    Object.keys(row).forEach(key => {
        editDrawerParams[key] = row[key];
    });
    editDrawer.value = true;
}
async function deleteColumn(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_webpagemsg({
            userName: userName.value,
            userPassword: userPassword.value,
            _id: row._id,
        });
        if (code === 200) {
            ElMessage.success(message);
            updateTableData();
        }
    }
}

onMounted(() => {
    refreshTableData();
});
</script>
