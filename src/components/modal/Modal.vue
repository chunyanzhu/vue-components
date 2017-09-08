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
                    <span class="modal-close" v-if="closeButton" @click="$emit('hide')" />
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
<style>
    @import './style/common.css';
    @import './style/rotate.css';
</style>
