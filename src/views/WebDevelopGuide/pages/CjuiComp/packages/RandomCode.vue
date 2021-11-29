<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">RandomCode 随机验证码</h2>
        
        <h3 class="wbg-title">RandomCodeBlank 纯背景随机验证码</h3>
        <div class="wbg-intro">组件库提供了<code>RandomCodeBlank</code>组件。</div>
        <div class="wbg-demo is-black is-padding">
            <RandomCodeBlank />
        </div>
        
        <h3 class="wbg-title">RandomCodePattern 花纹背景随机验证码</h3>
        <div class="wbg-intro">组件库提供了<code>RandomCodePattern</code>组件。</div>
        <div class="wbg-demo is-black is-padding">
            <RandomCodePattern />
        </div>
    </div>
</template> 

<script>
import { ref } from '@vue/reactivity';
import RandomCodeBlank from '@/@cjui/components/packages/RandomCode/randomcode-blank.vue';
import RandomCodePattern from '@/@cjui/components/packages/RandomCode/randomcode-pattern.vue';

export default {
    components: {
        RandomCodeBlank,
        RandomCodePattern
    },
    setup() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>

</style>