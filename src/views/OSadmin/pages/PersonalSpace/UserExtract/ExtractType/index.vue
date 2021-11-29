<template>
      <div class="UseExtractType">
        <div class="OSA-flex-box">
            <el-button class="flex-left" size="small" type="primary" @click="openAddExtractTypeDialog">
                <i class="el-icon-plus"></i>
            </el-button>
        </div>
        
        <cjui-elplus-table border
            :height="clientHeight - 210"
            :loading="tableLoading"
            :columns="columns"
            :table-data="tableData"
            :pagination="pagination"
            :paginationClass="storeProfilesgetter"
            @sizeChange="sizeChange"
            @currentChange="currentChange">
        </cjui-elplus-table>

        <EditDialog v-model:visible="extractTypeDialog" :formModelParams="newExtractType" @updateTableData="updateTableData" />
  </div>
</template>

<script lang="jsx" setup>
import { ref, computed, reactive, inject, onMounted } from 'vue';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';

import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';
import service from '../js/service';

import EditDialog from './editDialog.vue';

const clientHeight = document.body.clientHeight;

const store = useStore();

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const columnsOpt = [
    {
        align: 'center',
        prop: 'Creator',
        label: '创建人',
        width: '180',
    }, {
        align: 'center',
        prop: 'Sign',
        label: '标识',
        width: '180',
    }, {
        align: 'center',
        prop: 'Value',
        label: '组名',
        width: '180',
    }, {
        align: 'center',
        label: '操作',
        minWidth: '200',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-button size="small" type="primary" onClick={() => openModifyDialog(row)}>
                        修改
                    </el-button>
                    <el-button size="small" type="danger" onClick={() => deleteColumn(row)}>
                        删除
                    </el-button>
                </div>
            }
        }
    }
];
const columns = computed(() => [...columnsOpt]);
let { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data } = await service.Return_userextracttype({
        userName: userName.value,
    });
    tableData.value = data;
    tableLoading.value = false;
    store.commit("OsAdmin/vuexLoadUserExtractTypeList", tableData.value);
}

const extractTypeDialog = ref(false);
const newExtractType = reactive({
    _action: "",
    _title: "",
    _id: "",
    Value: "",
});
const btnDialogAddLoading = ref(false);
async function openAddExtractTypeDialog() {
     newExtractType._action = "add";
     newExtractType._title = "新增摘录分组";
     extractTypeDialog.value = true;
}
async function openModifyExtractTypeDialog(row) {
    newExtractType._action = "modify";
    newExtractType._title = "修改摘录分组";
    Object.keys(row).forEach(key => {
        newExtractType[key] = row[key];
    });
    extractTypeDialog.value = true;
}
async function deleteExtractType(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_userextracttype({
            userName: userName.value,
            userPassword: userPassword.value,
            id: row._id,
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