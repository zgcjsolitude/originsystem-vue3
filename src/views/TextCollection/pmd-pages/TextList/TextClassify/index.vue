<template>
    <cjui-loading-progress class="TextTree" :loading="tableLoading" theme="3-light-rotate_0" modal="fullscreen-center">
        <ListView :data="tableData" @editNodeClick="editNodeClick" />

        <TextEdit v-model:visible="articleTextDialog" :formModelParams="articleDrawerParams" />

        <RichTextEdit v-model:visible="articleRichText" :formModelParams="articleDrawerParams" />

        <MdTextEdit v-model:visible="articleMdDialog" :formModelParams="articleDrawerParams" />
    </cjui-loading-progress>
</template>

<script setup>
import { ref, toRefs, inject, reactive, onMounted } from 'vue';

import ListView from './ListView.vue';
import TextEdit from './TextEdit/TextEdit.vue';
import RichTextEdit from './TextEdit/RichTextEdit.vue';
import MdTextEdit from './TextEdit/MdTextEdit.vue';
import service from '../../../js/service';

import { TableHook } from '@/components/hooks/table-hook.js';

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
    config: {
        type: Object,
        default: () => ({}),
    },
});

const { appUuid, config } = toRefs(props);

const module = inject('module');

const filterParams = reactive({
    classifyPath: '',
});

const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = TableHook(getTableData);
async function getTableData() {
    tableLoading.value = true;
    const { data, count } = await service.Return_modelarticlelist({
        appUuid: appUuid.value,
        classifyPath: filterParams.classifyPath,
        page: 1,
        num: 1000,
    }, module.value);
    tableLoading.value = false;
    tableData.value = data;
    pagination.total = count;
}

const articleDrawer = ref(false);
const articleDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openArticleAdd() {
    articleDrawer.value = true;
    articleDrawerParams._action = 'add';
    articleDrawerParams._title = '添加文档信息';
}
function openArticleModify(row) {
    articleDrawerParams._action = 'modify';
    articleDrawerParams._title = '修改文档信息';
    Object.keys(row).forEach(key => {
        articleDrawerParams[key] = row[key];
    });
    articleDrawer.value = true;
}

const articleMdDialog = ref(false);
const articleRichText = ref(false);
const articleTextDialog = ref(false);
function editNodeClick(row) {
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

onMounted(() => {
    getTableData();
});
</script>