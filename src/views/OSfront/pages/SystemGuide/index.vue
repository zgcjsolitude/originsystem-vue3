<template>
    <div class="OSfrontSystemGuide">
        <TwoColumns>
            <template #left>
                <SystemGuideTree />
            </template>

            <template #right>
                
            </template>
        </TwoColumns>
    </div>
</template>

<script setup>
import TwoColumns from '@/@cjui/components/pcmodel/layout/TwoColumns.vue';
import SystemGuideTree from '@/components/project/SystemGuideTree/index.vue';

</script>

<style lang="scss" scoped>
@import '../../css/_variable.scss';

.OSfrontSystemGuide {
    width: 100%;
    height: 100%;
    position: relative;
}

:deep(.el-tree) {
    background: transparent;

    .el-tree-node__label {
        color: #a5a5a5;
    }
    .el-tree-node__content:hover,
    .el-tree-node:focus > .el-tree-node__content {
        background: rgba(255, 255, 255, 0.1);

        .el-tree-node__label {
            color: $osfrontItemColor;
        }
    }
}
</style>

