<template>
  	<div class="h-100">
		<el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
  		  	<el-tab-pane label="摘录列表" name="extract">
				<Extract v-if="tabShowList.includes('extract')" />
			</el-tab-pane>
  		  	<el-tab-pane label="摘录分组管理" name="extractType">
				<ExtractType v-if="tabShowList.includes('extractType')" />
			</el-tab-pane>
  		</el-tabs>
  	</div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Extract from './Extract/index.vue';
import ExtractType from './ExtractType/index.vue';

const activeName = ref('extract');
const tabShowList = ref(['extract']);
function tabClickEvent({ props }) {
	if (!tabShowList.value.includes(props.name)) {
		tabShowList.value.push(props.name);
	}
} 
</script>