<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">渐变样式收藏</h2>
        <p class="wbg-intro">多款好看的渐变样式，鼠标悬停显示源代码方便复制直接使用。</p>

        <template v-for="(item, i) in gradientstList" :key="i">
            <h3 class="wbg-title" :id="item.anchor">{{ item.title }}</h3>
            <p v-if="item.intro" class="wbg-intro">{{ item.intro }}</p>
            <div class="wbg-demo is-around is-padding">
                <div v-for="(el, j) in item.list" :key="j" :style="el.name">
                    <div :style="el.color != ''? el.color: ''">{{ el.name }}</div>
                </div>

                <div v-for="k in 6" :key="k" class="demo-empty"></div>
            </div>
        </template>
    </div>
</template> 

<script>
import { gradientstOpt } from '../js/CjuiStyleData';

export default {
    setup() {
        const gradientstList = gradientstOpt.list;

        return {
            gradientstList,
        }
    }
}
</script>

<style lang="scss" scoped>
.wbg-demo {
    & > div {
        width: 150px;
        height: 120px;
        border-radius: 6px;
        margin: 5px;
    }
    & > div > div {
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s linear 0.1s;
    }
    & > div > div:hover {
        opacity: 1;
    }

    .demo-empty {
        width: 150px;
        height: 0;
        visibility: hidden;
        margin: 0 5px;
    }
}
</style>
