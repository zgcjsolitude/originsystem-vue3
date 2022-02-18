<template>
    <div class="BM-BW-bookclass">
        <div class="d-flex">
            <el-button class="flex-item ml-auto" size="small" type="primary" @click="openAddDrawer">
                <i class="el-icon-plus"></i>
            </el-button>
        </div>

        <cjui-el-table border
            :height="clientHeight - 210"
            :loading="bookclassLoading"
            :columns="columns"
            :table-data="bookclassTable"
            :paginationClass="storeProfilesgetter">
        </cjui-el-table>

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :classLevel1="bookclassTree" @updateData="updateData" />
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons';

import { BookClassDataHook } from '../../js/data-hook/bookClass';

import EditDrawer from './EditDrawer.vue';

const clientHeight = document.body.clientHeight;

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

const { bookclassTable,
        bookclassMapObj,
        bookclassTree,
        bookclassLoading,
        getBookClassData } = BookClassDataHook();

const columns = computed(() => [
    {
        prop: 'id',
        label: '分组ID',
        width: '80',
    }, 
    {
        prop: 'name',
        label: '分组名称',
        minWidth: '200',
    }, 
    {
        prop: 'level',
        label: '分组级别',
        width: '100',
    },  
    {
        prop: 'type',
        label: '分组类型',
        width: '100',
    }, 
    {
        prop: 'parentId',
        label: '父级ID',
        width: '100',
    }, 
    {
        prop: 'path',
        label: '级别路径',
        width: '150',
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
    _actionTag: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加章节分组信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    // if (!node.children || !node.children.length) {
    //     editDrawerParams._actionTag = 'all';
    // }
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改章节分组信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}

function updateData() {
    getBookClassData();
}

onMounted(() => {
    getBookClassData();
});
</script>
