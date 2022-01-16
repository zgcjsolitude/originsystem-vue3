<template>
    <cjui-loading-progress class="BlogSpaceHomeIndex container-xl" :loading="blogListLoading">
		<div v-if="stepSign === 'blogList'" class="row no-gutters blogList_container">
			<cjui-wfrow class="col-12 blogList_box" ref="BlogSpaceHomeIndex" id="BlogSpaceHomeIndex" :count="5" :xs="1" :sm="3" :md="4" :lg="5">
				<cjui-wfcol v-for="(item, i) in blogList" :key="i">
					<BlogCard :data="item" :contentPadding="2" @clickTitle="openBlogContent(item)">
					</BlogCard>
				</cjui-wfcol>
			</cjui-wfrow>
		</div>
		<div v-if="stepSign === 'blogContent'" class="row no-gutters blogList_container">
			<div class="col-12 blogContent_box">
				<BlogView :content="blogContent" />
			</div>
    	</div>
    </cjui-loading-progress>
</template>

<script>
import BlogCard from '../../components/BlogCard.vue';
import BlogView from '../../components/BlogView.vue';
import { BlogListHook, BlogContentHook } from '../../js/data-hook.js';
import { ref, reactive, onMounted, toRefs } from 'vue';

export default {
  	name: 'BlogSpaceHomeIndex',
	components:{
		BlogCard,
		BlogView
	},
	setup() {
		const { blogListLoading, blogList, getBlogList } = BlogListHook();

		const { blogContent, getBlogContent } = BlogContentHook();

		const stepSign = ref('blogList');
		function changeStepSign(sign) {
			stepSign.value = sign;
		}
		function openBlogContent(item) {
			stepSign.value = 'blogContent';
			getBlogContent(item.fileurl);
		}

		const BlogSpaceHomeIndex = ref(null);

		onMounted(async () => {
			await getBlogList();
			BlogSpaceHomeIndex.value.initNodes();
		});

		return {
			blogListLoading, blogList, getBlogList,
			blogContent, getBlogContent,
			stepSign, changeStepSign, openBlogContent,
			BlogSpaceHomeIndex
		}
	}
}
</script>

<style lang="scss" scoped>
.blogList_container {
	margin-top: 2rem;
}
.blogList_box {
	padding: 0.5rem;
	display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.blogList_item {
	margin: 0.5rem;
}
</style>
