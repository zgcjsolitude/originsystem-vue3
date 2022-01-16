<template>
    <cjui-loading-progress class="BlogList container-xl" theme="ring-rotate_0" :loading="blogListLoading">
		<cjui-wfrow ref="BlogListContainer" :count="5" :xs="1" :sm="3" :md="4" :lg="5">
			<cjui-wfcol v-for="(item, i) in blogList" :key="i">
				<BlogCard :data="item" :contentPadding="2" @clickTitle="openBlogContent(item)">
				</BlogCard>
			</cjui-wfcol>
		</cjui-wfrow>
    </cjui-loading-progress>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from 'vue';

import BlogCard from '../../components/BlogCard.vue';
import { BlogListHook, BlogContentHook } from '../../js/data-hook.js';

export default {
    components: {
        BlogCard
    },
    setup() {
		const { blogListLoading, blogList, getBlogList } = BlogListHook();

        
		const BlogListContainer = ref(null);
		onMounted(async () => {
			await getBlogList();
			BlogListContainer.value.initNodes();
		});

		return {
			blogListLoading, blogList, getBlogList,
			BlogListContainer
		}
    },
}
</script>

