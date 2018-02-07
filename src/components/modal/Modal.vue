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
                    <div :class="['dialog_main', {hasfooter: okButton || cancelButton}]">
                        <slot></slot>
                    </div>
                    <div class="footer" v-if="okButton || cancelButton">
                        <a v-if="okButton" href="javascript:;" @click="okButton.callback()">{{okButton.text}}</a>
                        <a v-if="cancelButton" href="javascript:;" @click="cancelButton.callback()">{{cancelButton.text}}</a>
                    </div>
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
            type: Number|String,/*支持百分比*/
        },
        height: {
            type: Number|String,
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
        },
        okButton: {
            type: Object,
            default: null
        },
        cancelButton: {
            type: Object,
            default: null
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
                width: typeof this.width == 'number' ? `${this.width  + this.measure}` : `${this.width}`,
                height: typeof this.height == 'number' ? `${this.height  + this.measure}` : `${this.height}`,
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;  
}

.modal-mask {
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
    right: 20px;
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
