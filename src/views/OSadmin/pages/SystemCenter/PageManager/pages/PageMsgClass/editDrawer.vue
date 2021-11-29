<template>
    <el-drawer v-model="visible" 
        :title="formModelParams._title || '编辑页面信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="130px" label-position="left">
            <el-form-item label="页面分类名称" prop="name">
                <el-input size="small" v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="页面一级父类" prop="lv1Name">
                <el-select size="small" placeholder="请选择" v-model="formModel.lv1Name" :disabled="formModelParams._action === 'modify'" clearable @change="lv1NameChange">
                    <el-option v-for="item in classLevel1" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面二级父类" prop="lv2Name">
                <el-select size="small" placeholder="请选择" v-model="formModel.lv2Name" :disabled="formModelParams._action === 'modify'" clearable @change="lv2NameChange">
                    <el-option v-for="item in classLevel2" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面三级父类">
                <el-select size="small" placeholder="请选择" v-model="formModel.lv3Name" :disabled="formModelParams._action === 'modify'" clearable>
                    <el-option v-for="item in classLevel3" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面分类备注">
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
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance, watch } from "vue";
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
    },
    classLevel1: {
        type: Array,
        default: () => [],
    }
});

const emit = defineEmits(['update:visible', 'updateTableData']);

const { proxy } = getCurrentInstance();

const { formModelParams, classLevel1 } = toRefs(props);

const userName = inject('userName');
const userPassword = inject('userPassword');

const editBtnLoading = ref(false);
const formModel = reactive({
    name: '',
    lv1Name: '',
    lv2Name: '',
    lv3Name: '',
    remarks: '',
});
const formModelRule = {
    name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
};
const classLevel2 = ref([]);
const classLevel3 = ref([]);
function clearFormModel() {
    Object.keys(formModel).forEach(key => {
        formModel[key] = '';
    });
    classLevel2.value = [];
    classLevel3.value = [];
}
function addFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            let level = 1;
            let parentId = -1;
            let parentPath = '';
            [formModel.lv1Name, formModel.lv2Name, formModel.lv3Name].forEach(el => {
                if (![null, undefined, ''].includes(el)) {
                    level += 1;
                    parentId = el;
                    parentPath += (el + '.');
                }
            });
            const { code, message } = await service.Add_webpageclass({
                userName: userName.value,
                userPassword: userPassword.value,
                name: formModel.name,
                level,
                parentId,
                parentPath,
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
            let level = 1;
            let parentId = -1;
            let parentPath = '';
            [formModel.lv1Name, formModel.lv2Name, formModel.lv3Name].forEach(el => {
                if (![null, undefined, ''].includes(el)) {
                    level += 1;
                    parentId = el;
                    parentPath += (el + '.');
                }
            });
            const { code, message } = await service.Modify_webpageclass({
                userName: userName.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                name: formModel.name,
                level,
                parentId,
                parentPath,
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
        if (formModelParams.value.path) {
            const pathIdList = formModelParams.value.path.split('.');
            if (pathIdList[0] && formModelParams.value.level > 1) {
                formModel.lv1Name = Number(pathIdList[0]);
                const lv1Find = classLevel1.value.find(el => el.id === formModel.lv1Name);
                if (lv1Find) {
                    classLevel2.value = lv1Find.children;
                }
            }
            if (pathIdList[1] && formModelParams.value.level > 2) {
                formModel.lv2Name = Number(pathIdList[1]);
                const lv2Find = classLevel2.value.find(el => el.id === formModel.lv2Name);
                if (lv2Find) {
                    classLevel3.value = lv2Find.children;
                }
            }
            if (pathIdList[2] && formModelParams.value.level > 3) {
                formModel.lv3Name = Number(pathIdList[2]);
            }
        }
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
}

function lv1NameChange(val) {
    formModel.lv2Name = '';
    formModel.lv3Name = '';
    classLevel2.value = [];
    classLevel3.value = [];

    const valFind = classLevel1.value.find(el => el.id === val);
    if (valFind) {
        classLevel2.value = valFind.children;
    }
}
function lv2NameChange(val) {
    formModel.lv3Name = '';
    classLevel3.value = [];
    
    const valFind = classLevel2.value.find(el => el.id === val);
    if (valFind) {
        classLevel3.value = valFind.children;
    }
}
</script>