import Vue from 'vue';
//import dimmerMixin from '../dimmer';
import loading from '../loading';
import orderbyMixin from './orderby';
import paginationMixin from './pagination';

function applyIf(target, source) {
	for(var i in source) {
		if(target[i] == void 0) {
			target[i] = source[i];
		}
	}
}

export default {

	mixins: [orderbyMixin, paginationMixin, loading],

	data() {
		return {
			table: {
				ajaxURL: null,
				pagination: true,
				orderby: true,
				dimmer: true,
				type: 'get'
			}
		}
	},

	methods: {

		resetTable() {
			this.resetPagination();
			this.resetOrderby();
        },

		nextPage(params) {
			this.loadTableByParams(params);
		},

		orderBy(params) {
			this.loadTableByParams(params);
		},

		fillQueryParams(params) {
			//getPage 获取pageNo 和pageSize 默认1、10 可以在业务代码中覆盖 
			this.table.pagination && applyIf(params, this.getPage());
			//this.table.orderby && applyIf(params, this.getOrderby());
			//每个接口的传参  业务代码中设置
			this.fillCustomQueryParams(params);
		},

		fillCustomQueryParams(params) {

		},

		loadTable(callback) {
			this.loadTableByParams(null, callback);
		},

		loadTableByParams(params, callback) {
			var dimmerTime = Date.now();
			var loading;
			if(this.table.dimmer) {
				//this.dimmer();
				loading = this.openLoading('loading ....', this.$el);
            
			}
			params = params || {};
			this.fillQueryParams(params);
			this.requestTable(params, () => {
				if(this.table.dimmer) {
					setTimeout(() => loading.close(), 400-(Date.now()-dimmerTime));
                	
				}
				callback && callback();
			});
		},

		requestTable(params, callback) {
			//var orderBy = params.orderBy;
			//var desc = params.desc;
			//var pageNo = params.pageNo;
			//var pageSize = params.pageSize;
			var type = this.table.type.toUpperCase() == 'POST' ? 'post': 'get';
			$.ajax({
				url: this.table.ajaxURL,
				data: params,
				type: type,
				//timeout: 5000,
				//contentType: this.table.contentType,
				success: (data) => {
					// if(TEST) {
					// 	this.updateTable(data, params);
					// }
					if(data.code != 0) {
						alert(data.msg || '系统故障，请稍后重试！');
						callback && callback();
					} else {
						this.updateTable(data, params);
						callback && callback();
					}
				},
				error: () => {
					alert('系统故障，请稍后重试！');
				}
			});
		},

		updateTable(data, params) {
			this.updateTableMixins(data, params);
		},

		updateTableMixins(data, params) {
			this.setOrderby({
				current: params.orderBy,
				desc: params.desc
			});
			this.setPage(data.page);
		}

	}

}
//@todo  loadTable/updateTable/updateTableMixins/resetTable
/*
	loadTable: 加载table数据 发起ajax
	updateTable：默认是执行updteTableMixins 可以在业务逻辑代码中重设updateTable ajax成功后执行
	resetTable:恢复默认设置（设置page的参数）
*/
