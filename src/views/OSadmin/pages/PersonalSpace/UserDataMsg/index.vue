<template>
  	<div class="h-100">
		<el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
  		  	<el-tab-pane label="信息分组配置" name="msgClassSetting">
				<MsgClassSetting v-if="tabShowList.includes('msgClassSetting')" />
			</el-tab-pane>
  		</el-tabs>
  	</div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import MsgClassSetting from './msgClassSetting/index.vue';

const activeName = ref('msgClassSetting');
const tabShowList = ref(['msgClassSetting']);
function tabClickEvent({ props }) {
	if (!tabShowList.value.includes(props.name)) {
		tabShowList.value.push(props.name);
	}
} 
</script>