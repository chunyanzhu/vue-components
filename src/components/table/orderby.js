import OrderByIcon from './OrderByIcon.vue';

export default {

	components: {OrderByIcon},

	data() {
		return {
			orderby: {
				default: '',
				defaultDesc: true,
	            current: '',
	            desc: true,
			}
		}
	},

	mounted() {
		this.eventVm.$on('orderby.click', (orderByIcon) => {
			var orderBy = orderByIcon.orderby;
			var desc = false;
			if(orderByIcon.state === 'all') {
				desc = true;
			}
			if(orderByIcon.state !== 'all' && !orderByIcon.desc) {
				desc = true;
			}
			this.orderBy({
				orderBy: orderBy,
				desc: desc
			});
		});
	},

	methods: {
		resetOrderby() {
			this.orderby.current = this.orderby.default;
			this.orderby.desc = this.orderby.defaultDesc;
		},
		setOrderby(orderby) {
			Object.assign(this.orderby, orderby);
		},
		getOrderby() {
			return {
				orderBy: this.orderby.current,
				desc: this.orderby.desc
			};
		},
		orderBy(params) {

		}
	}
};
