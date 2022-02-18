<template>
    <el-drawer size="35%"
        :model-value="visible"
        :title="formModelParams._title || '编辑摘录信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="80px" label-position="left">
            <el-form-item label="分类" prop="classify">
                <!-- <el-input size="small" v-model="formModel.classify"></el-input> -->
                <el-select v-model="formModel.classify" :popper-class="storeProfilesgetter" size="small" placeholder="请选择类别">
                    <el-option label="短文" value="短文"></el-option>
                    <el-option label="段落" value="段落"></el-option>
                    <el-option label="箴言" value="箴言"></el-option>
                    <el-option label="诗文" value="诗文"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题" prop="title">
                <el-input size="small" v-model="formModel.title"></el-input>
            </el-form-item>

            <el-form-item label="作者">
                <el-input size="small" v-model="formModel.poet"></el-input>
            </el-form-item>

            <el-form-item label="内容">
                <el-input type="textarea" :rows="7" size="small" v-model="formModel.content"></el-input>
            </el-form-item>

            <el-form-item label="简记">
                <el-input type="textarea" :rows="7" size="small" v-model="formModel.intro"></el-input>
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
});

const emit = defineEmits(['update:visible', 'updateData']);

const { proxy } = getCurrentInstance();

const { formModelParams } = toRefs(props);

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const isModify = ref(false);
const formModel = reactive({
    title: '',
    poet: '',
    classify: '',
    content: '',
    intro: '',
});
const formModelRule = {
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
};
function clearFormModel() {
    formModel.title = '';
    formModel.poet = '';
    formModel.classify = '';
    formModel.content = '';
    formModel.intro = '';
}

function addFormModel() {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            const { code, message } = await service.Add_extract({
                userName: userName.value,
                userPassword: userPassword.value,
                title: formModel.title,
                poet: formModel.poet,
                classify: formModel.classify,
                content: formModel.content,
                intro: formModel.intro,
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
            const { code, message } = await service.Modify_extract({
                userName: userName.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                title: formModel.title,
                poet: formModel.poet,
                classify: formModel.classify,
                intro: formModel.intro,
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
        const { code, message } = await service.Delete_extract({
            userName: userName.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
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
        Object.keys(formModel).forEach(key => {
            if (formModelParams.value[key]) {
                formModel[key] = formModelParams.value[key];
            }
        });
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
