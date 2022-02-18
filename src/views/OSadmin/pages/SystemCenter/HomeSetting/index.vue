<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="首页图片配置" name="HomeBgSetting">
                <HomeBgSetting v-if="tabShowList.includes('HomeBgSetting')" />
            </el-tab-pane>
            <!-- <el-tab-pane label="页面类别配置" name="PageMsgClass"> -->
                <!-- <PageMsgClass v-if="tabShowList.includes('PageMsgClass')" /> -->
            <!-- </el-tab-pane> -->
          </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import HomeBgSetting from './pages/HomeBgSetting/index.vue';
// import PageMsgClass from './pages/PageMsgClass/index.vue';

const activeName = ref('HomeBgSetting');
const tabShowList = ref(['HomeBgSetting']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>