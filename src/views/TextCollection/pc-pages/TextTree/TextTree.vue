<template>
    <div>
        <el-button class="flex-item" type="primary" @click="openArticleAdd">
            <el-icon><Plus /></el-icon>
        </el-button>

        <el-tree node-key="id" 
            default-expand-all
            :expand-on-click-node="false"
            :data="articleTree" 
            :props="defaultProps" 
            :render-content="renderContent"
        />

        <EditDrawer v-model:visible="articleDrawer" :appUuid="appUuid" :formModelParams="articleDrawerParams" :articleTree="articleTree" @updateData="updateData" />
    </div>
</template>

<script lang="jsx" setup>
import { onMounted, reactive, ref, watch, inject, toRefs, computed } from 'vue';
import { Edit, Plus } from '@element-plus/icons-vue';

import EditDrawer from './TextEdit/EditDrawer.vue';

const props = defineProps({
    appUuid: {
        type: String,
        default: '',
    },
    articleTree: {
        type: Array,
        default: () => []
    },
    articleTable: {
        type: Array,
        default: () => []
    },
});

const emit = defineEmits(['updateData', 'handleNodeClick']);

const { appUuid, articleTree, articleTable } = toRefs(props);

const defaultProps = {
    label: 'title',
    children: 'children',
}
// const defaultExpandedKeys = computed(() => {
//     return articleTable.value.map(el => [1, 2, 3].includes(el.level));
// });
function renderContent(h, { node, data, store }) {
    return <div class="text-contaiiner">
        <span onClick={() => handleNodeClick(data)}>{data.title}</span>
        <span onClick={() => editNodeClick(data)}>
            <el-icon size={16}><Edit /></el-icon>
        </span>
    </div>
}

const articleDrawer = ref(false);
const articleDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openArticleAdd() {
    articleDrawer.value = true;
    articleDrawerParams._action = 'add';
    articleDrawerParams._title = '添加文章信息';
}
function editNodeClick(data) {
    articleDrawerParams._action = 'modify';
    articleDrawerParams._title = '修改文章信息';
    Object.keys(data).forEach(key => {
        articleDrawerParams[key] = data[key];
    });
    articleDrawer.value = true;
}
function handleNodeClick(params) {
    emit('handleNodeClick', params);
}

function updateData() {
    emit('updateData');
}
</script>

<style scoped>
.el-tree {
    height: 555px;
    overflow: auto;
}
</style>