import { ref, reactive, onMounted, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { ImgBaseUrl } from '@/assets/js/data-dictionary';

export const storeStateHook = function() {
    const store = useStore();
	const userName = computed(() => store.state.userName);
	const userEmail = computed(() => store.state.userEmail);
	const userPassword = computed(() => store.state.userPassword);
	const userAuthority = computed(() => store.state.userAuthority);
	const vuexProfilesgetter = computed(() => store.getters['OsAdmin/vuexProfilesgetter']);
    const vuexBlogClassList = computed(() => store.state.OsAdmin.vuexBlogClassList);

    return {
        userName, 
        userEmail, 
        userPassword, 
        userAuthority,
        vuexProfilesgetter, 
        vuexBlogClassList,
    }
}