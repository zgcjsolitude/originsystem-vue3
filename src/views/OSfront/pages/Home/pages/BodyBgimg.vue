<template>
    <div class="body-bg-img">
        <template v-if="imgList.length > 0">
            <div v-for="(item, i) in imgList" :key="i" class="slideshow-image">
                <img :src="item.url" alt />
            </div>
        </template>

        <template  v-else>
            <div v-for="(item, i) in imgDefaultList" :key="i"  class="slideshow-image">
                <img :src="item.url" alt />
            </div>
        </template>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import { RootUrl, OsBaseUrl } from '@/assets/js/data-dictionary';
import service from '../js/service';

export default {
    setup() {
        const imgDefaultList = [
            { url: RootUrl + '/img/OSfront/home/bg_1.jpg' },
            { url: RootUrl + '/img/OSfront/home/bg_2.jpg' },
            { url: RootUrl + '/img/OSfront/home/bg_3.jpg' },
            { url: RootUrl + '/img/OSfront/home/bg_4.jpg' },
        ];

	    const imgList = ref([]);
	    async function getHomeIndexBgPicList() {
	    	const data = await service.Return_homeindexbgimglist();
            imgList.value = data.map(el => {
                return {
                    ...el,
                    url: OsBaseUrl + el.url,
                }
            });
	    }

        onMounted(() => {
            getHomeIndexBgPicList();
        });

        return {
            imgDefaultList,
            imgList
        }
    },
}
</script>

<style lang="scss" scoped>
.body-bg-img {
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.slideshow-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    animation-name: kenburns;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 16s;
    opacity: 1;
    transform: scale(1.2);
}
.slideshow-image:nth-child(1) {
    animation-name: kenburns-1;
    z-index: 3;
}
.slideshow-image:nth-child(2) {
    animation-name: kenburns-2;
    z-index: 2;
}
.slideshow-image:nth-child(3) {
    animation-name: kenburns-3;
    z-index: 1;
}
.slideshow-image:nth-child(4) {
    animation-name: kenburns-4;
    z-index: 0;
}

@keyframes kenburns-1 {
    0% {
        opacity: 1;
        transform: scale(1.2);
    }
    1.5625% {
        opacity: 1;
    }
    23.4375% {
        opacity: 1;
    }
    26.5625% {
        opacity: 0;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
    98.4375% {
        opacity: 0;
        transform: scale(1.21176);
    }
    100% {
        opacity: 1;
    }
}
@keyframes kenburns-2 {
    23.4375% {
        opacity: 1;
        transform: scale(1.2);
    }
    26.5625% {
        opacity: 1;
    }
    48.4375% {
        opacity: 1;
    }
    51.5625% {
        opacity: 0;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
}
@keyframes kenburns-3 {
    48.4375% {
        opacity: 1;
        transform: scale(1.2);
    }
    51.5625% {
        opacity: 1;
    }
    73.4375% {
        opacity: 1;
    }
    76.5625% {
        opacity: 0;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.2);
    }
}
@keyframes kenburns-4 {
    73.4375% {
        opacity: 1;
        transform: scale(1.2);
    }
    76.5625% {
        opacity: 1;
    }
    98.4375% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}
</style>