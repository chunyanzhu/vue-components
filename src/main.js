import Vue from 'vue';
import ModalPage from './pages/ModalPage.vue';
import LoadingPage from './pages/LoadingPage.vue';
import ToastPage from './pages/ToastPage.vue';
import AlertPage from './pages/AlertPage.vue';
import DropDownPage from './pages/DropDownPage.vue';

new Vue({
    el: '.page',
    components: {
        ModalPage,
        LoadingPage,
        ToastPage,
        AlertPage,
        DropDownPage,
    },
    data(){
        return{
            component: 'ModalPage',
        }
    },
    computed: {
    },
    methods: {
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
        
    },
    mounted() {


    }
});
