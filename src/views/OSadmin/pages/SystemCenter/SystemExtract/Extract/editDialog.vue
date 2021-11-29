<template>
    <el-dialog v-model="visible" width="520px"
        :title="formModelParams._title || '编辑摘录信息'"
        @open="openEvent"
        @close="closeEvent"
    >   
        <div class="OSA-form">
            <div class="form-input">
                <label for="newExtractSign">摘录分组：</label>
                <el-select v-model="formModel.Sign" :popper-class="storeProfilesgetter" size="small" placeholder="请选择类别">
                    <el-option v-for="(item, i) in vuexSystemExtractTypeList" :key="i" :label="item.Value" :value="item.Value"></el-option>
                </el-select>
            </div>
            <div class="form-input">
                <label for="newExtractPoet">摘录作者：</label>
                <el-input id="newExtractPoet" size="small" v-model="formModel.Poet" style="width: 80%"></el-input>
            </div>
            <div class="form-input">
                <label for="newExtractTitle">摘录标题：</label>
                <el-input id="newExtractTitle" size="small" v-model="formModel.Title" style="width: 80%"></el-input>
            </div>
            <div class="form-input is-top">
                <label for="newExtractContent">摘录内容：</label>
                <el-input id="newExtractContent" size="small" type="textarea" :rows="5" v-model="formModel.Content" style="width: 80%;"></el-input>
            </div>
            <div class="form-input is-top">
                <label for="newExtractContent">摘录简介：</label>
                <el-input id="newExtractContent" size="small" type="textarea" :rows="3" v-model="formModel.Intro" style="width: 80%;"></el-input>
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
import { ref, reactive, toRefs, inject, computed } from 'vue';
import { useStore } from "vuex";
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

const store = useStore();
const vuexSystemExtractTypeList = computed(() => store.state.OsAdmin.vuexSystemExtractTypeList);

const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const formModel = reactive({
    Poet: "佚名",
    Title: "无",
    Content: "",
    Sign: "",
    Intro: "暂无",
});
function clearFormModel() {
    formModel.Poet = "佚名";
    formModel.Title = "无";
    formModel.Content = "";
    formModel.Sign = "";
    formModel.Intro = "暂无";
}
async function addFormModel() {
    if (!formModel.Sign) {
        return ElMessage.warning("请建立分组");
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Add_systemextract({
        userName: userName.value,
        userPassword: userPassword.value,
        Sign: formModel.Sign,
        Poet: formModel.Poet,
        Title: formModel.Title,
        Content: formModel.Content,
        Intro: formModel.Intro,
    });
    editBtnLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        clearFormModel();
        emit('updateTableData');
    }
}
async function modifyFormModel() {
    if (!formModel.Sign || !formModelParams.value._id) {
        return
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_systemextract({
        userName: userName.value,
        userPassword: userPassword.value,
        id: formModelParams.value._id,
        Sign: formModel.Sign,
        Poet: formModel.Poet,
        Title: formModel.Title,
        Content: formModel.Content,
        Intro: formModel.Intro,
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


