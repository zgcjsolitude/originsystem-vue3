<template>
  <div class="homeindex">
    <el-row class="homeindex-body">
      <el-col :xs="6" :sm="4" style="height: 80px;">
        <div style="width: 80px;height: 80px;overflow: hidden;border-radius: 80px;">
          <img :src="vuexUserHeaderImggetter" alt style="width: 100%;" />
        </div>
      </el-col>
      <el-col
        :xs="18"
        :sm="20"
        style="height: 48px;line-height: 48px;font-size: 48px;font-family: monospace;font-weight: 600;"
      >
        <div>
          <span>{{ userName }}</span>
        </div>
      </el-col>
      <el-col
        :xs="18"
        :sm="20"
        style="height: 32px;line-height: 32px;font-size: 32px;font-family: -webkit-pictograph;"
      >
        <div>
          <span>SOLITUDE</span>
        </div>
      </el-col>
      <el-col
        :span="24"
        style="margin: 10px 0 30px;letter-spacing: 0.2em;"
      >本人热爱生活，乐于学习，是一枚埋头苦干的Web前端开发小白，你可能觉得我没有情趣，唉，你猜得真准，不过，我其实算得上是一位冷淡却又充满人情味的人啦。
      </el-col>

      <el-col :span="24">
        <p style="font-size: 32px;font-family: -webkit-pictograph;">WORK</p>
        <p style="font-size: 24px;font-family: monospace;font-weight: 600;">经历</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "OSAdminUsermsg",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userName"]),
    ...mapGetters(["vuexUserHeaderImggetter"])
  }
};
</script>

<style lang="scss" scoped>
.homeindex {
  height: 100%;
  width: 100%;
  color: #000000;
  padding: 30px;
}
.homeindex-body {
  width: 60%;
  margin-left: 20%;
  margin-top: 20px;
}

@media only screen and (max-width: 768px) {
  .homeindex {
    padding: 20px;
  }
  .homeindex-body {
    width: 100%;
    margin: 0;
    margin-top: 10px;
  }
}
</style>
