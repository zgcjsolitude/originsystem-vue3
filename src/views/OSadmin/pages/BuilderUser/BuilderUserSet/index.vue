<template>
      <div class="BuilderUserSet">
        <div class="BuilderUserSet-container" :class="vuexProfilesgetter">
            <div class="OSA-flex-box">
                  <el-button class="flex-left" type="primary" @click="openAddUser">
                      <el-icon><Plus /></el-icon>
                  </el-button>
            </div>

            <cjui-el-table border
                :height="clientHeight - 210"
                :loading="tableLoading"
                :columns="columns"
                :table-data="tableData"
                :pagination="pagination"
                :paginationClass="vuexProfilesgetter"
                @sizeChange="sizeChange"
                @currentChange="currentChange">
            </cjui-el-table>
        </div>

        <!-- 用户授权 -->
        <el-drawer v-model="drawer" title="用户授权" @open="getAuthList">
            <el-tree
                ref="tree"
                node-key="id"
                show-checkbox
                default-expand-all
                highlight-current
                :data="authList"
                :check-strictly="true"
                :indent="50"
                :default-checked-keys="userAuthList"
                :props="defaultProps"
                >
            </el-tree>
            <div style="padding: 20px;">
                  <el-button type="primary" @click="upAuthChange">确认授权</el-button>
            </div>
        </el-drawer>

        <!-- 用户添加或修改 -->
        <el-drawer v-model="userFormDrawer" :title="userForm._title + '用户'" @close="clearUserForm">
            <el-form ref="renForm" :model="userForm" :rules="userFormRule" label-width="110px">
                <el-form-item v-if="userForm._action == 'add'" label="用户姓名" prop="name">
                      <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item v-if="userForm._action == 'add'" label="用户邮箱" prop="email">
                      <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item v-if="userForm._action == 'add'" label="用户密码" prop="password">
                      <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="password">
                      <el-radio v-model="userForm.gender" label="男">男</el-radio>
                      <el-radio v-model="userForm.gender" label="女">女</el-radio>
                      <el-radio v-model="userForm.gender" label="保密">保密</el-radio>
                </el-form-item>
                <el-form-item>
                      <el-button type="primary" @click="userForm._action == 'add' ? addUser() : modifyUser()">
                        确认{{ userForm._title }}
                    </el-button>
                      <el-button type="info" @click="userFormDrawer = false">
                        取消{{ userForm._title }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
      </div>
</template>

<script lang="jsx">
import API from '../../../js/interface.js';
import { useStore } from "vuex";
import { ref, computed, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { OsaElTableHook } from '@/views/OSadmin/components/ElTable/table-hook.js';
import { storeStateHook } from '../../../js/store-hook.js';

export default {
      name: "OSAdminBuilderUserSet",
    setup() {
        const clientHeight = document.body.clientHeight;
        
        const { userName, userEmail, userPassword, userAuthority, vuexProfilesgetter } = storeStateHook();

        const columns = computed(() => [
            {
                prop: 'name',
                label: '姓名',
                width: '180',
            },
            {
                align: 'center',
                prop: 'gender',
                label: '性别',
                width: '80',
            },
            {
                prop: 'email',
                label: '注册邮箱',
                minWidth: '200',
            },
            {
                align: 'center',
                prop: 'createdTime',
                label: '注册时间',
                width: '200',
            },
            {
                align: 'center',
                prop: 'status',
                label: '状态',
                width: '200',
                slots: {
                    default: ({ row }) => {
                        if (row.status) {
                            return <span>启用</span>
                        } else {
                            return <span>停用</span>
                        }
                    }
                }
            },
            {
                align: 'center',
                label: '操作',
                minWidth: '280',
                slots: {
                    default: ({ row }) => {
                        return <div>
                            <el-button type="primary" onClick={() => openModifyUser(row)}>
                                修改
                            </el-button>
                            <el-button type="success" onClick={() => authChange(row)}>
                                授权
                            </el-button>
                            { 
                                row.status 
                                ? 
                                <el-button type="warning" onClick={() => changeUserStatus(row, false)}>
                                    禁止
                                </el-button> 
                                :
                                <el-button type="success" onClick={() => changeUserStatus(row, true)}>
                                    恢复
                                </el-button>
                            }
                            <el-button type="danger" onClick={() => deleteUser(row)}>
                                删除
                            </el-button>
                        </div>
                    }
                }
            }
        ]);
        const { tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData } = OsaElTableHook(getTableData);
        async function getTableData() {
            tableLoading.value = true;
            const { data } = await API._Return_adminuserlist({
                userName: userName.value,
                userPassword: userPassword.value,
            });
            tableLoading.value = false;
            tableData.value = data;
        }

        const userFormDrawer = ref(false);
            const userFormRule = {
                  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            }
        const userForm = reactive({
                  _action: "",
                  _title: "",
                  _id: "",
                  name: "",
                  password: "",
                  email: "",
                  gender: "保密",
        });
        const btnDialogAddLoading = ref(false);
        function openAddUser() {
              userForm._action = "add";
              userForm._title = "添加";
              userFormDrawer.value = true;
        }
        async function addUser() {
            btnDialogAddLoading.value = true;
            const { code, message } = await API._Add_adminuser({
                userName: userName.value,
                userPassword: userPassword.value,
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                gender: userForm.gender,
            });
            btnDialogAddLoading.value = false;
            if (code === 200) {
                userFormDrawer.value = false;
                ElMessage.success(message);
                clearUserForm();
                updateTableData();
                return
            }
            ElMessage.warning(message);
        }
        function openModifyUser(row) {
            userForm._action = "modify";
            userForm._title = "修改";
            userForm._id = row._id;
            userForm.name = row.name;
            userForm.password = row.password;
            userForm.email = row.email;
            userForm.gender = row.gender;
            userFormDrawer.value = true;
        }
        async function modifyUser() {
            btnDialogAddLoading.value = true;
            const { code, message } = await API._Modify_adminuser({
                userName: userName.value,
                userPassword: userPassword.value,
                id: userForm._id,
                gender: userForm.gender,
            });
            btnDialogAddLoading.value = false;
            if (code === 200) {
                userFormDrawer.value = false;
                ElMessage.success(message);
                updateTableData();
                return
            }
            ElMessage.warning(message);
        }
        function clearUserForm() {
            userForm.name = "";
            userForm.email = "";
            userForm.password = "";
            userForm.gender = "保密";
        }
        async function changeUserStatus(row, value) {
            btnDialogAddLoading.value = true;
            const { code, message } = await API._Modify_adminuserstatus({
                userName: userName.value,
                userPassword: userPassword.value,
                userRowID: row._id,
                value: value,
            });
            btnDialogAddLoading.value = false;
            if (code === 200) {
                userFormDrawer.value = false;
                ElMessage.success(message);
                updateTableData();
                return
            }
            ElMessage.warning(message);
        }
        async function deleteUser(row) {
            if (confirm("此操作不可逆，确认删除该管理员？")) {
                const { code, message } = await API._Delete_adminuser({
                    userName: userName.value,
                    userPassword: userPassword.value,
                    id: row._id,
                });
                if (code === 200) {
                    ElMessage.success(message);
                    updateTableData();
                    return
                }
                ElMessage.warning(message);
            }
        }

        const drawer = ref(false);
        const authList = ref([]);
        const defaultProps = {
                  children: "children",
                  label: "label",
            }
        const userAuthList = [];
        const tree = ref(null);
        let userRow = ref({});
        function authChange(row) {
            userRow = row;
            drawer.value = true;
        }
        async function getAuthList() {
            const { data1, data2 } = await API._Return_authlistcomplex({
                userName: userName.value,
                userPassword: userPassword.value,
                userRowID: userRow._id,
            });
            authList.value = data1;
            userAuthList.value = data2;
        }
        async function upAuthChange() {
            let authList = tree.value.getCheckedKeys();
            const { code, message } = await API._Modify_adminuserauth({
                userName: userName.value,
                userPassword: userPassword.value,
                userRowID: userRow._id,
                authList: JSON.stringify(authList),
            });
            if (code === 200) {
                userFormDrawer.value = false;
                ElMessage.success(message);
                getAuthList();
                return
            }
            ElMessage.warning(message);
        }

        onMounted(() => {
            refreshTableData();
        });

        return {
            clientHeight,
            vuexProfilesgetter,
            columns, tableData, tableLoading, pagination, pageSizes, sizeChange, currentChange, refreshTableData, updateTableData,
            userFormDrawer, userFormRule, userForm, userRow, tree,
            openAddUser, addUser, openModifyUser, modifyUser, clearUserForm, changeUserStatus, deleteUser, 
            authChange, getAuthList, upAuthChange,
            drawer, authList, defaultProps, userAuthList,
        }
    }
};
</script>

<style lang="scss" scoped>
.BuilderUserSet {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
}
.BuilderUserSet-container {
    width: 100%;
    height: 100%;
    padding: 15px 20px;
    position: relative;
}
.BuilderUserSet-container.osa-day {
    background: #fff;
}
.BuilderUserSet-container.osa-night {
    background: #464a56;
}
</style>