<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">背景</h2>
        <p class="wbg-intro">背景的相关使用技巧。</p>
        
        <template v-for="(item, i) in backgroundList" :key="i">
            <h3 v-if="item.title" :id="item.anchor" class="wbg-title">{{ item.title }}</h3>

            <template v-for="(el, j) in item.list" :key="j">
                <p v-if="el.intro" class="wbg-intro">{{ el.intro }}</p>
                <div class="wbg-demo">
                    <div class="wbg-source is-padding">
                        <div :class="el.className"></div>
                    </div>
                    <div class="wbg-meta">
                        <div class="wbg-pre-code">
                            <pre><code v-text="el.style"></code></pre>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template> 

<script>
import { backgroundOpt } from '../js/CjuiStyleData';

export default {
    setup() {
        const backgroundList = backgroundOpt.list;

        return {
            backgroundList,
        }
    }
}
</script>

<style lang="scss" scoped>
.wbg-source > div {
    width: 100%;
    height: 100px;
}

.bg_class1 {
    background: linear-gradient(#93efa5 50%, #537d8e 0);
    background-size: 100% 30px;
}

.bg_class2 {
    background: linear-gradient(#93efa5 33.3%, #537d8e 0, #58a 66.6%, #63c328 0);
    background-size: 100% 30px;
}

.bg_class3 {
    background: linear-gradient(
        45deg,
        #93efa5 25%,
        #537d8e 0,
        #537d8e 50%,
        #93efa5 0,
        #93efa5 75%,
        #537d8e 0
    );
    background-size: 30px 30px;
}

.bg_class4 {
    background: repeating-linear-gradient(45deg, #93efa5, #93efa5 15px, #537d8e 0, #537d8e 30px);
}

.bg_class5 {
    background: #76ca86;
    background-image: repeating-linear-gradient(
        30deg,
        hsla(0, 0%, 100%, 0.1),
        hsla(0, 0%, 100%, 0.1) 15px,
        transparent 0,
        transparent 30px
    );
}

.bg_class6 {
    background: #93efa5;
    background-image: linear-gradient(white 1px, transparent 0),
        linear-gradient(90deg, white 1px, transparent 0);
    background-size: 30px 30px;
}

.bg_class7 {
    background: #93efa5;
    background-image: linear-gradient(white 2px, transparent 0),
        linear-gradient(90deg, white 2px, transparent 0),
        linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0),
        linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
    background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}

.bg_class8 {
    background: #537d8e;
    background-image: radial-gradient(#93efa5 30%, transparent 0), radial-gradient(#93efa5 30%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
}

.bg_class9 {
    background: #eee;
    background-image: 
        linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.25) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.25) 0
        ),
        linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.25) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.25) 0
        );
    background-position: 0 0, 15px 15px;
    background-size: 30px 30px;
}

.bg_class10 {
    background: #eee 
        url('data:image/svg+xml,\
        <svg xmlns="http://www.w3.org/2000/svg" \
        width="100" height="100" \
        fill-opacity=".25">\
        <rect x="50" width="50" height="50" /> \
        <rect y="50" width="50" height="50" /> \
        </svg>');
    background-size: 30px 30px;
}

.bg_class11 {
    background: hsl(20, 40%, 90%);
    background-image: linear-gradient(90deg, #fb3 11px, transparent 0),
        linear-gradient(90deg, #ab4 23px, transparent 0),
        linear-gradient(90deg, #655 41px, transparent 0);
    background-size: 41px 100%, 61px 100%, 83px 100%;  /* 平铺贴片重合的尺寸 41×61×83=207583 px */
}
</style>