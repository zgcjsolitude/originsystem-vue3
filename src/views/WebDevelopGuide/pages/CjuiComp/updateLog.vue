<template>
  	<div class="wbg-right-container">
		<p class="wbg-abstract">
            本人基于工作经验，编写了基于vue3的相关组件，组件库查阅可访问本项目 <a href="https://github.com/zgcjsolitude/originsystem-vue3/tree/master/src/@cjui/components" target="blank">Github</a> 地址。
        </p>
    	<h2 class="wbg-title">更新日志</h2>

        <el-timeline>
            <el-timeline-item v-for="(item, i) in updateLogList" :key="i" :timestamp="item.date" placement="top">
                <el-card>
                    <h4>{{ item.title }}</h4>
                    <p v-for="(el, j) in item.textList" :key="j">{{ el }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
  </div>
</template>

<script>
import updateLogOpt from '@/@cjui/components/message.json';

export default {
    setup() {
        const updateLogList = updateLogOpt.updateLog;

        return {
            updateLogList
        }
    },
}
</script>

