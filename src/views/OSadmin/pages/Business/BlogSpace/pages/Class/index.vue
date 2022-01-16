<template>
    <div class="BM-BS-blogclass">
        <div class="d-flex">
            <el-button class="flex-item ml-auto" size="small" type="primary" @click="openAddDrawer">
                <i class="el-icon-plus"></i>
            </el-button>
        </div>

        <cjui-el-table border
            :height="clientHeight - 210"
            :loading="blogclassLoading"
            :columns="columns"
            :table-data="blogclassData"
            :paginationClass="storeProfilesgetter">
        </cjui-el-table>

        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :classLevel1="blogclassTree" @updateData="updateData" />
    </div>
</template>

<script lang="jsx" setup>
import { computed, onMounted, ref, reactive, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons';

import { BlogClassDataHook } from '../../js/data-hook/blogClass';

import EditDrawer from './EditDrawer.vue';

const clientHeight = document.body.clientHeight;

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userPassword = inject('userPassword');

const { blogclassData,
        blogclassObj,
        blogclassTree,
        blogclassLoading,
        getBlogClassData } = BlogClassDataHook();

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
    editDrawerParams._title = '添加博文分组信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    // if (!node.children || !node.children.length) {
    //     editDrawerParams._actionTag = 'all';
    // }
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改博文分组信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}

function updateData() {
    getBlogClassData();
}

onMounted(() => {
    getBlogClassData();
});
</script>
