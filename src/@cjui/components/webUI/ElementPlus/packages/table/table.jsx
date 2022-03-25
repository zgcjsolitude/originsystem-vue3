import { defineComponent } from "vue";

export default defineComponent({
    props: {
        height: {
            type: Number,
            default: undefined,
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
    },
    render(h) {
        return (
            <el-table 
                data={this.tableData} 
                border={this.border} 
                height={this.height}> 
                {
                    this.columns.map(col => {
                        return (
                            <el-table-column 
                                show-overflow-tooltip={col.showOverflowTooltip || true}
                                type={col.type}
                                prop={col.prop} 
                                label={col.label}
                                align={col.align} 
                                width={col.width} 
                                min-width={col.minWidth} 
                                fixed={col.fixed}
                                key={col.prop}
                                v-slots={col.slots}>
                            </el-table-column>
                        )
                    })
                }
            </el-table>
        )
    }
})