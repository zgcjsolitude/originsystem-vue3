<template>
    <!-- <cjui-randomcode-blank v-model:value="codeValue" /> -->
    <div class="cjui-randomcode-blank" :style="`width:${width};height:${height}`" @click="refreshCode">
        <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{ item.code }}</span>
    </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue';

export default {
    name: "CjuiRandomCodeBlank",
    props: {
        value: {
            type: String,
            default: "",
        },
        width: {
            type: String,
            default: "100px",
        },
        height: {
            type: String,
            default: "34px",
        },
        length: { // 随机字符数量
            type: Number,
            default: 4,
        },
        code: { // 随机总字符
            type: String,
            default: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        },
    },
    setup(props, { emit }) {
        const { length, code } = toRefs(props);

        const codeList = ref([]);

        function createdCode() {
            const len = length.value;
            const chars = code.value;
            const charsLen = chars.length;
            const codeListCreate = [];

            for (let i = 0; i < len; i++) {
                const rgb = [
                    Math.round(Math.random() * 220), 
                    Math.round(Math.random() * 240), 
                    Math.round(Math.random() * 200),
                ];

                codeListCreate.push({
                    code: chars.charAt(Math.floor(Math.random() * charsLen)),
                    color: `rgb(${rgb})`,
                    fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
                    padding: `${[Math.floor(Math.random() * 10)]}px`,
                    transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`,
                });

                codeList.value = codeListCreate;

                emit('update:value', codeList.value.map((item) => item.code).join(""));
            }
        }

        function refreshCode() {
            createdCode();
        }

        function getStyle(item) {
            return `color: ${item.color}; font-size: ${item.fontSize}; padding: ${item.padding}; transform: ${item.transform}`;
        }

        onMounted(() => {
            createdCode();
        });

        return {
            codeList,
            refreshCode,
            getStyle
        }
    }
};
</script>

<style lang="scss">
.cjui-randomcode-blank {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
        display: inline-block;
    }
}
</style>