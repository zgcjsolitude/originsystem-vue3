<template>
    <div class="cjui-loading-solar">
        <div class="earth-orbit orbit">
            <div class="planet earth"></div>
            <div class="venus-orbit orbit">
                <div class="planet venus"></div>
                <div class="mercury-orbit orbit">
                    <div class="planet mercury"></div>
                    <div class="sun"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CjuiLoadingSolar",
};
</script>

<style lang="scss">
.cjui-loading-solar {
    & {
        width: 250px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .orbit {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ffffffa5;
        border-radius: 50%;
    }
    .earth-orbit {
        width: 165px;
        height: 165px;
        animation: cjuiloadingsolarSpin 12s linear 0s infinite;
    }
    .venus-orbit {
        width: 120px;
        height: 120px;
        animation: cjuiloadingsolarSpin 7.4s linear 0s infinite;
    }
    .mercury-orbit {
        width: 90px;
        height: 90px;
        animation: cjuiloadingsolarSpin 3s linear 0s infinite;
    }
    .planet {
        position: absolute;
        top: -5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #3ff9dc;
    }
    .sun {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #ffab91;
    }
}
@keyframes cjuiloadingsolarSpin {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>