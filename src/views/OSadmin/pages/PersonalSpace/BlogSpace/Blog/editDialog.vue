<template>
    <el-dialog v-model="visible" width="520px" title="修改博文信息"
        @open="openEvent"
        @close="closeEvent"
    >   
        <div class="OSA-form">
            <div class="form-input">
                <label for="newBlogSign">博文名称：</label>
                <el-input v-model="formModel.Name" size="small" readonly></el-input>
            </div>
            <div class="form-input">
                <label for="newBlogSign">博文分组：</label>
                <el-select placeholder="请选择类别" size="small" v-model="formModel.Class" :popper-class="storeProfilesgetter">
                    <el-option v-for="(item, i) in vuexBlogClassList" :key="i" :label="item.Value" :value="item.Value"></el-option>
                </el-select>
            </div>
            <div class="form-input is-top">
                <label for="newBlogSign">博文简介：</label>
                <el-input type="textarea" v-model="formModel.Intro" :rows="5"></el-input>
            </div>
        </div>

        <template #footer>  
            <el-button size="small" :loading="editBtnLoading" type="primary" @click="modifyBlog">确 定</el-button>
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
const vuexBlogClassList = computed(() => store.state.OsAdmin.vuexBlogClassList);
const userName = inject('userName');
const userPassword = inject('userPassword');
const storeProfilesgetter = inject('storeProfilesgetter');

const editBtnLoading = ref(false);
const formModel = reactive({
    Name: "",
    Class: "",
    Intro: "",
});
async function modifyBlog() {
    if (formModelParams.value._id) {
        return
    }
    editBtnLoading.value = true;
    const { code, message } = await service.Modify_userblog({
        userName: userName.value,
        userPassword: userPassword.value,
        id: formModelParams.value._id,
        Class: formModel.Class,
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
    Object.keys(formModel).forEach(key => {
        if (formModelParams.value[key]) {
            formModel[key] = formModelParams.value[key];
        }
    });
}

function closeEvent() {
    emit('update:visible', false);
}
</script>


