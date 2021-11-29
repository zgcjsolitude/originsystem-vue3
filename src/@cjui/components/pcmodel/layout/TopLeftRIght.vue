<template>
    <div class="TopLeftRightLayout">
        <div class="headerWrapper">
            <header class="header">
                <div class="header-container">
                    <slot name="header"></slot>
                </div>
            </header>
        </div>
        <section class="section">
            <el-scrollbar>
                <div class="section-left">
                    <el-scrollbar>
                        <slot name="sectionLeft"></slot>
                    </el-scrollbar>
                </div>
                <div class="section-right">
                    <slot name="sectionRight"></slot>
                </div>
            </el-scrollbar>

            <div class="right-nav">
                <slot name="rightNav"></slot>
            </div>
        </section>

        <el-backtop target=".TopLeftRightLayout .el-scrollbar__wrap"></el-backtop>
    </div>
</template>

<style lang="scss" scoped>
.TopLeftRightLayout {
    padding-top: 80px;
    height: 100%;
}
.headerWrapper {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 2000;
}
.header {
    height: 80px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;

    .header-container {
        padding: 0 40px;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #dcdfe6;
    }
}
.section {
    margin-top: 0;
    height: 100%;
    min-height: auto;
    position: relative;

    .section-left {
        padding-left: 40px;
        width: 240px;
        position: absolute;
        top: 0;
        bottom: 0;
        transition: padding-top .3s;
    }
    .section-right {
        padding-left: 280px;
        padding-bottom: 100px;
        margin-right: 240px;
        box-sizing: border-box;
    }
}
.right-nav {
    font-size: 12px;
    padding-top: 12px;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
