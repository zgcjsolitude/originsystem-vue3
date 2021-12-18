<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">Loading 载入</h2>
        <p class="wbg-intro">常用的Loading载入动画。</p>
        
        <h3 class="wbg-title">LoadingTheme 效果样式</h3>
        <p class="wbg-intro">组件库提供了<code>LoadingTheme</code>组件，通过<code>theme</code>属性设置不同的载入样式，同时通过修改<code>--cjuiLoadingColor</code>修改颜色。</p>
        <div class="wbg-demo is-black is-padding is-around">
            <div v-for="item in loadingList" :key="item" class="demo-item">
                <div class="demo-item-box">
                    <CjuiLoadingTheme :theme="item" />
                </div>
                <div>{{ item }}</div>
            </div>
        </div>
        <div class="wbg-demo is-black is-padding is-around">
            <div class="demo-item">
                <CjuiLoadingTheme theme="3-light-rotate_0" />
                <div>3-light-rotate_0</div>
            </div>
        </div>

        <h3 class="wbg-title">LoadingTheme 主题组件</h3>
        <p class="wbg-intro">组件库提供了关于<code>LoadingFont</code>组件，提供了部分文字动画效果。</p>
        <div class="wbg-demo is-black is-padding is-around">
            <el-button v-if="!LoadingFontShow" class="cjui-dazzle-light" type="primary" @click="LoadingFontShow=!LoadingFontShow">
                查 看
            </el-button>
            <LoadingFont v-else />
        </div>
        <p class="wbg-intro">组件库提供了关于<code>LoadingSolar</code>组件。</p>
        <div class="wbg-demo is-black is-padding is-around">
            <el-button v-if="!LoadingSolarShow" class="cjui-dazzle-light" type="primary" @click="LoadingSolarShow=!LoadingSolarShow">
                查 看
            </el-button>
            <LoadingSolar v-else />
        </div>

        <h3 class="wbg-title">LoadingProgress 进度指示器</h3>
        <p class="wbg-intro">组件库提供了<code>LoadingProgress</code>组件，结合loading主题展示操作进度。</p>
        <div class="wbg-demo is-black is-padding">
            <el-button class="cjui-dazzle-light" type="primary" @click="progressShow=!progressShow">
                查 看
            </el-button>
            <cjui-loading-progress  
                v-model:loading="progressShow" 
                theme="3-light-rotate_0"
                modal="fullscreen" 
                :fontshow="true"
                :action="true"
            />
        </div>
    </div>
</template> 

<script>
import CjuiLoadingTheme from '@/@cjui/components/packages/LoadingTheme/index.vue';
import LoadingFont from '@/@cjui/components/packages/LoadingTheme/loading-font.vue';
import LoadingSolar from '@/@cjui/components/packages/LoadingTheme/loading-solar.vue';
import { ref } from '@vue/reactivity';

export default {
    components: {
        CjuiLoadingTheme,
        LoadingFont,
        LoadingSolar,
    },
    setup() {
        const loadingList = [
            'ring-rotate_0',
            'ring-ring_0',
            'square-rolling_0',
            'wave_0',
            'ring-circle_0',
            'square-centrifugal_0',
            'three-wave_3',
            'three-ring-wave_3',
            'three-ball-beat_3',
            'four-ball-beat_4',
            'five-line-beat_5',
            'eight-line-clock_8',
            'two-square-rotate_0',
        ];

        const LoadingFontShow = ref(false);
        const LoadingSolarShow = ref(false);
        const progressShow = ref(false);

        return {
            loadingList,
            LoadingFontShow,
            LoadingSolarShow,
            progressShow
        }
    },
}
</script>

<style lang="scss" scoped>
.demo-item {
    width: 200px;
    height: 120px;
    color: #666;
    text-align: center;

    .demo-item-box {
        height: 50px;
        margin: 10px 0;
        display: flex;
        align-items: center;
    }

    :deep(.cjui-loading-theme) {
        margin: 0 auto;
    }
}
</style>