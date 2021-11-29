<template>
    <div class="echart-wrapper">
        <div ref="echart" style="width:100%;height:100%;"></div>
    </div>
</template>

<script setup>
import { toRefs, onMounted, getCurrentInstance, watch } from 'vue';
import * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';
import $ from 'jquery';

const props = defineProps({
    options: {
        type: Object,
        default: () => {}
    }
});

const { options } = toRefs(props);
watch(() => options.value, (newVal) => {
    resizeChart();
}, { deep: true });

const { proxy } = getCurrentInstance();

const erd = elementResizeDetectorMaker();

let chartBox = null;
function initChart() {
    const chartDom = proxy.$refs.echart;
    chartBox = echarts.init(chartDom);
    erd.listenTo(chartDom, () => {
        resizeChart();
    });
}
function resizeChart() {
    const chartDom = proxy.$refs.echart;
    const chartWidth = $(chartDom).width();
    const chartHeight = $(chartDom).height();
    chartBox.resize({
        width: chartWidth,
        height: chartHeight,
        animation: {
            duration: 500,
        },
    });
    chartBox.setOption(options.value);
}

onMounted(() => {
    initChart();
});
</script>
