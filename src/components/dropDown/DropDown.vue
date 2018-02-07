<template>
    <div :class="['selection', {selection_down: showMenu, 'disabled': disabled}]" :style="{'zIndex': zIndex}">
        <input type="hidden" name="" v-model="val">
        <i :class="['dropdown_icon', {'up': showMenu}]" @click="!disabled ? (showMenu = !showMenu) : ''" ref="downIcon"></i>
        <div class="text" ref="text" @click="!disabled ? (showMenu = true) : ''">{{getText()}}</div>
        <div :class="['menu', {'hidden': !showMenu}]" ref="menu">
            <div v-for="item in list" 
                :class="['item', {'active': item.value== value}]" 
                :data-value="item.value"
                @click="select(item)"
            >
                {{item.text}}
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['disabled', 'value', 'list', 'callback', 'zIndex'],
        data(){
            return{
                showMenu: false,
                val: this.value,
            }
        },
        computed: {

        },
            
        methods: {
            setVal(val){
                this.val = val;
            },
            getText(){
                for(var i= 0; i < this.list.length; i++ ){
                    if(this.list[i].value == this.value){
                        return this.list[i].text;
                    }
                }
                return '请选择';
            },
            select(item){
                this.val = item.value;
                this.txt = item.text;
                this.showMenu = false;
                this.callback && (typeof this.callback == 'function') && this.callback(item.value);
            }
        },
        mounted(){
            document.body.addEventListener('click', (e) => {
                var target = e.target;
                var _this = this;
                function checkEl(el){
                    if(el == _this.$el){
                        return true;
                    }
                    if(el.parentElement){
                        checkEl(el.parentElement);
                    }
                    return false;
                }
                var targetInEl = checkEl(target);
                if(!targetInEl){
                    this.showMenu = false;
                }else{
                    this.showMenu = true;
                }
            }, true);
        }
    }
</script>
<style lang="less">
@grey_color: #ccc;
@blue_color: #3399ff;
    .selection{
        position: relative;
        border: solid 1px @grey_color;
        height: 35px;
        line-height: 35px;
        border-radius: 4px;
        box-sizing: border-box;
        &.selection_down{
            border-radius: 4px 4px 0 0;
        }
        &:hover{
            border: solid 1px @blue_color;
            .menu{
                border: solid 1px @blue_color;
                border-top: none;
            }
        }
        .dropdown_icon{
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px;
            line-height: 67%;
            &:before{
                content: '';
                display: inline-block;
                width: 10px;
                height: 10px;
                border-top: solid 1px rgba(0, 0, 0, .5);
                border-left: solid 1px rgba(0, 0, 0, .5);
                transform: rotate(-135deg);
            }
            &.down{
                line-height: 67%;
                &:before{
                    transform: rotate(-135deg);
                }
            }
            &.up{
                line-height: 130%;
                &:before{
                    transform: rotate(45deg);
                }
            }
        }
        .text{
            padding: 0 10px;
        }
        .menu{
            position: absolute;
            top: 100%;
            left: -1px;
            width: 100%;
            max-height: 200px;
            overflow-x: hidden;
            overflow-y: auto;
            border: solid 1px #ccc;
            border-top: none;
            background: #fff;
            z-index: 10;
            border-radius: 0 0 4px 4px;
            &.hidden{
                display: none;
            }
            &.visibile{
                display: block;
            }
            .item{
                border-top: dashed 1px #ddd;
                white-space: nowrap;
                word-wrap: normal;
                padding: 0 10px;
                box-sizing: border-box;
                height: 35px;
                line-height: 35px;
                overflow: hidden;
                text-overflow: ellipsis;
                &.active, &:hover{
                    background: #e4f2ff;
                }
            }
        }
    }
</style>
