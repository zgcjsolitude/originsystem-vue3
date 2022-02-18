<template>
	<LayoutView>
    	<template #header>
            <h1 class="header-icon">
                <a @click="$router.push('/')">
                    <img :src="$imgBaseUrl + '/img/WebDevelopGuide/cjui-vue.png'" alt="">
                    <span class="label-text">CJUI</span>
                </a>
            </h1>

            <ul class="header-nav">
                <li v-for="(item, i) in topNavList" :key="i" :class="$route.path.includes(item.path) && 'is-active'">
                    <a @click="$router.push(item.path)">{{ item.label }}</a>
                </li>
            </ul>
        </template>

    	<template #sectionLeft>
            <ul class="body-left-nav">
                <li v-for="(item, i) in leftNavList" :key="i">
                    <p class="li-title">{{ item.title }}</p>
                    <ul>
                        <li v-for="(el, j) in item.list" :key="j" 
                            :class="$route.path.includes(el.fullPath) && 'is-active'"
                            @click="$router.push(el.fullPath)"
                            >
                            {{ el.title }}
                        </li>
                    </ul>
                </li>
            </ul>
        </template>

    	<template #sectionRight>
            <router-view></router-view>
        </template>

        <template #rightNav>
            <ul class="body-right-nav">
                <li v-for="(item, i) in rightNavList" :key="i">
                    <a @click="scrollTopById(item.anchor)">{{ item.title }}</a>
                </li>
            </ul>
        </template>
	</LayoutView>
</template>

<script>
import LayoutView from "@/@cjui/components/pcmodel/layout/TopLeftRight.vue";

export default {
  	name: 'MenuView',
	components:{
		LayoutView,
	},
    props: {
        topNavList: {
            type: Array,
            default: () => []
        },
        leftNavList: {
            type: Array,
            default: () => []
        },
        rightNavList: {
            type: Array,
            default: () => []
        },
    },
    setup() {
        function scrollTopById(id) {
            let dom = document.querySelector(`#${id}`);
            if (dom) {
                document.querySelector(`#${id}`).scrollIntoView(true);
            }
        }

        return {
            scrollTopById
        }
    }
}
</script>

<style lang="scss" scoped>
@import './css/_variable.scss';

.header-icon {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
    line-height: 80px;

    a {
        cursor: pointer;
    }
    img {
        height: 48px;
        vertical-align: sub;
    }

    .label-text {
        color: #21f3d7;
        font-family: fantasy;
        margin-left: 0.2em;
    }
}
.header-nav {
    float: right;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
    color: #5e6d82;

    li {
        margin: 0;
        float: left;
        list-style: none;
        position: relative;
    }
    li.is-active {
        color: $wbgItemColor;
    }
    a {
        text-decoration: none;
        display: block;
        padding: 0 22px;
        cursor: pointer;
    }
}
.body-left-nav {
    & > li {
        font-size: 17px;
        line-height: 42px;
        cursor: pointer;
    }
    ul > li {
        font-weight: 500;
        font-size: 14px;
        color: #919191;
        cursor: pointer;
    }
    ul > li:hover,
    ul > li.is-active {
        color: $wbgItemColor;
    }

    .li-title {
        font-weight: 600;
        margin-bottom: 0;
        font-size: 17px;
    }
}
.body-right-nav {
    width: 200px;
    border-left: 1px solid rgb(220, 223, 230);
    padding-left: 1em;

    li {
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 200px;
        color: #606266;
        margin-bottom: 0.2em;
    }
    a {
        cursor: pointer;
    }
    a:hover {
        color: $wbgItemColor;
        text-decoration: underline;
    }
}

:deep(.el-backtop) {
    color: $wbgItemColor;
}
</style>