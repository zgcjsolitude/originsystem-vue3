<template>
    <!-- 根源世界 源权体系表树 -->
    <div class="OriginPowerTree-contianer" v-loading="treeLoading">
        <el-tree v-if="treeShow" node-key="id"
            :data="treeData" 
            :props="defaultProps" 
            :default-expanded-keys="defaultExpandedKeys"
            :render-content="renderContent"
        />
        
    </div>
</template>

<script lang="jsx">
import { onMounted, ref, watch } from 'vue';
import { Edit } from '@element-plus/icons';

import { OriginPowerDataHook } from './js/data-hook';

export default {
    name: 'OriginPowerTree',
    components: {
        Edit,
    },
    setup(props, { emit }) {
        const defaultProps = {
            label: 'name',
            children: 'children',
        }
        const { originData, treeData, treeLoading, getTreeData } = OriginPowerDataHook();

        const defaultExpandedKeys = ref([]);
        const treeShow = ref(false);
        function expandedKeys() {
            originData.value.forEach(el => {
                if ([1].includes(el.level)) {
                    defaultExpandedKeys.value.push(el.id);
                }
            })
            treeShow.value = true;
        }

        function renderContent(h, { node, data, store }) {
            return <div class="text-contaiiner">
                <span>{data.name}</span>
                <span onClick={() => editNodeClick(data)}>
                    <el-icon size={16}><Edit /></el-icon>
                </span>
            </div>
        }

        function editNodeClick(data) {
            emit('editNodeClick', data);
        }

        onMounted(async () => {
            await getTreeData();
            expandedKeys();
            emit('upTreeData', treeData);
        });

        return {
            originData,
            treeData,
            treeLoading,
            getTreeData,
            defaultProps,
            defaultExpandedKeys,
            treeShow,
            renderContent,
            editNodeClick
        }
    }
}
</script>

<style lang="scss" scoped>
.OriginPowerTree-contianer {
    padding: 10px 15px;
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
