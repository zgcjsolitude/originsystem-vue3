<template>
	<PmdmodelHeader 
        class="CjuiShowPmdnewslist"
		title="新闻列表"
        right-icon="el-icon-search"
		@leftEvent="$router.go(-1)"
		>
        <template v-slot:header>
            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="searchValue"></el-input>
        </template>
        <template v-slot:headerRight>
            <span>搜索</span>
        </template>
        <div>
		    <PmdmodelnewsList v-for="i in 10" :key="i" />
        </div>
	</PmdmodelHeader>
</template>     

<script>
import PmdmodelHeader from '@/@cjui/public/pmdmodel/packages/structure/header';
import PmdmodelnewsList from './newsList1';

export default {
	name: "CjuiShowPmdnewslist",
	components: {
        PmdmodelHeader,
	  	PmdmodelnewsList
	},
  	data() {
		return {
		  
		}
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.CjuiShowPmdnewslist {
	/deep/ .header {
		color: #333;
  		background:#f9f9f9;
	}
	/deep/ .header-center {
		flex: 8;
	}
	/deep/ .header-right {
		text-align: left;
	}
}
.CjuiShowPmdnewslist.is-fixed-transition {
	/deep/ .header {
		color: #333;
  		background:#f9f9f9;
	}
}

/deep/ .el-input {
    font-size: 0.14rem;
}
/deep/ .el-input__inner {
    height: 0.3rem;
    line-height: 0.3rem;
    padding: 0 0.15rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #eee;
}
/deep/ .el-input__prefix {
    left: 0.05rem;
}
/deep/ .el-input--prefix .el-input__inner {
    padding-left: 0.3rem;
}
/deep/ .el-input__icon {
    width: 0.25rem;
    line-height: 0.3rem;
}
</style>
