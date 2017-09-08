import Vue from 'vue'
import Loading from './Loading.vue'

// const loading = new Vue({
//   ...Loading
// })

// ;(() => {
//   const id = 'smart-ui-loading-mount-point'
//   const mountPoint = document.createElement('div')
//   mountPoint.id = id
//   document.body.appendChild(mountPoint)
//   loading.$mount('#' + id)
// })()

export default {
	methods: {
		  showLoading(message, el) {
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
		  	//console.log(document.querySelector('.Loading'));
		  	document.querySelectorAll('.Loading').forEach((v, i) => {
		  		v.style.position = 'absolute';
		  	})
		  }
		  
		    loading.show(message);
		    return loading;
		  },

		  hideLoading(loading) {
		    loading.hide()
		  },

		  zIndexLoading(zIndex) {
		    loading.zIndex = zIndex
		    return loading
		  }
	}

}
