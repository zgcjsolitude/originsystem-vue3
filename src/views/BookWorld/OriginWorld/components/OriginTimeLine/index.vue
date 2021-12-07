<template>
    <!-- 根源世界 源星时间线 -->
    <div class="OriginTimeline-contianer" v-loading="timelineLoading">
        <el-timeline>
            <el-timeline-item v-for="(item, i) in timelinelist" :key="i" :timestamp="item.date" placement="top">
                <el-card>
                    <p>{{ item.intro }}</p>

                    <el-icon class="operate-edit" :size="16" @click="editNodeClick(item)"><Edit /></el-icon>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { Edit } from '@element-plus/icons';

import { TimelineDataHook } from './js/data-hook';

export default {
    name: 'OriginTimeline',
    components: {
        Edit,
    },
    setup(props, { emit }) {
        const { timelinelist, timelineLoading, getTimelineList } = TimelineDataHook();

        function editNodeClick(node) {
            emit('editNodeClick', node)
        }

        onMounted(() => {
            getTimelineList();
        });

        return {
            timelinelist, 
            timelineLoading, 
            getTimelineList,
            editNodeClick
        }
    }
}
</script>

<style lang="scss" scoped>
.OriginTimeline-contianer {
    padding: 10px 15px;
}

.operate-edit {
    position: absolute;
    bottom: 15px;
    right: 15px;
}

:deep(.el-loading-mask) {
    background: rgba(0,0,0,0.1);
}
</style>
