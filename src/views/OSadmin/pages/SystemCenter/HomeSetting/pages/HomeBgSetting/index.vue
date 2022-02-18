<template>
    <div class="HomeBgSetting">
        <div class="card-container osa-card-board">
            <div class="osa-card-title d-flex">
                <span>首页背景图配置 建议4张</span>
                <el-button class="ml-auto" size="small" type="primary" :loading="uploadLoading" @click="addHomeIndexBgPic">确认上传</el-button>
            </div>
            <div class="card-content">
                <div v-if="bgImgList.length" class="card-content-imglist">
                   <img v-for="(img, i) in bgImgList" :key="i" :src="img.allUrl" alt @contextmenu.prevent="(event) => clickRightEvent(event, img)" />
                </div>
               <div v-else class="card-content-imglist">
                   <img v-for="i in 4" :key="i" src="/img/OSadmin/header.png" alt />
                </div> 
                <el-upload class="card-content-upload"
                    ref="upload"
                    list-type="picture-card"
                    action
                    :auto-upload="false"
                    :multiple="false"
                    :limit="1"
                    :on-change="uploadChange"
                    :on-remove="uploadRemove"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>

        <cjui-mouse-box :event="rightEvent">
            <div class="rightMenu_img">
                <p class="rightMenu_i_header">图片：{{ imgParams.name }}</p>
                <div class="rightMenu_i_body">
                    <p @click="deleteHomeIndexBgPic">删 除 图 片</p>
                </div>
            </div>
        </cjui-mouse-box>
    </div>
</template>

<script setup>
import { ref, inject, nextTick, onMounted, reactive } from "vue";
import { ElMessage } from 'element-plus';
import $ from "jquery";

import { OsBaseUrl, OsBaseUrlApi } from '@/assets/js/data-dictionary';
import service from '../../js/service';

const userName = inject('userName');
const userPassword = inject('userPassword');

const bgImgList = ref([]);
async function getHomeIndexBgPicList() {
    const data = await service.Return_homeindexbgimglist();
    bgImgList.value = data.map(el => {
        return {
            ...el,
            allUrl: OsBaseUrl + el.url,
        }
    });
}

const upload = ref(null);

let fileTemp = null;
function uploadChange(file) {
    fileTemp = file.raw;
    if (fileTemp?.size) {
        const isAllowSize = fileTemp.size / 1024 / 1024 < 10;
        if (!isAllowSize) {
            fileTemp = null;
            ElMessage.warning('图片大小不能超过10MB');
            upload.value.clearFiles();
        }
    }
}
function uploadRemove() {
    fileTemp = null;
    nextTick(() => {
        upload.value.uploadFiles = [];
    });
}

const uploadLoading = ref(false);
function addHomeIndexBgPic() {
    if (uploadLoading.value) return;
    uploadLoading.value = true;

    let formfile = new FormData();
    formfile.append("file", fileTemp);
    formfile.append("userName", userName.value);
    formfile.append("userPassword", userPassword.value);

    $.ajax({
        url: OsBaseUrlApi + "/system/imgurlsetting/homeindexbgimg/upload",
        data: formfile,
        type: "post",
        dataType: "json",
        async: false,
        cache: false, //上传文件无需缓存
        processData: false, //用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: (result) => {
            uploadLoading.value = false;
            if (result.code == 200) {
                ElMessage.success(result.message);
                uploadRemove();
                getHomeIndexBgPicList();
            } else {
                ElMessage.error(result.message);
            }
        },
        error: (xhr) => {
            uploadLoading.value = false;
        },
    });
}

const imgParams = reactive({
    _id: '',
    name: '',
    url: ''
});
const rightEvent = ref({});
function clickRightEvent(e, img) {
    rightEvent.value = e;
    imgParams._id = img._id;
    imgParams.url = img.url;
    imgParams.name = img.name;
}
async function deleteHomeIndexBgPic() {
    const { code } = await service.Delete_homeindexbgimg({
        userName: userName.value,
        userPassword: userPassword.value,
        _id: imgParams._id,
        url: imgParams.url
    });
    if (code === 200) {
        getHomeIndexBgPicList();
    }
}

onMounted(() => {
    getHomeIndexBgPicList();
});
</script>

<style lang="scss" scoped>
.card-content {
    display: flex;
    margin-bottom: 10px;
    height: 160px;
}
.card-content-imglist {
    flex: 1;
    height: 160px;
    display: flex;

    img {
        height: 100%;
        margin-right: 10px;
    }
}
.card-content-upload {
    width: 330px;

    :deep(.el-upload),
    :deep(.el-upload-list__item) {
        width: 160px;
        height: 160px;
        line-height: 160px;
    }
    :deep(.el-upload--picture-card i) {
        font-size: 42px;
    }
}

// cjui-mouse-box
.cjui-mouse-box {
    padding: 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    min-width: 160px;
}
.rightMenu_img {
    color: #eee;

    p {
        margin-bottom: 0;
    }
}
.rightMenu_i_header {
    padding: 10px 15px;
    border-bottom: 1px solid #000;
    font-weight: 600;
    font-size: 17px;
}
.rightMenu_i_body {
    p {
        padding: 0.5em 20px;
        cursor: pointer;
    }
    p:hover {
        background: rgba(0, 0, 0, 0.5);
    }
}
</style>