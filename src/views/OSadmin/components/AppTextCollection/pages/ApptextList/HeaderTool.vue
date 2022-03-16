<template>
    <div class="d-flex">
        <template v-if="config.classifyType === 'Select'">
            <el-select class="flex-item" v-model="filterParams.classifyPath" :popper-class="storeProfilesgetter" size="small" placeholder="请选择类别" clearable @change="selectChange">
                <el-option v-for="item in appTextClassifyTable" :key="item.name" :label="item.name" :value="item.path">
                    <div class="d-flex ai-center">
                        <span class="mr-auto">{{ item.name }}</span>
                        <el-icon style="margin-left: 5px;margin-bottom: 0.05em;">
                            <edit @click="openClassifyModify(item)" />
                        </el-icon>
                    </div>
                </el-option>
            </el-select>
            <el-button class="flex-item" size="small" type="primary" @click="openClassifyAdd">
                <i class="el-icon-plus"></i>
            </el-button>
        </template>
        <template v-if="config.classifyType === 'Tree'">
            <el-button class="flex-item" size="small" type="primary" @click="openClassifyDrawer">
                类别筛选
            </el-button>
            <el-input v-model="filterParams.name" class="flex-item" style="width:300px;" size="small" placeholder="类别搜索" clearable @clear="clearInput" />
        </template>

        <el-button class="flex-item ml-auto" size="small" type="primary" @click="openArticleDrawer">
            <i class="el-icon-plus"></i>
        </el-button>

        <ClassifyDrawer v-model:visible="classifyTreeDrawer" :appUuid="appUuid" :config="config" @handleNodeClick="handleNodeClick" @upClassifyData="upClassifyData" />

        <ClassifyEditDrawer v-model:visible="classifyDrawer" :appUuid="appUuid" :config="config" :formModelParams="classifyDrawerParams" @updateData="updateClassifyData" />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, inject, toRefs } from 'vue';
import { Edit } from '@element-plus/icons';

import ClassifyDrawer from './ClassifyDrawer/ClassifyDrawer.vue';
import ClassifyEditDrawer from './ClassifyDrawer/ClassifyEditDrawer.vue';

import { AppTextClassifyHook } from '../../js/data-hook/appTextClassify';

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

const emit = defineEmits(['updateTableData', 'openArticleDrawer', 'upClassifyData']);

const { appUuid } = toRefs(props);

const { appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree, getAppTextClassifyData } = AppTextClassifyHook();

const module = inject('module');
const storeProfilesgetter = inject('storeProfilesgetter');

const filterParams = reactive({
    name: '',
    classifyPath: '',
});
function selectChange() {
    emit('updateTableData', filterParams.classifyPath);
}
function clearInput() {
    filterParams.name = '';
    filterParams.classifyPath = '';
    emit('updateTableData', filterParams.classifyPath);
}

const classifyDrawer = ref(false);
const classifyDrawerParams = reactive({
    _action: '',
    _title: '',
    path: '',
});
function openClassifyAdd() {
    classifyDrawerParams._action = 'add';
    classifyDrawerParams._title = '添加文集分组';
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
async function updateClassifyData(sign) {
    if (sign === 'delete' && filterParams.classifyPath === classifyDrawerParams.path) {
        filterParams.classifyPath = '';
    } 
    await getAppTextClassifyData(appUuid.value);
    emit('upClassifyData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
}

const classifyTreeDrawer = ref(false);
function openClassifyDrawer() {
    classifyTreeDrawer.value = true;
}
function handleNodeClick(params) {
    filterParams.name = params.name;
    filterParams.classifyPath = params.path;
    emit('updateTableData', filterParams.classifyPath);
}
function upClassifyData(appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree) {
    emit('upClassifyData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
}

function openArticleDrawer() {
    emit('openArticleDrawer');
}

onMounted(async () => {
    await getAppTextClassifyData(appUuid.value, module.value);
    emit('upClassifyData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
});
</script>

