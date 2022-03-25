<template>
    <cjui-loading-progress class="h-100" :loading="loading" theme="3-light-rotate_0" modal="full">
        <div class="d-flex">
            <el-button class="flex-item ml-auto" type="primary" @click="isEdit=!isEdit">
                {{ isEdit ? '完成编辑' : '编辑' }}
            </el-button>
            <el-button class="flex-item" type="primary" @click="saveEvent">
                保存
            </el-button>
        </div>

        <TinymceEditor v-show="isEdit" v-model:value="formModel.htmlText" :height="550" />
        <div v-show="!isEdit" v-html="formModel.htmlText"></div>
    </cjui-loading-progress>
</template>

<script setup>
import { onMounted, reactive, ref, watch, inject, toRefs, computed } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import TinymceEditor from '@/components/project/TinymceEditor/index.vue';

import service from '../../js/service';

const props = defineProps({
    textId: {
        type: String,
        default: '',
    },
    formModelParams: {
        type: Object,
        default: () => ({})
    }
});

const { textId, formModelParams } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const loading = ref(false);
const editBtnLoading = ref(false);
const formModel = reactive({
    title: '',
    parentId: '',
    htmlText: '',
});
async function getArticleMsg() {
    loading.value = true;
    const dataObj = await service.Return_modelarticletree({ _id: textId.value }, module.value);
    loading.value = false;
    Object.keys(formModel).forEach(key => {
        if (![null, undefined].includes(dataObj[key])) {
            formModel[key] = dataObj[key];
        }
    });
}
async function saveEvent() {
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

const isEdit = ref(true);

watch(() => textId.value, (newVal) => {
    if (newVal) {
        getArticleMsg();
    }
}, { immediate: true });
</script>
