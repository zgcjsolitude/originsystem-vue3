<template>
    <div class="w-100 h-100 Empty-container">
        <div class="container-box">
            <img src="/img/nodata.png" alt="">
            <p class="intro-msg">
                您还没有创建属于您的文集模板，点击下方按钮创建新模板。
            </p>
            <el-button class="flex-item ml-auto" type="primary" @click="openAddModel">
                <i class="el-icon-plus"></i>
                创建新文集模板
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';

const emit = defineEmits(['openAddModel']);

function openAddModel() {
    emit('openAddModel');
}
</script>

<style lang="scss" scoped>
.Empty-container {
    padding: 30px 30px 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-box {
    text-align: center;

    .intro-msg {
        font-size: 24px;
    }

    img {
        width: 300px;
        height: 300px;
    }
}
</style>