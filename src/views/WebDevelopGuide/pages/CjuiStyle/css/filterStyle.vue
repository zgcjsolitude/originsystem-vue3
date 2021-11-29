<template>
	<div class="wbg-right-container">
        <h2 class="wbg-title">滤镜样式收藏</h2>
        <p class="wbg-intro">多款好看的css3滤镜样式，鼠标悬停显示源代码方便复制直接使用。</p>
        
        <div class="wbg-demo is-around is-padding">
            <div>
                <div>原图</div>
            </div>
            
            <div v-for="(item, i) in filterList" :key="i" :style="item.name">
                <div :style="item.color != ''? item.color: ''">{{ item.name }}</div>
            </div>

            <div v-for="i in 6" :key="i" class="demo-empty"></div>
        </div>
    </div>
</template> 

<script>
import { filterOpt } from '../js/CjuiStyleData';

export default {
    setup() {
        const filterList = filterOpt.list[0].list;

        return {
            filterList,
        }
    }
}
</script>

<style lang="scss" scoped>
.wbg-demo {
    & > div {
        width: 180px;
        height: 180px;
        border-radius: 6px;
        float: left;
        margin: 10px;
        background-image: url('../../../../../../public/img/OSfront/Home/bg_2.jpg');
        background-repeat: round;
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
        height: 0;
        visibility: hidden;
    }
}
</style>