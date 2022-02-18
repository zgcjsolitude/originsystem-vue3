<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="章节列表" name="article">
                <Article v-if="tabShowList.includes('article')" />
            </el-tab-pane>
            <el-tab-pane label="章节分组管理" name="bookClass">
                <BookClass v-if="tabShowList.includes('bookClass')" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Article from './pages/Article/index.vue';
import BookClass from './pages/Class/index.vue';

const activeName = ref('article');
const tabShowList = ref(['article']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>