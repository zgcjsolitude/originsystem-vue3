<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="页面信息配置" name="PageMsgSetting">
                <PageMsgSetting v-if="tabShowList.includes('PageMsgSetting')" />
            </el-tab-pane>
            <el-tab-pane label="页面类别配置" name="PageMsgClass">
                <PageMsgClass v-if="tabShowList.includes('PageMsgClass')" />
            </el-tab-pane>
          </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import PageMsgSetting from './pages/PageMsgSetting/index.vue';
import PageMsgClass from './pages/PageMsgClass/index.vue';

const activeName = ref('PageMsgSetting');
const tabShowList = ref(['PageMsgSetting']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>