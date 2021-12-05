<template>
    <div class="OriginPower">
        <OriginPowerTree 
            ref="originPowerTree"
            @upTreeData="upTreeData"
            @editNodeClick="openModifyDrawer"
        />

        <div class="operate-add" @click="openAddDrawer">
            <span>+</span>
        </div>
        
        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :classLevel1="classLevel1" @updateTableData="updateTableData" />
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

import OriginPowerTree from '../components/OriginPowerTree/index.vue';
import EditDrawer from './OriginPowerEdit.vue';

const { proxy } = getCurrentInstance();

const classLevel1 = ref([]);
function upTreeData(treeData) {
    classLevel1.value = treeData.value;
}

const editDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加源权信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改源权信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}
function updateTableData() {
    proxy.$refs.originPowerTree.getTreeData();
}
</script>

<style lang="scss" scoped>
.OriginPower {
    padding-bottom: 80px;
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