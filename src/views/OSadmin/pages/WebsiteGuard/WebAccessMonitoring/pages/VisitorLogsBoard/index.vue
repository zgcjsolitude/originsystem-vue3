<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="24">
                <div class="osa-card-board">
                    <p class="osa-card-title">页面访问次数统计</p>
                    <PageCountChart />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import PageCountChart from './pageCountChart.vue';
</script>
