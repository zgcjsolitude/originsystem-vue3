<template>
    <el-drawer v-model="visible" 
        :title="formModelParams._title || '分组信息标识'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="130px" label-position="left">
            <el-form-item label="系统信息标识" prop="Sign">
                <el-input size="small" v-model="formModel.Sign"></el-input>
            </el-form-item>
            <el-form-item label="系统信息标识值" prop="Value">
                <el-input size="small" v-model="formModel.Value"></el-input>
            </el-form-item>
            <el-form-item label="系统信息标识说明" prop="Content">
                <el-input size="small" v-model="formModel.Content"></el-input>
            </el-form-item>
            <el-form-item label="系统信息标识介绍">
                <el-input type="textarea" :rows="3" size="small" v-model="formModel.Beizhu"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="editBtnLoading" @click="formModelParams._action === 'add' ? addFormModel() : modifyFormModel()">
                    立即{{ formModelParams._action === 'add'? '添加' : '修改' }}
                </el-button>
                <el-button type="info" @click="closeEvent">
                    取消
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus';

import service from '../js/service';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    formModelParams: {
        type: Object,
        default: () => {
            return {
                _action: "",
                _title: "",
            }
        }
    }
});

const emit = defineEmits(['update:visible', 'updateTableData']);

const { proxy } = getCurrentInstance();

const { formModelParams } = toRefs(props);

const userName = inject('userName');
const userPassword = inject('userPassword');

const editBtnLoading = ref(false);
const formModel = reactive({
    Sign: "",
    Value: "",
    Content: "",
    Beizhu: "",
});
const formModelRule = {
    Sign: [{ required: true, message: "请输入标识", trigger: "blur" }],
    Value: [{ required: true, message: "请输入标识值", trigger: "blur" }],
    Content: [{ required: true, message: "请输入标识说明", trigger: "blur" }],
};
function clearFormModel() {
    Object.keys(formModel).forEach(key => {
        formModel[key] = '';
    });
}
function addFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            const { code, message } = await service.Add_systemmsg({
                userName: userName.value,
                userPassword: userPassword.value,
                Sign: formModel.Sign,
                Value: formModel.Value,
                Content: formModel.Content,
                Beizhu: formModel.Beizhu,
            });
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                emit('updateTableData');
                clearFormModel();
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}
function modifyFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            const { code, message } = await service.Modify_systemmsg({
                userName: userName.value,
                userPassword: userPassword.value,
                id: formModelParams.value._id,
                Sign: formModel.Sign,
                Value: formModel.Value,
                Content: formModel.Content,
                Beizhu: formModel.Beizhu,
            });
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                emit('updateTableData');
                closeEvent();
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}

function openEvent() {
    if (formModelParams.value._action === 'modify') {
        Object.keys(formModel).forEach(key => {
            if (formModelParams.value[key]) {
                formModel[key] = formModelParams.value[key];
            }
        });
    } else {
        if (formModelParams.value.Sign) {
            formModel.Sign = formModelParams.value.Sign;
        }
    }
}

function closeEvent() {
    clearFormModel();
    proxy.$refs.form.resetFields();
    emit('update:visible', false);
}
</script>