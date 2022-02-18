<template>
	<div class="BlogCard" :class="[shadow && 'is-shadow']" :style="{ width: getWidth, padding: getPadding }">
        <!-- <img v-lazy="data.imgurl" :alt="data.title"> -->
        <img :src="data.imgurl" :alt="data.title">
        <div v-if="contentShow" class="content-box" :style="getContentPadding" @click="clickTitle">
            <p class="is-title cjui-t-hidden">{{ data.title }}</p>
            <p class="is-content">{{ data.intro }}</p>
            <p class="is-author">-- {{ data.updater }}</p>
        </div>
    </div>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  	name: 'BlogCard',
	props: {
        width: {
            type: [Number, String],
            default: '100%'
        },
        padding: {
            type: [Number, String],
            default: 10
        },
        shadow: {
            type: Boolean,
            default: true
        },
        contentShow: {
            type: Boolean,
            default: true
        },
        contentPadding: {
            type: [Number, String],
            default: ''
        },
        data: {
            type: Object,
            default: () => {
                return {
                    imgurl: '/bg.jpg',
                    title: '标题',
                    content: '相关介绍',
                    author: '作者'
                }
            }
        }
	},
  	setup(props) {
        const { width, padding, contentPadding } = toRefs(props);
        const getWidth = computed(() => {
            return typeof width.value === 'number'? `${width.value}px`: width.value;
        });
        const getPadding = computed(() => {
            return typeof padding.value === 'number'? `${padding.value}px`: padding.value;
        });
        const getContentPadding = computed(() => {
            if (contentPadding.value) {
                return typeof contentPadding.value === 'number'? 
                    {
                        paddingLeft: `${contentPadding.value}px`,
                        paddingRight: `${contentPadding.value}px`,
                        paddingBottom: `${contentPadding.value}px`,
                    }: {};
            }
            return {}
        });
        
        return {
            getWidth,
            getPadding,
            getContentPadding
        }
    },
    methods: {
        clickTitle() {
            this.$emit('clickTitle');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_mixins.scss';

.BlogCard {
    img {
        width: 100%;
    }
    .content-box {
        padding-top: 1em;
        margin-bottom: 0.5em;
    }
    .is-title {
        color: #333;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 0.5em;
        cursor: pointer;
    }
    .is-title:hover {
        text-decoration: underline;
    }
    .is-title:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #eee;
        margin-top: 0.5em;
    }
    .is-content {
        @include CJUImoreColumnHidden(3);

        color: #868686;
        font-size: 14px;
        line-height: 1.3em;
        margin-bottom: 0.5em;
    }
    .is-author {
        color: #b1b1b1;
        font-style: italic;
        text-align: right;
        padding-right: 0.2em;
        margin-bottom: 0;
    }
}
.BlogCard.is-shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
}
</style>
