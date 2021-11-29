<template>
    <div>
        <BasicChart :options="options" style="width:100%;height:300px;" />
    </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';

import service from '../../js/service';

import BasicChart from '@/@cjui/components/webUI/Echarts/BasicChart.vue';
import { getBarOptions, initBarSeries, initBarLegend, BarOptBuilder } from '@/views/OSadmin/components/Echarts/echartsOptions.js';

// const chartOption = new BarOptBuilder().getNightOption();
const chartOption = getBarOptions('night');

const options = reactive({
    title: chartOption.title,
    grid: chartOption.grid,
    color: chartOption.color,
    xAxis: chartOption.xAxis,
    yAxis: chartOption.yAxis,
    tooltip: chartOption.tooltip,
    dataset: { source: [] }
});

const chartData = ref([]);
async function getChartData(params) {
    const { data } = await service.Return_webpagemsglist_chart({
        lv1Name: '',
        lv2Name: '',
        lv3Name: '',
        lv4Name: '',
    });
    chartData.value = data;
    handleChartData(data);
}
function handleChartData(data) {
    if (data.length) {
        let arr = [
            ['product', '页面访问次数' ]
        ];
        data.forEach(el => {
            arr.push([el.name, el.visitingTime])
        });
        // options.legend = initBarLegend([{ name: '页面访问次数' }], 'night');
        options.series = initBarSeries([{ type: 'bar' }], 'night');
        options.dataset.source = arr;
    }
}

onMounted(() => {
    getChartData();
});
</script>
