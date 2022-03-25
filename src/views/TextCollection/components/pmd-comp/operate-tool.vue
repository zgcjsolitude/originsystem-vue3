<template>
    <div class="operate-container">
        <el-icon v-if="showFilter" :size="32" @click="filterEvent"><Filter /></el-icon>
        <el-icon v-if="showAdd" :size="32" @click="addEvent"><Plus /></el-icon>
    </div>
</template>

<script>
import { Filter, Plus } from '@element-plus/icons-vue';

export default {
    components: {
        Filter,
        Plus
    },
    props: {
        showAdd: {
            type: Boolean,
            default: true
        },
        showFilter: {
            type: Boolean,
            default: true
        },
    },
    setup(props, { emit }) {
        function filterEvent() {
            emit('filterEvent')
        }

        function addEvent() {
            emit('addEvent');
        }

        return {
            filterEvent,
            addEvent
        }
    },
}
</script>

<style lang="scss" scoped>
.operate-container {
    color: rgba(255, 255, 255, 0.3);
    position: fixed;
    right: 15px;
    bottom: 15px;

    .el-icon {
        margin-left: 0.5em;
        cursor: pointer;
    }
    .el-icon svg {
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.2em;
    }
}
</style>