<template>
    <div class="ListView">
        <el-timeline>
            <el-timeline-item v-for="(item, i) in data" :key="i" :timestamp="item.title" placement="top">
                <div class="timeline-item">
                    <p class="item-text">{{ item.intro }}</p>

                    <el-icon class="operate-edit" :size="16" @click="editNodeClick(item)"><Edit color="#ababab" /></el-icon>
                </div>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['editNodeClick']);

function editNodeClick(node) {
    emit('editNodeClick', node);
}
</script>

<style lang="scss" scoped>
.ListView {
    padding: 10px 15px;
}

.timeline-item {
    border-top: 1px solid #7a7a7a;
    padding-top: 0.3em;
    
    .item-text {
        color: #ababab;
        font-size: 12px;
        margin-bottom: 0;
    }
}

.operate-edit {
    position: absolute;
    top: 4px;
    right: 0px;
}
</style>