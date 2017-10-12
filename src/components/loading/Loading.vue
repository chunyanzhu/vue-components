<template>
    <div class="Loading" v-show="visible" :style="{zIndex: zIndex}">
        <div class="Loading--main">
            <div class="Spinner" style=""></div>
            <p class="Loading--message" v-show="message">{{message}}</p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            message: '',
            visible: false,
            zIndex: 7
        }
    },

    components: {
    },

    methods: {
        open(message) {
            this.message = message
            this.visible = true
        },

        close() {
            this.message = ''
            this.visible = false
            this.zIndex = 4
        }
    }
}
</script>
<style lang="less">
.Loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, .85)
}

.Loading--main {
    padding: 10px;
    border-radius: 5px;
    line-height: 0;
    text-align: center;
    box-sizing: border-box;
}

.Loading--message {
    margin: 0;
    padding-top: 10px;
    font-size: 12px;
    line-height: 1;
    color: #585858;
}

.Spinner {
    display: inline-block;
    box-sizing: border-box;
    border-radius: 50%;
    border-style: solid;
    animation: spinner .9s linear infinite;
    width: 35px;
    height: 35px;
    border-color: rgba(0, 0, 0, .1) rgba(0, 0, 0, .1) rgba(0, 0, 0, .1) rgba(0, 0, 0, .5);
    border-width: 2px;
}
@keyframes spinner {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
