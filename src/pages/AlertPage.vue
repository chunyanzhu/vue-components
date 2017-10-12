<template> 
    <div class="component_page">
        <button @click="showAlert()">弹弹弹</button>
    </div>
</template>
<script>
    import Alert from '../components/alert/index.js'
    export default{
        mixins: [Alert],
        data(){
            return{

            }
        },
        methods: {
            showAlert(){
                var myAlert = this.openAlert({
                    title: '提示',
                    content: '关注主播不迷路',
                    btn1: {
                        text: '关注',
                        callback(){
                            console.log('已关注');
                            myAlert.close();
                        }
                    },
                    btn2: {
                        text: '取消'
                    }
                })
            }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    
</style>
