<template>
    <div>
        <MdEditor
            v-model="text"
            @change="textChange"
            @save="saveEvent"
            @htmlChanged="textHtmlChange"
        >

        </MdEditor>
    </div>
</template>

<script>
import { ref } from 'vue';

import MdEditor from 'md-editor-v3';

export default {
    components: {
        MdEditor
    },
    setup() {
        const text = ref('');
        const textHtml = ref('');
        function textChange(value) {
            text.value = value
        }
        function textHtmlChange(value) {
            textHtml.value = value;
        }
        function saveEvent(value) {
            console.log(value, textHtml.value)
        }

        return {
            text, 
            textHtml,
            textChange,
            textHtmlChange,
            saveEvent
        }
    },
}
</script>

