<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Button 按钮</h2>
        
        <h3 class="wbg-title">ButtonStyle 按钮样式</h3>
        <div class="wbg-intro">组件库提供了适配element-ui button的样式混合。</div>
        <div v-for="(item, i) in buttonList" :key="i" class="wbg-demo is-black is-padding">
            <el-button v-for="(el, j) in item.typeList" :key="j" :class="item.className" :type="el">
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
            {
                name: '炫光按钮', className: 'cjui-dazzle-light', typeList: ['primary', 'success', 'warning', 'danger', 'info'],
            },
            {
                name: '四周填充', className: 'cjui-round-full', typeList: ['primary', 'success', 'warning', 'danger', 'info'],
            },
            {
                name: '脉动', className: 'cjui-pulse', typeList: ['primary', 'success', 'warning', 'danger', 'info'],
            },
            {
                name: '3D丝滑', className: 'cjui-3d-silky', typeList: ['primary', 'success', 'warning', 'danger', 'info'],
            }
        ]

        return {
            buttonList
        }
    }
}
</script>