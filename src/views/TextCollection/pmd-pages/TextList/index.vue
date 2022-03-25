<template>
    <div>
        <TextTree v-if="config.mode === 'Tree-Article'" :appUuid="modelUuid" />
        <TextClassify v-if="config.mode === 'Classify-Article'" :appUuid="modelUuid" :config="config" />
    </div>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";

import TextTree from './TextTree/index.vue';
import TextClassify from './TextClassify/index.vue';
import service from '../../js/service';

const router = useRouter();

const userId = inject('userId');
const module = inject('module');

const modelUuid = ref(router.currentRoute.value.params.modelUuid);

const loading = ref(true);
const config = reactive({
    mode: '',
    classifyType: 'Tree',
    listType: 'Table',
    listOption: '',
    contentType: 'richText'
});
async function getModelConfig() {
    loading.value = true;
    const dataObj = await service.Return_apptextmodelconfig({
        uuid: modelUuid.value,
    }, module.value);
    loading.value = false;
    config.mode = dataObj.mode;
    config.classifyType = dataObj.classifyType || 'Tree';
    config.listType = dataObj.listType || 'Table';
    config.listOption = dataObj.listOption || '';
    config.contentType = dataObj.contentType || 'richText';
}

onMounted(() => {
    getModelConfig();
});
</script>