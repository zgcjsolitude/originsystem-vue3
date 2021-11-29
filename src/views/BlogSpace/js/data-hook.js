import { ref, reactive, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import API from './interface.js';
import { ImgBaseUrl } from '@/assets/js/data-dictionary';

export const BlogListHook = function() {
    const blogListLoading = ref(false);
	const blogList = ref([]);
	async function getBlogList() {
        blogListLoading.value = true;
		const data = await API._Return_userfilemsglist({
            userName: "",
            sign: "blog",
            className: "",
            page: 1,
            num: 15,
        });
        blogListLoading.value = false;
        blogList.value = data.map(el => {
            return {
                imgurl: ImgBaseUrl + '/img/origin-system/nopic.jpg',
                title: el.Name,
                content: el.Class + ':' + el.Name,
                author: el.Creator,
                fileurl: el.Url
            }
        });
	}

    return {
        blogListLoading,
        blogList,
        getBlogList
    }
}

export const BlogClassListHook = function() {
	const blogClassListLoading = ref(false);
	const blogClassList = ref([]);
	async function getBlogClassList() {
        blogClassListLoading.value = true;
		const { data } = await API._Return_usermsg({
            sign: "blogClass",
            userName: '',
        });
        blogClassListLoading.value = false;
        blogClassList.value = data;
	}
    
    return {
        blogClassListLoading,
        blogClassList,
        getBlogClassList
    }
}

export const BlogContentHook = function() {
	const blogContent = ref('');
	async function getBlogContent(url) {
		blogContent.value = await API._Read_Common_File(url);
	}
    
    return {
        blogContent,
        getBlogContent
    }
}