<template>
    <div class="model-dialog">
        <el-dialog title="应用文集模板" :model-value="visible" @open="openEvent" @close="closeEvent">
            <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="150px" label-position="right">
                <el-form-item label="应用文集模板名称" prop="name">
                    <el-input size="small" v-model="formModel.name"></el-input>
                </el-form-item>

                <el-form-item label="模板英文名称" prop="nameEn">
                    <el-input size="small" v-model="formModel.nameEn"></el-input>
                </el-form-item>

                <el-form-item label="简述"> 
                    <el-input type="textarea" :rows="7" size="small" v-model="formModel.intro"></el-input>
                </el-form-item>

                <el-form-item label="分组展示形式" prop="classifyType">
                    <el-select size="small" :popper-class="storeProfilesgetter" placeholder="请选择" v-model="formModel.classifyType">
                        <el-option label="节点树" value="Tree"></el-option>
                        <el-option label="选择器" value="Select"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文集展示形式" prop="listType">
                    <el-select size="small" :popper-class="storeProfilesgetter" placeholder="请选择" v-model="formModel.listType">
                        <el-option label="表格" value="Table"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="文本格式" prop="contentType">
                    <el-select size="small" :popper-class="storeProfilesgetter" placeholder="请选择" v-model="formModel.contentType">
                        <el-option label="富文本" value="richText"></el-option>
                        <el-option label="MarkDown" value="md"></el-option>
                        <el-option label="纯文本" value="text"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button type="primary" :loading="editBtnLoading" @click="formModelParams._action === 'add' ? addFormModel() : modifyFormModel()">
                    立即{{ formModelParams._action === 'add'? '添加' : '修改' }}
                </el-button>
                <el-button v-if="formModelParams._action === 'modify'" type="danger" :loading="delBtnLoading" @click="deleteFormModel">
                    删除
                </el-button>
                <el-button type="info" @click="closeEvent">
                    取消
                </el-button>
            </template>
        </el-dialog>
    </div>
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

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const formModel = reactive({
    name: '',
    nameEn: '',
    intro: '',
    classifyType: 'Tree',
    listType: 'Table',
    contentType: 'richText',
});
const formModelRule = {
    name: [{ required: true, message: "请输入应用文集模板名称", trigger: "blur" }],
};
function clearFormModel() {
    formModel.name = '';
    formModel.nameEn = '';
    formModel.intro = '';
    formModel.classifyType = 'Tree';
    formModel.listType = 'Table';
    formModel.contentType = 'richText';
}

const editBtnLoading = ref(false);
function addFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            const { code, message } = await service.Add_apptextmodel({
                userId: userId.value,
                userPassword: userPassword.value,
                name: formModel.name,
                nameEn: formModel.nameEn,
                intro: formModel.intro,
                classifyType: formModel.classifyType,
                listType: formModel.listType,
                contentType: formModel.contentType,
            }, module.value);
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                emit('updateData', 'add');
                closeEvent();
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
            const { code, message } = await service.Modify_apptextmodel({
                userId: userId.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                uuid: formModelParams.value.uuid,
                name: formModel.name,
                nameEn: formModel.nameEn,
                intro: formModel.intro,
                classifyType: formModel.classifyType,
                listType: formModel.listType,
                contentType: formModel.contentType,
            }, module.value);
            editBtnLoading.value = false;
            if (code === 200) {
                ElMessage.success(message);
                emit('updateData', 'modify');
                closeEvent();
            }
            
        } else {
            console.log('error submit!!')
            return false
        }
    });
}

const delBtnLoading = ref(false);
async function deleteFormModel() {
    if (confirm("此操作不可逆，确认删除？")) {
        delBtnLoading.value = true;
        const { code, message } = await service.Delete_apptextmodel({
            userId: userId.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
            uuid: formModelParams.value.uuid
        }, module.value);
        delBtnLoading.value = false ;
        if (code === 200) {
            ElMessage.success(message);
            emit('updateData', 'delete');
            closeEvent();
        }
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
    emit('update:visible', false);
    clearFormModel();
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    width: 70%;
    min-width: 600px;
}

:deep(.el-form) {
    padding: 20px 50px 20px 20px;
}
</style>