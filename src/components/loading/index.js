import Vue from 'vue'
import Loading from './Loading.vue'
export default {
    methods: {
        openLoading(message, el) {
            const loading = new Vue({
              ...Loading
            })

            const id = 'smart-ui-loading-mount-point'
            const mountPoint = document.createElement('div')
            mountPoint.id = id;
            var el = el || document.body;

            el.style.position = 'relative';
            el.appendChild(mountPoint);
         
            loading.$mount('#' + id);
            if(el != document.body){
                document.querySelectorAll('.Loading').forEach((v, i) => {
                    v.style.position = 'absolute';
                })
            }
          
            loading.open(message);
            return loading;
        },
        zIndexLoading(zIndex) {
            loading.zIndex = zIndex
            return loading
        }
    }

}
