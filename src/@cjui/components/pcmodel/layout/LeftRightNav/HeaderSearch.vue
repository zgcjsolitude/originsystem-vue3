<template>
  	<div :class="{'show': show}" class="header-search">
  	  	<span @click.stop="click">
  	  	  	<i class="el-icon-search"></i>
  	  	</span>
  	  	<el-select ref="headerSearchSelect" placeholder="Search" class="header-search-select"
  	  	  	v-model="search"
  	  	  	filterable
  	  	  	default-first-option
  	  	  	remote
  	  	  	@change="change"
  	  		>
  	  	  	<el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
  	  	</el-select>
  	</div>
</template>

<script>
export default {
  	name: "HeaderSearch",
  	data() {
  	  	return {
  	  	  	search: "",
  	  	  	show: false,
  	  	  	options: [],
  	  	};
  	},
  	watch: {
  	  	show(value) {
  	  	  	if (value) {
  	  	  	  	document.body.addEventListener("click", this.close);
  	  	  	} else {
  	  	  	  	document.body.removeEventListener("click", this.close);
  	  	  	}
  	  	},
  	},
  	methods: {
  	  	click() {
  	  	  this.show = !this.show;
  	  	  if (this.show) {
  	  	    this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
  	  	  }
  	  	},
  	  	close() {
  	  	  this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
  	  	  this.options = [];
  	  	  this.show = false;
  	  	},
  	  	change(val) {
  	  	  this.search = "";
  	  	  this.options = [];
  	  	  this.$nextTick(() => {
  	  	    this.show = false;
  	  	  });
  	  	},
  	},
};
</script>

<style lang="scss" scoped>
.header-search {
  	.search-icon {
  	  	cursor: pointer;
  	  	font-size: 18px;
  	  	vertical-align: middle;
  	}
  	.header-search-select {
  	  	font-size: 18px;
  	  	transition: width 0.2s;
  	  	width: 0;
  	  	overflow: hidden;
  	  	background: transparent;
  	  	border-radius: 0;
  	  	display: inline-block;
  	  	vertical-align: middle;

  	  	:deep(.el-input__inner) {
  	  	  	border-radius: 0;
  	  	  	border: 0;
  	  	  	padding-left: 0;
  	  	  	padding-right: 0;
  	  	  	box-shadow: none !important;
  	  	  	border-bottom: 1px solid #d9d9d9;
  	  	  	vertical-align: middle;
  	  		background: transparent !important;
  	  	}
  	}
  	&.show {
  	  	.header-search-select {
  	  	  width: 210px;
  	  	  margin-left: 10px;
  	  	}
  	}
}
</style>
