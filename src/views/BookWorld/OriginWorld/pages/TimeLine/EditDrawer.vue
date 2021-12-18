<template>
    <div>
        <el-drawer direction="ltr" size="100%"
            :model-value="visible"
            :title="formModelParams._title || '编辑时间线信息'"
            @open="openEvent"
            @close="closeEvent"
        >
            <el-form ref="form" :model="formModel" :rules="formModelRule" label-width="70px" label-position="left">
                <el-form-item label="世界观" prop="world">
                    <el-select size="small" placeholder="请选择" popper-class="bw-originworld" v-model="formModel.world">
                        <el-option label="源星" value="源星"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="纪年" prop="tag">
                    <el-select size="small" placeholder="请选择" popper-class="bw-originworld" v-model="formModel.tag">
                        <el-option label="源历" value="源历"></el-option>
                        <el-option label="光曦年代" value="光曦年代"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="年" prop="year">
                    <el-input size="small" v-model="formModel.year"></el-input>
                </el-form-item>

                <el-form-item label="月" prop="month">
                    <el-input size="small" v-model="formModel.month"></el-input>
                </el-form-item>

                <el-form-item label="日" prop="day">
                    <el-input size="small" v-model="formModel.day"></el-input>
                </el-form-item>

                <el-form-item label="纪实">
                    <el-input type="textarea" :rows="10" size="small" v-model="formModel.intro"></el-input>
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
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject, toRefs, getCurrentInstance, watch } from "vue";
import { ElMessage } from 'element-plus';

import service from '../../components/OriginTimeLine/js/service';

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

const editBtnLoading = ref(false);
const isModify = ref(false);
const formModel = reactive({
    world: '源星',
    tag: '源历',
    year: '',
    month: '01',
    day: '01',
    intro: '',
    remarks: '',
});
const formModelRule = {
    world: [{ required: true, message: "请选择世界观", trigger: "blur" }],
    tag: [{ required: true, message: "请选择纪年", trigger: "blur" }],
    year: [{ required: true, message: "请填写年份", trigger: "blur" }],
};
function clearFormModel() {
    formModel.world = '源星';
    formModel.tag = '源历';
    formModel.year = '';
    formModel.month = '01';
    formModel.day = '01';
    formModel.intro = '';
    formModel.remarks = '';
    ['tag'].forEach(key => {
        if (formModelParams.value[key]) {
            formModel[key] = formModelParams.value[key];
        }
    });
}

function addFormModel() {
    if (userName.value !== '逝心海') {
        return ElMessage.error('暂无操作权限');
    }
    proxy.$refs.form.validate(async (valid) => {
        if (valid) {
            editBtnLoading.value = true;
            const { code, message } = await service.Add_timeline({
                userName: userName.value,
                userPassword: userPassword.value,
                world: formModel.world,
                tag: formModel.tag,
                year: formModel.year,
                month: formModel.month,
                day: formModel.day,
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
            const { code, message } = await service.Modify_timeline({
                userName: userName.value,
                userPassword: userPassword.value,
                _id: formModelParams.value._id,
                world: formModel.world,
                tag: formModel.tag,
                year: formModel.year,
                month: formModel.month,
                day: formModel.day,
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
        const { code, message } = await service.Delete_timeline({
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
    } else {
        ['tag'].forEach(key => {
            if (formModelParams.value[key]) {
                formModel[key] = formModelParams.value[key];
            }
        });
    }
}

function closeEvent() {
    clearFormModel();
    emit('update:visible', false);
    if (isModify.value) {
        emit('updateData');
    }
}

function closeDrawer() {
    emit('update:visible', false);
}
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    overflow: auto;
}
</style>