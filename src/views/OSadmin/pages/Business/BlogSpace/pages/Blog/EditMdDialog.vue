<template>
	<el-dialog title="博文编辑器" :model-value="visible" fullscreen @open="openEvent" @close="closeEvent">
		<MdEditor class="md-dark--custom"
            v-model="formModel.mdText"
            :theme="storeProfilesgetter === 'osa-night' ? 'dark' : 'light'"
            @change="textChange"
            @save="saveEvent"
            @htmlChanged="textHtmlChange">
        </MdEditor>
	</el-dialog>
</template>

<script setup>
import { reactive, toRefs, inject, ref } from 'vue';
import { ElMessage } from 'element-plus';
import MdEditor from 'md-editor-v3';

import service from '../../js/service';

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

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const isModify = ref(false);
const formModel = reactive({
    title: '',
    classify: [],
    htmlText: '',
    mdText: '',
    intro: '',
    remarks: '',
});
function clearFormModel() {
    formModel.title = '';
    formModel.classify = [],
    formModel.htmlText = '';
    formModel.mdText = '';
    formModel.intro = '';
    formModel.remarks = '';
}
function textChange(value) {
    formModel.mdText = value;
}
function textHtmlChange(value) {
    formModel.htmlText = value;
}
function saveEvent(value) {
    modifyFormModel();
}

async function getBlogMsg() {
    const data = await service.Return_blogmsg({ _id: formModelParams.value._id });
    if (data.length > 0) {
        Object.keys(formModel).forEach(key => {
            if (data[0][key]) {
                formModel[key] = data[0][key];
            }
        });
    }
}
async function modifyFormModel() {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    const { code, message } = await service.Modify_blog({
        userName: userName.value,
        userPassword: userPassword.value,
        _id: formModelParams.value._id,
        id: formModelParams.value.id,
        title: formModelParams.value.title,
        classifyId: formModelParams.value.classifyId,
        htmlText: formModel.htmlText,
        mdText: formModel.mdText,
    });
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        isModify.value = true;
    }
}

function openEvent() {
    getBlogMsg();
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
