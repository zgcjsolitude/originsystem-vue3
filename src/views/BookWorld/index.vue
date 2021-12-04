<template>
	<PmdmodelHeader class="BookWorldIndex" title="书籍世界" :rightIconShow="false" @leftEvent="$router.go(-1)">
        <CardRolling>
            <template #front>
                <cjui-font-animation theme="fade-on" style="font-size:32px;display:block;">根源世界录</cjui-font-animation>
            </template>
            <template #back>
                <cjui-font-animation theme="fade-on" style="font-size:24px;display:block;margin-bottom:15px;">根源世界录</cjui-font-animation>
                <cjui-font-animation theme="border-full" direction="left">进入世界</cjui-font-animation>
            </template>
        </CardRolling>
	</PmdmodelHeader>
</template>

<script>
import PmdmodelHeader from '@/@cjui/components/pmdmodel/layout/layout-header.vue';
import CardRolling from '@/@cjui/components/packages/Card/card-rolling.vue';

export default {
    components: {
        PmdmodelHeader,
        CardRolling
    },
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>
.BookWorldIndex {
    height: 100%;
    background: linear-gradient(33deg, #121317, #323b42);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
:deep(.cjui-card-rolling) {
    .card-front {
        background: linear-gradient(45deg, #0C7BB3, #F2BAE8);
    }
}
</style>