<template>
  <div class="alert_body">
    <div v-if="mask" class="mask"></div>
    <div class="alert_modal">
      <div class="alert_wrap">
        <div class="title"><span class="close" v-if="closeButton" @click="close()">+</span>{{title}}</div>
        <div class="content" ref="content">{{content}}</div>
        <div class="btn_wrap">
          <a href="javascript:;" v-if="btn1" class="blue_btn mini" @click="btn1Click()">{{btn1.text}}</a>
          <a href="javascript:;" v-if="btn2" @click="btn2Click()">{{btn2.text}}</a>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>

  export default {
    data(){
      return {
        mask: true,//是否有遮罩层
        type: 'alert',
        title: '提示',
        content: '',
        el: '',
        closeButton: true,
        btn1: {
          text: '确定',
          callback: null
        },
        btn2: null
      }
    },
    methods: {
      open(options){
        Object.assign(this.$data, options);
        if(this.el){
          this.$refs.content.appendChild(this.el);
        }
      },
      close(){
        this.$el.remove();
      },
      btn1Click(){
        var btn1 = this.btn1;
        btn1.callback ? btn1.callback() : this.close();
      },
      btn2Click(){
        var btn2 = this.btn2;
        btn2.callback ? btn2.callback() : this.close();
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .mask, .alert_modal{ 
    position: fixed;
      top: 0;
      left: 0;
    width: 100%;
      height: 100%;
  }
  .mask{
    background: rgba(0, 0, 0, .5);
  }
  .alert_modal{
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alert_wrap{
    background: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
      max-height: 100%;
      overflow: auto;
      width: 500px;
      padding-bottom: 20px;
      .title{
          height: 45px;
          line-height: 45px;
          padding: 0 22px;
          background: #eee;
          border: solid 1px #ccc;
          position: relative;
      }
      .close {
        position: absolute;
        top: 0;
        right: 20px;
        width: 18px;
        height: 18px;
        border-radius: 18px;
        background: #3399ff;
        color: #fff;
        transform: rotate(45deg);
        margin: 12px 0 0 0;
        line-height: 15px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
    }
      .content{
        text-align: center;
        padding: 20px;
      }
      .btn_wrap{
        text-align: center;
        a{
          &:first-child{
            margin-right: 20px;
          }
        }
      }
      .blue_btn.mini {
        padding: 3px 20px;
      }
      .blue_btn {
          display: inline-block;
          padding: 6px 20px;
          color: #fff;
          background: #3399ff;
          border-radius: 4px;
      }
  }
</style>
