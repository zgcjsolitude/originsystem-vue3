<template>
    <!-- 双栏布局盒子 -->
    <div class="TwoColumns-contianer" :class="showExample && 'example-show'">
        <div class="contianer-left" :style="{ width: leftWidth }">
            <el-scrollbar>
                <slot name="left">
                    <p v-for="i in 50" :key="i">TwoColumns-contianer-left</p>
                </slot>
            </el-scrollbar>
        </div>
        <div class="contianer-right">
            <el-scrollbar>
                <slot name="right">
                    <p v-for="i in 50" :key="i">TwoColumns-contianer-right</p>
                </slot>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showExample: {
            type: Boolean,
            default: false
        },
        leftWidth: {
            type: String,
            default: '300px'
        },
    }
}
</script>


<style lang="scss" scoped>
.TwoColumns-contianer.example-show {
    background: #fff;

    .contianer-left {
        border-right: 1px solid #eee;
        padding: 15px 0 15px 20px;
    }
    .contianer-right {
        padding: 15px 0 15px 20px;
    }
}

.TwoColumns-contianer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
}
.contianer-left {
    height: 100%;
    overflow: auto;
}
.contianer-right {
    height: 100%;
    overflow: auto;
    flex: 1;
}
</style>