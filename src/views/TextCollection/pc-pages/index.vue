<template>
    <cjui-loading-progress class="h-100" :loading="loading" theme="3-light-rotate_0" modal="full">
        <Empty v-if="!modelList.length" @openAddModel="openAddModel" />
        <el-tabs v-else type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane v-for="item in modelList" :key="item.uuid+item.name" :label="item.name" :name="item.uuid">
                <template #label>
                    <span class="custom-tabs-label">
                        <span>{{ item.name }}</span>
                        <el-icon style="vertical-align: -0.2em;margin-left: 5px;">
                            <edit @click="openModifyModel(item)" />
                        </el-icon>
                    </span>
                </template>

                <AppTextList v-if="tabShowList.includes(item.uuid) && item.mode === 'Classify-Article'" :appUuid="item.uuid" :mode="item.mode" />
                <AppTextTree v-if="tabShowList.includes(item.uuid) && item.mode === 'Tree-Article'" :appUuid="item.uuid" :mode="item.mode" />
            </el-tab-pane>
        </el-tabs>

        <div v-if="modelList.length" class="pos-tool">
            <el-button type="primary" @click="openAddModel">
                新增模板
                <el-icon><Plus /></el-icon>
            </el-button>
        </div>

        <AppTextModelDialog v-model:visible="appTextModelVisible" :formModelParams="formModelParams" @updateData="updateData" />
    </cjui-loading-progress>
</template>

<script setup>
import { onMounted, reactive, ref, watch, provide, inject, toRefs } from 'vue';
import { Edit, Plus } from '@element-plus/icons-vue';

import Empty from './Empty.vue';
import AppTextModelDialog from './TextModel/EditModel.vue';
import AppTextList from './TextTable/index.vue';
import AppTextTree from './TextTree/index.vue';

import service from '../js/service';

const props = defineProps({
    module: {
        type: String,
        default: 'user',
    },
});

const { module } = toRefs(props);

provide('module', module);

const userId = inject('userId');

const activeName = ref('');
const tabShowList = ref([]);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
}

const loading = ref(true);
const modelList = ref([]);
async function getAppTextModelList() {
    loading.value = true;
    const { data, count } = await service.Return_apptextmodel({
        userId: userId.value,
    }, module.value);
    loading.value = false;
    modelList.value = data;
}
function setDefaultName() {
    if (modelList.value.length) {
        activeName.value = modelList.value[0].uuid;
        tabShowList.value.push(modelList.value[0].uuid);
    }
}

const appTextModelVisible = ref(false);
const formModelParams = reactive({
    _action: '',
    _title: '',
    _id: '',
    id: '',
    uuid: '',
    name: '',
    nameEn: '',
    intro: '',
});
function openAddModel() {
    formModelParams._action = 'add';
    appTextModelVisible.value = true;
}
function openModifyModel(row) {
    formModelParams._action = 'modify';
    Object.keys(row).forEach(key => {
        formModelParams[key] = row[key];
    });
    appTextModelVisible.value = true;
}
async function updateData(action) {
    if (action === 'modify') {
        await getAppTextModelList();
    } else {
        await getAppTextModelList();
        setDefaultName();
    }
}

onMounted(async () => {
    await getAppTextModelList();
    setDefaultName();
});
</script>

<style lang="scss" scoped>
.pos-tool {
    position: absolute;
    top: 4px;
    right: 10px;
}
</style>