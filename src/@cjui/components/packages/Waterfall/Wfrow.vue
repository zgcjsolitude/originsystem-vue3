<template>
    <div class="cjui-wfrow-container">
        <div class="cjui-wfrow" :id="id">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import elementResizeDetectorMaker from 'element-resize-detector';
import { onMounted, onUnmounted, ref, reactive, toRefs, watch, onUpdated, nextTick } from 'vue';

export default {
    name: "CjuiWfrow",
    props: {
        id: {
            type: String,
            default: "CjuiWfrow",
        },
        // 列数
        count: {
            type: Number,
            default: 1,
        }, 
        // 列数响应
        xs: {
            type: Number,
            default: -1,
        },
        sm: {
            type: Number,
            default: -1,
        },
        md: {
            type: Number,
            default: -1,
        },
        lg: {
            type: Number,
            default: -1,
        },
        xl: {
            type: Number,
            default: -1,
        },
    },
    setup(props, context) {
        const { id, count, xs, sm, md, lg, xl } = toRefs(props);

        const heightList = ref([]);
        function getHeightList() {
            let array = [];
            for (let i = 0; i < column.value; i++) {
                array.push(100);
            }
            heightList.value = array;
        }
        function getHeightListMinIndex() {
          const min = Math.min.apply(null, heightList.value);
          const index = heightList.value.findIndex((el) => el === min);
          return index;
        }
        function getHeightListMax() {
          return Math.max.apply(null, heightList.value);
        }

        const column = ref(0);
        const number = ref(0);
        const oldNodeWidth = ref(0);
        function getColumn() {
            const nodeName = `#${id.value}`;
            const nodeWidth = $(nodeName).width();
            column.value = count.value;
            if (nodeWidth < 768 && xs && xs.value > 0) column.value = xs.value;
            if (nodeWidth >= 768 && sm && sm.value > 0) column.value = sm.value;
            if (nodeWidth >= 992 && md && md.value > 0) column.value = md.value;
            if (nodeWidth >= 1200 && lg && lg.value > 0) column.value = lg.value;
            if (nodeWidth >= 1920 && xl && xl.value > 0) column.value = xl.value;
        }
        const timer = ref(null);
        function imgLoadEvent() {
            clearTimeout(timer.value)
            timer.value = setTimeout(() =>{
                timer.value = null;
                initNodes();
            }, 100);
        }
        // tag -- page/column 新元素渲染/元素移位
        function initNodes(tag = 'page') {
            nextTick(() => {
                getHeightList();

                let width = 100 / column.value + "%";
                $(`#${id.value} > .cjui-wfcol-container`).innerWidth(width);

                let to = $(`#${id.value} .cjui-wfcol-container`).length;
                for (let i = 0; i < to; i++) {
                    let imgNumber = $(`#${id.value} .cjui-wfcol-container:eq("${i}") img`).length;
                    let imgAllLoad = true;
                    for (let j = 0; j < imgNumber; j++) {
                        let img = new Image();
                        img.src = $(`#${id.value} .cjui-wfcol-container:eq("${i}") img:eq("${j}")`).attr("src");
                        if (img.complete) {
                            continue
                        } else {
                            imgAllLoad = false;
                            img.onload = function() {
                                imgLoadEvent();
                            }
                            img.onerror = function() {
                                imgLoadEvent();
                            }
                        }
                    }
                    
                    if (!imgAllLoad) break

                    let index = getHeightListMinIndex();
                    if (tag === 'page') {
                        $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).css("left", ((index % column.value) * 100) / column.value + "%");
                        $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).css("top", heightList.value[index]);
                        $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).animate({ top: "-=100", opacity: 1 });
                    } else {
                        $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).animate({
                            left: ((index % column.value) * 100) / column.value + "%",
                            top: heightList.value[index] - 100,
                            opacity: 1,
                        });
                    }
                    heightList.value[index] += $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).innerHeight();

                    let max = getHeightListMax();
                    $(`#${id.value}`).height(max);
                }
                number.value = $(`#${id.value} .cjui-wfcol-container`).length;
            });
        }
        const timerNew = ref(null);
        function imgNewLoadEvent(from) {
            if (timer) {
                return
            }
            clearTimeout(timerNew.value)
            timerNew.value = setTimeout(() =>{
                initNewNodes(from);
            }, 100);
        }
        // 开放方法，新元素渲染
        function initNewNodes(from = number.value) {
            nextTick(() => {
                let width = 100 / column.value + "%";
                $(`#${id.value} > .cjui-wfcol-container`).innerWidth(width);

                let to = $(`#${id.value} .cjui-wfcol-container`).length;
                for (let i = from; i < to; i++) {
                    let imgNumber = $(`#${id.value} .cjui-wfcol-container:eq("${i}") img`).length;
                    let imgAllLoad = true;
                    for (let j = 0; j < imgNumber; j++) {
                        let img = new Image();
                        img.src = $(`#${id.value} .cjui-wfcol-container:eq("${i}") img:eq("${j}")`).attr("src");
                        if (img.complete) {
                            continue
                        } else {
                            imgAllLoad = false;
                            img.onload = function() {
                                imgNewLoadEvent(from);
                            }
                            img.onerror = function() {
                                imgNewLoadEvent(from);
                            }
                        }
                    }

                    if (!imgAllLoad) break

                    let index = getHeightListMinIndex();
                    $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).css("left", ((index % column.value) * 100) / column.value + "%").css("top", this.heightList[index]);
                    $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).animate({ top: "-=100", opacity: 1 });
                    heightList.value[index] += $(`#${id.value} .cjui-wfcol-container:eq("${i}")`).innerHeight();

                    let max = getHeightListMax(); // 最低列序号
                    $(`#${id.value}`).height(max);
                }
                number.value = $(`#${id.value} .cjui-wfcol-container`).length;
            });
        }
        watch(() => [count.value, xs.value, sm.value, md.value, lg.value, xl.value], (newVal, oldVal) => {
            const oldColumn = column.value;
            const nodeWidth = $(`#${id.value}`).width();
            getColumn();
            if (column.value === oldColumn && nodeWidth !== oldNodeWidth.value) {
                return
            }
            initNodes('column');
        }, {
            immediate: false,
        });

        onMounted(() => {
            let erd = elementResizeDetectorMaker();
            erd.listenTo(document.getElementById(id.value), function() {
                const nodeWidth = $(`#${id.value}`).width();
                if (oldNodeWidth.value !== nodeWidth) {
                    oldNodeWidth.value = nodeWidth;
                    getColumn();
                    initNodes('column');
                }
            });
        });

        return {
            initNodes,
            initNewNodes,
        }
    },
};
</script>

<style>
.cjui-wfrow-container {
    width: 100%;
    position: relative;
}
.cjui-wfrow {
    width: 100%;
    position: relative;
}
.cjui-wfrow .cjui-wfcol-container {
    margin: 0 !important;
    position: absolute;
}
</style>