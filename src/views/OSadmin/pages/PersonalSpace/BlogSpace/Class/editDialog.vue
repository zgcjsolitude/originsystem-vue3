<template>
    <el-dialog v-model="visible" width="520px"
        :title="formModelParams._title || '编辑博文分组'"
        @open="openEvent"
        @close="closeEvent"
    >   
        <div class="OSA-form">
            <div class="form-input">
                <label for="newBlogClassValue">分组名称：</label>
                <el-input id="newBlogClassValue" size="small" v-model="formModel.Value" style="width: 80%"></el-input>
            </div>
        </div>

        <template #footer>  
            <el-button size="small" type="primary" :loading="editBtnLoading" @click="formModelParams._action == 'add' ? addBlogClass() : modifyBlogClass()">
                {{ formModelParams._action == 'add' ? '添加' : '修改' }}
            </el-button>
            <el-button size="small" @click="closeEvent">取 消</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, toRefs, inject } from 'vue';
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

const { formModelParams } = toRefs(props);

const userName = inject('userName');
const userPassword = inject('userPassword');

const editBtnLoading = ref(false);
const formModel = reactive({
    Value: "",
});
function clearFormModel() {
    Object.keys(formModel).forEach(key => {
        formModel[key] = '';
    });
}
async function addBlogClass() {
    if (!formModel.Value) {
        return
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Add_userblogclass({
        userName: userName.value,
        userPassword: userPassword.value,
        Value: formModel.Value,
    });
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        closeEvent();
        emit('updateTableData');
    }
}
async function modifyBlogClass() {
    if (!formModel.Value || !formModelParams.value._id) {
        return
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_userblogclass({
        userName: userName.value,
        userPassword: userPassword.value,
        id: formModelParams.value._id,
        Value: formModel.Value,
    });
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        closeEvent();
        emit('updateTableData');
    }
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


