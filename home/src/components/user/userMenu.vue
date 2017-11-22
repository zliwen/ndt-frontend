<template>
  <div class="userMenu" :style="{height:$store.state.screenHeight - 70 + 'px'}">
    <div class="userTitle">
      <span>我的农贷通</span>
      <!--<b> > </b>-->
      <!--<span>{{pagePName}}</span>-->
      <!--<b> > </b>-->
      <!--<span>{{pageName}}</span>-->
      <!--<b v-if="pagePPname"> > </b>-->
      <!--<span>{{pagePPname}}</span>-->
    </div>
    <div class="mmb" :style="{height:$store.state.screenHeight - 140 + 'px'}">
      <div class="menuL">
        <div class="topUser">
          <div class="img">
            <img class="tx" @error="data.imageUrl=userImg" :src="data.imageUrl||userImg"  alt="">
            <label>
              <img class="min"  :src="icon5" alt="">
              <input type="file" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgSuccess($event)">
            </label>
          </div>
          <p>{{userName}}</p>
          <div>
            <img :src="icon1" alt="">
            <img :src="icon2" alt="">
          </div>
        </div>
        <ul class="menuM">
          <li v-for="item in userMenu">
            <span>
              <img :src="item.img">
              <b>{{item.name}}</b>
            </span>
            <ul class="subMenu">
              <li v-for="subItem in item.children" @click="goUser(subItem)" :class="{active: subItem.active}">
                <span >
                  <i></i>
                  <b>{{subItem.meta.name}}</b>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="userMainBox">
        <router-view :data.sync="data" v-if="loadingDone"></router-view>
      </div>
    </div>
    <Modal
      v-model="cutModal"
      title="图片裁剪"
      :mask-closable="false"
      :styles="{top: '50px'}"
      :transfer ='false'
      @on-ok="modalSubmit"
      width="600">
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
  import imgCropper from '../common/vue-cropper'
  import personServer from 'rs/person'
  import axios from '@/config/axios'
  import userImg from "asts/images/user/头像75X75.jpg";
  import icon1 from "asts/images/user/未实名认证25X25.png";
  import icon2 from "asts/images/user/未手机认证25X25.png";
  import icon3 from "asts/images/user/实名认证25X25.png";
  import icon4 from "asts/images/user/手机认证25X25.png";
  import icon5 from "asts/images/user/icon6.png";
  import icon6 from "asts/images/user/icon5.png";
  import icon7 from "asts/images/user/上传头像25X25.png"
  export default {
    name: 'userMenu',
    data () {
      return {
        loadingDone:false,
        uploadUrl:"/v1/file/upload",
        downloadUrl:"/v1/file/download/",
        icon1:icon1,
        icon2:icon2,
        icon5:icon7,
        userImg:userImg,
        data:{},
        userMenu: [],
        list: [],
        userName:"",
        cutModal:false,
        example2:{
          img: '',
          info: false,
          canResize:false,
          size: 1,
          outputType: 'png',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: 100,
          height: 100,
          // fixed: true,
          // fixedNumber: [1,1]
        }
      }
    },
    created: function () {
      if(!this.session.get("token")){
        this.$router.push({name:"loginAndRegister",query:{type:1}})
        return;
      }
      this.findByUserId();
      let host = window.location.host;
      if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
        this.uploadUrl = "http://192.168.1.42:18080/v1/file/upload"
        this.downloadUrl = "http://192.168.1.42:18080/v1/file/download/"
      }
      this.userName=this.session.get("loginName");
      this.list= [];
      let name = this.$route.fullPath.includes('/xian')?"xianUser":"user";
      this.$router.options.routes[0].children.forEach(item => {
        if (item.name == name) this.list = item.children;
      });
      this.seMenu();
    },
    watch: {
      '$route': ["seMenu"]
    },
    methods: {
      findByUserId() {
        personServer.findByUserId({},response=>{
          if(response.errorCode==0){
            let data = response.data;
            this.data = data;
            this.icon1 = data.name?icon3:icon1;
            this.icon2 = data.mobile?icon4:icon2;
            this.loadingDone = true;
          }
          else if(response.errorCode == 1100){
            this.$Message.error("登录已过期！");
            this.$router.push({name:"loginAndRegister",query:{type:1}})
          }
        })
      },
      uploadHeadIco(imageUrl){
        personServer.updateUser({
          data:{imageUrl}
        },response=>{
          if(response.errorCode==0){
            this.findByUserId();
          }
          else{
            this.$Message.error("头像上传失败！")
          }
        })
      },
      seMenu:function () {
        this.userMenu= [];
        this.pageName="";
        this.pagePName="";
        this.pagePPname="";
        this.list.forEach(item=>{
          let ism=false;
          item.active=false;
          if(this.$route.name==item.name){
            if(item.meta.parentMin){
              this.list.forEach(fk=>{
                if(fk.name==item.meta.parentMin){
                  fk.active=true;
                  this.pageName=fk.meta.name;
                  this.pagePName=fk.meta.parent;
                  this.pagePPname=item.meta.name;
                }
              })
            }else{
              item.active=true;
              this.pageName=item.meta.name;
              this.pagePName=item.meta.parent;
            }
          }

          this.userMenu.forEach(menu=>{
            if(menu.name==item.meta.parent&&!item.meta.parentMin){
              menu.children.push(item);
              ism=true;
            }
            if(item.meta.parentMin) ism=true;
          });
          if(!ism) {
            let mm={
              name:item.meta.parent,
              children:[item]
            };
            switch (item.meta.parent){
              case "产品申请":
                mm.img=icon5;
                break;
              case "个人中心":
                mm.img=icon6;
                break;
            }
            this.userMenu.push(mm)
          }
        });
      },
      goUser: function (item) {
        this.userMenu.forEach(item=>{
            item.children.forEach(obj=>{
                obj.active=false;
            })
        });
        item.active=true;
        this.$router.push(item)

      },
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
          formimg.append("files",data)
          axios.post(this.uploadUrl, formimg)
            .then(function(response){
              if(response.errorCode == 0&&response.data&&response.data.length>0){
                let fileId = response.data[0].fileId;
                let url = that.downloadUrl+fileId;
                that.uploadHeadIco(url);
              }
              else{
                that.$Message.error("上传头像失败！")
              }
            }).catch(function(error){
            console.error(error)
            //  that.$Message.error("网络失败,上传头像失败！")
          })
        })
      }
    }
  }
</script>

<style lang='less'>
  .userMenu {  padding: 20px 0 0; width: 1200px;
    margin: 0 auto;
    b{font-weight: normal}
    .userTitle{ height: 50px; width: 100%; background: url("../../assets/images/user/bg.png");
      font-size: 20px; color: #fff; line-height: 50px; padding-left: 20px;
      span{margin: 0 10px;}
    }
    .mmb{position: relative; padding: 0 0 20px 220px; height: 100%;}
    .menuL{background: #f6f6f6; width: 220px; position: absolute;padding-top:20px;
    left: 0; top:0; height: 100%;
      .topUser{ text-align: center; padding: 20px 0 50px;
        .img{
          position: relative; height: 74px; width: 74px; margin:0 auto 10px; background: #f1f1f1;
          border-radius: 37px;
        label{
            position: absolute;
            right:-4px;
            bottom: 0;
            cursor: pointer;
          }
        }
         .tx{ width: 74px; height: 74px; border-radius: 37px;}
        p{ font-size: 14px; color: #222; font-weight: 700; margin-bottom: 10px;}
      }
      span,img,i,b{ vertical-align: middle;}
      .menuM{ margin-left: 40px; font-size: 16px;}
      .subMenu{font-size: 14px; margin: 5px 0 20px;
        li{ cursor: pointer; line-height: 36px;padding-left: 34px;
          &:hover{ color: #ff762b;}
          &.active{background: #fff;
             color: #ff762b;}

        }
      }
    }
    .userMainBox{ width: 100%; height: 100%; padding: 30px 40px;}


  }
</style>
