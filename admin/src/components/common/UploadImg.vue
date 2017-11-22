/**
* Created by chenchen on 2017/9/12.
*/

<template>
  <div class="UploadImg">
    <label class="preview-box" :style="styleData" v-if="preview&&val!=''">
      <div class="mask" ><Icon type="ios-plus-outline"></Icon>点击更换</div>
      <img :src="val" alt="路径有误，不能加载图片" style="width:100%;"  >
  		<input type="file" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgSuccess($event)">
    </label>

    <label v-if="cut&&val==''" :style="styleData" class="upbtn"><Icon  size="40" type="ios-plus-outline"></Icon>
  		<input type="file" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgSuccess($event)">
    </label>
<!--
    <Upload v-if="!cut&&val==''" :headers="uploadHeader" :show-upload-list="false" :multiple="multiple"  style="display:inline-block;vertical-align:top;" :on-success="upImgSuccess"  action="/v1/file/upload" >
        <Button class="upbtn" type="ghost" :disabled="disabled"><Icon size="40" type="ios-plus-outline"></Icon></Button>
    </Upload> -->
    <Modal
      v-model="cutModal"
      title="图片裁剪"
      :mask-closable="false"
      :styles="{top: '50px'}"
      :transfer ='false'
      @on-ok="modalSubmit"
      width="900">
        <div style="width:100%; height:400px;">
            <imgCropper
                ref="cropper"
                :img="example2.img"
                :outputSize="example2.size"
                :outputType="example2.outputType"
                :info="example2.info"
                :canScale="example2.canScale"
                :autoCrop="example2.autoCrop"
                :autoCropWidth="example2.width"
                :autoCropHeight="example2.height"
                :fixed="example2.fixed"
                :fixedNumber="example2.fixedNumber"
                :canResize="example2.canResize"
              ></imgCropper>
        </div>
     </Modal>
  </div>
</template>

<script>
  import otherServer from 'rs/otherServer';
  import session from "@/config/session";
  import axios from '@/config/axios';
  import imgCropper from './vue-cropper'
  export default {
    components:{imgCropper},
    name: 'UploadImg',
    data () {
      return {
        uploadUrl:"/v1/file/upload",
        downloadUrl:"/v1/file/download/",
        cutModal:false,
        // val:this.val,
        val:this.value,
        example2:{
          img: '',
          info: false,
          canResize:false,
          size: 1,
          outputType: 'png',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: this.cutSize[0],
          height: this.cutSize[1],
          // fixed: true,
          // fixedNumber: [1,1]
        },
        uploadHeader:{
             Authorization:session.get("adminToken")
        },
        styleData:{
          "display":"inline-block",
          "width":this.previewSize[0]+"px",
          "min-height":this.previewSize[1]>100?this.previewSize[1]:100 +"px",
          "min-width":'100px',
          "vertical-align":'top'
        }
      }
    },
    props: {
      "value":{
        type:String,
        default:''
      },
      "multiple":{
        type:Boolean,
        default:false,
      },
      "disabled":{
        type:Boolean,
        default:false,
      },
      "preview":{
        type:Boolean,
        default:true,
      },
      "previewSize":{
        type:Array,
        default:()=>{
          return [100,100]
        } ,
      },
      'cut':{
        type:Boolean,
        default:true,
      },
      'cutSize':{
        type:Array,
        default:()=>{
          return [100,100]
        } ,
      }
    },
    methods: {
      uploadImgSuccess(e){
        	var file = e.target.files[0]
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          var reader = new FileReader()
          reader.onload = (e) => {
               this.example2.img = e.target.result;
               this.cutModal = true;
          }
          reader.readAsDataURL(file)
      },
      modalSubmit(){
        this.$refs.cropper.getCropBlob((data) => {
          let that = this;
          let formimg = new FormData();
          console.log(data)
          formimg.append("files",data)
          axios.post(this.uploadUrl, formimg)
          .then(function(response){
            let retData ={}
            if(response.errorCode == 0&&response.data&&response.data.length>0){
                let fileId = response.data[0].fileId;
                retData.url = that.downloadUrl+fileId;
                retData.errorCode = response.errorCode;
                that.val = retData.url;
                that.$emit('onSuccess', retData);
                that.$emit('input', that.val)
            }
            else{
                retData.errorCode = response.errorCode;
                that.$emit('onFail', retData);
            }
          }).catch(function(error){
             console.log("报错",error)
             that.$Message.error("网络失败")
          })
				})
      },
      upImgSuccess(response){
          let retData ={}
          if(response.errorCode == 0&&response.data&&response.data.length>0){
              let fileId = response.data[0].fileId;
              retData.url = this.downloadUrl+fileId;
              retData.errorCode = response.errorCode;
              this.val = retData.url;
              this.$emit('onSuccess', retData);
              this.$emit('input', this.val)
          }
          else{
              retData.errorCode = response.errorCode;
              this.$emit('onFail', retData);
          }
      }
    },
    created: function () {
        let host = window.location.host;
        if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
            this.uploadUrl = "http://192.168.1.42:18080/v1/file/upload"
            this.downloadUrl = "http://192.168.1.42:18080/v1/file/download/"
        }
    }
  }
</script>

<style lang='less'>
  .UploadImg {
    .preview-box{
      border:1px dotted #ccc;
      position: relative;
      .mask{
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        padding-top: 20px;
        min-height: 100px;
        cursor: pointer;
        height: 100%;
        font-size: 16px;
        background-color: rgba(0,0,0,.75);
        text-align: center;
        color:#fff;
        z-index: 10;
      }
    }
    .preview-box:hover .mask{
      display: block;
    }
    .upbtn{
      height: 100px;
      width: 100px;
      display: inline-block;
      border:1px dotted #ccc;
      line-height: 120px;
      text-align: center;
    }
      .ivu-modal-wrap{
        z-index:1001;
      }
      label,img{ vertical-align: middle;}
  }
</style>
