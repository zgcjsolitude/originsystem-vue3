<template>
    <div class="cjui-el-table"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        >
        <TableProps 
            :height="height"
            :border="border"
            :columns="columns"
            :tableData="tableData"
        />

        <el-pagination v-if="pagination.total > 0"
            background 
            layout="total, sizes, prev, pager, next, jumper"
            :popper-class="paginationClass"
            :current-page="pagination.current"
            :page-size="pagination.size"
            :total="pagination.total"
            :page-sizes="pageSizes"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

import TableProps from './table.jsx';

export default {
    name: "CjuiElTable",
    components: {
        TableProps
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        // 表格
        height: {
            type: Number,
            default: 100,
        },
        border: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Array,
            default: () => []
        },
        tableData: {
            type: Array,
            default: () => []
        },
        // 分页器
        pagination: {
            type: Object,
            default: () => {
                return {
                    current: 1,
                    size: 10,
                    total: 0,
                }
            }
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50, 100]
        },
        paginationClass: {
            type: String,
            default: '',
        },
    },
    setup(props, { emit }) {
        function handleCurrentChange(val) {
            emit('currentChange', val);
        }

        function handleSizeChange(val) {
            emit('sizeChange', val);
        }

        return {
            handleCurrentChange,
            handleSizeChange
        }
    },
}
</script>

<style lang="scss">
.el-pagination {
    text-align: right;
    margin-top: 10px;
}
</style>
