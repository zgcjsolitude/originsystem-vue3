<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Nav 导航</h2>
        <div class="wbg-intro">为网站提供导航功能的菜单。</div>
        
        <h3 class="wbg-title">MouseBox 鼠标定位菜单</h3>
        <div class="wbg-intro">组件库提供了<code>MouseBox</code>组件，常用于右键菜单，鼠标右键点击下方空白区域查看效果。</div>
        <div class="wbg-demo is-black">
            <div class="demo-item" @contextmenu.prevent="(event) => { rightEvent=event }">
                <cjui-mouse-box :event="rightEvent">
                    <p>MouseBox</p>
                    <p>MouseBox</p>
                    <p>MouseBox</p>
                </cjui-mouse-box>
            </div>
        </div>
    </div>
</template> 

<script>
import { ref } from '@vue/reactivity';

export default {
    setup() {
		let rightEvent = ref({});

        return {
            rightEvent
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-item {
    width: 100%;
    height: 300px;
}
</style>