<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">FontAnimation 文字动画效果组件</h2>
        
        <h3 class="wbg-title">FontAnimation 文字动画组件</h3>
        <div class="wbg-intro">组件库提供了<code>FontAnimation</code>组件，使用<code>theme</code>属性来定义动画效果、其中以<code>--text</code>结尾的需要对<code>data-text</code>传入相同的文字。</div>
        <div class="wbg-demo is-black is-padding is-around">
            <div class="demo-item">
                <cjui-font-animation theme="fade-on">fade-on</cjui-font-animation>
            </div>
        </div>
        <p class="wbg-intro">背景填充系列动画样式，使用<code>direction</code>属性来定义效果方向。</p>
        <div class="wbg-demo is-black is-padding is-around">
            <div class="demo-item">
                <cjui-font-animation theme="border-full" direction="top">border-full/top</cjui-font-animation>
            </div>
            <div class="demo-item">
                <cjui-font-animation theme="border-full" direction="left">border-full/left</cjui-font-animation>
            </div>
            <div class="demo-item">
                <cjui-font-animation theme="border-full" direction="right">border-full/right</cjui-font-animation>
            </div>
            <div class="demo-item">
                <cjui-font-animation theme="border-full" direction="middle">border-full/middle</cjui-font-animation>
            </div>
            <div class="demo-item">
                <cjui-font-animation theme="border-full" direction="bottom">border-full/bottom</cjui-font-animation>
            </div>
        </div>
    </div>
</template> 

<style lang="scss" scoped>
.demo-item {
    width: 360px;
}
</style>