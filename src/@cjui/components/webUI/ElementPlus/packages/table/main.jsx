import { defineComponent } from "vue";

export default defineComponent({
    name: "CjuiElPlusTable",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number,
            default: 100,
        },
        border: {
            type: Boolean,
            default: false,
        },
        // 列
        columns: {
            type: Array,
            default: () => []
        },
        // 表格数据
        tableData: {
            type: Array,
            default: () => []
        },
        // 分页器
        pagination: {
            type: Object,
            default: () => {
                return {
                    size: 10,
                    current: 1,
                    totalCount: 0,
                }
            }
        },
        paginationClass: {
            type: String,
            default: '',
        },
        paginationAlign: {
            type: String,
            default: 'right',
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50, 100]
        },
    },
    methods: {
        renderPagination() {
            if (this.pagination && this.pagination.totalCount > 0) {
                return <el-pagination background layout="total, sizes, prev, pager, next, jumper" style={ { textAlign: this.paginationAlign, marginTop: '10px' } }
                    popper-class={ this.paginationClass }
                    page-sizes={ this.pageSizes }
                    default-current-page={ this.pagination.current }
                    default-page-size={ this.pagination.size }
                    total={ this.pagination.totalCount }
                    onSize-change={ (size) => this.$emit('sizeChange', size) }
                    onCurrent-change={ (number) => this.$emit('currentChange', number) }
                    onPrev-click={ (number) => this.$emit('currentChange', number) }
                    onNext-click={ (number) => this.$emit('currentChange', number) }
                    >
                </el-pagination>
            }
        }
    },
    render(h) {
        return (
            <div class="cjui-el-table"
                v-loading={ this.loading }
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">   
                <el-table 
                    data={ this.tableData } 
                    border={ this.border } 
                    height={ this.height }> 
                    {
                        this.columns.map(col => {
                            return (
                                <el-table-column 
                                    show-overflow-tooltip={ col.showOverflowTooltip || true }
                                    type={ col.type }
                                    prop={ col.prop } 
                                    label={ col.label }
                                    align={ col.align } 
                                    width={ col.width } 
                                    min-width={ col.minWidth } 
                                    fixed={ col.fixed }
                                    key={ col.prop }
                                    v-slots={ col.slots }>
                                </el-table-column>
                            )
                        })
                    }
                </el-table>
                { this.renderPagination() }
            </div>
        )
    }
})