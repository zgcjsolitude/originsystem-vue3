<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Layout 布局</h2>
        
        <h3 class="wbg-title">页面布局</h3>
        <div class="wbg-demo is-black is-padding">
            <el-button class="cjui-dazzle-light" type="primary" @click="fullscreenDialog=true;componentName='TwoColumns'">
                双栏布局盒子
            </el-button> 
        </div>
        
        <h3 class="wbg-title">宫格动画导航</h3>
        <div class="wbg-demo is-black is-padding">
            <el-button class="cjui-dazzle-light" type="primary" @click="fullscreenDialog=true;componentName='GridNav'">
                宫格动画导航
            </el-button> 
        </div>
        
        <h3 class="wbg-title">详情页布局</h3>
        <div class="wbg-demo is-black is-padding">
            <el-button class="cjui-dazzle-light" type="primary" @click="fullscreenDialog=true;componentName='PcmodelPageHeader'">
                header + body + footer 详情页布局
            </el-button>
        </div>

        <WBGfullscreenDialog v-model:visible="fullscreenDialog">
            <component :is="componentName" :showExample="true"></component>
        </WBGfullscreenDialog>
    </div>
</template> 

<script>
import TwoColumns from '@/@cjui/components/pcmodel/layout/TwoColumns.vue';
import GridNav from '@/@cjui/components/pcmodel/layout/GridNav.vue';
import PcmodelPageHeader from '@/@cjui/components/pcmodel/layout/PageHeader.vue';
import { ref } from '@vue/reactivity';

export default {
    components: {
        TwoColumns,
        GridNav,
        PcmodelPageHeader
    },
    setup() {
        const fullscreenDialog = ref(false);
        const componentName = ref('');

        return {
            fullscreenDialog,
            componentName
        }
    },
}
</script>

