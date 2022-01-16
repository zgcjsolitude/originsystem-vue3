<template>
    <div class="UserMsgTable">
        <div class="OSA-flex-box">
            <div class="flex-left">
                <el-select class="flex-item" size="small" placeholder="请选择类别"
                    v-model="selectValue.class"
                    :popper-class="storeProfilesgetter"
                    @change="refreshTableData"
                    >
                    <el-option label="全部" :value="nullValue"></el-option>
                    <el-option v-for="(item, i) in userMsgClassList" :key="i" :label="item.Content" :value="item.Value"></el-option>
                </el-select>
                <el-button class="flex-item" size="small" type="primary" @click="openAddDrawer">新增</el-button>
                <el-button class="flex-item" size="small" type="primary" @click="openAddDrawer2">新增组类标识</el-button>
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
        
        <EditDialog v-model:visible="userMsgDialog" :formModelParams="userMsgForm" @updateTableData="updateFace" />
    </div>
</template>     

<script lang='jsx' setup>
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

const userMsgClassList = ref([]);
const nullValue = '';
const selectValue = reactive({
    class: ""
});
async function getUserMsgClassList() {
    const { data } = await service.Return_usermsg({
        sign: "allsign",
        userName: userName.value,
    });
    userMsgClassList.value = data;
}

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data } = await service.Return_usermsg({
        userName: userName.value,
        sign: selectValue.class,
    });
    tableData.value = data;
    tableLoading.value = false;
}
const columns = computed(() => [
    {
        prop: 'Creator',
        width: '120',
        label: '创建人',
    },
    { 
        prop: 'Sign',
        align: 'center',
        width: '100',
        label: '标识',
    },
    { 
        prop: 'Value',
        width: '180',
        label: '标识值',
    },
    { 
        prop: 'Content',
        width: '200',
        label: '标识说明',
    },
    { 
        prop: 'Beizhu',
        minWidth: '200',
        label: '备注',
    }, 
    {
        align: 'center',
        label: '操作',
        width: '200',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-button size="small" type="primary" onClick={() => openModifyDrawer(row)}>
                        修改
                    </el-button>
                    <el-button size="small" type="danger" onClick={() => deleteUserMsg(row)}>
                        删除
                    </el-button>
                </div>
            }
        }
    }
]);

const userMsgDialog = ref(false);
const userMsgForm = reactive({
    _action: "",
    _title: "",
});
function openAddDrawer() {
    userMsgForm._action = "add";
    userMsgForm._title = "新增分组信息标识";
    userMsgForm.Sign = "";
    userMsgDialog.value = true;
}
function openAddDrawer2() {
    userMsgForm._action = "add";
    userMsgForm._title = "新增分组信息标识";
    userMsgForm.Sign = "allsign";
    userMsgDialog.value = true;
}
function openModifyDrawer(row) {
    userMsgForm._title = "修改";
    userMsgForm._action = "modify";
    Object.keys(row).forEach(key => {
        userMsgForm[key] = row[key];
    });
    userMsgDialog.value = true;
}
async function deleteUserMsg(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_usermsg({
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
function updateFace() {
    updateTableData();
    getUserMsgClassList();
}

onMounted(() => {
    refreshTableData();
    getUserMsgClassList();
});
</script>
