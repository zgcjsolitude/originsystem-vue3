<template>
    <div class="ArticleIndex container-xl">
        <el-page-header title="返回" content="博文编辑" @back="goBack" />

        <div>
            
        </div>

        <BlogList 
            v-if="stepSign === 'BlogList'"

        />

        <BlogView 
            v-if="stepSign === 'BlogView'"
        />
    </div>
</template>

<script>
import { ref } from 'vue';

import BlogList from './BlogList.vue';
import BlogView from './BlogView.vue';

export default {
    components: {
        BlogList,
        BlogView
    },
    setup() {
        function goBack() {

        }

		const stepSign = ref('BlogView');
		function changeStepSign(sign) {
			stepSign.value = sign;
		}

        return {
            goBack,
            stepSign, changeStepSign
        }
    },
}
</script>

<style lang="scss" scoped>
.ArticleIndex {
    margin-top: 20px;
}

.el-page-header {
    margin-bottom: 10px;
}
</style>
