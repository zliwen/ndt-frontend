<template>
  <div id="app_container" ref="app">
    <div class="menu_container">
      <div class="menu clearfix">
        <div class="logo">
          <img @click="goIndex" src="../assets/images/logo.png" alt="logo">
          <span v-if="currentPlace.name">
            <span class="line"></span>
            <span v-text="currentPlace.name" class="bind overflow" :title="currentPlace.name"></span>
          </span>
        </div>
        <v-menu style="float: left" @setActiveCityObj="function(o){currentPlace = o}"></v-menu>
        <div class="login" v-show="!($route.meta.hideIndexLoginButton)">
          <template v-if="$store.state.token">
            <span class="out" @click="goUser" v-text="$store.state.loginName"></span>
            <span class="hide870">/</span>
            <span @click="out" class="out">退出</span>
          </template>
          <template v-else>
            <router-link :to="{name:'loginAndRegister',query:{type:1}}" tag="span" class="login_btn">登录</router-link>
            <span class="hide870">/</span>
            <router-link tag="span" class="join hide870" style="cursor: pointer" :to="{name:'loginAndRegister',query:{type:0}}">加入农贷通</router-link>
          </template>
        </div>
      </div>
    </div>
    <!--右侧漂浮框-->
    <div class="suspended">
      <div class="dk" @click="goApplyFor">
        <img :src="img2"/>
        <span>我要贷款</span>
      </div>
      <div class="qq">
        <img :src="right02"/>
        <span>意见建议</span>
        <a href="tencent://message/?uin=2791168570&Site=http://vps.shuidazhe.com&Menu=yes"></a>
      </div>
    </div>
    <!--左侧新版本-->
    <div class="new_container" v-if="show">
      <Icon type="ios-close-outline" size="20" color="#000" @click.native="show = false"></Icon>
      <img src="../assets/images/new.png" alt="" class="new">
    </div>
    <router-view class="main-container" @scrollChange="scrollChange"></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import indexServer from 'rs/index'
import img2 from '../assets/images/dk.png'
import right02 from '../assets/images/yx.png'

export default {
	data(){
    return {
      show:true,
      img2:img2,
      right02:right02,
      currentPlace:{}
    }
  },
  created(){

  },
	methods: {
    goApplyFor(){
      if(this.$route.fullPath.indexOf("/xian")!=-1){
        this.$router.push({name:"xianFinancialService",query:{go:(new Date())-0}});
      }else {
        this.$router.push({name:"financial-service",query:{go:(new Date())-0}});
      }
    },
    out(){
      storage.del("token");
      this.$store.commit("setToken","");
      this.$router.push({name:"loginAndRegister",query:{type:1}});
      indexServer.out({params:{token:storage.get("token")}});
    },
    scrollChange(num){
      $(this.$refs.app).animate({scrollTop:num})
    },
    goIndex(){
        this.$router.push({path:"/"})
    },
    goUser(){
      this.$router.push({path:"user/material"})
    }
	},
  directives:{
  },
  computed:{
    inTown(){
      return  this.$route.name === "nonstop-county-index"
    }
  }
}
</script>
<style scoped lang='less'>
  //右侧漂浮框
  .suspended{ width: 60px; height: 130px; position: fixed;
    top:50%; margin-top: -65px; right: 17px; z-index: 1000;
    div{
      width: 60px;
      height:60px;
      position: relative;
      background-color: #FFA82B;
      color: #fff;
      font-size: 14px;
      line-height:14px;
      margin-bottom: 10px;
      cursor: pointer;
      padding: 16px;
      &:hover{
        img{
          opacity: 0;
        }
      }
      img{
        transition: opacity 300ms ease-out;
      }
      img,a{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
      }
    }
  }
  //左侧新版本
  .new_container{
    width: 200px; position: fixed;
    top:50%; margin-top: -55px; left:0; z-index: 1000;
    img{
      width: 100%;
    }
    i{
      cursor: pointer;
      position: absolute;
      right: 0;
      top:-14px;
    }
  }
  #app_container{
    height: 100%;
    overflow: auto;
    transition: all 300ms ease-out;
    .logo{
      width: 230px;
      float: left;
      white-space: nowrap;
      font-size: 12px;
      img{
        vertical-align: middle;
        margin-right:10px;
        width: 133px;
        cursor: pointer;
      }
      >span{
        position: relative;
        display: inline-block;
        height: 30px;
        vertical-align: middle;
        line-height: 12px;
        .line{
          display: inline-block;
          width: 1px;
          height: 30px;
          background-color: #f2f2f2;
        }
        span{
          position: absolute;
          bottom: 0;
        }
        .bind{
          display: inline-block;
          height: 12px;
          max-width: 70px;
          left: 10px;
        }
      }
    }
    .menu_container{
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
      width: 100%;
      position: relative;
      z-index: 2;
    }
    .menu{
      width: 1200px;
      margin:0 auto;
      height: 70px;
      font-size: 16px;
      line-height: 70px;
      position: relative;
      /*overflow: hidden;*/
      /*position: absolute;*/
      /*top:0;*/
      /*left:0;*/
      background-color: #fff;
    }
    .login,.logo{
      height:100%;
    }
    .login{
      font-size: 14px;
      float: left;
      padding-left: 60px;
      color:@base-text-hover-color;
      .login_btn{
        cursor: pointer;
      }
      .join{
        padding-left: 14px;
        padding-right: 14px;
        border:1px solid @base-text-hover-color;
        border-radius:12px;
        line-height: 25px;
        font-size:14px;
      }
      .out{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .main-container{
      /*padding-top: 90px;*/
    }
  }
  /*
  @media screen and (max-width:1400px){
    #app .menu{
      font-size: 16px;
    }
  }
  @media screen and (max-width:1240px){
    #app{
      .login,.logo{
        width:20%;
      }
    }
  }
  @media screen and (max-width:970px){
    #app .menu{
      font-size: 14px;
    }
  }
  @media screen and (max-width:870px){
    .hide870{
      display: none;
    }
    #app .login{
      width:10%;
    }
  }
  @media screen and (max-width:730px){
    #app .menu{
      font-size: 12px;
    }
  }
  */
</style>
