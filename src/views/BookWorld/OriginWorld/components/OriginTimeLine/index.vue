<template>
    <!-- 根源世界 源星时间线 -->
    <div class="OriginTimeline-contianer">
        <el-timeline>
            <el-timeline-item v-for="(item, i) in timelinelist" :key="i" :timestamp="item.date" placement="top">
                <div class="timeline-item">
                    <p class="item-text">{{ item.intro }}</p>

                    <el-icon class="operate-edit" :size="16" @click="editNodeClick(item)"><Edit color="#ababab" /></el-icon>
                </div>
            </el-timeline-item>
        </el-timeline>
        

        <cjui-loading-progress 
            v-model:loading="timelineLoading" 
            theme="3-light-rotate_0" 
            modal="fullscreen" 
            :fontshow="true"
            :action="true">
        </cjui-loading-progress>
    </div>
</template>

<script>
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { Edit } from '@element-plus/icons';

import { TimelineDataHook } from './js/data-hook';

export default {
    name: 'OriginTimeline',
    components: {
        Edit,
    },
    props: {
        tag: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const { tag } = toRefs(props);

        const { timelinelist, timelineLoading, getTimelineList } = TimelineDataHook();
        function getData() {
            getTimelineList({ tag: tag.value });
        }

        const paramsProps = computed(() => '' + tag.value);
        watch(paramsProps, () => {
            getData();
        });

        function editNodeClick(node) {
            emit('editNodeClick', node)
        }

        onMounted(() => {
            getData();
        });

        return {
            timelinelist, 
            timelineLoading, 
            getData,
            editNodeClick
        }
    }
}
</script>

<style lang="scss" scoped>
.OriginTimeline-contianer {
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

:deep(.el-loading-mask) {
    background: rgba(0,0,0,0.1);
}
</style>
