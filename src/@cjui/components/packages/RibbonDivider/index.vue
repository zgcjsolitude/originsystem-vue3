<template>
    <!-- 彩带效果 分隔下边框 -->
    <div class="canvas-wrap">
        <canvas :id="ribbonDividerId"></canvas>
    </div>
</template>

<script>
import { onMounted, nextTick } from 'vue';
import utils from '@/utils/utils';

export default {
    setup() {
        const time = new Date();
        const ribbonDividerId = 'id' + utils.randomWord() + time.getTime();

        onMounted(() => {
            nextTick(() => {
            });
        });

        return {
            ribbonDividerId
        }
    },
}
</script>

<style scoped>
</style>