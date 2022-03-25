<template>
    <el-drawer size="35%"
        :model-value="visible"
        :title="formModelParams._title || '编辑文章信息'"
        @open="openEvent"
        @close="closeEvent"
    >
        <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="80px" label-position="left">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formModel.title"></el-input>
            </el-form-item>

            <template v-if="config.classifyType === 'Tree'">
                <el-form-item label="文章分组" prop="classify">
                    <el-cascader class="flex-item" placeholder="请选择"
                        v-model="formModel.classify"
                        :options="classifyTree" 
                        :props="formModelProps.classifyProps">
                    </el-cascader>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="文章分组" prop="classifyPath">
                    <el-select v-model="formModel.classifyPath" :popper-class="storeProfilesgetter" placeholder="请选择类别">
                        <el-option v-for="item in classifyTable" :key="item.name" :label="item.name" :value="item.path"></el-option>
                    </el-select>
                </el-form-item>
            </template>


            <el-form-item v-if="formModelParams._action === 'add'" label="文章格式" prop="textType">
                <el-select :popper-class="storeProfilesgetter" placeholder="请选择" v-model="formModel.textType">
                    <el-option label="富文本" value="richText"></el-option>
                    <el-option label="MarkDown" value="md"></el-option>
                    <el-option label="纯文本" value="text"></el-option>
                </el-select>
            </el-form-item>

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
                <el-button v-if="formModelParams._action === 'modify'" type="danger" @click="deleteFormModel">
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
    classifyTable: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:visible', 'updateData']);

const { proxy } = getCurrentInstance();

const { appUuid, config, formModelParams, classifyTable } = toRefs(props);

const module = inject('module');
const userId = inject('userId');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const formModel = reactive({
    title: '',
    textType: '',
    classify: [],
    classifyPath: '',
    intro: '',
    remarks: '',
});
const formModelRule = {
    title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
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
    formModel.classify = [];
    formModel.classifyPath = '';
    formModel.intro = '';
    formModel.remarks = '';
}

function addFormModel() {
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            let classifyId = -1;
            let classifyPath = '';
            if (config.value.classifyType === 'Tree' && formModel.classify.length > 0) {
                classifyId = formModel.classify[formModel.classify.length - 1];
                classifyPath = formModel.classify.join('.');
            } else if (config.value.classifyType === 'Select') {
                const classifyFind = classifyTable.value.find(el => el.path === formModel.classifyPath);
                classifyId = classifyFind.id;
                classifyPath = classifyFind.path;
            }
            const { code, message } = await service.Add_modelarticle({
                userId: userId.value,
                userPassword: userPassword.value,
                appUuid: appUuid.value,
                title: formModel.title,
                classifyId,
                classifyPath,
                textType: formModel.textType,
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
            let classifyId = -1;
            let classifyPath = '';
            if (config.value.classifyType === 'Tree' && formModel.classify.length > 0) {
                classifyId = formModel.classify[formModel.classify.length - 1];
                classifyPath = formModel.classify.join('.');
            } else if (config.value.classifyType === 'Select') {
                const classifyFind = classifyTable.find(el => el.path === formModel.classifyPath);
                classifyId = classifyFind.id;
                classifyPath = classifyFind.path;
            }
            const { code, message } = await service.Modify_modelarticle({
                userId: userId.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                id: formModelParams.value.id,
                title: formModel.title,
                classifyId,
                classifyPath,
                // textType: formModel.textType,
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
async function deleteFormModel(row) {
    if (confirm("此操作不可逆，确认删除？")) {
        const { code, message } = await service.Delete_modelarticle({
            userId: userId.value,
            userPassword: userPassword.value,
            _id: formModelParams.value._id,
        }, module.value);
        if (code === 200) {
            emit('updateData');
            closeEvent();
            ElMessage.success(message);
        }
    }
}

function openEvent() {
    formModel.textType = config.value.contentType;
    if (formModelParams.value._action === 'modify') {
        formModel.title = formModelParams.value.title || '';
        formModel.classify = formModelParams.value.classifyPath ? formModelParams.value.classifyPath.split('.').map(el => Number(el)) : [];
        formModel.classifyPath = formModelParams.value.classifyPath || '';
        formModel.intro = formModelParams.value.intro || '';
        formModel.remarks = formModelParams.value.remarks || '';
    }
}

function closeEvent() {
    emit('update:visible', false);
    clearFormModel();
}
</script>
