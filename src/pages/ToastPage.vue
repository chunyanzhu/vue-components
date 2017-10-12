<template> 
    <div class="component_page">
        <button @click="showToast()">Toast</button>
    </div>
</template>
<script>
    import toast from '../components/toast/index.js';
    export default{
        mixins: [toast],
        data(){
            return{

            }
        },
        methods: {
            showToast(){
                this.openToast('1秒后会有第二个toast~', 'top', function() {
                 console.log('toast1')
                });
                
                setTimeout(() => {
                    this.openToast('两秒后消失', 'center', function() {
                        console.log('toast2')
                    });
                }, 1000)
            },
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    
</style>
