import Vue from 'vue'
import Alert from './Alert.vue'
export default {
    methods: {
        openAlert(options){
            const alert = new Vue({
                ...Alert
            });
            const id = 'alert_body';
            const alertBody = document.createElement('div');
            alertBody.id = id;
            document.body.appendChild(alertBody);
            //debugger;
            alert.$mount('#' + id);

            alert.open(options);
            return alert;
        },
    },
    mounted(){

    }
}
