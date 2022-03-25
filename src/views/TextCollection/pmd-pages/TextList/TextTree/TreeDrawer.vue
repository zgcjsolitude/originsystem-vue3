<template>
    <el-drawer direction="rtl" size="100%"
        :model-value="visible"
        :title="formModelParams._title || '编辑文档信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="80px" label-position="left">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formModel.title"></el-input>
            </el-form-item>

            <template v-if="formModelParams._action === 'add'">
                <el-form-item label="所属父级">
                    <el-cascader class="flex-item" placeholder="请选择"
                        v-model="formModel.classify"
                        :options="treeData" 
                        :props="formModelProps.classifyProps">
                    </el-cascader>
                </el-form-item>
            </template>

            <el-form-item label="简述">
                <el-input type="textarea" :rows="7" v-model="formModel.intro"></el-input>
            </el-form-item>

            <el-form-item label="备注">
                <el-input type="textarea" :rows="5" v-model="formModel.remarks"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="editBtnLoading" @click="formModelParams._action === 'add' ? addFormModel() : modifyFormModel()">
                    立即{{ formModelParams._action === 'add'? '添加' : '修改' }}
                </el-button>
                <el-button v-if="formModelParams._action === 'modify'" type="danger" :loading="delBtnLoading" @click="deleteFormModel">
                    删除
                </el-button>
                <el-button type="info" @click="closeEvent">
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
    treeData: {
        type: Array,
        default: () => [],
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

const emit = defineEmits(['update:visible', 'updateData']);

const { proxy } = getCurrentInstance();

const { appUuid, formModelParams } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const formModel = reactive({
    title: '',
    classify: [],
    intro: '',
    remarks: '',
});
const formModelRule = {
    title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
}
const formModelProps = {
    classifyProps: {
        checkStrictly: true,
        value: 'id',
        label: 'title'
    }
}
function clearFormModel() {
    formModel.title = '';
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
            const { code, message } = await service.Add_modelarticletree({
                userId: userId.value,
                userPassword: userPassword.value,
                appUuid: appUuid.value,
                title: formModel.title,
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
            const { code, message } = await service.Modify_modelarticletree({
                userId: userId.value,
                userPassword: userPassword.value,
                appUuid: appUuid.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                title: formModel.title,
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
        const { code, message } = await service.Delete_modelarticletree({
            userId: userId.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
            id: formModelParams.value.id,
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
        formModel.title = formModelParams.value.title || '';
        formModel.classify = formModelParams.value.path ? formModelParams.value.path.split('.').map(el => Number(el)).pop() : [];
        formModel.intro = formModelParams.value.intro || '';
        formModel.remarks = formModelParams.value.remarks || '';
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
}
</script>

