
import appSetvice from '@/views/OSadmin/pages/Business/AppTextCollection/js/service';
const appUserId = inject('userId');
const appUserPassword = inject('userPassword');
const modeifyLoading = ref(false);
async function deleteFormModel() {
    const { code, message } = await service.Delete_blog({
        userName: userName.value,
        userPassword: userPassword.value,
        _id: formModelParams.value._id,
        id: formModelParams.value.id,
    });
    if (code === 200) {
        ElMessage.success(message);
        emit('updateData')
        closeEvent();
    }
}
async function moveArticle() {
    if (modeifyLoading.value) {
        return
    }
    modeifyLoading.value = true;
    const { code, message } = await appSetvice.Add_modelarticle({
        userId: appUserId.value,
        userPassword: appUserPassword.value,
        
        appUuid: 'TNO1647276022989',
        classifyId: 52,
        classifyPath: '15.48.52',
        textType: 'md',
        
        title: formModel.title,
        intro: formModel.intro,
        remarks: formModel.remarks,
        customText: formModel.mdText,
        htmlText: formModel.htmlText,
    });
    modeifyLoading.value = false;
    if (code === 200) {
        ElMessage.success(message);
        deleteFormModel();
    }
}