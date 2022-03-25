<template>
    <el-drawer direction="rtl" size="100%"
        :model-value="visible"
        :title="formModelParams._title || '编辑文档信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <div style="padding:20px;">
            <el-input type="textarea" :rows="20" v-model="formModel.htmlText"></el-input>
        </div>

        <div style="padding:20px;text-align:right;">
            <el-button class="flex-item ml-auto" type="primary" @click="saveEvent">
                保存
            </el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { reactive, toRefs, inject, ref } from 'vue';
import { ElMessage } from 'element-plus';

import service from '../../../../js/service';

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
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const formModel = reactive({
    title: '',
    classifyId: '',
    htmlText: '',
});
function clearFormModel() {
    formModel.title = '';
    formModel.classifyId = '';
    formModel.htmlText = '';
}
function saveEvent(value) {
    modifyFormModel();
}

async function getArticleMsg() {
    const dataObj = await service.Return_modelarticle({ _id: formModelParams.value._id }, module.value);
    Object.keys(formModel).forEach(key => {
        if (dataObj[key]) {
            formModel[key] = dataObj[key];
        }
    });
}
async function modifyFormModel() {
    const { code, message } = await service.Modify_modelarticle({
        userId: userId.value,
        userPassword: userPassword.value,
        _id: formModelParams.value._id,
        id: formModelParams.value.id,
        title: formModel.title,
        classifyId: formModel.classifyId,
        customText: '',
        htmlText: formModel.htmlText,
    }, module.value);
    editBtnLoading.value = false;
    if (code === 200) {
        closeEvent();
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