<template>
    <el-dialog v-model="visible" width="520px"
        :title="formModelParams._title || '编辑分组信息标识'"
        @open="openEvent"
        @close="closeEvent"
    >   
        <div class="OSA-form">
            <div class="form-input">
                <label for="newUserMsgSign">信息标识：</label>
                <el-input id="newUserMsgSign" size="small" v-model="formModel.Sign"></el-input>
            </div>
            <div class="form-input">
                <label for="newUserMsgValue">标识值：</label>
                <el-input id="newUserMsgValue" size="small" v-model="formModel.Value"></el-input>
            </div>
            <div class="form-input">
                <label for="newUserMsgContent">标识说明：</label>
                <el-input id="newUserMsgContent" size="small" v-model="formModel.Content"></el-input>
            </div>
            <div class="form-input is-top">
                <label for="newUserMsgContent">标识介绍：</label>
                <el-input id="newUserMsgContent" type="textarea" :rows="3" size="small" v-model="formModel.Beizhu"></el-input>
            </div>
        </div>

        <template #footer>  
            <el-button size="small" type="primary" :loading="editBtnLoading" @click="formModelParams._action == 'add' ? addFormModel() : modifyFormModel()">
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
    Sign: "",
    Value: "",
    Content: "",
    Beizhu: "",
});
function clearFormModel() {
    Object.keys(formModel).forEach(key => {
        formModel[key] = '';
    });
}
async function addFormModel() {
    if (!formModel.Sign) {
        return ElMessage.warning("请添加标识");
    }
    if (!formModel.Value) {
        return ElMessage.warning("请添加标识值");
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Add_usermsg({
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
        closeEvent();
        emit('updateTableData');
    }
}
async function modifyFormModel() {
    if (!formModel.Value || !formModelParams.value._id) {
        return
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_usermsg({
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
    } else {
        if (formModelParams.value.Sign) {
            formModel.Sign = formModelParams.value.Sign;
        }
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
}
</script>


