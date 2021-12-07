<template>
    <div class="TimeLine">
        <OriginTimeLine ref="originTimeLine"
            @editNodeClick="openModifyDrawer"
        />

        <div class="operate-add" @click="openAddDrawer">
            <span>+</span>
        </div>
        
        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" @updateData="updateData" />
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

import OriginTimeLine from '../components/OriginTimeLine/index.vue';
import EditDrawer from './TimeLineEdit.vue';

const { proxy } = getCurrentInstance();

const editDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加时间线信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改时间线信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}
function updateData() {
    proxy.$refs.originTimeLine.getTimelineList();
}
</script>

<style lang="scss" scoped>
.TimeLine {
    padding: 20px 20px 80px 20px;
}
.operate-add {
    color: rgba($color: #000000, $alpha: 0.3);
    font-size: 32px;
    position: fixed;
    right: 15px;
    bottom: 15px;
    background: rgba(255, 255, 255, 0.3);
    width: 32px;
    height: 32px;
    border-radius: 100%;
    line-height: 32px;
    text-align: center;
}
</style>