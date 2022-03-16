<template>
    <cjui-loading-progress class="h-100" :loading="loading" theme="3-light-rotate_0" modal="full">
        <HeaderTool v-if="!loading" :appUuid="appUuid" :config="config" @updateTableData="updateTableData" @openArticleDrawer="openArticleAdd" @upClassifyData="upClassifyData" />
        <List v-if="!loading" :appUuid="appUuid" :config="config" :classifyPath="classifyPath" :key="appUuid+classifyPath+listCompKey" @openModifyDrawer="openArticleModify" @openTextTool="openTextTool" />

        <ArticleEditDrawer v-model:visible="articleDrawer" :appUuid="appUuid" :config="config" :formModelParams="articleDrawerParams" :classifyTree="articleClassifyTree" :classifyTable="articleClassifyTable" @updateData="updateTableData" />

        <ArticleMdDialog v-model:visible="articleMdDialog" :formModelParams="articleDrawerParams" />

        <ArticleRichText v-model:visible="articleRichText" :formModelParams="articleDrawerParams" />

        <ArticleTextEdit v-model:visible="articleTextDialog" :formModelParams="articleDrawerParams" />
    </cjui-loading-progress>
</template>

<script setup>
import { ref, reactive, toRefs, watch, inject } from 'vue';

import HeaderTool from './HeaderTool.vue';
import List from './List.vue';
import ArticleEditDrawer from './ArticleDrawer/ArticleEditDrawer.vue';
import ArticleMdDialog from './ArticleDrawer/ArticleMdDialog.vue';
import ArticleRichText from './ArticleDrawer/ArticleRichText.vue';
import ArticleTextEdit from './ArticleDrawer/ArticleTextEdit.vue';

import service from '../../js/service';

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
});

const { appUuid } = toRefs(props);

const module = inject('module');

const loading = ref(false);
const config = reactive({
    classifyType: 'Tree',
    listType: 'Table',
    contentType: 'richText'
});
async function getModelConfig() {
    loading.value = true;
    const dataObj = await service.Return_apptextmodelconfig({
        uuid: appUuid.value,
    }, module.value);
    loading.value = false;
    config.classifyType = dataObj.classifyType || 'Tree';
    config.listType = dataObj.listType || 'Table';
    config.contentType = dataObj.contentType || 'richText';
}

const classifyPath = ref('');
const listCompKey = ref(1);
function updateTableData(path) {
    if (![null, undefined].includes(classifyPath)) {
        classifyPath.value = path;
    }
    listCompKey.value += 1;
}

let articleClassifyMapObj = {};
const articleClassifyTable = ref([]);
const articleClassifyTree = ref([]);
const articleDrawer = ref(false);
const articleMdDialog = ref(false);
const articleRichText = ref(false);
const articleTextDialog = ref(false);
const articleDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openArticleAdd() {
    articleDrawer.value = true;
    articleDrawerParams._action = 'add';
    articleDrawerParams._title = '添加文章信息';
}
function openArticleModify(row) {
    articleDrawerParams._action = 'modify';
    articleDrawerParams._title = '修改文章信息';
    Object.keys(row).forEach(key => {
        articleDrawerParams[key] = row[key];
    });
    articleDrawer.value = true;
}
function openTextTool(row) {
    articleDrawerParams._action = 'modify';
    articleDrawerParams._title = '修改文章信息';
    Object.keys(row).forEach(key => {
        articleDrawerParams[key] = row[key];
    });
    if (row.textType === 'md') {
        articleMdDialog.value = true;
    } else if (row.textType === 'richText') {
        articleRichText.value = true;
    } else if (row.textType === 'text') {
        articleTextDialog.value = true;
    }
}
function upClassifyData(appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree) {
    articleClassifyTable.value = appTextClassifyTable.value;
    articleClassifyMapObj = appTextClassifyMapObj;
    articleClassifyTree.value = appTextClassifyTree.value;
}

watch(() => appUuid.value, newVal => {
    if (newVal) {
        getModelConfig();
    }
}, { immediate: true });
</script>

