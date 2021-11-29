<template>
    <div class="cjui-loading-font" 
        :class="[
            theme ? 'cjui-loading--' + theme : '',
        ]"
        >
        <span v-for="(item, i) in dataFont" :key="i">{{ item }}</span>
    </div>
</template>

<script>
export default {
    name: "CjuiLoadingFont",
    props: {
        theme: {
            type: String,
            default: 'span-wave'
        },
        text: {
            type: String,
            default: 'Loading...'
        },
    },
    computed: {
        dataFont() {
            return this.text.split("");
        }
    },
};
</script>


<style lang="scss">
.cjui-loading-font {
    --cjuiLoadingColor: #12f3d5;
}

// 波浪Loading载入
// -------------------------
@keyframes cjuiloadingfontLetterWave {
    0%, 100% {
        transform: translateY(0) scale(1);
        padding: 0 10px;
        opacity: .8;
    }
    25% {
        transform: translateY(-25px) scale(0.8);
        padding: 0 0px;
        opacity: .6;
    }
    75% {
        transform: translateY(25px) scale(1.5);
        padding: 0px 20px;
        opacity: 1;
    }
}
.cjui-loading-font.cjui-loading--span-wave {
    & {
        padding: 24px;
        color: var(--cjuiLoadingColor);
    }
    span {
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 600;
        opacity: 0;
        display: inline-block;
        padding: 0px 20px;
        animation: cjuiloadingfontLetterWave 2s infinite linear;
    }
    @for $i from 1 to 13 {
        span:nth-child(#{$i}) {
            animation-delay: #{($i - 1)*250}ms;
        }
    }
}
</style>