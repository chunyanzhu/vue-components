import Pagination from './Pagination.vue';

function getDefaultPage() {
	return {
		pageNo: 1,
		pageSize: 10,
		maxPageSize: 100,
		totalCount: 0,
		totalPage: 1
	};
}

export default {

	components: {Pagination},

	data() {
		return {
			pagination: {
				nextPageNo: 1,
	            page: {
	                pageNo: 1,
	                pageSize: 10,
	                maxPageSize: 100,
	                totalCount: 0,
	                totalPage: 1
	            }
			}
		}
	},

	mounted() {
		this.eventVm.$on('pagination.click', (action, value) => {
			if(action === 'first') {
				this.pagination.nextPageNo = 1;
			} else if(action === 'last') {
				this.pagination.nextPageNo = this.pagination.page.totalPage;
			} else if(action === 'pre') {
				this.pagination.nextPageNo = this.pagination.page.pageNo - 1;
			} else if(action === 'next') {
				this.pagination.nextPageNo = this.pagination.page.pageNo + 1;
			} else if(value) {
				this.pagination.nextPageNo = value;
			}
			this.nextPage({
				pageNo: this.pagination.nextPageNo,
				pageSize: this.pagination.page.pageSize
			});
		});
		this.eventVm.$on('pagesize.select', (value) => {
			this.nextPage({
				//pageNo: this.pagination.nextPageNo,
				pageNo: 1,
				pageSize: value
			});
		});
	},

	methods: {
		getPage() {
			return {
				pageNo: this.pagination.page.pageNo,
				pageSize: this.pagination.page.pageSize
			}
		},
		resetPagination() {
			this.pagination.page = getDefaultPage();
			this.pagination.nextPageNo = 1;
		},
		setPage(page) {
			page = page || getDefaultPage();

			for(var i in page) {
				if(this.pagination.page.hasOwnProperty(i)) {
					this.pagination.page[i] = page[i];
				}
			}
		},
		nextPage(params) {

		}
	}

}
