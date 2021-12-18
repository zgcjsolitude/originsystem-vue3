<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Button 按钮</h2>
        
        <h3 class="wbg-title">ButtonStyle 主题样式</h3>
        <div class="wbg-intro">组件库提供了适配button的样式混合。</div>
        <div v-for="(item, i) in buttonList" :key="i" class="wbg-demo is-black is-padding">
            <el-button v-for="(el, j) in typeList" :key="j" :class="item.className" :type="el">
                {{ item.name }}
            </el-button>
        </div>
        
        <h3 class="wbg-title">ButtonStyle 专题样式</h3>
        <div class="wbg-intro">组件库提供了button的专题样式。</div>
        <div v-for="(item, i) in buttonThemeList" :key="i" class="wbg-demo is-black is-padding">
            <el-button :class="item.className">
                {{ item.name }}
            </el-button>
        </div>
    </div>
</template> 

<script>
import { ref } from '@vue/reactivity';

export default {
    components: {
    },
    setup() {
        const buttonList = [
            { name: '炫光按钮', className: 'cjui-dazzle-light' },
            { name: '四周填充', className: 'cjui-round-full' },
            { name: '关闭填充', className: 'cjui-close-full' },
            { name: '脉动', className: 'cjui-pulse' },
            { name: '提升', className: 'cjui-raise' },
            { name: '交叠', className: 'cjui-offset' },
            { name: '3D丝滑', className: 'cjui-3d-silky' }
        ];
        const typeList = ['primary', 'success', 'warning', 'danger', 'info'];

        const buttonThemeList = [
            { name: '悬浮气泡', className: 'cjui-bubbles' },
        ];

        return {
            buttonList,
            typeList,
            buttonThemeList
        }
    }
}
</script>