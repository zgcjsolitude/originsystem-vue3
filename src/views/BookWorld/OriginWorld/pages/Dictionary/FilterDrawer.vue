<template>
    <div>
        <el-drawer direction="ltr" size="100%" title="时间线过滤器"
            :model-value="visible"
            @open="openEvent"
            @close="closeEvent"
        >
            <el-form ref="form" :model="formModel" label-width="70px" label-position="left">
                <el-form-item label="纪年" prop="tag">
                    <el-select size="small" placeholder="请选择" popper-class="bw-originworld" v-model="formModel.tag">
                        <el-option label="源历" value="源历"></el-option>
                        <el-option label="光曦年代" value="光曦年代"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="primary" @click="confirmEvent">
                        过滤
                    </el-button>
                    <el-button size="small" type="info" @click="closeEvent">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    formModelParams: {
        type: Object,
        default: () => {
            return {
                tag: "源历",
            }
        }
    },
});

const emit = defineEmits(['update:visible', 'updateParams']);

const { formModelParams } = toRefs(props);

const formModel = reactive({
    tag: '',
});

function openEvent() {
    Object.keys(formModel).forEach(key => {
        if (formModelParams.value[key]) {
            formModel[key] = formModelParams.value[key];
        }
    });
}

function closeEvent() {
    emit('update:visible', false);
}

function confirmEvent() {
    emit('updateParams', formModel);
    closeEvent();
}
</script>