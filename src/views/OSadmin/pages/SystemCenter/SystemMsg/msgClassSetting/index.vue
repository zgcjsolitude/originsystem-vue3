<template>
    <div class="UserMsgSetting">
        <div class="OSA-flex-box">
			<div class="flex-left">
            	<el-select class="flex-item" size="small" placeholder="请选择类别"
            	  	v-model="selectValue.class"
            	    :popper-class="storeProfilesgetter"
            	  	@change="refreshTableData"
            	    >
            	  	<el-option label="全部" :value="nullValue"></el-option>
            	  	<el-option v-for="(item, i) in systemMsgClassList" :key="i" :label="item.Content" :value="item.Value"></el-option>
            	</el-select>
				<el-button class="flex-item" size="small" type="primary" @click="openAddDrawer">新增</el-button>
				<el-button class="flex-item" size="small" type="primary" @click="openAddDrawer2">新增标识说明</el-button>
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

        <EditDrawer v-model:visible="systemMsgDrawer" :formModelParams="systemMsgForm" @updateTableData="updateFace" />
    </div>
</template>     

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { useStore } from "vuex"; 
import { ElMessage } from 'element-plus';

import EditDrawer from './editDrawer.vue';

import service from '../js/service';
import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';

const clientHeight = document.body.clientHeight;

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

const systemMsgClassList = ref([]);
const selectValue = reactive({
    class: "",
});
const nullValue = '';
async function getSystemMsgClassList() {
    const { data } = await service.Return_systemmsglist({
        sign: "allsign",
        userName: userName.value,
    });
    systemMsgClassList.value = data;
}

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data } = await service.Return_systemmsglist({
        sign: selectValue.class,
        userName: userName.value,
    });
    tableLoading.value = false;
    tableData.value = data;
}
const columns = [
    { 
        prop: 'Creator',
        width: '150',
        label: '创建人',
    },
    { 
        prop: 'Sign',
        width: '150',
        label: '标识',
    },
    { 
        prop: 'Value',
        width: '150',
        label: '标识值',
    },
    { 
        prop: 'Content',
        width: '180',
        label: '标识说明',
    },
    { 
        prop: 'Beizhu',
        minWidth: '120',
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
                    <el-button size="small" type="danger" onClick={() => deleteColumn(row)}>
                        删除
                    </el-button>
                </div>
            }
        }
    }
];


const systemMsgDrawer = ref(false);
const systemMsgForm = reactive({
    _action: "",
    _title: "",
});
function openAddDrawer() {
    systemMsgForm._action = "add";
    systemMsgForm._title = "新增";
    systemMsgForm.Sign = "";
    systemMsgDrawer.value = true;
}
function openAddDrawer2() {
    systemMsgForm._action = "add";
    systemMsgForm._title = "新增";
    systemMsgForm.Sign = "allsign";
    systemMsgDrawer.value = true;
}
function openModifyDrawer(row) {
    systemMsgForm._title = "修改";
    systemMsgForm._action = "modify";
    Object.keys(row).forEach(key => {
        systemMsgForm[key] = row[key];
    });
    systemMsgDrawer.value = true;
}
async function deleteColumn(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_systemmsg({
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
    getSystemMsgClassList();
}

onMounted(() => {
    getSystemMsgClassList();
    refreshTableData();
});
</script>