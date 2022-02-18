<template>
    <el-drawer size="35%"
        :model-value="visible"
        :title="formModelParams._title || '编辑章节信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="80px" label-position="left">
            <el-form-item label="章节标题" prop="title">
                <el-input size="small" v-model="formModel.title"></el-input>
            </el-form-item>

            <el-form-item label="章节分组" prop="classify">
                <el-cascader class="flex-item" size="small" placeholder="请选择"
                    v-model="formModel.classify"
                    :options="bookclassTree" 
                    :props="formModelProps.classifyProps">
                </el-cascader>
            </el-form-item>

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
                <el-button v-if="formModelParams._action === 'modify'" size="small" type="danger" @click="deleteFormModel">
                    删除
                </el-button>
                <el-button size="small" type="info" @click="closeDrawer">
                    取消
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance, watch, computed } from "vue";
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
    bookclassTree: {
        type: Array,
        default: () => [],
    }
});

const emit = defineEmits(['update:visible', 'updateData']);

const { proxy } = getCurrentInstance();

const { formModelParams, bookclassTree } = toRefs(props);

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const isModify = ref(false);
const formModel = reactive({
    title: '',
    classify: [],
    intro: '',
    remarks: '',
});
const formModelRule = {
    title: [{ required: true, message: "请输入章节标题", trigger: "blur" }],
};
const formModelProps = {
    classifyProps: {
        checkStrictly: true,
        value: 'id',
        label: 'name'
    }
}
function clearFormModel() {
    formModel.title = '';
    formModel.classify = [],
    formModel.intro = '';
    formModel.remarks = '';
}

function addFormModel() {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            let classifyId = -1;
            let classifyPath = '';
            if (formModel.classify.length > 0) {
                classifyId = formModel.classify[formModel.classify.length - 1];
                classifyPath = formModel.classify.join('.');
            }
            const { code, message } = await service.Add_article({
                userName: userName.value,
                userPassword: userPassword.value,
                title: formModel.title,
                classifyId,
                classifyPath,
                intro: formModel.intro,
                remarks: formModel.remarks,
            });
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                isModify.value = true;
                clearFormModel();
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}
function modifyFormModel() {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            let classifyId = -1;
            let classifyPath = '';
            if (formModel.classify.length > 0) {
                classifyId = formModel.classify[formModel.classify.length - 1];
                classifyPath = formModel.classify.join('.');
            }
            const { code, message } = await service.Modify_article({
                userName: userName.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                title: formModel.title,
                classifyId,
                classifyPath,
                intro: formModel.intro,
                remarks: formModel.remarks,
            });
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                isModify.value = true;
                closeDrawer();
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}
async function deleteFormModel(row) {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_article({
            userName: userName.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
            id: formModelParams.value.id,
        });
        if (code === 200) {
            ElMessage.success(message);
            isModify.value = true;
            closeDrawer();
        }
    }
}

function openEvent() {
    isModify.value = false;
    if (formModelParams.value._action === 'modify') {
        formModel.title = formModelParams.value.title || '';
        formModel.classify = formModelParams.value.classifyPath ? formModelParams.value.classifyPath.split('.').map(el => Number(el)) : [],
        formModel.intro = formModelParams.value.intro || '';
        formModel.remarks = formModelParams.value.remarks || '';
    }
}

function closeEvent() {
    emit('update:visible', false);
    clearFormModel();
    if (isModify.value) {
        emit('updateData');
    }
}

function closeDrawer() {
    emit('update:visible', false);
}
</script>
