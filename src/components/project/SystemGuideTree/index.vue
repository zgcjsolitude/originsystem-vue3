<template>
    <!-- 根源系统 功能树 -->
    <div class="SystemGuideTree-contianer" v-loading="treeLoading">
        <el-tree v-if="treeShow" node-key="id"
            :data="treeData" 
            :props="defaultProps" 
            :default-expanded-keys="defaultExpandedKeys"
            @node-click="handleNodeClick" 
        />
            <!-- :render-content="renderContent" -->
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

import { PageClassDataHook } from './js/data-hook';

export default {
    name: 'SystemGuideTree',
    setup() {
        const defaultProps = {
            label: 'name',
            children: 'children',
        }
        const { treeData, originData, treeLoading, getTreeData } = PageClassDataHook();

        const defaultExpandedKeys = ref([]);
        const treeShow = ref(false);
        function expandedKeys() {
            originData.value.forEach(el => {
                if ([1, 2].includes(el.level)) {
                    defaultExpandedKeys.value.push(el.id);
                }
            })
            treeShow.value = true;
        }

        function renderContent(h, { node, data, store }) {

        }

        function handleNodeClick(params) {
            console.log(params)
        }

        onMounted(async () => {
            await getTreeData();
            expandedKeys();
        });

        return {
            treeData,
            originData,
            treeLoading,
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
.SystemGuideTree-contianer {
    padding: 10px 15px;
}
</style>
