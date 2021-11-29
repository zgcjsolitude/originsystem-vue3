<template>
      <div>
        <div class="OSA-flex-box">
            <el-select class="flex-left" size="small" placeholder="请选择博文类别" 
                v-model="blogClassValue"
                :popper-class="storeProfilesgetter"
                @change="refreshTableData"
                >
                <el-option label="全部" :value="nullValue"></el-option>
                <el-option v-for="(item, i) in vuexBlogClassList" :key="i" :label="item.Value" :value="item.Value"></el-option>
            </el-select>
            <el-upload class="flex-unset"
                :action="actionurl"
                :data="fileMsg"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                >
                <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
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
        
        <EditDialog v-model:visible="blogDialog" :formModelParams="newBlog" @updateTableData="updateTableData" />
      </div>
</template>

<script lang="jsx" setup>
import { ref, computed, reactive, inject, onMounted } from 'vue';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';

import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';
import { ApiBaseUrl } from '@/assets/js/data-dictionary';
import service from '../js/service';

import EditDialog from './editDialog.vue';

const clientHeight = document.body.clientHeight;

const store = useStore();
const vuexBlogClassList = computed(() => store.state.OsAdmin.vuexBlogClassList);

const storeProfilesgetter = inject('storeProfilesgetter');
const userName = inject('userName');
const userEmail = inject('userEmail');
const userPassword = inject('userPassword');

const blogClassValue = ref('');
const nullValue = '';
const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_userblog({
        userName: userName.value,
        className: blogClassValue.value,
        page: pagination.current,
        num: pagination.size,
    });
    tableData.value = data;
    pagination.totalCount = count;
    tableLoading.value = false;
}
const columns = computed(() => [
    {
        prop: 'Name',
        label: '博文名称',
        width: '230',
    }, 
    {
        prop: 'Class',
        label: '分组类别',
        width: '200',
    }, 
    {
        align: 'center',
        prop: 'Read',
        label: '阅读数',
    }, 
    {
        align: 'center',
        prop: 'Like',
        label: '点赞数',
    }, 
    {
        align: 'center',
        label: '操作',
        width: '200',
        slots: {
            default: ({ row }) => {
                return <div>
                    <el-button size="small" type="primary" onClick={() => openModifyBlogDialog(row)}>
                        修改
                    </el-button>
                    <el-button size="small" type="danger" onClick={() => deleteBlog(row)}>
                        删除
                    </el-button>
                </div>
            }
        }
    }
]);

const blogDialog = ref(false);
const newBlog = reactive({});
function openModifyBlogDialog(row) {
    Object.keys(row).forEach(key => {
        newBlog[key] = row[key];
    });
    blogDialog.value = true;
}
async function deleteBlog(row) {
    if (confirm("确定删除？")) {
        const { code, message } = await service.Delete_userblog({
            userName: userName.value,
            userPassword: userPassword.value,
            id: row._id,
            Sign: row.Sign,
            Url: row.Url,
        });
        if (code === 200) {
            ElMessage.success(message);
            updateTableData();
        }
    }
}

const actionurl = ApiBaseUrl + "/userfile/blogupload";
const fileMsg = reactive({
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
    blogClass: blogClassValue.value,
});
function handleAvatarSuccess(res) {
    if (res.code === 200) {
        updateTableData();
        return
    }
    ElMessage.error(res.message);
}

onMounted(() => {
    refreshTableData();
});
</script>