<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">边框</h2>
        <p class="wbg-intro">边框的相关使用技巧。</p>
        
        <template v-for="(item, i) in borderList" :key="i">
            <h3 v-if="item.title" :id="item.anchor" class="wbg-title">{{ item.title }}</h3>

            <template v-for="(el, j) in item.list" :key="j">
                <p v-if="el.intro === '半透明边框'" class="wbg-intro">
                    <code>border-box</code> 会裁切掉被进入元素外沿框的背景，使用
                    <code>background-clip:padding-box;</code> 可以修改这一行为。
                </p>
                <p v-if="el.intro === '多重边框1'" class="wbg-intro">
                    <code>box-shadow</code> 的第四个参数为扩张半径，通过逗号分隔语法，我们可以创建任意数量的投影形成多重边框。
                </p>
                <p v-if="el.intro === '多重边框2'" class="wbg-intro">
                    <code>outline</code> 方案：适用于两层边框，还可以通过
                    <code>outline-offset</code> 属性来控制它跟元素边缘之间的间距。
                </p>
                <p v-if="el.intro === '边框内圆角'" class="wbg-intro">
                    利用
                    <code>outline</code> 和
                    <code>box-shadow</code> 实现。
                </p>
                <div class="wbg-demo">
                    <div class="wbg-source is-stripe is-center is-padding">
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
import { borderOpt } from '../js/CjuiStyleData';

export default {
    setup() {
        const borderList = borderOpt.list;

        return {
            borderList,
        }
    }
}
</script>

<style lang="scss" scoped>
.border_class1 {
    width: 100px;
    height: 100px;
    border: 10px solid hsla(0, 0%, 100%, 0.5);
    background: white;
    background-clip: padding-box;
}
.border_class2 {
    width: 85px;
    height: 85px;
    background-color: #fff;
    box-shadow: 0 0 0 10px #27c079, 0 0 0 15px #12f3d5;
    margin: 15px;
}
.border_class3 {
    width: 85px;
    height: 85px;
    background-color: #fff;
    border: 10px solid #27c079;
    outline: 5px solid #12f3d5;
    outline-offset: 10px;
    margin: 15px;
}
.border_class4 {
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 10px #4eccbb;
    outline: 10px solid #4eccbb;
    margin: 10px;
}
</style>