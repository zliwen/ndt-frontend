<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex" v-if="!noFound">
      <i-col :span="spanLeft" class="layout-menu-left">
        <div class="layout-logo-left">
          <img :src="logoPng" alt="">
        </div>
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="openNames">
          <Submenu :name="index" v-for='(item,index) in menu' v-if="item.menu" :key='index'
                   :to='item'
                   tag='li'
                   active-class="ivu-menu-item-active">
            <template slot="title">
              <Icon :type="item.meta.icon" :size="iconSize"></Icon>
              {{item.meta.name}}
            </template>
            <router-link :name="index+'-'+subIndex"
                         v-if="subItem.meta.menu&&item.children&&item.children.length"
                         v-for='(subItem,subIndex) in item.children'
                         :key="index+'-'+subIndex" :to='subItem' tag='li'
                         class="ivu-menu-item">
              <Icon :type="subItem.meta.icon" :size="iconSize"></Icon>
              <span class="layout-text" v-text='subItem.meta.name'></span>
            </router-link>
          </Submenu>
        </Menu>
      </i-col>
      <i-col :span="spanRight" id="ivu-col">
        <div class="layout-header">
          <!--<i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>-->
          <Dropdown style=" float: right; margin: 20px;" placement="bottom-end"
                    @on-click="dropdownMenuCkick"
          >
            <a href="javascript:void(0)">
              <span v-text="userName"></span>
              <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item name="person">个人资料</Dropdown-item>
              <Dropdown-item v-if="userType==205||userType==206||userType==207" name="bank">机构信息</Dropdown-item>
              <Dropdown-item name="logout">切换账号</Dropdown-item>
              <Dropdown-item name="cancel">注销</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <div id="container">
          <router-view :style="{'min-height':minHeight+'px'}"></router-view>
          <!-- <div class="layout-copy">
            2011-2016 &copy; TalkingData
          </div>-->
        </div>
      </i-col>
    </Row>
    <noFound v-if="noFound"></noFound>
  </div>
</template>
<script>
  import logoPng from 'asts/images/commons/logo01.png'
  import userServer from 'rs/userServer';
  export default {
    data () {
      return {
        userType: this.session.get("userType"),
        logoPng: logoPng,
        spanLeft: 4,
        spanRight: 20,
        minHeight: 600,
        userName: "",
        openNames: [],
        //menu: [],
        noFound: ''
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      },
      menu(){
        return this.$store.state.menu
      }
    },

    created() {
      let that = this;

      function getHeight() {
        var o = document.getElementById("app");
        that.minHeight = o.offsetHeight - 103;
      }

      if (this.session.get("userType") == 202 || this.session.get("userType") == 203) {
        window.location.href = "/"
      }
      getHeight();

      this.$store.dispatch("setMenu", this);

      this.userName = this.session.get("adminLoginName") ? this.session.get("adminLoginName") : "用户名";
    },
    methods: {
      dropdownMenuCkick(name){
        if (name == "logout") this.logout();
        else if (name == "person") {
          this.$router.push('/user/userinfo');
        } else if (name == 'bank') {
          this.$router.push({name: "mycorporation"})
        } else if (name == "cancel") this.logout(1);
      },
      logout(key){
        userServer.logout({token: this.session.get('adminToken')}, {}, response => {
          //this.$store.commit('setMenu', []);
          this.session.remove("adminToken");
          this.session.remove("userId");
          this.session.remove("roleIds");
          this.session.remove("userType");
          this.$router.push({name: 'login'});
          if (key) {
            this.session.remove("loginPassword");
            this.session.remove("adminLoginName");
          }
        }, err => {

        })

      },
      toggleClick () {
        if (this.spanLeft === 4) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      }
    }
  }
</script>
<style scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .layout-menu-left ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .layout-menu-left ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(255, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  .layout-menu-left ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #595060;
  }

  .layout {
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  #ivu-col {
    height: 100%;
    padding-top: 60px;
  }

  .layout-header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
    z-index: 100;
  }

  #container {
    height: 100%;
    position: relative;
    overflow-y: auto;
    padding: 15px;
  }

  .ivu-row-flex {
    height: 100%;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;

  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    text-align: center;
    height: 60px;
    background: #5b6270;
    border-radius: 3px;
  }

  .layout-logo-left img {
    height: 100%;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-btn {
    padding: 13px 15px;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .layout .router-link-active, .layout .router-link-active:hover {
    border-right: none;
    color: #fff;
    background: #1d7cf0 !important;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
    border-right: none;
    color: #fff;
    background: #2d8cf0 !important;
  }

  .layout-menu-left {
    padding-top: 60px;
    position: relative;
  }

  .layout-menu-left > ul {
    overflow-y: auto;
    height: 100%;
  }

</style>
