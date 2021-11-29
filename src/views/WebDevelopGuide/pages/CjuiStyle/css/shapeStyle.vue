<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">形状</h2>
        <p class="wbg-intro">形状的相关使用技巧。</p>
        
        <template v-for="(item, i) in shapeList" :key="i">
            <h3 class="wbg-title" :id="item.anchor">{{ item.title }}</h3>
            <p v-if="item.intro" class="wbg-intro">{{ item.intro }}</p>
            <div class="wbg-demo">
                <div class="wbg-source is-stripe is-center is-padding">
                    <div :class="item.className"></div>
                </div>
                <div class="wbg-meta">
                    <div class="wbg-pre-code">
                        <pre><code v-text="item.style"></code></pre>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template> 

<script>
import { shapeOpt } from '../js/CjuiStyleData';

export default {
    setup() {
        const shapeList = shapeOpt.list;

        return {
            shapeList,
        }
    }
}
</script>

<style lang="scss" scoped>
.shape_class1 {
    width: 100px;
    height: 100px;
    background: #93efa5;
    background: linear-gradient(135deg, transparent 15px, #93efa5 0) top left,
        linear-gradient(-135deg, transparent 15px, #93efa5 0) top right,
        linear-gradient(-45deg, transparent 15px, #93efa5 0) bottom right,
        linear-gradient(45deg, transparent 15px, #93efa5 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

.shape_class2 {
    width: 100px;
    height: 100px;
    background: #93efa5;
    background: radial-gradient(circle at top left, transparent 15px, #93efa5 0) top left,
        radial-gradient(circle at top right, transparent 15px, #93efa5 0) top right,
        radial-gradient(circle at bottom right, transparent 15px, #93efa5 0) bottom right,
        radial-gradient(circle at bottom left, transparent 15px, #93efa5 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

.shape_class3 {
    & {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        position: relative;
        z-index: 1;
    }
    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #93efa5;
        transform: skew(45deg);
    }
}

.shape_class4 {
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    background: #93efa5;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}
</style>