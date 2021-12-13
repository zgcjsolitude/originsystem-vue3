<template>
    <el-row style="padding: 10px">
        <el-col :span="24">
            <div class="menu-card is-1" @click="$router.push('/BookWorld/OriginWorld/OriginPower')">
                <cjui-font-animation :animated="false" theme="fade-on" style="font-size:18px;">源权体系表</cjui-font-animation>
                <br />
                <cjui-font-animation :animated="false" theme="fade-on" style="font-size: 12px;">源权，是对超常者拥有的超越常人能力的一个别称。</cjui-font-animation>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="menu-card is-2" @click="$router.push('/BookWorld/OriginWorld/TimeLine')">
                <cjui-font-animation :animated="false" theme="fade-on" style="font-size:18px;">源星时间线</cjui-font-animation>
                <br />
                <cjui-font-animation :animated="false" theme="fade-on" style="font-size: 12px;">记录源星漫长的岁月史书。</cjui-font-animation>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="menu-card is-2" @click="$router.push('/BookWorld/OriginWorld/Dictionary')">
                <cjui-font-animation :animated="false" theme="fade-on" style="font-size:18px;">根源词典</cjui-font-animation>
                <br />
                <!-- <cjui-font-animation :animated="false" theme="fade-on" style="font-size: 12px;"></cjui-font-animation> -->
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
    margin: 5px;
    border-radius: 4px;
    padding: 10px;
    overflow: hidden;

    &.is-1 {
        background: linear-gradient(45deg, #0C7BB3, #F2BAE8);
    }

    &.is-2 {
        background: linear-gradient(45deg, #5583EE, #41D8DD);
    }
}
</style>