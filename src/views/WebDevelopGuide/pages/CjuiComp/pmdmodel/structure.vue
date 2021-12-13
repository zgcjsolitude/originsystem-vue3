<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Layout 布局</h2>
        
        <h3 class="wbg-title">Header 主体区布局组件</h3>
        <p class="wbg-intro">含头部、内容区两部分移动端的常见布局组件。</p>
        <div class="wbg-demo is-black is-padding">
            <el-button class="cjui-dazzle-light" type="primary" @click="fixedCompShow=!fixedCompShow;componentName='PmdHeader'">
                查看
            </el-button> 
        </div>

        <div v-if="fixedCompShow" class="fullscreen-fixed">
            <component :is="componentName" @leftEvent="fixedCompShow=!fixedCompShow"></component>
        </div>

        <WBGfullscreenDialog v-model:visible="fullscreenDialog">
            <component :is="componentName"></component>
        </WBGfullscreenDialog>
    </div>
</template> 

<script>
import PmdHeader from '@/@cjui/components/pmdmodel/layout/layout-header.vue';
import { ref } from '@vue/reactivity';

export default {
    components: {
        PmdHeader,
    },
    setup() {
        const fullscreenDialog = ref(false);
        const fixedCompShow = ref(false);
        const componentName = ref('');

        return {
            fullscreenDialog,
            fixedCompShow,
            componentName
        }
    },
}
</script>

<style lang="scss" scoped>
.fullscreen-fixed {
    padding-top: 44px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    background: #eee;
}
</style>