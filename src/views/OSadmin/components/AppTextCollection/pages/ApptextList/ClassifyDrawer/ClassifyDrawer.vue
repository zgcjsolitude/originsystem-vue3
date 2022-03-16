<template>
    <el-drawer title="文集分组目录" direction="ltr"
        :size="320"
        :model-value="visible"
        @open="openEvent"
        @close="closeEvent"
    >
        <div class="d-flex">
            <el-button class="flex-item ml-auto" size="small" type="primary" @click="openClassifyAdd">
                <i class="el-icon-plus"></i>
            </el-button>
        </div>

        <ClassifyTree :updateKey="updateKey" :appUuid="appUuid" @handleNodeClick="handleNodeClick" @editNodeClick="editNodeClick" @updateData="updateData" />

        <ClassifyEditDrawer v-model:visible="classifyDrawer" :appUuid="appUuid" :config="config" :formModelParams="classifyDrawerParams" :classifyTree="classifyTree" @updateData="updateClassifyData" />
    </el-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';

import ClassifyTree from './ClassifyTree.vue';
import ClassifyEditDrawer from './ClassifyEditDrawer.vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    appUuid: {
        type: String,
        default: '',
    },
    config: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['update:visible', 'handleNodeClick', 'upClassifyData']);

const classifyTree = ref([]);
function updateData(appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree) {
    classifyTree.value = appTextClassifyTree.value;
    emit('upClassifyData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
}

function editNodeClick(params) {
    openClassifyModify(params);
}

function handleNodeClick(params) {
    emit('handleNodeClick', params);
}

const classifyDrawer = ref(false);
const classifyDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openClassifyAdd() {
    classifyDrawerParams._action = 'add';
    classifyDrawerParams._title = '添加文集分组信息';
    classifyDrawer.value = true;
}
function openClassifyModify(node) {
    classifyDrawerParams._action = 'modify';
    classifyDrawerParams._title = '修改文集分组信息';
    Object.keys(node).forEach(key => {
        classifyDrawerParams[key] = node[key];
    });
    classifyDrawer.value = true;
}

const updateKey = ref(1);
function updateClassifyData() {
    updateKey.value += 1;
}

function openEvent() {

}

function closeEvent() {
    emit('update:visible', false);
}
</script>
