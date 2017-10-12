import Vue from 'vue'
import Toast from './Toast.vue'

export default {
	methods: {
		openToast: function(){
			const toast = new Vue({
				  ...Toast
				})
		 	const id = 'smart-ui-toast-mount-point'
		  const mountPoint = document.createElement('div')
		  mountPoint.id = id
		  document.body.appendChild(mountPoint)
		  toast.$mount('#' + id)

		    toast.show.apply(toast, arguments)
		    return toast
		  },
		  zIndexToast(zIndex) {
		    toast.zIndex = zIndex
		    return toast
		  }
	}
  
}
