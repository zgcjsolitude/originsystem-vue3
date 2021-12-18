import { ref, reactive, onMounted, toRefs } from 'vue';
import service from './service';

export const TimelineDataHook = function() {
    const timelinelist = ref([]);
    const timelineLoading = ref(false);
    async function getTimelineList({ tag }) {
        timelineLoading.value = true;
        timelinelist.value = await service.Return_timelinelist({
            tag,
        });
        timelineLoading.value = false;
        _handTimelineList();
    }
    function _handTimelineList() {
        timelinelist.value = timelinelist.value.map(el => {
            return {
                ...el,
                yearValue: Number(el.year),
                monthValue: Number(el.month),
                dayValue: Number(el.day),
                date: `${el.tag} ${el.year}${el.month && '-'+el.month}${el.day && '-'+el.day}`
            }
        });
        timelinelist.value.sort((a, b) => {
            if (a.yearValue !== b.yearValue) {
                return a.yearValue - b.yearValue
            }
            if (a.monthValue !== b.monthValue) {
                return a.monthValue - b.monthValue
            }
            return a.dayValue - b.dayValue
        });
    }

    return {
        timelineLoading,
        timelinelist,
        getTimelineList
    }
}
