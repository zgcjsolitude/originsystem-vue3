<template>
    <div class="h-100">
        <el-tabs type="border-card" class="osa-el-tabs-full" v-model="activeName" @tab-click="tabClickEvent">
            <el-tab-pane label="博文列表" name="blog">
                <Blog v-if="tabShowList.includes('blog')" />
            </el-tab-pane>
            <el-tab-pane label="博文分组管理" name="blogClass">
                <BlogClass v-if="tabShowList.includes('blogClass')" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Blog from './pages/Blog/index.vue';
import BlogClass from './pages/Class/index.vue';

const activeName = ref('blog');
const tabShowList = ref(['blog']);
function tabClickEvent({ props }) {
    if (!tabShowList.value.includes(props.name)) {
        tabShowList.value.push(props.name);
    }
} 
</script>