<template>
    <!-- 粒子动效 星点效果 -->
    <div :id="particlesId"></div>
</template>

<script>
import { onMounted, nextTick } from 'vue';
import particlesConfig from "./json/particles.json";
import utils from '@/utils/utils';

export default {
    setup() {
        const time = new Date();
        const particlesId = 'id' + utils.randomWord() + time.getTime();

        onMounted(() => {
            nextTick(() => {
                particlesJS(particlesId, particlesConfig);
            });
        });

        return {
            particlesId
        }
    },
}
</script>

<style scoped>
#particlesId {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}
</style>