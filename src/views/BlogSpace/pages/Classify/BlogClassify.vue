<template>
	<bs-loading-progress class="BlogClassify container-xl" :loading="blogClassListLoading">
		<div class="row no-gutters blog_list">
			<div class="col-12 col-md-6 col-xl-4 blog_list_item" v-for="(item, i) in blogClassList" :key="i">
        		<div class="list_item_left">
        		  <img src="/img/origin-system/BlogSpace/blogbg.jpg" alt style="height:100%;width:100%;" />
        		</div>
       			<div class="list_item_right">
       			  <h5>{{ item.Value }}</h5>
       			  <p>
       			    <span style="margin-right:1rem;">
       			      <i class="el-icon-user-solid"></i>
       			      {{ item.Creator }}
       			    </span>
       			    <span style="margin-right:1rem;">{{ item.changedTime }}</span>
       			    <span style="margin-right:1rem;">
       			      <i v-if="false" class="el-icon-star-on"></i>
       			      <i v-else class="el-icon-star-off"></i>
       			    </span>
       			    <span style="margin-right:1rem;">
       			      <i class="el-icon-thumb"></i>
       			      <span style="margin-right:1rem;">{{ item.Like }}</span>
       			    </span>
       			    <span style="margin-right:1rem;">
       			      <i class="el-icon-s-management"></i>
       			      {{ item.class }}
       			    </span>
       			    <span
       			      style="float:right;margin-right:0.12rem;font-size:0.12rem;cursor:pointer;"
       			      @click="blogClassItem=item.Value;showList='blog';getBlogList();"
       			    >查看列表</span>
       			  </p>
       			</div>
			</div>
		</div>
    </bs-loading-progress>
</template>

<script >
import { BlogClassListHook } from '../../js/data-hook.js';

export default {
  	name: 'BlogClassify',
	components:{ 
	},
	setup() {
		const { blogClassListLoading, blogClassList, getBlogClassList } = BlogClassListHook();

		return {
			blogClassListLoading, blogClassList, getBlogClassList,
		}
	},
    mounted() {
		this.getBlogClassList();
    }
}
</script>

<style lang="scss" scoped>
.blog_list {
  	margin-top: 2rem;
}
.blog_list_item {
  	font-size: 62.5%; // 1em = 10px
  	border-bottom: 1px solid #eee;
  	padding: 1rem;
  	display: flex;

  	.list_item_left {
  	  	width: 80px;
  	}
  	.list_item_right {
  	  	padding-left: 15px;
  	  	flex: 1;
  	}

  	h3 {
  	  	margin-bottom: 0.5em;
  	}
  	p {
  	  	font-size: 1.4em;
  	}
  	img {
  	  	width: 80px;
  	}
}
</style>
