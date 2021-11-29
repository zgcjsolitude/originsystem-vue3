<template>
	<div> 
        <BlogClassify v-if="tag === 'classify'"></BlogClassify>  
        <BlogList v-if="tag === 'list'"></BlogList>  
        <BlogContent v-if="tag === 'content'"></BlogContent>  
    </div>
</template> 

<script>
import BlogClassify from './BlogClassify.vue';
import BlogList from './BlogList.vue';
import BlogContent from './BlogContent.vue';
import { ref } from 'vue';

export default {
  	name: 'BlogSpaceIndex',
	components:{
        BlogClassify,
        BlogList,
        BlogContent,
	},
	setup() {
		const tag = ref('classify');
		function changeTag(newVal) {
			tag.value = newVal;
		}

		return {
			tag, changeTag
		}
	}
}
</script>
