<template>
    <div class="TimeLine">
        <OriginTimeLine ref="originTimeLine"
            v-if="isMounted"
            :tag="filterDrawerParams.tag"
            @editNodeClick="openModifyDrawer"
        />

        <OperateTool 
            @filter="openFilterDrawer"
            @add="openAddDrawer"
        />

        <FilterDrawer v-model:visible="filterDrawer" :formModelParams="filterDrawerParams" @updateParmas="updateParmasEvent" />
        
        <EditDrawer v-model:visible="editDrawer" :formModelParams="editDrawerParams" @updateData="updateData" />
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import localforage from 'localforage';

import OriginTimeLine from '../../components/OriginTimeLine/index.vue';
import OperateTool from '../../components/operate-tool.vue';
import FilterDrawer from './FilterDrawer.vue';
import EditDrawer from './EditDrawer.vue';

const LOCAL_TAG = 'OS_ORIGINWORLD_TIMELINE_TAG';

const { proxy } = getCurrentInstance();

const filterDrawer = ref(false);
const filterDrawerParams = reactive({
    tag: '源历',
});
function openFilterDrawer() {
    filterDrawer.value = true;
}
function updateParmasEvent(data) {
    const localKeyMap = {
        tag: LOCAL_TAG,
    }
    Object.keys(filterDrawerParams).forEach(key => {
        if (data[key]) {
            filterDrawerParams[key] = data[key];
            localforage.setItem(localKeyMap[key], data.tag);
        }
    });
}

const editDrawer = ref(false);
const editDrawerParams = reactive({
    _action: '',
    _title: '',
    tag: ''
});
function openAddDrawer() {
    editDrawerParams._action = 'add';
    editDrawerParams._title = '添加时间线信息';
    editDrawerParams.tag = filterDrawerParams.tag;
    editDrawer.value = true;
}
function openModifyDrawer(node) {
    editDrawerParams._action = 'modify';
    editDrawerParams._title = '修改时间线信息';
    editDrawerParams.tag = filterDrawerParams.tag;
    Object.keys(node).forEach(key => {
        editDrawerParams[key] = node[key];
    });
    editDrawer.value = true;
}
function updateData() {
    proxy.$refs.originTimeLine.getData();
}

const isMounted = ref(false);
onMounted(async () => {
    const localTag = await localforage.getItem(LOCAL_TAG);
    if (localTag) {
        filterDrawerParams.tag = localTag;
    }
    isMounted.value = true;
});
</script>

<style lang="scss" scoped>
.TimeLine {
    padding: 10px 20px 80px 15px;
}
</style>