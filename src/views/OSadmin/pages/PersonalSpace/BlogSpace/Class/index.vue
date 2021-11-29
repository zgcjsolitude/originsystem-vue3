<template>
    <div class="UserBlogClass">
        <div class="OSA-flex-box">
            <el-button class="flex-left" size="small" type="primary" @click="openAddBlogClassDialog">
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

        <EditDialog v-model:visible="blogClassDialog" :formModelParams="newBlogClass" @updateTableData="updateTableData" />
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

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

let { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data } = await service.Return_userblogclass({
        userName: userName.value,
    });
    tableData.value = data;
    tableLoading.value = false;
    store.commit("OsAdmin/vuexLoadBlogClassList", tableData.value);
}
const columns = computed(() => [
    {
        prop: 'Value',
        label: '组名',
    }, 
    {
        align: 'center',
        label: '操作',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-button size="small" type="primary" onClick={() => openModifyBlogClassDialog(row)}>
                        修改
                    </el-button>
                    <el-button size="small" type="danger" onClick={() => deleteBlogClass(row)}>
                        删除
                    </el-button>
                </div>
            }
        }
    }
]);

const blogClassDialog = ref(false);
const newBlogClass = reactive({
    _action: "",
    _title: "",
});
function openAddBlogClassDialog() {
    newBlogClass._action = "add";
    newBlogClass._title = "新增博客分组";
    blogClassDialog.value = true;
}
function openModifyBlogClassDialog(row) {
    newBlogClass._action = "modify";
    newBlogClass._title = "修改博客分组";
    Object.keys(row).forEach(key => {
        newBlogClass[key] = row[key];
    });
    blogClassDialog.value = true;
}
async function deleteBlogClass(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_userblogclass({
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