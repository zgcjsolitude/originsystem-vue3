<template>
    <i class="copy el-icon-document-copy" @click="Copy(text)"></i>
</template>

<script>
import Clipboard from 'clipboard';

export default {
    props: {
        text: {
            type: String,
            default: ''
        },
    },
    methods: {
        Copy(text) {
            var clipboard = new Clipboard('.copy', {
                text: function(){
                    return text;
                }
            });
            clipboard.on('success',()=>{
                this.$message({
                    type: "success",
                    message: "复制成功",
                });
                clipboard.destroy()
            });
            clipboard.on('error',()=>{
                this.$message({
                    type: "error",
                    message: "暂不支持复制",
                });
                clipboard.destroy()
            });
        }
    }
}
</script>
