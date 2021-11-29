<template>
  <el-dialog
    class="cjui-expand_el-dialog1 dialog1-demo1"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @close="closeEvent"
  >
    <span slot="title" class="dialog1-demo1_header">
      <span>112条评论</span>
      <span>
        <i class="el-icon-sort"></i>
        切换为时间排序
      </span>
    </span>
    <div class="dialog1-demo1_comment">
      <div class="dialog1-demo1_comment-title">精选评论 （3）</div>
      <ul class="dialog1-demo1_comment-list">
        <li v-for="item in 3" :key="item" class="dialog1-demo1_comment-item">
          <div class="dialog1-demo1_c-i-header">
            <span>
              <a>
                <img src="../../../../../assets/img/img/05.png" alt="" />
              </a>
            </span>
            <span>某某</span>
            <span> 09-22 </span>
          </div>
          <div class="dialog1-demo1_c-i-text">
            <p>
              (五)最高人民法院关于审理未成年人刑事案件具体应用法律若干问题的解释(2006年1月23日法释〔2006〕1号
            </p>
          </div>
          <div class="dialog1-demo1_c-i-footer">
            <button>
              <i class="el-icon-success"></i>
              479
            </button>
            <button>
              <i class="el-icon-s-comment"></i>
              查看回复
            </button>
            <button>
              <i class="el-icon-s-order"></i>
              回复
            </button>
            <button>
              <i class="el-icon-s-check"></i>
              踩
            </button>
            <button>
              <i class="el-icon-s-release"></i>
              举报
            </button>
          </div>
          <ul class="dialog1-demo1_comment-list">
            <li
              v-for="item in 3"
              :key="item"
              class="dialog1-demo1_comment-item"
            >
              <div class="dialog1-demo1_c-i-header">
                <span>
                  <a>
                    <img src="../../../../../assets/img/img/05.png" alt="" />
                  </a>
                </span>
                <span>某某</span>
                <span> 09-22 </span>
              </div>
              <div class="dialog1-demo1_c-i-text">
                <p>
                  (五)最高人民法院关于审理未成年人刑事案件具体应用法律若干问题的解释(2006年1月23日法释〔2006〕1号
                </p>
              </div>
              <div class="dialog1-demo1_c-i-footer">
                <button>
                  <i class="el-icon-success"></i>
                  479
                </button>
                <button>
                  <i class="el-icon-s-comment"></i>
                  查看回复
                </button>
                <button>
                  <i class="el-icon-s-order"></i>
                  回复
                </button>
                <button>
                  <i class="el-icon-s-check"></i>
                  踩
                </button>
                <button>
                  <i class="el-icon-s-release"></i>
                  举报
                </button>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="dialog1-demo1_comment-title">评论 （3）</div>
      <ul class="dialog1-demo1_comment-list">
        <li v-for="item in 3" :key="item" class="dialog1-demo1_comment-item">
          <div class="dialog1-demo1_c-i-header">
            <span>
              <a>
                <img src="../../../../../assets/img/img/05.png" alt="" />
              </a>
            </span>
            <span>某某</span>
            <span> 09-22 </span>
          </div>
          <div class="dialog1-demo1_c-i-text">
            <p>
              (五)最高人民法院关于审理未成年人刑事案件具体应用法律若干问题的解释(2006年1月23日法释〔2006〕1号
            </p>
          </div>
          <div class="dialog1-demo1_c-i-footer">
            <button>
              <i class="el-icon-success"></i>
              479
            </button>
            <button>
              <i class="el-icon-s-comment"></i>
              查看回复
            </button>
            <button>
              <i class="el-icon-s-order"></i>
              回复
            </button>
            <button>
              <i class="el-icon-s-check"></i>
              踩
            </button>
            <button>
              <i class="el-icon-s-release"></i>
              举报
            </button>
          </div>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-input placeholder="写下你的评论"></el-input>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>     

<script>
export default {
  name: "dialog1-demo1",
  data() {
    return {
      dialogVisible: true,
    };
  },
  methods: {
    closeEvent() {
      this.$emit("closeEvent");
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
// ======固定模态框外部大小，内部滚动
// color
.dialog1-demo1 {
  /deep/ .el-dialog__header {
    background: #fff;
    color: #121212;
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  /deep/ .el-dialog__footer {
    border-top: 1px solid #eee;

    .el-input__inner:focus {
      border-color: #8590a6;
    }
  }
}
// layout
.dialog1-demo1 {
  $radius: 3px;

  /deep/ .el-dialog {
    height: 90%;
    border-radius: $radius;
  }
  /deep/ .el-dialog__header {
    padding: 15px 20px;
    border-radius: $radius $radius 0 0;
  }
  /deep/ .el-dialog__title {
    font-size: 16px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 12px;
    right: -36px;
    font-size: 24px;
    transition: all 0.3s ease;
  }
  /deep/ .el-dialog__headerbtn:hover {
    transform: rotate(180deg);
  }
  /deep/ .dialog-footer {
    display: flex;

    .el-input {
      padding-right: 20px;
    }
    .el-input__inner {
      border-radius: 2px;
    }
  }
}
.dialog1-demo1_header {
  display: block;
  color: #121212;
  font-weight: 600;

  span:last-child {
    float: right;
    color: #8590a6;
    font-weight: normal;
    cursor: pointer;
    font-size: 14px;
  }
}
.dialog1-demo1_comment-title {
  padding: 10px 20px;
  font-size: 14px;
  color: grey;
  background-color: #f6f6f6;
  font-weight: 600;

  & + .dialog1-demo1_comment-list > .dialog1-demo1_comment-item:first-child {
    border: 0;
  }
}
.dialog1-demo1_comment-list {
  position: relative;
  padding: 0 20px;
}
.dialog1-demo1_comment-item {
  position: relative;
  flex-shrink: 0;
  padding: 12px 0 5px;
  font-size: 15px;
  list-style-type: none;
  border-top: 1px solid #eee;
}
.dialog1-demo1_c-i-header {
  & > span {
    vertical-align: middle;
  }
  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
  }
  & > span:nth-child(2) {
    margin-left: 0.5em;
  }
  & > span:last-child {
    float: right;
    color: #8590a6;
  }
}
.dialog1-demo1_c-i-text {
  padding-left: 30px;

  p {
    margin-bottom: 0.5em;
  }
}
.dialog1-demo1_c-i-footer {
  padding-left: 30px;
  padding-bottom: 10px;

  button {
    padding: 0;
    background-color: transparent;
    border: none;
    border-radius: 0;
    color: #8590a6;
    margin-right: 1em;
    cursor: pointer;
  }
}
</style>