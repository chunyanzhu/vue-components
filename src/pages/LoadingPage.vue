<template>
    <div class="component_page">
        <button @click="showLoadingFn()">Loading 点我弹出Loading</button>
        <div style="height: 200px;border: border: solid 1px #666; background: #ccc" ref="loadingbox"></div>
    </div>
</template>
<script>
    import loading from '../components/loading/index.js';
    export default{
        mixins: [loading],
        data(){
            return{

            }
        },
        methods: {
            showLoadingFn(){
                var loading1 = this.showLoading('loading ....', this.$refs.loadingbox);
                var loading2 = this.showLoading('loading ....');
                setTimeout(() => {
                    loading1.close();
                },2000)
                setTimeout(() => {
                    loading2.close();
                },3000)
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    
</style>
