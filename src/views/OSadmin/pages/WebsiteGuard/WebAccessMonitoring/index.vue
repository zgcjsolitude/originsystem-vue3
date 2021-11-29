<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="访问记录看板" name="VisitorLogsBoard">
                <VisitorLogsBoard v-if="tabShowList.includes('VisitorLogsBoard')" />
            </el-tab-pane>
          </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import VisitorLogsBoard from './pages/VisitorLogsBoard/index.vue';

const activeName = ref('VisitorLogsBoard');
const tabShowList = ref(['VisitorLogsBoard']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>