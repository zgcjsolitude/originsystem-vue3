<template>
    <el-drawer size="600px" title="表格设计器"
        :model-value="visible"
        @open="openEvent"
        @close="closeEvent"
    >
        <cjui-el-table border
            :columns="columns"
            :table-data="tableData">
        </cjui-el-table>
        <div class="d-flex" style="margin-top:10px;">
            <el-button class="flex-item ml-auto" type="primary" :loading="editBtnLoading" @click="saveDesigner">
                保存
            </el-button>
            <el-button class="flex-item" @click="closeEvent">
                取消
            </el-button>
        </div>
    </el-drawer>
</template>

<script lang="jsx" setup>
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance, watch, computed } from "vue";
import { ElMessage } from 'element-plus';

import service from '../../../js/service';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    appUuid: {
        type: String,
        default: '',
    },
    config: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['update:visible', 'updateTable']);

const { proxy } = getCurrentInstance();

const { appUuid, config } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const tableData = ref([]);
const columns = computed(() => [
    {
        prop: 'paramName',
        label: '字段名称',
        minWidth: '120',
    }, 
    {
        prop: 'paramSign',
        label: '字段标识',
        minWidth: '80',
    }, 
    {
        prop: 'paramSort',
        label: '是否排序',
        minWidth: '80',
        slots: {
            default: ({ row }) => {
                return <el-checkbox checked={row.paramSort} size="large" onChange={() => { row.paramSort = !row.paramSort }} />
            }
        }
    }, 
    {
        prop: 'paramShow',
        label: '是否展示',
        minWidth: '80',
        slots: {
            default: ({ row }) => {
                return <el-checkbox checked={row.paramShow} size="large" onChange={() => { row.paramShow = !row.paramShow }} />
            }
        }
    }, 
]);

const editBtnLoading = ref(false);
async function saveDesigner() {
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_apptextmodel({
        userId: userId.value,
        userPassword: userPassword.value,
        uuid: appUuid.value,
        listOption: JSON.stringify(tableData.value),
    }, module.value);
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        emit('updateTable');
        closeEvent();
    }
}

function openEvent() {
    let option = null;
    if (config.value.listOption) {
        try {
            option = JSON.parse(config.value.listOption)
        } catch(err) {
            console.err(err);
            option = null;
        }
    }

    if (option) {
        tableData.value = option;
    } else {
        tableData.value = [
            { paramSign: 'id', paramName: 'ID', paramSort: false, paramShow: true },
            { paramSign: 'title', paramName: '标题', paramSort: false, paramShow: true },
            { paramSign: 'poet', paramName: '作者', paramSort: false, paramShow: true },
            { paramSign: 'classifyId', paramName: '所属分组', paramSort: false, paramShow: true },
            { paramSign: 'classifyPath', paramName: '分组路径', paramSort: false, paramShow: true },
            { paramSign: 'textType', paramName: '文本格式', paramSort: false, paramShow: true },
            { paramSign: 'htmlText', paramName: '文本内容', paramSort: false, paramShow: true },
            { paramSign: 'intro', paramName: '简述', paramSort: false, paramShow: true },
            { paramSign: 'remarks', paramName: '备注', paramSort: false, paramShow: true },
        ]
    }
}

function closeEvent() {
    emit('update:visible', false);
}
</script>
