<template>
    <cjui-loading-progress :loading="blogLoading" theme="ring-rotate_0" class="BlogView">
	    <div v-html="blogMsg.htmlText" class="md-preview default-theme"></div>
    </cjui-loading-progress>
</template> 

<script>
import { onMounted, reactive, ref, toRefs } from 'vue';

import service from '../../js/service';

export default {
  	name: 'BlogView',
    props: {
        blogId: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { blogId } = toRefs(props);

        const blogLoading = ref(false);
        const blogMsg = reactive({});
        async function getBlogContent(params) {
            blogLoading.value = true;
            const dataObj = await service.Return_blogmsg({ _id: blogId.value });
            blogLoading.value = false;
            Object.keys(dataObj).forEach(key => {
                blogMsg[key] = dataObj[key];
            });
        }

        onMounted(() => {
            getBlogContent();
        });

        return {
            blogLoading,
            blogMsg
        }
    }
}
</script>

<style lang="scss" scoped>
.BlogView {
    border-top: 1px solid #eee;
    padding: 0 2px;
}

:deep(.md-preview.default-theme) {
    @import '@/assets/css/import-list/md-editor-v3--default.scss';
}
</style>
