<template>
    <div class="HomeIndex">
        <el-page-header v-show="stepSign !== 'BlogList'" title="返回" content="博文详情" @back="goBack" />

        <BlogList 
            v-show="stepSign === 'BlogList'"
			@openBlogContent="openBlogContent"
        />

        <BlogView 
            v-if="stepSign === 'BlogView'"
			:blogId="blogId"
        />
    </div>
</template>

<script>
import { reactive, ref } from 'vue';

import BlogList from './BlogList/index.vue';
import BlogView from './BlogView.vue';

export default {
    components: {
        BlogList,
        BlogView
    },
    setup() {
		const stepSign = ref('BlogList');

        function goBack() {
			stepSign.value = 'BlogList';
        }

		const blogId = ref('');
		function openBlogContent(item) {
			blogId.value = item._id;
			stepSign.value = 'BlogView';
		}

        return {
            stepSign,
            goBack,
			blogId, openBlogContent
        }
    },
}
</script>

<style lang="scss" scoped>
.HomeIndex {
    margin-top: 20px;
}

.el-page-header {
    margin-bottom: 10px;

	:deep(.el-page-header__left) {
		color: #999;
	}
	:deep(.el-page-header__content) {
		font-size: 14px;
		color: #606266;
	}
}
</style>
