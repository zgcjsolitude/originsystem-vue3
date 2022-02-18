<template>
    <cjui-loading-progress class="BlogList" theme="ring-rotate_0" :loading="blogListLoading">
		<cjui-wfrow ref="BlogListContainer" :count="5" :xs="1" :sm="3" :md="4" :lg="5">
			<cjui-wfcol v-for="(item, i) in blogList" :key="i">
				<BlogCard :data="item" :contentPadding="2" @clickTitle="openBlogContent(item)"></BlogCard>
			</cjui-wfcol>
		</cjui-wfrow>
    </cjui-loading-progress>
</template>

<script setup>
import { ref, reactive, onMounted, toRefs } from 'vue';

import BlogCard from './BlogCard.vue';
import service from '../../../js/service';
import { RootUrl } from '@/assets/js/data-dictionary';

const emit = defineEmits(['openBlogContent']);

const blogListLoading = ref(false);
const blogList = ref([]);

async function getBlogList() {
    blogListLoading.value = true;
	const { data, count } = await service.Return_bloglist({
        page: 1,
        num: 100,
    });
    blogListLoading.value = false;
    blogList.value = data.map(el => {
        return {
			...el,
            imgurl: RootUrl + '/img/nopic.jpg',
        }
    });
}

function openBlogContent(item) {
    emit('openBlogContent', item);
}

const BlogListContainer = ref(null);
onMounted(async () => {
	await getBlogList();
	BlogListContainer.value.initNodes();
});
</script>

