<template language="html">
    <div class="pagination">
        <select name="" id="" class="page_size_select" v-if="pageSizeList" v-model="page.pageSize" @change="setPageSize($event)" ref="pageSizeSelect">
            <option v-for="(item, index) in pageSizeList" :value="item">{{item}}</option>
        </select>
      <a data-action="first" v-bind:class="'item ' + (hasPrePage?'':'disabled')">首页</a>
      <a data-action="pre" v-bind:class="'page-pre icon item ' + (hasPrePage?'':'disabled')">
        <i class="left chevron icon"></i>
      </a>
      <a v-for="pageNum in pages" v-bind:class="'item ' + (pageNum==page.pageNo?'active':'')"
        data-action="page" v-bind:data-value="pageNum">{{pageNum}}</a>
        <a data-action="next" v-bind:class="'page-next icon item ' + (hastNextPage?'':'disabled')">
        <i class="right chevron icon"></i>
      </a>
      <a data-action="last" v-bind:class="'page-last item ' + (hastNextPage?'':'disabled')">末页</a>
      <input type="text" v-if="pageNumEditable" @change="setPageNum($event)" class="mini_input">
      <a class="page-total item disabled">共{{page.totalPage}}页/{{page.totalCount}}记录</a>
    </div>
</template>

<script>
export default {
    props: {
        page: {
            type: Object
        },
        pageSizeList: {
            type: Array,
            default: null
        },
        pageNumEditable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasPrePage() {
            return this.page.pageNo > 1 && this.page.totalPage > 1;
        },
        hastNextPage() {
            return this.page.pageNo < this.page.totalPage && this.page.totalPage > 1;
        },
        pages() {
            var totalPage = this.page.totalPage;
            var pageNo = this.page.pageNo;
			if(this.page.totalCount <= 0) return [];
			if(totalPage <= 0) return [];
            if(totalPage == 1) return [1];
            if(totalPage == 2) return [1,2];
            if(totalPage === 3) return [1,2,3];
            if(totalPage === 4) return [1,2,3,4];
            if(totalPage === 5) return [1,2,3,4,5];
            if(pageNo <= 3) return [1,2,3,4,5];
            if(pageNo >= totalPage - 3) return [totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage];
            return [pageNo-2, pageNo-1, pageNo, pageNo+1, pageNo+2];
        }
    },
    methods: {
        setPageNum($event){
            var target = $event.target;
            this.$parent.eventVm.$emit('pagination.click', 'page', target.value);
        },
        setPageSize($event){
            var target = $event.target;
            this.$parent.eventVm.$emit('pagesize.select', target.value);
        }
    },
    mounted() {
        var me = this;
        this.$nextTick(() => {
            $(this.$el).on('click', 'a.item', function() {
                if($(this).hasClass('disabled') || $(this).hasClass('active')) return;
                //var action = $(this).data('action');
                //var value = $(this).data('value');
                var action = this.getAttribute('data-action');
                var value = this.getAttribute('data-value');
                me.$parent.eventVm.$emit('pagination.click', action, value);
            });
        });
        
    }
}
</script>

<style scoped lang="less">
.page-total {
	font-weight: bold !important;
	color: #333 !important;
}
/*--------------
   Pagination
---------------*/

.pagination {
    margin: 0em;
    display: inline-block;
    border: solid 1px rgba(34, 36, 38, .15);
    font-size: 0;
    border-radius: 2px;
    .item {
        text-align: center;
        vertical-align: middle;
        line-height: 1;
        padding: 10px 15px;
        cursor: pointer;
        border-right: solid 1px rgba(34, 36, 38, .1);
        color: rgba(0, 0, 0, .87);
        display: inline-block;
        font-size: 12px;

        &:last-child{
            border-right: none;
        }
        &:hover{
            text-decoration: none;
        }
        &.active{
          border-top: none;
          background-color: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.95);
          box-shadow: none;
        }
        &.disabled{
            background: none;
            color: rgba(40, 40, 40, .3);
        }
        &.page-pre, &.page-next{
            &:before{
                content: '';
                display: inline-block;
                width: 5px;
                height: 5px;
                
                border-top: solid 2px rgba(0, 0, 0, .87);
                border-left: solid 2px rgba(0, 0, 0, .87);

            }
            &.disabled:before{
                border-top: solid 2px rgba(40, 40, 40, .3);
                border-left: solid 2px rgba(40, 40, 40, .3);
            }
        }
        &.page-pre{
            &:before{
                transform: rotate(-45deg);
            }
        }
        &.page-next{
            &:before{
                transform: rotate(135deg);
            }
        }
    }
    .mini_input{
        width: 45px;
        vertical-align: middle;
        height: 20px;
        margin-left: 5px;
        box-sizing: border-box;
        &:focus, &:hover{
            border: solid 1px #1291d4;
        }
    }
    .page_size_select{
        vertical-align: middle;
        margin-left: 10px;
    }

   
}




</style>
