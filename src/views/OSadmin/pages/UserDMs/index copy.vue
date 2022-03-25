<template>
  <!-- 用户文件管理系统，用户名、密码获取信息 -->
  <div class="faceDMs is-default">

    <!-- 文件夹名称修改 -->
    <el-dialog
      class="PCdialog1"
      width="30%"
      title="修改文件夹名称"
      :visible.sync="modifyFolderDialog"
    >
      <div class="PCformcol1">
        <div class="PCformcol1_input">
          <label for="newFolderValue" style="width: 120px"
            >文件夹新名称：</label
          >
          <el-input
            id="newFolderValue"
            size="small"
            v-model="modifyFolderName"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <cjui-button
          size="small"
          type="warning"
          theme="Dlight_0"
          @click="modifyFolderDialog = false"
          >取 消</cjui-button
        >
        <cjui-button theme="Dlight_0">确 定</cjui-button>
      </span>
    </el-dialog>

    <!-- 文件信息设置 -->
    <el-dialog
      class="PCdialog1"
      title="文件设置"
      :visible.sync="fileDialog"
      width="50%"
    >
      <div style="padding: 30px">
        <el-table :data="fileMsgList" style="width: 100%; margin: 10px 0">
          <el-table-column
            prop="Name"
            label="所属文件"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="Sign"
            label="标识"
            width="180"
          ></el-table-column>
          <el-table-column prop="Class" label="分组"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <cjui-button
                type="warning"
                theme="Dlight_0"
                :disabled="btnControl.btnDisable"
                @click="deleteFileMsg(scope.row)"
                >删除</cjui-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-select
          v-model="fileSetMsg.blogClass"
          :popper-class="'is-' + storeProfiles"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, i) in vuexBlogClassList"
            :key="i"
            :label="item.Value"
            :value="item.Value"
          ></el-option>
        </el-select>
        <cjui-button
          size="small"
          theme="Dlight_0"
          :disabled="btnControl.btnDisable"
          @click="fileSetting('blog')"
          >上传至博文</cjui-button
        >
      </div>
    </el-dialog>

    <!-- 文件右键菜单 -->
  </div>
</template>

<script>
import MyApi from "../../../../../api/api.js";
import { mapState, mapGetters, createNamespacedHelpers } from "vuex";

const admincommonlist = createNamespacedHelpers("admincommonlist");

export default {
  name: "OSAdminUserDMs",
  data() {
    return {
      // 页面参数
      openindex: ["1", "2"],
      folderUrlText: "/", // 当前文件路径可读展示
      folderUrl: "/", // 文件路径查询
      folderUrlList: [], // 文件路径查询列表
      folderList: [], // 当前文件路径文件列表
      fileList: [],
      btnControl: {
        iconBtn: true, // 所有互斥类按钮(无视觉交互)控制
        btnDisable: false, // 所有互斥类按钮禁止控制
        delLoading: false, // 模态框删除按钮loading控制
      },
      // 修改文件夹
      modifyFolderDialog: false,
      modifyFolderName: "",
      // 上传文件
      // 新建文件夹
      newFolderShow: true, // 显示创建文件夹
      newFolderName: "", // 新建文件夹名称
      // 文件信息设置
      fileDialog: false,
      fileMsgList: [],
      fileRow: {
        _id: "",
        name: "",
        sign: "",
        parent: "",
        url: "",
        suffix: "",
      },
      fileSetMsg: {
        blogClass: "", // 文件信息设置
      },
      apiBaseUrl: "",
      // 右键菜单
      rightRow: null,
    };
  },
  methods: {
    // 进入文件夹
    // 快速访问
    // 获取功能列表
    getfileMsgList() {
      MyApi.Return_userfilemsg(this.fileRow._id)
        .then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.btnChange();
            let temp = [];
            data.data.forEach((el) => {
              temp.push({
                _id: el._id,
                Name: el.Name,
                Sign: el.Sign,
                Class: el.Class,
                Intro: el.Intro,
                modify: false,
              });
            });
            this.fileMsgList = temp;
          } else {
            this.btnChange();
            this.fileMsgList = [];
          }
        })
        .catch(() => {
          this.btnChange();
          this.$message({
            type: "warning",
            message: "请求超时，内部错误，请检查网络!!",
          });
        });
    },
    // 文件功能设置
    fileSetting(value) {
      this.btnControl.btnDisable = true;
      let obj = {
        userName: this.userName,
        userPassword: this.userPassword,
        id: this.fileRow._id,
        sign: this.fileRow.sign,
        suffix: this.fileRow.suffix,
        url: this.fileRow.url,
        name: this.fileRow.name,
        className: this.fileSetMsg.blogClass,
        value: value,
      };

      MyApi.Add_userfilemsg(obj)
        .then((res) => {
          let data = res.data;
          if (data.code == 200) {
            this.getfileMsgList();
            this.$message.success(data.message);
          } else {
            this.btnChange();
            this.$message.error(data.message);
          }
        })
        .catch(() => {
          this.btnChange();
          this.$message({
            type: "warning",
            message: "请求超时，内部错误，请检查网络!!",
          });
        });
    },
    // 删除功能列表
    deleteFileMsg(row) {
      if (confirm("确定删除？")) {
        this.btnControl.btnDisable = true;
        let obj = {
          userName: this.userName,
          userPassword: this.userPassword,
          id: row._id,
          Sign: row.Sign,
        };

        MyApi.Delete_userfilemsg(obj)
          .then((res) => {
            let data = res.data;
            if (data.code == 200) {
              this.getfileMsgList();
            } else {
              this.$message.error(data.message);
            }
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "请求超时，内部错误，请检查网络!!",
            });
          });
      }
    },
    // 按钮恢复
    btnChange() {
      this.btnControl.iconBtn = true;
      this.btnControl.delLoading = false;
      this.btnControl.btnDisable = false;
    },
    /* 删除文件夹 */
    deleteFolder() {},
    /* 文件信息设置 */
    openFileMsg() {
      this.fileRow._id = this.rightRow._id;
      this.fileRow.name = this.rightRow.name;
      this.fileRow.suffix = this.rightRow.suffix;
      this.fileRow.parent = this.rightRow.parent;
      this.fileRow.url = this.rightRow.url;
      this.fileRow.sign = this.rightRow.sign;
      this.fileDialog = true;
      this.getfileMsgList();
    },
    /* 删除文件 */
    deleteFile() {
      if (confirm("确定删除？")) {
        let obj = {
          userName: this.userName,
          userPassword: this.userPassword,
          userEmail: this.userEmail,
          id: this.rightRow._id,
          fileurl: this.rightRow.url,
        };

        MyApi.Delete_userfile(obj)
          .then((res) => {
            let data = res.data;
            if (data.code == 200) {
              this.$message.success(data.message);
              this.getFolderFileList();
            } else {
              this.$message.error(data.message);
            }
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "请求超时，内部错误，请检查网络!!",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// color
.faceDMs.is-default {
  background-color: #fdfdfd;

  .faceDMs_header {
    border-top: 1px solid #eee;
  }
  .faceDMs_h_left {
    i {
      color: #404040;
    }
    i:hover {
      color: var(--osadminItemColor);
    }
  }
  .folder_show_icon > div {
    color: #404040;
  }
  .folder_show_icon > div:hover {
    color: var(--osadminItemColor);
  }

  // ======el-menu color
  /deep/ .el-menu {
    background-color: #fdfdfd;

    .el-submenu .el-menu {
      background-color: #fdfdfd;
    }
    .el-menu-item,
    .el-menu-item i,
    .el-submenu__title,
    .el-submenu__title i,
    .el-submenu .el-menu-item {
      color: #404040;
    }
    .el-menu-item.is-active {
      color: var(--osadminItemColor);
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-menu-item.is-active,
    .el-submenu__title:focus,
    .el-submenu__title:hover {
      background-color: #fdfdfd;
      color: var(--osadminItemColor);
    }
    .el-menu-item:focus,
    .el-menu-item:hover,
    .el-menu-item.is-active {
      border-right: 0;
    }
    .el-menu-item:hover i,
    .el-submenu__title:hover i,
    .el-menu-item.is-active i {
      color: var(--osadminItemColor);
    }
  }
}

.folder_show_icon {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
.folder_icon_title {
  width: 120px;
  position: relative;
  white-space: nowrap; /*不允许换行*/
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*文本超出三点代替*/
}

</style>
