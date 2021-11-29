<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Particles 粒子动效组件</h2>
        <p class="wbg-intro">基于 particles.js，版本@2.0.0，使用前请确保项目已经引入。</p>
        
        <h3 class="wbg-title">粒子动效蒙版</h3>
        <p class="wbg-intro">置于box容器内，可为容器添加粒子动效蒙版。</p>
        <div class="wbg-demo is-black is-padding">
            <el-button class="dazzle-light" type="primary" @click="fullscreenDialog=true;componentName='ParticlesMask'">
                星点蒙版
            </el-button> 
        </div>

        <WBGfullscreenDialog v-model:visible="fullscreenDialog">
            <component :is="componentName"></component>
        </WBGfullscreenDialog>
    </div>
</template> 

<script>
import ParticlesMask from '@/@cjui/components/webUI/Particles/circle/index.vue';
import { ref } from '@vue/reactivity';

export default {
    components: {
        ParticlesMask,
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

