<template>
    <el-drawer direction="rtl" size="100%"
        :model-value="visible"
        :title="formModelParams._title || '编辑文档信息'"
        @open="openEvent"
        @close="closeEvent"
    >
		<MdEditor class="md-dark--custom"
            v-model="formModel.customText"
            :theme="storeProfilesgetter === 'osa-night' ? 'dark' : 'light'"
            @change="textChange"
            @save="saveEvent"
            @htmlChanged="textHtmlChange">
        </MdEditor>
    </el-drawer>
</template>

<script setup>
import { reactive, toRefs, inject, ref } from 'vue';
import { ElMessage } from 'element-plus';
import MdEditor from 'md-editor-v3';

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
    customText: '',
    htmlText: '',
});
function clearFormModel() {
    formModel.title = '';
    formModel.classifyId = '';
    formModel.customText = '';
    formModel.htmlText = '';
}
function textChange(value) {
    formModel.customText = value;
}
function textHtmlChange(value) {
    formModel.htmlText = value;
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
        customText: formModel.customText,
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

<style lang="scss" scoped>
.md-dark--custom {
    height: 100%;
}
</style>
