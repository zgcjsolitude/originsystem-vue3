<template>
    <cjui-loading-progress class="TextModel" :loading="loading" theme="3-light-rotate_0" modal="fullscreen" :fontshow="true" :action="true">
        <div class="model-card" v-for="item in modelList" :key="item.uuid" @click="clickEvent(item)">
            <cjui-font-animation :animated="false" theme="fade-on" style="font-size:18px;">{{ item.name }}</cjui-font-animation>
            <br />
            <cjui-font-animation :animated="false" theme="fade-on" style="font-size: 12px;">{{ item.intro }}</cjui-font-animation>
        </div>
    </cjui-loading-progress>
</template>

<script>
export default {
    name: 'TextCollectionIndex',
}
</script>

<script setup>
import { ref, toRefs, onMounted, inject } from 'vue';
import { useRouter } from "vue-router";

import service from '../../js/service';

const router = useRouter();

const userId = inject('userId');
const module = inject('module');

const loading = ref(false);
const modelList = ref([]);
async function getAppTextModelList() {
    loading.value = true;
    const { data, count } = await service.Return_apptextmodel({
        userId: userId.value,
    }, module.value);
    loading.value = false;
    modelList.value = data;
}

function clickEvent(model) {
    router.push({ name: 'TextCollectionTextList', params: { modelUuid: model.uuid } });
}

onMounted(() => {
    getAppTextModelList();
});
</script>

<style lang="scss" scoped>
.TextModel {
    padding: 15px;
}

.model-card {
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 10px;
    height: 72px;
    overflow: hidden;

    &:nth-child(3n+1) {
        background: linear-gradient(45deg, #07A3B2, #D9ECC7);
    }

    &:nth-child(3n+2) {
        background: linear-gradient(45deg, #6DE195, #C4E759);
    }

    &:nth-child(3n+3) {
        background: linear-gradient(45deg, #5583EE, #41D8DD);
    }
}
</style>