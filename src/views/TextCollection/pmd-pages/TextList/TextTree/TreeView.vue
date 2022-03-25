<template>
	<div class="TreeView">
        <el-tree node-key="id" 
            default-expand-all
            :expand-on-click-node="false"
            :data="treeData" 
            :props="defaultProps" 
            :render-content="renderContent"
        />
    </div>
</template>

<script lang="jsx" setup>
import { Edit, EditPen } from '@element-plus/icons-vue';

const props = defineProps({
    treeData: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['handleNodeClick', 'editNodeClick', 'writeNodeClick']);

const defaultProps = {
    label: 'title',
    children: 'children',
}

function renderContent(h, { node, data, store }) {
    return <div class="text-contaiiner">
        <span onClick={() => handleNodeClick(data)}>{data.title}</span>
        <span>
            <el-icon size={16} onClick={() => editNodeClick(data)}><Edit /></el-icon>
            <el-icon size={16} onClick={() => writeNodeClick(data)}><EditPen /></el-icon>
        </span>
    </div>
}

function handleNodeClick(params) {
    emit('handleNodeClick', params);
}

function editNodeClick(params) {
    emit('editNodeClick', params);
}

function writeNodeClick(params) {
    emit('writeNodeClick', params);
}
</script>

<style lang="scss" scoped>
.TreeView {
    padding: 10px 15px;
}

:deep(.el-tree) {
    background: transparent;

    .el-tree-node__content:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #eee;
    }
    .el-icon + .el-icon {
        margin-left: 5px;
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