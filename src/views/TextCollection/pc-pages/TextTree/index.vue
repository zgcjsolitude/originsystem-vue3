<template>
    <cjui-loading-progress class="h-100 AppTextTree-container" :loading="appTextTreeLoading" theme="3-light-rotate_0" modal="full">
        <TextTree class="TextTree" :appUuid="appUuid" :articleTree="appTextTreeTree" :articleTable="appTextTreeTable" @handleNodeClick="handleNodeClick" @updateData="updateData" />
        <TextContent class="TextContent" :textId="formModel._id" :formModelParams="formModel" />
    </cjui-loading-progress>
</template>

<script setup>
import { ref, reactive, toRefs, watch, inject, onMounted } from 'vue';

import TextTree from './TextTree.vue';
import TextContent from './TextContent.vue';

import service from '../../js/service';

import { AppTextTreeHook } from '../../js/data-hook/appTextTree';

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
});

const { appTextTreeLoading, appTextTreeTable, appTextTreeMapObj, appTextTreeTree, getAppTextTreeData } = AppTextTreeHook();

const { appUuid } = toRefs(props);

const module = inject('module');

const formModel = reactive({
    _id: '',
});
function handleNodeClick(params) {
    Object.keys(params).forEach(key => {
        formModel[key] = params[key];
    });
}

function updateData() {
    getAppTextTreeData(appUuid.value, module.value);
}

onMounted(() => {
    getAppTextTreeData(appUuid.value, module.value);
});
</script>

<style lang="scss" scoped>
.AppTextTree-container {
    display: flex;
    padding: 10px 15px;

    .TextTree {
        width: 300px;
    }

    .TextContent {
        flex: 1;
    }
}

:deep(.el-loading-mask) {
    background: rgba(0,0,0,0.1);
}

:deep(.el-tree) {
    background: transparent;

    .el-tree-node__content:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #eee;
    }
}

:deep(.text-contaiiner) {
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
}
</style>
