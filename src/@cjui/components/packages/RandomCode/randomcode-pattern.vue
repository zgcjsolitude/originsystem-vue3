<template>
    <div class="cjui-randomcode-pattern" @click="createdCode">
        <canvas id="cjui-randomcode-pattern" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>

<script>
import { onMounted, ref, toRefs } from 'vue';

export default {
    name: "CjuiRandomCodePattern",
    props: {
        fontSizeMin: {
            type: Number,
            default: 25,
        },
        fontSizeMax: {
            type: Number,
            default: 30,
        },
        backgroundColorMin: {
            type: Number,
            default: 255,
        },
        backgroundColorMax: {
            type: Number,
            default: 255,
        },
        colorMin: {
            type: Number,
            default: 0,
        },
        colorMax: {
            type: Number,
            default: 160,
        },
        lineColorMin: {
            type: Number,
            default: 100,
        },
        lineColorMax: {
            type: Number,
            default: 255,
        },
        dotColorMin: {
            type: Number,
            default: 0,
        },
        dotColorMax: {
            type: Number,
            default: 255,
        },
        contentWidth: {
            type: Number,
            default: 120,
        },
        contentHeight: {
            type: Number,
            default: 34,
        },
    },
    setup(props, { emit }) {
        const {
            backgroundColorMin,
            backgroundColorMax,
            contentWidth, 
            contentHeight,
            colorMin, 
            colorMax,
            fontSizeMin, 
            fontSizeMax,
            lineColorMin,
            lineColorMax
        } = toRefs(props);

        const identifyCode = ref('');

        // 生成4个随机数 并 绘制
        function createdCode() {
            const len = 4;
            const codeList = [];
            const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
            const charsLen = chars.length;
            for (let i = 0; i < len; i++) {
                codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)));
            }
            identifyCode.value = codeList.join("");
            emit("getIdentifyCode", identifyCode.value);
            drawPic();
        }

        // 生成一个随机的颜色
        function randomColor(min, max) {
            const r = randomNum(min, max);
            const g = randomNum(min, max);
            const b = randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        // 生成一个随机数
        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        // 绘制文字
        function drawText(ctx, txt, i) {
            ctx.fillStyle = randomColor(colorMin.value, colorMax.value);
            ctx.font = randomNum(fontSizeMin.value, fontSizeMax.value) + "px SimHei";
            const x = (i + 1) * (contentWidth.value / (identifyCode.value.length + 1));
            const y = randomNum(fontSizeMax.value, contentHeight.value - 5);
            const deg = randomNum(-45, 45);
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate((deg * Math.PI) / 180);
            ctx.fillText(txt, 0, 0);
            // 恢复坐标原点和旋转角度
            ctx.rotate((-deg * Math.PI) / 180);
            ctx.translate(-x, -y);
        }
        // 绘制干扰线
        function drawLine(ctx) {
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = randomColor(
                    lineColorMin.value,
                    lineColorMax.value
                );
                ctx.beginPath();
                ctx.moveTo(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value));
                ctx.lineTo(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value));
                ctx.stroke();
            }
        }
        // 绘制干扰点
        function drawDot(ctx) {
            for (let i = 0; i < 80; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, contentWidth.value), randomNum(0, contentHeight.value),
                    1,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        }

        // 绘制图案
        function drawPic() {
            const canvas = document.getElementById("cjui-randomcode-pattern");
            const ctx = canvas.getContext("2d");
            ctx.textBaseline = "bottom";

            // 绘制背景
            ctx.fillStyle = randomColor(
                backgroundColorMin.value,
                backgroundColorMax.value
            );
            ctx.fillRect(0, 0, contentWidth.value, contentHeight.value);
      
            // 绘制文字
            for (let i = 0; i < identifyCode.value.length; i++) {
                drawText(ctx, identifyCode.value[i], i);
            }

            drawLine(ctx);
            drawDot(ctx);
        }

        onMounted(() => {
            createdCode();
        });

        return {
            createdCode,
        }
    }
};
</script>

<style lang="scss">
.cjui-randomcode-pattern {
    height: 38px;
    cursor: pointer;
}
.cjui-randomcode-pattern canvas {
    margin-top: 1px;
    margin-left: 8px;
}
</style>
