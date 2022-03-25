<template>
    <cjui-loading-progress class="TextTree" :loading="appTextTreeLoading" theme="3-light-rotate_0" modal="fullscreen-center">
        <TreeView v-show="!appTextTreeLoading" :treeData="appTextTreeTree" @editNodeClick="openModifyDrawer" @writeNodeClick="openRichTextDrawer" />

        <OperateTool :showFilter="false" @addEvent="openAddDrawer" />
        
        <TreeDrawer v-model:visible="editDrawer" :appUuid="appUuid" :treeData="appTextTreeTree" :formModelParams="editDrawerParams" @updateData="updateTreeData" />

        <RichTextDrawer v-model:visible="editRichTextDrawer" :formModelParams="editDrawerParams" />
    </cjui-loading-progress>
</template>

<script setup>
import { toRefs, inject, onMounted, ref, reactive } from 'vue';
import OperateTool from '../../../components/pmd-comp/operate-tool.vue';
import RichTextDrawer from './RichTextDrawer.vue';
import TreeView from './TreeView.vue';
import TreeDrawer from './TreeDrawer.vue';
import { AppTextTreeHook } from '../../../js/data-hook/appTextTree';

const module = inject('module');

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
});
const { appUuid } = toRefs(props);

const { appTextTreeLoading, appTextTreeTable, appTextTreeMapObj, appTextTreeTree, getAppTextTreeData } = AppTextTreeHook();

const editDrawer = ref(false);
const editRichTextDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加文档信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改文档信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}
function openRichTextDrawer(node) {
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editRichTextDrawer.value = true;
}

function updateTreeData() {
    getAppTextTreeData(appUuid.value, module.value);
}

onMounted(() => {
    updateTreeData();
});
</script>

<style scoped>
.TextTree {
    padding-bottom: 50px;
}
</style>
