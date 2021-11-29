<template>
    <div class="PageMsgSetting">
        <div class="OSA-flex-box">
            <div class="flex-left">
                <el-select class="flex-item" size="small" placeholder="一级分类" v-model="classLevelQuery.lv1Name" clearable @change="lv1NameChange">
                    <el-option v-for="item in classLevel1" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select class="flex-item" size="small" placeholder="二级分类" v-model="classLevelQuery.lv2Name" clearable @change="lv2NameChange">
                    <el-option v-for="item in classLevel2" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-select class="flex-item" size="small" placeholder="三级分类" v-model="classLevelQuery.lv3Name" clearable @change="filterTableData">
                    <el-option v-for="item in classLevel3" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button class="flex-item" size="small" type="primary" @click="openAddDrawer">新增</el-button>
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

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :classLevel1="classLevel1" @updateTableData="updateTableData" />
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

const classLevelQuery = reactive({
    lv1Name: '',
    lv2Name: '',
    lv3Name: '',
});
const originData = ref([]);
const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    originData.value = await service.Return_webpageclasslist();
    tableLoading.value = false;
    filterTableData();
    handleDataTree(originData.value);
}
function filterTableData() {
    let parentId = '';
    [classLevelQuery.lv1Name, classLevelQuery.lv2Name, classLevelQuery.lv3Name].forEach(el => {
        if (![null, undefined, ''].includes(el)) {
            parentId = el;
        }
    });
    if (parentId !== '') {
        tableData.value = originData.value.filter(el => Number(el.parentId) === parentId);
    } else {
        tableData.value = originData.value;
    }
}
const classLevel1 = ref([]);
const classLevel2 = ref([]);
const classLevel3 = ref([]);
function handleDataTree(data) {
    let obj = {};
    data.forEach(el => {
        obj[el.id] = { ...el, children: [] };
    });
    Object.keys(obj).forEach(key => {
        if (obj[obj[key].parentId]) {
            obj[obj[key].parentId].children.push(obj[key]);
        } else {
            obj[obj[key].parentId] = { id: -1, children: [] };
            obj[obj[key].parentId].children.push(obj[key]);
        }
    });
    classLevel1.value = obj[-1] ? obj[-1].children : [];
} 
function lv1NameChange(val) {
    classLevelQuery.lv2Name = '';
    classLevelQuery.lv3Name = '';
    classLevel2.value = [];
    classLevel3.value = [];

    const valFind = classLevel1.value.find(el => el.id === val);
    if (valFind) {
        classLevel2.value = valFind.children;
    }
    filterTableData();
}
function lv2NameChange(val) {
    classLevelQuery.lv3Name = '';
    classLevel3.value = [];
    
    const valFind = classLevel2.value.find(el => el.id === val);
    if (valFind) {
        classLevel3.value = valFind.children;
    }
    filterTableData();
}

const columns = computed(() => [
    {
        prop: 'id',
        minWidth: '150',
        label: '页面分类ID',
    },
    {
        prop: 'name',
        minWidth: '150',
        label: '页面分类名称',
    },
    {
        prop: 'level',
        minWidth: '160',
        label: '页面分类级别',
    },
    {
        prop: 'parentId',
        width: '130',
        label: '页面父类ID',
    },
    {
        prop: 'path',
        minWidth: '180',
        label: '页面层级路径',
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
        const { code, message } = await service.Delete_webpageclass({
            userName: userName.value,
            userPassword: userPassword.value,
            _id: row._id,
            id: row.id
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
