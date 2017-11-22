/**
* Created by chenchen on 2017/9/12.
*/

<template>
  <div class="artclebox">
    <Modal
      v-model="modalShow"
      :title="modalTitle"
      :mask-closable="true"
      :styles="{top: '50px'}"
      :transfer ='false'
      ok-text = "关闭"
      cancel-text = ""
      width="932">
      <h3 class="article-title" >{{modalData.title}}</h3>
			<p class="article-info">
				<span>发布时间：{{modalData.updateAt}}</span>
				&nbsp;&nbsp;&nbsp;
				<span v-if="modalData.source" >消息来源：{{modalData.source}}</span>
			</p>
     <div class="article-read" v-html="modalData.content" ></div>
     </Modal>
  </div>
</template>

<script>
  export default {
    name: 'UploadImg',
    data () {
      return {
        modalShow:false
      }
    },
    props: {
      "modalData":{
        type:Object,
        default:false,
      },
      "modalTitle":{
        type:String,
        default:"查看详情",
      }
    },
    methods: {
      show(){
        this.modalShow = true;
      }
    },
    created: function () {
    }
  }
</script>

<style lang='less'>
  .artclebox{
       .ivu-modal-body {
            .article-title {
                margin:20px auto 10px;
                height: 48px;
                font-size: 24px;
                text-align:center;
                background:none;
                border:0;
                cursor: default;
                color: #333;
            }
            p.article-info{
                border-bottom:1px solid #d0d0d0;
                /*text-align: center;*/
                margin-bottom: 15px;
                color:#696969;
                font-size: 12px;
                line-height: 36px;
              }
            .article-read{
                color: #657180;
                font-size:16px;
                margin: 0;
                line-height: 28px;
                height: 500px;
                overflow: scroll;
            }
        }
  }
</style>
