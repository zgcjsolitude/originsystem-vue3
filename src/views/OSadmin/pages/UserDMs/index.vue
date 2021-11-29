<template>
	<div class="UserDMsIndex DMsIndex">
		<el-row class="DMs-header">
            <el-col :span="5" :xs="24" class="DMs-header-left">
                <i class="el-icon-s-fold"></i>
                <i class="el-icon-s-home" @click="backRoot"></i>
                <i class="el-icon-refresh" @click="refreshEvent"></i>
                <i class="el-icon-back" @click="backEvent"></i>
                <i class="el-icon-right"></i>
            </el-col>
            <el-col :span="14" :xs="0" class="DMs-header-center">
                <el-select v-model="searchUrl" placeholder="This DMs" 
                    filterable 
                    allow-create 
                    default-first-option
                    :popper-class="vuexProfilesgetter"
                    @keyup.enter="searchUrlEvent"
                    >
                    <el-option v-for="item in searchUrlHistory" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5" :xs="0" class="DMs-header-right">
                <el-input v-model="searchString" suffix-icon="el-icon-search" @keyup.enter="searchStringEvent"></el-input>
            </el-col>
		</el-row>

        <el-row class="DMs-body">
            <el-col :span="5" :xs="0" class="DMs-body-left">
				<el-menu default-active="1" :default-openeds='["1", "2"]'>
        		  	<el-submenu index="1">
        		  	  	<template #title>
        		  	  	  	<i class="el-icon-s-help"></i>
        		  	  	  	<span>快速访问</span>
        		  	  	</template>
        		  	  	<el-menu-item index="1-1" @click="backRoot">根目录</el-menu-item>
        		  	  	<el-menu-item index="1-2" @click="quickSearch('suffix', ['.jpg', '.png', '.jpeg', '.pdf'])">图片</el-menu-item>
        		  	  	<el-menu-item index="1-3" @click="quickSearch('suffix', ['.doc', '.txt', '.xls', '.xlsx', '.docx', '.potx'])">文档</el-menu-item>
        		  	  	<el-menu-item index="1-4" @click="quickSearch('suffix', ['.mp3'])">音频</el-menu-item>
        		  	</el-submenu>
        		  	<el-submenu index="2">
        		  	  	<template #title>
        		  	  	  	<i class="el-icon-menu"></i>
        		  	  	  	<span>当前目录</span>
        		  	  	</template>
        		  	  	<el-menu-item v-for="(item, i) in folderList" :key="i" :index="'2-1-' + i" @click="enterFolder(item)">{{ item.Name }}</el-menu-item>
        		  	</el-submenu>
        		</el-menu>
            </el-col>
            <el-col :span="19" :xs="24" class="DMs-body-right">
                <div class="DMs-file-list">
         			<div v-for="(item, i) in folderList" :key="i"
         			  	@dblclick="enterFolder(item)"
         			  	@contextmenu.prevent="(event) => openRightMenu(event, item, 'folder')"
						>
         			  	<img src="../../../../assets/img/fileicons/folder_green.png" alt />
         			  	<p class="is-title">{{ item.Name }}</p>
         			</div>
          			<div v-for="(item, i) in fileList" :key="i"
          			  	@contextmenu.prevent="(event) => openRightMenu(event, item, 'file')"
          				>
          			  	<img v-if="item.suffix === '.txt'" src="../../../../assets/img/fileicons/txt_icon.png" />
          			  	<img v-else-if="item.suffix == '.png'" src="../../../../assets/img/fileicons/png_red.png" />
          			  	<img v-else-if="['.jpg', '.jpeg'].includes(item.suffix)" src="../../../../assets/img/fileicons/jpg_red.png" />
          			  	<img v-else-if="['.xls', '.xlsx'].includes(item.suffix)" src="../../../../assets/img/fileicons/excel_green.png" />
          			  	<img v-else-if="['.doc', '.docx'].includes(item.suffix)" src="../../../../assets/img/fileicons/doc_blue.png" />
          			  	<img v-else-if="item.suffix == '.potx'" src="../../../../assets/img/fileicons/ppt_red.png"	/>
          			  	<img v-else-if="item.suffix == '.pdf'" src="../../../../assets/img/fileicons/pdf_red.png" />
          			  	<img v-else-if="item.suffix == '.mp3'" src="../../../../assets/img/fileicons/music.png" />
          			  	<img v-else-if="item.suffix == '.md'" src="../../../../assets/img/fileicons/md_blue.png" />
          			  	<img v-else src="../../../../assets/img/fileicons/document.png" />
          			  	<p>{{ item.Name }}</p>
          			</div>
                    <div class="add-new-folder" @click="openFolderInput">
                        <i class="el-icon-folder-add"></i>
                        <p v-if="!folderInputShow">新建文件夹</p>
                        <el-input v-else ref="newFloderInput" v-model="newFolderName"
                            :popper-class="themeClass"
                            @blur="folderInputShow = false;newFolderName = '';"
                            @keyup.enter="addFolder">
                        </el-input>
                    </div>
                    <div class="upload-new-file">
                      <el-upload class="upload-demo"
                            :action="actionUrl"
                            :data="fileMsg"
                            :before-upload="beforeUpload"
                            :on-success="uploadSuccess"
                            >
                            <i class="el-icon-upload"></i>
                            <p>上传文件</p>
                      </el-upload>
                    </div>
                </div>
            </el-col>
		</el-row>
		
    	<cjui-mouse-box class="rightMenu_box" :event="rightEvent">
    	 	<div v-if="rightSign === 'folder'">
				<p @click="modifyFolder">重命名</p>
				<p @click="deleteFolder">删除</p>
    	 	</div>
    	  	<div v-else>
    	  	  	<a :href="apiBaseUrl + rightRow.url" target="blank" download>
    	  	  	  	<p>查看</p>
    	  	  	</a>
    	  	  	<p @click="openFileMsg">设置</p>
    	  	  	<p>重命名</p>
    	  	  	<p @click="deleteFile">删除</p>
    	  	</div>
    	</cjui-mouse-box>
	</div>
</template>

<script>
import API from '../../js/interface.js';
import { useStore } from "vuex";
import { nextTick, ref, computed, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ApiBaseUrl } from '@/assets/js/data-dictionary';

export default {
  	name: "UserDMsIndex",
    setup(props, context) {
		const store = useStore();
		const vuexProfilesgetter = computed(() => store.getters['OsAdmin/vuexProfilesgetter']);
		const vuexBlogClassList = computed(() => store.state.OsAdmin.vuexBlogClassList);
		const userName = computed(() => store.state.userName);
		const userEmail = computed(() => store.state.userEmail);
		const userPassword = computed(() => store.state.userPassword);
		const userAuthority = computed(() => store.state.userAuthority);

		const dataLoading = ref(false);
		const urlNow = ref('/');
        const searchUrl = ref('/');
        const searchUrlHistory = ref([]);
		const folderList = ref([]);
		const fileList = ref([]);
		async function  getFolderFileList() {
            dataLoading.value = true;
	        const { data1, data2 } = await API._Return_userfolderlist({
        		userName: userName.value,
       			userPassword: userPassword.value,
       			sign: "parent",
       			folderurl: urlNow.value,
            });
            dataLoading.value = false;
            folderList.value = data1;
            fileList.value = data2;
    	}
		function backRoot() {
			if (dataLoading.value) {
				return
			}
			urlNow.value = '/';
			searchUrl.value = '/';
			getFolderFileList();
		}
		function refreshEvent() {
			if (dataLoading.value) {
				return
			}
			getFolderFileList();
		}
		function backEvent() {
			if (dataLoading.value || urlNow.value === '/') {
				return
			}
			const index = urlNow.value.lastIndexOf("/", urlNow.value.length - 2);
        	urlNow.value = urlNow.value.substring(0, index + 1);
			searchUrl.value = urlNow.value;
			getFolderFileList();
		}
        async function searchUrlEvent() {
			if (dataLoading.value) {
				return
			}

			if (searchUrl.value == "/") {
        	  	urlNow.value = searchUrl.value;
				getFolderFileList();
        	  	return;
        	}

            dataLoading.value = true;
	        const { code, data1, data2 } = await API._Return_userfolderlist({
        		userName: userName.value,
       			userPassword: userPassword.value,
       			sign: "child",
       			folderurl: searchUrl.value,
            }, true);
            dataLoading.value = false;
			if (code === 200) {
              	urlNow.value = searchUrl.value;
			} else {
				searchUrl.value = urlNow.value;
			}
            folderList.value = data1;
            fileList.value = data2;
        }
		async function quickSearch(sign, value) {
			if (dataLoading.value) {
				return
			}

            dataLoading.value = true;
	        const { data2 } = await API._Return_userfolderlist({
        		userName: userName.value,
       			userPassword: userPassword.value,
          		sign: sign,
       			folderurl: value,
            }, true);
            dataLoading.value = false;
            folderList.value = [];
            fileList.value = data2;
		}

        const searchString = ref('');
        function searchStringEvent() {
        }

		const modifyFolderDialog = ref(false);
		function enterFolder(item) {
			if (dataLoading.value) {
				return
			}
			urlNow.value = item.Child;
			searchUrl.value = urlNow.value;
			getFolderFileList();
   		}
		function modifyFolder() {
      		modifyFolderDialog.value = true;
    	}

        // 打开新文件夹输入框
        const folderInputShow = ref(false);
        const newFloderInput = ref(null);
        const newFolderName = ref('');
        function openFolderInput() {
            folderInputShow.value = true;
            nextTick(() => {
                newFloderInput.value.$el.querySelector("input").focus();
            });
        }
        async function addFolder() {
			if (newFolderName.Value === "") {
				return ElMessage.warning('请输入文件夹名称');
			}
			folderInputShow.value = false;
            const { code, message } = await API._Add_userfolder({
        		userName: userName.value,
        		userPassword: userPassword.value,
        		userEmail: userEmail.value,
        		ParentFolder: urlNow.value,
        		FolderName: newFolderName.value,
            });
            if (code === 200) {
                getFolderFileList();
                return
            }
            ElMessage.warning(message);
		}

		const actionUrl = ApiBaseUrl + "/userfile/blogupload";
		const fileMsg = reactive({
			userName: userName.value,
        	userEmail: userEmail.value,
        	userPassword: userPassword.value,
        	sign: "",
        	folderurl: "/",
		})
    	function beforeUpload() {
    	  	fileMsg.folderurl = urlNow.value;
    	}
    	function uploadSuccess(res) {
    	 	if (res.code != 200) {
				return ElMessage.error(res.message);
    	 	}
			getFolderFileList();
    	}
		
		let rightEvent = ref({});
		let rightRow = ref({});
        const rightSign = ref('');
		const rightMenu = ref(false);
    	function openRightMenu(event, item, sign) {
    	  	rightRow = item;
    	  	rightEvent.value = event;
    	  	rightSign.value = sign;
    	  	rightMenu.value = true;
    	}
        
		onMounted(() => {
			getFolderFileList();
		});
        

        return {
            vuexProfilesgetter, vuexBlogClassList, userName, userEmail, userPassword, userAuthority,
			folderList, fileList, getFolderFileList, backRoot, refreshEvent, backEvent,
			dataLoading, urlNow, searchUrl, searchUrlHistory, searchUrlEvent, quickSearch,
            searchString, searchStringEvent,
			enterFolder,
            folderInputShow, newFloderInput, newFolderName, openFolderInput, addFolder,
			actionUrl, fileMsg, beforeUpload, uploadSuccess,
			modifyFolderDialog, modifyFolder, 
			rightEvent, rightSign, rightMenu, rightRow, openRightMenu
        }
    }
};
</script>

<style lang="scss" scoped>

// layout
.DMsIndex {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;

    :deep(.el-input),
    :deep(.el-input__inner) {
        height: 32px;
        line-height: 32px;
    }
    :deep(.el-input__icon) {
        line-height: 32px;
    }
}
.DMs-header {
    width: 100%;
    height: 42px;
    overflow: hidden;
    padding: 0 15px;
    display: flex;
    align-items: center;
}
.DMs-header-left {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;

    i {
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
    i:nth-child(2) {
        margin-left: 30px;
    }
}
.DMs-header-center {
    .el-select {
        width: 100%;
    }
}
.DMs-header-right {
    :deep(.el-input) {
        width: 100%;
        padding-left: 15px;
    }
}
.DMs-body {
    width: 100%;
    flex: 1;
    overflow: auto;
}
.DMs-body-left,
.DMs-body-right {
    height: 100%;
    overflow: auto;
}
.DMs-file-list {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;

    & > div {
        height: 100px;
        padding: 30px;
        text-align: center;
        float: left;
        font-size: 14px;
        cursor: pointer;
    }
	img {
		height: 100%;
	}

    .add-new-folder,
    .upload-new-file {
        i {
            font-size: 40px;
        }
    }
}
// rightMenu
.rightMenu_box {
  	border-radius: 0;
  	padding: 0;
  	background: rgba(0, 0, 0, 0.4);
  	font-size: 14px;

  	p {
  	  	color: #eee;
  	  	margin-bottom: 0;
  	  	padding: 0.5em 1em;
  	  	cursor: pointer;
  	}
  	p:hover {
  	  	background: rgba(0, 0, 0, 0.8);
  	}
}
</style>
