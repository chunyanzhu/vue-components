import Vue from 'vue';
import Modal from './components/modal/index.js';
import toast from './components/toast/index.js';
import loading from './components/loading/index.js';

new Vue({
    el: '.page',
    components: {
        Modal,
    },
    mixins: [toast, loading],
    data(){
        return{
            /* 是否显示弹层*/
            modalShow: false,
            modalShowTwo: false
        }
    },
    computed: {
    },
    methods: {
        showModal(){
            this.modalShow = true;
        },
        hideModal(){
            this.modalShow =  false;
            console.log('hide')
        },
        showToastFn(){
            this.showToast('1秒后会有第二个toast~', 'top', function() {
             console.log('toast1')
            });
            
            setTimeout(() => {
                this.showToast('两秒后消失', 'center', function() {
                    console.log('toast2')
                });
            }, 1000)
        },
        showLoadingFn(){
            var loading1 = this.showLoading('loading ....', this.$refs.loadingbox);
            var loading2 = this.showLoading('loading ....');
            setTimeout(() => {
                this.hideLoading(loading1);
            },2000)
            setTimeout(() => {
                this.hideLoading(loading2);
            },3000)
        }
    },
    mounted() {


    }
});
