<template>
    <transition name="modal-fade">
        <div 
            v-show="show" 
            tabindex="-1"
            :style="style" 
            :class="['modal', className]" 
            @keyup.esc="onEsc" 
        >
            <div class="modal-mask" v-if="mask" @click="closeAble ? $emit('hide') : ''" >
            </div>
            <transition :name="`modal-${animation}`">
                <div class="modal-dialog" v-show="show" :style="dialogStyle">
                    <div class="title" v-if="title"><span class="modal-close" v-if="closeButton" @click="$emit('hide')">+</span>{{title}}</div>
                    <span class="modal-close" v-if="closeButton && !title" @click="$emit('hide')">+</span>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'modal',

    props: {
        show: {
            type: Boolean,
            required: true
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 240
        },
        duration: {
            type: Number,
            default: 300
        },
        measure: {
            type: String,
            default: 'px'
        },
        animation: {
            type: String,
            default: 'zoom'
        },
        mask: {
            type: Boolean,
            default: true  
        },
        closeButton: {
            type: Boolean,
            default: true
        },
        className: {
            type: String,
            default: ''
        },
        //点击遮罩层 是否关闭弹层
        closeAble: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        }
    },

    computed: {
        style() {
            return {
                animationDuration: `${this.duration}ms`,
                webkitAnimationDuration: `${this.duration}ms`
            };
        },
        dialogStyle() {
            return {
                ...this.style,
                width: `${this.width + this.measure}`,
               // height: `${this.height + this.measure}`
            }
        }
    },

    methods: {
        onEsc() {
            this.show && this.$emit('hide');
        }
    },

    watch: {
        show(show) {
            show && this.$nextTick(() => {
                this.$el.focus();
            })
        }
    }
}
</script>
<style lang="less">
.modal,
.modal-mask {
    
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    
}

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
}

.modal-dialog {
    position: relative;
    z-index: 101;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    max-height: 100%;
    overflow: auto;
    .title{
        height: 45px;
        line-height: 45px;
        padding: 0 22px;
        background: #eee;
        border: solid 1px #ccc;
        position: relative;
    }
}

.modal-close {
    position: absolute;
    top: 0;
    right: 10px;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: #3399ff;
    color: #fff;
    transform: rotate(45deg);
    margin: 12px 0 0 0;
    line-height: 15px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
}

/* -- fade -- */
@-webkit-keyframes modal-fade-enter {
    from {
        opacity: 0;
    }
}

@keyframes modal-fade-enter {
    from {
        opacity: 0;
    }
}

.modal-fade-enter-active {
    -webkit-animation: modal-fade-enter both ease-in;
    animation: modal-fade-enter both ease-in;
}

@-webkit-keyframes modal-fade-leave {
    to {
        opacity: 0
    }
}

@keyframes modal-fade-leave {
    to {
        opacity: 0
    }
}

.modal-fade-leave-active {
    -webkit-animation: modal-fade-leave both ease-out;
    animation: modal-fade-leave both ease-out;
}

</style>
