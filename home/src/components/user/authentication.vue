<template>
  <div class="user-authentication">
    <div class="title">完善实名认证资料</div>
    <div class="tabs_wrapper clearfix" style="margin-bottom: 18px">
      <header style="margin-bottom:46px;"><span>基本资料</span></header>
      <label>
        <span v-text="isPerson?'姓名':'法定代表人姓名'"></span>
        <input type="text" placeholder="请输入真实姓名" :class="{not_empty:form.name.length}" v-model="form.name" @blur="checkName">
      </label>
      <label>
        <span v-text="isPerson?'身份证号码':'法定代表人身份证号码'"></span>
        <input type="text" placeholder="请输入身份证号码" :class="{not_empty:form.identityId.length}" v-model="form.identityId" @blur="checkId">
      </label>
    </div>
    <div class="tabs_wrapper">
      <header style="margin-bottom:32px;"><span v-text="isPerson?'上传身份证照':'上传证件照'"></span></header>
      <div class="upload_wrapper clearfix">
        <Upload
          v-if="!isPerson"
          type="drag"
          class="update_1"
          :before-upload="function(file){return checkFile(file,1)}"
          :on-success="function(res,file,fileList){return upload(res,file,fileList,1)}"
          :on-remove="function(file,fileList){return remove(file,fileList,1)}"
          :default-file-list="defaultFileList[0]"
          ref="upload1"
          :action="baseURL+'/v1/file/upload'">
          <div v-show="!photos[0]">
            <Icon type="ios-plus-outline" size="52"></Icon>
            <p>上传企业营业执照</p>
          </div>
          <img :src="baseURL+'/v1/file/download/'+photos[0]+'?downloadType=1'" alt="" ref="img1" v-if="photos[0]">
        </Upload>
        <Upload
          type="drag"
          class="update_2"
          :before-upload="function(file){return checkFile(file,2)}"
          :on-success="function(res,file,fileList){return upload(res,file,fileList,2)}"
          :on-remove="function(file,fileList){return remove(file,fileList,2)}"
          :default-file-list="defaultFileList[1]"
          ref="upload2"
          :action="baseURL+'/v1/file/upload'">
          <div v-show="!photos[1]">
            <Icon type="ios-plus-outline" size="52"></Icon>
            <p v-text="'上传'+(isPerson?'':'法定代表人')+'身份证正面照片'"></p>
          </div>
          <img :src="baseURL+'/v1/file/download/'+photos[1]+'?downloadType=1'" alt="" ref="img2" v-if="photos[1]">
        </Upload>
        <Upload
          type="drag"
          class="update_3"
          :before-upload="function(file){return checkFile(file,3)}"
          :on-success="function(res,file,fileList){return upload(res,file,fileList,3)}"
          :on-remove="function(file,fileList){return remove(file,fileList,3)}"
          :default-file-list="defaultFileList[2]"
          ref="upload3"
          :action="baseURL+'/v1/file/upload'">
          <div v-show="!photos[2]">
            <Icon type="ios-plus-outline" size="52"></Icon>
            <p v-text="'上传'+(isPerson?'':'法定代表人')+'身份证反面照片'"></p>
          </div>
          <img :src="baseURL+'/v1/file/download/'+photos[2]+'?downloadType=1'" alt="" ref="img3" v-if="photos[2]">
        </Upload>
        <Upload
          type="drag"
          class="update_4"
          :before-upload="function(file){return checkFile(file,4)}"
          :on-success="function(res,file,fileList){return upload(res,file,fileList,4)}"
          :on-remove="function(file,fileList){return remove(file,fileList,4)}"
          :default-file-list="defaultFileList[3]"
          ref="upload4"
          :action="baseURL+'/v1/file/upload'">
          <div v-show="!photos[3]">
            <Icon type="ios-plus-outline" size="52"></Icon>
            <p v-text="'上传'+(isPerson?'':'法定代表人')+'手持身份证照片'"></p>
          </div>
          <img :src="baseURL+'/v1/file/download/'+photos[3]+'?downloadType=1'" alt="" ref="img4" v-if="photos[3]">
        </Upload>
      </div>
    </div>
    <p class="error" v-text="errorMsg"></p>
    <p class="footer">
      <router-link tag="button" :to="{name:'material'}">暂不认证</router-link>
      <button @click="update">提交</button>
    </p>
  </div>
</template>

<script>
  import personServer from "rs/person"
  import {baseURL} from "@/config/constant"
export default {
  data () {
      return {
        isPerson:false,
        baseURL:baseURL,
        form:{
          name:"",
          identityId:"",
          identityUrl:""
        },
        errorMsg:"",
        imgSrc:[],
        photos:[undefined,undefined,undefined,undefined],
        defaultFileList:[[],[],[],[]],//已上传的文件列表
      }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      personServer.findById({params:{userId:this.session.get("userId")}},({data})=>{
        let form = this.form;
        form.name = data.name;
        form.identityId = data.identityId;
        form.identityUrl = data.identityUrl;
        //photos中图片id分别包括 营业执照（企业用户）、身份证正面、反面、手持；
        this.isPerson = data.userType === 202;
        this.photosCopy = JSON.parse(data.identityUrl||"[]");
        this.photosCopy.forEach((l,i)=>{this.photos[i] = l;});
      });
    },
    checkName(){
      let str = this.form.name;
      this.errorMsg = "";
      if(!str)this.errorMsg = "请填写真实姓名";
      else if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(str)))this.errorMsg = "姓名填写有误";
      else return true;
    },
    checkId(){
      let str = this.form.identityId;
      this.errorMsg = "";
      if(!str)this.errorMsg = "请填写身份证号码";
      else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)))this.errorMsg = "身份证填写有误";
      else return true;
    },
    //上传
    checkFile(file,num){
      if(!(/(.jpg|.gif|.png|.jpeg)$/.test(file.name.toLowerCase()))){
        this.errorMsg = "图片上传支持jpg/jpeg/png/gif四种格式";return false
      }
      if(file.size/1024/1024>4){
        this.errorMsg = "图片大小不能超过4M";return false
      }
      let upload = this.$refs["upload"+num].clearFiles();
      this.errorMsg = "";
    },
    upload(res,file,fileList,num){
      this.defaultFileList.splice(num-1,1,fileList);
      this.photos.splice(num-1,1,res.data[0].fileId);
      console.log(this.defaultFileList);
    },
    remove(file,fileList,num){
      this.defaultFileList.splice(num-1,1,fileList);
      this.photos.splice(num-1,1,this.photosCopy[num-1]);
    },
    update(){
      if(this.checkName()&&this.checkId()){
        let photos = this.photos;
        if(!photos[1]){
          this.errorMsg = "请上传身份证正面照片";return
        };
        if(!photos[2]){
          this.errorMsg = "请上传身份证反面照片";return
        };
        if(!photos[3]){
          this.errorMsg = "请上传手持身份证照片";return
        };
        let form = this.form;
        form.identityUrl = JSON.stringify(photos);
        personServer.updateIdentityInfo({data:this.form},({errorCode})=>{
          if(!errorCode)this.$Message.success("资料已提交，等待审核!");
          this.$router.push({name:"material"});
        });
      }
    }
  }
}
</script>

<style lang='less'>
.user-authentication{
  padding-top: 50px;
  .title{
    font-size: 16px;
    /*font-weight: 600;*/
    line-height:16px;
    padding-left: 10px;
    border-left: 2px solid #ff762b;
  }
  .tabs_wrapper{
    header{
      border-bottom: 1px solid #e5e5e5;
      height: 64px;
      line-height: 14px;
      font-size: 14px;
      span{
        width: 100px;
        text-align: center;
        height: 100%;
        padding-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ff762b;
        display: inline-block;
        vertical-align: bottom;
        position: relative;
        bottom: -1px;
        color: #ff762b;
      }
    }
    label{
      float: left;
      height: 34px;
      font-size: 14px;
      line-height:34px;
      color: #000;
      width: 400px;
      vertical-align: bottom;
      position: relative;
      &:nth-of-type(1){
        margin-right:100px;
      }
      span{
        position: absolute;
        left: 30px;
      }
      input{
        text-align: right;
        padding-left: 170px;
        padding-right: 30px;
        width: 100%;
        float: right;
        height: 100%;
        border:none;
        border-bottom:1px solid #e5e5e5;
        outline: none;
        &:focus,&.not_empty{
          border-bottom-color:#ff762b;
        }
      }
    }
    .upload_wrapper{
      padding-bottom: 19px;
      padding-left: 35px;
      >.ivu-upload{
        background-color:#f6f6f6;
        padding: 10px;
        width: 250px;
        height: 166px;
        float: left;
        margin-right: 30px;
        margin-bottom: 30px;
        &.update_1{
          height: 340px;
        }
        .ivu-upload-drag{
          width: 100%;
          height:100%;
          background-color: #fff;
          position: relative;
          img{
            width: 100%;
            height:100%;
          }
          div{
            width: 100%;
            position: absolute;
            top:50%;
            left:50%;
            margin-left:-114px;
            margin-top:-40px;
          }
          &:hover,&.ivu-upload-dragOver{
            color: #ff762b;
          }
        }
      }
    }
  }
  .error{
    font-size: 12px;
    color: #ff762b;
    line-height: 12px;
    height: 12px;
    text-align: center;
    margin-bottom: 19px;
  }
  .footer{
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    color: #999;
    button{
      cursor: pointer;
      width: 120px;
      height:44px;
      border-radius: 5px;
      background-color: transparent;
      border:1px solid #999999;
      &:hover{
        background-color: #f6f6f6;
      }
      &:nth-of-type(2){
        margin-left:20px;
        color: #ff762b;
        border-color: #ff762b;
        &:hover{
          background-color: #ff762b;
          color: #fff;
        }
      }
    }
  }
}
</style>
