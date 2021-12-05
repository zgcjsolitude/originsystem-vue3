<template>
    <el-row style="padding: 10px">
        <el-col :span="24">
            <div class="menu-card" @click="$router.push('/BookWorld/OriginWorld/OriginPower')">
                <cjui-font-animation theme="fade-on" style="font-size:18px;">源权体系表</cjui-font-animation>
                <p style="color: #d5e3e5;font-size: 12px;">源权，是对超常者拥有的超越常人能力的一个别称。</p>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    components: {
    },
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>
.menu-card {
    background: linear-gradient(45deg, #5583EE, #41D8DD);
    margin: 5px;
    border-radius: 4px;
    padding: 10px;
    overflow: hidden;
}
</style>