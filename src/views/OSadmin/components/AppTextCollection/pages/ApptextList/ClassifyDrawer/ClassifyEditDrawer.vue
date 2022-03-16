<template>
    <el-drawer direction="ltr" 
        :size="480"
        :model-value="visible"
        :title="formModelParams._title || '编辑文集分组信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="80px" label-position="left">
            <el-form-item label="分组名称" prop="name">
                <el-input size="small" v-model="formModel.name"></el-input>
            </el-form-item>

            <template v-if="formModelParams._action === 'add'">
                <el-form-item v-if="config.classifyType === 'Tree'" label="所属分组" prop="classify">
                    <el-cascader class="flex-item" size="small" placeholder="请选择"
                        v-model="formModel.classify"
                        :options="classifyTree" 
                        :props="formModelProps.classifyProps">
                    </el-cascader>
                </el-form-item>
            </template>

            <el-form-item label="简述">
                <el-input type="textarea" :rows="7" size="small" v-model="formModel.intro"></el-input>
            </el-form-item>

            <el-form-item label="备注">
                <el-input type="textarea" :rows="5" size="small" v-model="formModel.remarks"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button size="small" type="primary" :loading="editBtnLoading" @click="formModelParams._action === 'add' ? addFormModel() : modifyFormModel()">
                    立即{{ formModelParams._action === 'add'? '添加' : '修改' }}
                </el-button>
                <el-button v-if="formModelParams._action === 'modify'" size="small" type="danger" :loading="delBtnLoading" @click="deleteFormModel">
                    删除
                </el-button>
                <el-button size="small" type="info" @click="closeEvent">
                    取消
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance, watch, computed } from "vue";
import { ElMessage } from 'element-plus';

import service from '../../../js/service';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    appUuid: {
        type: String,
        default: '',
    },
    config: {
        type: Object,
        default: () => ({}),
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
    classifyTree: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:visible', 'updateData']);

const { proxy } = getCurrentInstance();

const { appUuid, config, formModelParams, classifyTree } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const formModel = reactive({
    name: '',
    classify: [],
    intro: '',
    remarks: '',
});
const formModelRule = {
    name: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
};
const formModelProps = {
    classifyProps: {
        checkStrictly: true,
        value: 'id',
        label: 'name'
    }
}
function clearFormModel() {
    formModel.name = '';
    formModel.classify = [];
    formModel.intro = '';
    formModel.remarks = '';
}

const editBtnLoading = ref(false);
function addFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            let level = 1;
            let parentId = -1;
            let parentPath = '';
            if (formModel.classify.length > 0) {
                level = formModel.classify.length + 1;
                parentId = formModel.classify[formModel.classify.length - 1];
                parentPath = formModel.classify.join('.');
            }
            const { code, message } = await service.Add_modelclassify({
                userId: userId.value,
                userPassword: userPassword.value,
                appUuid: appUuid.value,
                name: formModel.name,
                level,
                parentId,
                parentPath,
                intro: formModel.intro,
                remarks: formModel.remarks,
            }, module.value);
            editBtnLoading.value = false;
            if (code === 200) {
                emit('updateData');
                closeEvent();
                ElMessage.success(message);
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
            const { code, message } = await service.Modify_modelclassify({
                userId: userId.value,
                userPassword: userPassword.value,
                appUuid: appUuid.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                name: formModel.name,
                parentId: formModelParams.value.parentId,
                intro: formModel.intro,
                remarks: formModel.remarks,
            }, module.value);
            editBtnLoading.value = false;
            if (code === 200) {
                emit('updateData');
                closeEvent();
                ElMessage.success(message);
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}
const delBtnLoading = ref(false);
async function deleteFormModel(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        delBtnLoading.value = true;
        const { code, message } = await service.Delete_modelclassify({
            userId: userId.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
        }, module.value);
        delBtnLoading.value = false;
        if (code === 200) {
            emit('updateData', 'delete');
            ElMessage.success(message);
            closeEvent();
        }
    }
}

function openEvent() {
    if (formModelParams.value._action === 'modify') {
        formModel.name = formModelParams.value.name || '';
        formModel.intro = formModelParams.value.intro || '';
        formModel.remarks = formModelParams.value.remarks || '';
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
}
</script>
