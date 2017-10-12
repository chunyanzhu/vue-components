<template> 
    <div class="component_page">
        <drop-down :value="state" :list="stateList" :callback="setState"></drop-down>
    </div>
</template>
<script>
    import DropDown from '../components/dropDown/DropDown.vue';
    export default{
        data(){
            return{
                state: 0,
                stateList: [
                    {
                        value: 0,
                        text: '全部'
                    },
                    {
                        value: 1,
                        text: '进行中'
                    },
                    {
                        value: 2,
                        text: '待开始'
                    },
                    {
                        value: 3,
                        text: '已结束'
                    },
                    {
                        value: 4,
                        text: '已取消'
                    }
                ],
            }
        },
        components: {
            DropDown,
        },
        methods: {
            setState(val){
                this.state = val;
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    
</style>
