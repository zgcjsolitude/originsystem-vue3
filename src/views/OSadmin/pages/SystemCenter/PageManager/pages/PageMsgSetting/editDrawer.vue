<template>
    <el-drawer v-model="visible" 
        :title="formModelParams._title || '编辑页面信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="130px" label-position="left">
            <el-form-item label="页面名称" prop="name">
                <el-input size="small" v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="页面路由" prop="path">
                <el-input size="small" v-model="formModel.path"></el-input>
            </el-form-item>
            <el-form-item label="页面一级分类" prop="lv1Name">
                <el-input size="small" v-model="formModel.lv1Name"></el-input>
            </el-form-item>
            <el-form-item label="页面二级分类" prop="lv2Name">
                <el-input size="small" v-model="formModel.lv2Name"></el-input>
            </el-form-item>
            <el-form-item label="页面三级分类">
                <el-input size="small" v-model="formModel.lv3Name"></el-input>
            </el-form-item>
            <el-form-item label="页面四级分类">
                <el-input size="small" v-model="formModel.lv4Name"></el-input>
            </el-form-item>
            <el-form-item label="页面备注">
                <el-input type="textarea" :rows="3" size="small" v-model="formModel.remarks"></el-input>
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

import service from '../../js/service';

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
    name: '',
    path: '',
    lv1Name: '',
    lv2Name: '',
    lv3Name: '',
    lv4Name: '',
    remarks: '',
});
const formModelRule = {
    name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
    path: [{ required: true, message: "请输入页面路由", trigger: "blur" }],
    lv1Name: [{ required: true, message: "请输入页面一级分类", trigger: "blur" }],
    lv2Name: [{ required: true, message: "请输入页面二级分类", trigger: "blur" }],
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
            const { code, message } = await service.Add_webpagemsg({
                userName: userName.value,
                userPassword: userPassword.value,
                name: formModel.name,
                path: formModel.path,
                lv1Name: formModel.lv1Name,
                lv2Name: formModel.lv2Name,
                lv3Name: formModel.lv3Name,
                lv4Name: formModel.lv4Name,
                remarks: formModel.remarks,
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
            const { code, message } = await service.Modify_webpagemsg({
                userName: userName.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                name: formModel.name,
                path: formModel.path,
                lv1Name: formModel.lv1Name,
                lv2Name: formModel.lv2Name,
                lv3Name: formModel.lv3Name,
                lv4Name: formModel.lv4Name,
                remarks: formModel.remarks,
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
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
}
</script>