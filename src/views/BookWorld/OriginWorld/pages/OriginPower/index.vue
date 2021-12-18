<template>
    <div class="OriginPower">
        <OriginPowerTree 
            ref="originPowerTree"
            @upTreeData="upTreeData"
            @editNodeClick="openModifyDrawer"
        />

        <OperateTool 
            @add="openAddDrawer"
        />
        
        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" :classLevel1="classLevel1" @updateData="updateData" />
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';

import OriginPowerTree from '../../components/OriginPowerTree/index.vue';
import OperateTool from '../../components/operate-tool.vue';
import EditDrawer from './EditDrawer.vue';

const { proxy } = getCurrentInstance();

const classLevel1 = ref([]);
function upTreeData(treeData) {
    classLevel1.value = treeData.value;
}

const editDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _actionTag: '',
    _title: '',
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加源权信息';
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    // if (!node.children || !node.children.length) {
    //     editDrawerParams._actionTag = 'all';
    // }
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改源权信息';
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}
function updateData() {
    proxy.$refs.originPowerTree.getTreeData();
}
</script>

<style lang="scss" scoped>
.OriginPower {
    padding-bottom: 80px;
}
</style>