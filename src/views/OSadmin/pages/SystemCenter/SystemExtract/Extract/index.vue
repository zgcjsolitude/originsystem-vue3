<template>
    <div class="SystemExtractTable">
        <div class="OSA-flex-box">
            <div class="flex-left">
                <el-select class="flex-item" size="small" placeholder="请选择类别"
                    v-model="selectValue"
                    :popper-class="storeProfilesgetter"
                    @change="refreshTableData"
                    >
                    <el-option label="全部" :value="nullValue"></el-option>
                    <el-option v-for="(item, i) in vuexSystemExtractTypeList" :key="i" :label="item.Value" :value="item.Value" ></el-option>
                </el-select>
                <el-button class="flex-item" size="small" type="primary" @click="openAddExtractDialog">新增</el-button>
            </div>
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

        <EditDialog v-model:visible="extractDialog" :formModelParams="newExtract" @updateTableData="updateTableData" />
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
const vuexSystemExtractTypeList = computed(() => store.state.OsAdmin.vuexSystemExtractTypeList);

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const selectValue = ref('');
const nullValue = '';

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_systemextractlist({
        userName: userName.value,
        sign: selectValue.value,
    });
    tableLoading.value = false;
    tableData.value = data;
}
const columns = [
    {
        align: 'center',
        prop: 'Title',
        label: '标题',
        width: '160',
    }, {
        align: 'center',
        prop: 'Poet',
        label: '作者',
        width: '160',
    }, {
        align: 'center',
        prop: 'Sign',
        label: '分组',
        width: '150',
    }, {
        prop: 'Content',
        label: '内容',
        mixWidth: '180',
    }, {
        align: 'center',
        label: '操作',
        width: '200',
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

const extractDialog = ref(false);
const newExtract = reactive({
    _action: "",
    _title: "",
});
function openAddExtractDialog() {
    newExtract._action = "add";
    newExtract._title = "新增";
    if (selectValue.value) {
        newExtract.Sign = selectValue.value;
    }
    extractDialog.value = true;
}
function openModifyDialog(row) {
    newExtract._action = "modify";
    newExtract._title = "修改";
    Object.keys(row).forEach(key => {
        newExtract[key] = row[key];
    });
    extractDialog.value = true;
}
async function deleteColumn(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_systemextract({
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