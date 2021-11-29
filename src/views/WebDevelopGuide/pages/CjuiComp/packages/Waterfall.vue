<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Waterfall 瀑布流</h2>
        <div class="wbg-intro">类似瀑布形式的列表排列。</div>
        
        <h3 class="wbg-title">Wfrow 纵向瀑布流布局容器</h3>
        <div class="wbg-intro">组件库提供了<code>Wfrow</code><code>Wfcol</code>父子组件，该组件依赖jQuery。</div>
        <div class="wbg-demo is-black is-padding">
            <cjui-wfrow id="cjuiwfrow" ref="cjuiwfrow"
                :count="column"
                :xs="column - 1"
                :sm="column"
                :md="column + 1"
                :lg="column + 2"
                :xl="column + 3"
                >
                <cjui-wfcol>瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本瀑布流文本瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
                <cjui-wfcol>瀑布流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本流文本瀑布流文本</cjui-wfcol>
            </cjui-wfrow>
        </div>
    </div>
</template> 

<script>
import { ref } from '@vue/reactivity';

export default {
    setup() {
		let column = ref(3);

        return {
            column
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.cjui-wfcol) {
    background: #fff;
    padding: 15px;
    border: 2px;
    color: #5e6d82;
    font-size: 14px;
}
</style>