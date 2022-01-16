import { ref, reactive, onMounted, toRefs } from 'vue';
import service from './service';

export const DictionaryDataHook = function() {
    const dictionarylist = ref([]);
    const dictionaryLoading = ref(false);
    async function getDictionaryList() {
        dictionaryLoading.value = true;
        dictionarylist.value = await service.Return_dictionarylist();
        dictionaryLoading.value = false;
    }

    return {
        dictionaryLoading,
        dictionarylist,
        getDictionaryList
    }
}
