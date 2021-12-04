<template>
    <div class="cjui-card-rolling">
        <div class="card-container">
            <div class="card-front">
                <div>
                    <slot name="front"></slot>
                </div>
            </div>
            <div class="card-back">
                <div>
                    <slot name="back"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.cjui-card-rolling {
    width: 300px;
    height: 480px;
    margin: 15px;
    perspective: 600;

    .card-container {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: 0.7s;
    }

    &:hover .card-container {
        transform: rotateY(180deg);
    }

    .card-front, .card-back {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        overflow: auto;
        position: absolute;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .card-front {
        background: linear-gradient(33deg, #6cacff, #8debff);
    }

    .card-back {
        transform: rotateY(180deg);
        background: linear-gradient(33deg, #5583ee, #41d8dd);
    }
}
</style>