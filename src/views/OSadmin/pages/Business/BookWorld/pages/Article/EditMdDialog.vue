<template>
	<el-dialog title="章节编辑器" :model-value="visible" fullscreen @open="openEvent" @close="closeEvent">
		<TinymceEditor v-model:value="formModel.htmlText" :height="650" />

        <div>
            <el-button class="flex-item ml-auto" size="small" type="primary" @click="saveEvent">
                保存
            </el-button>
        </div>
	</el-dialog>
</template>

<script setup>
import { reactive, toRefs, inject, ref } from 'vue';
import { ElMessage } from 'element-plus';

import TinymceEditor from '@/components/project/TinymceEditor/index.vue';

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
    intro: '',
    remarks: '',
});
function clearFormModel() {
    formModel.title = '';
    formModel.classify = [],
    formModel.htmlText = '';
    formModel.intro = '';
    formModel.remarks = '';
}
function saveEvent(value) {
    modifyFormModel();
}

async function getBlogMsg() {
    const data = await service.Return_articlemsg({ _id: formModelParams.value._id });
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
    const { code, message } = await service.Modify_article({
        userName: userName.value,
        userPassword: userPassword.value,
        _id: formModelParams.value._id,
        id: formModelParams.value.id,
        title: formModelParams.value.title,
        classifyId: formModelParams.value.classifyId,
        htmlText: formModel.htmlText,
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