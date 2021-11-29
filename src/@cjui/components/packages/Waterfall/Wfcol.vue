<template>
    <div class="cjui-wfcol-container">
        <div class="cjui-wfcol">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CjuiWfcol",
};
</script>

<style>
.cjui-wfcol-container {
    padding: 8px;
    box-sizing: border-box;
    opacity: 0;
}
</style>
