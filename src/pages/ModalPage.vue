<template>
    <div class="component_page">
        <button @click="showModal()">Modal 点我弹层</button>
        <modal
            :show="modalShow" 
            @hide="hideModal()" 
            :mask="true" 
            :width="850" 
            :height="300" 
            :close-able="true"
            :closeButton="false"
            >
            <div style="overflow: auto; padding: 10px;">
            <ul v-for="i in 100">{{i}}</ul>
            这是一个modal <br>
            <button @click="modalShowTwo = true">第二个弹层</button>
                <modal 
                    :show="modalShowTwo" 
                    :mask="false" 
                    @hide="modalShowTwo = false;"
                    width="50%"
                    title="第二个弹层">
                    <div style="padding: 20px;">第二个modal</div>
                </modal>
            </div>
        </modal>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Modal from '../components/modal/index.js';
    export default{
        data(){
            return {
                /* 是否显示弹层*/
                modalShow: false,
                modalShowTwo: false,
            }
        },
        components: {
            Modal,
        },
        methods: {
            showModal(){
                this.modalShow = true;
            },
            hideModal(){
                this.modalShow =  false;
                console.log('hide')
            },
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    
</style>
