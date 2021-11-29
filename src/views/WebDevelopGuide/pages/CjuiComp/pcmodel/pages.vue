<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Pages 页面</h2>
        
        <h3 class="wbg-title">登录页</h3>
        <p class="wbg-intro">水平垂直居中登录页</p>
        <div class="wbg-demo is-black is-padding">
            <el-button class="dazzle-light" type="primary" @click="fullscreenDialog=true;componentName='LoginGreen'">
                方块渐变
            </el-button> 
        </div>

        <WBGfullscreenDialog v-model:visible="fullscreenDialog">
            <component :is="componentName"></component>
        </WBGfullscreenDialog>
    </div>
</template> 

<script>
import LoginGreen from '@/@cjui/components/pcmodel/Pages/Login/LoginGreen.vue';
import { ref } from '@vue/reactivity';

export default {
    components: {
        LoginGreen,
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

