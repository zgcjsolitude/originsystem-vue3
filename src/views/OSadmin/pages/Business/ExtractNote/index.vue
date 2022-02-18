<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="摘录列表" name="Extract">
                <Extract v-if="tabShowList.includes('Extract')" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Extract from './pages/Extract/index.vue';

const activeName = ref('Extract');
const tabShowList = ref(['Extract']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>