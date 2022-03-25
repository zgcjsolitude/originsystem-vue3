<template>
    <el-drawer direction="rtl" size="100%"
        :model-value="visible"
        :title="formModelParams._title || '编辑文档信息'"
        @open="openEvent"
        @close="closeEvent"
    >
		<TinymceEditor v-model:value="formModel.htmlText" :height="650" />

        <div>
            <el-button class="flex-item ml-auto" type="primary" @click="saveEvent">
                保存
            </el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { reactive, toRefs, inject, ref } from 'vue';
import { ElMessage } from 'element-plus';

import TinymceEditor from '@/components/project/TinymceEditor/index.vue';

import service from '../../../js/service';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    formModelParams: {
        type: Object,
        default: () => {
            return {
                _action: "",
                _title: "",
            }
        }
    },
});

const emit = defineEmits(['update:visible']);

const { formModelParams } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');

const loading = ref(false);
const editBtnLoading = ref(false);
const formModel = reactive({
    title: '',
    parentId: '',
    htmlText: '',
});
function clearFormModel() {
    formModel.title = '';
    formModel.parentId = '';
    formModel.htmlText = '';
}
function saveEvent() {
    modifyFormModel();
}

async function getArticleMsg() {
    loading.value = true;
    const dataObj = await service.Return_modelarticletree({ _id: formModelParams.value._id }, module.value);
    loading.value = false;
    Object.keys(formModel).forEach(key => {
        if (![null, undefined].includes(dataObj[key])) {
            formModel[key] = dataObj[key];
        }
    });
}
async function modifyFormModel() {
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_modelarticletree({
        userId: userId.value,
        userPassword: userPassword.value,
        _id: formModelParams.value._id,
        id: formModelParams.value.id,
        title: formModelParams.value.title,
        parentId: formModelParams.value.parentId,
        customText: '',
        htmlText: formModel.htmlText,
    }, module.value);
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
    }
}

function openEvent() {
    getArticleMsg();
}

function closeEvent() {
    emit('update:visible', false);
    clearFormModel();
}
</script>