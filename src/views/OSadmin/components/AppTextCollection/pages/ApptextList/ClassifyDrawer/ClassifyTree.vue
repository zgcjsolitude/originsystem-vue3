<template>
    <!-- 根源系统 功能树 -->
    <div class="ClassifyTree-contianer">

        <el-tree v-if="treeShow" node-key="id"
            :data="appTextClassifyTree" 
            :props="defaultProps" 
            :default-expanded-keys="defaultExpandedKeys"
            :render-content="renderContent"
        />

        <cjui-loading-progress 
            v-model:loading="appTextClassifyLoading" 
            theme="3-light-rotate_0" 
            modal="fullscreen" 
            :fontshow="true"
            :action="true"
        />
    </div>
</template>

<script lang="jsx">
import { onMounted, ref, toRefs, watch, inject } from 'vue';
import { Edit } from '@element-plus/icons';

import { AppTextClassifyHook } from '../../../js/data-hook/appTextClassify.js';

export default {
    name: 'ClassifyTree',
    props: {
        updateKey: {
            type: Number,
            default: 0
        },
        appUuid: {
            type: String,
            default: '',
        },
    },
    setup(props, { emit }) {
        const { updateKey, appUuid } = toRefs(props);
        
        const module = inject('module');

        const defaultProps = {
            label: 'name',
            children: 'children',
        }
        const { 
            appTextClassifyTable,
            appTextClassifyMapObj,
            appTextClassifyTree,
            appTextClassifyLoading,
            getAppTextClassifyData 
        } = AppTextClassifyHook();

        const defaultExpandedKeys = ref([]);
        const treeShow = ref(false);
        function expandedKeys() {
            appTextClassifyTable.value.forEach(el => {
                if ([1, 2, 3].includes(el.level)) {
                    defaultExpandedKeys.value.push(el.id);
                }
            })
            treeShow.value = true;
        }

        function renderContent(h, { node, data, store }) {
            return <div class="text-contaiiner">
                <span onClick={() => handleNodeClick(data)}>{data.name}</span>
                <span onClick={() => editNodeClick(data)}>
                    <el-icon size={16}><Edit /></el-icon>
                </span>
            </div>
        }

        function editNodeClick(data) {
            emit('editNodeClick', data);
        }

        function handleNodeClick(params) {
            emit('handleNodeClick', params);
        }

        watch(() => updateKey.value, async () => {
            await getAppTextClassifyData(appUuid.value, module.value);
            expandedKeys();
            emit('updateData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
        });

        onMounted(async () => {
            await getAppTextClassifyData(appUuid.value, module.value);
            expandedKeys();
            emit('updateData', appTextClassifyTable, appTextClassifyMapObj, appTextClassifyTree);
        });

        return {
            appTextClassifyTable, 
            appTextClassifyMapObj, 
            appTextClassifyTree,            
            appTextClassifyLoading,
            defaultProps,
            defaultExpandedKeys,
            treeShow,
            renderContent,
            handleNodeClick
        }
    }
}
</script>

<style lang="scss" scoped>
.ClassifyTree-contianer {
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
