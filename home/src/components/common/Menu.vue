<template>
  <ul>
    <router-link :to='item' tag='li' v-for='(item,index) in menu' active-class="active-menu"  v-bind:key="index" v-text='item.meta.name' :style="style"></router-link>
    <li v-show="isBigDataMenu" @click="goBigData">农贷通大数据</li>
  </ul>
</template>

<script>
  import indexServer from "rs/index"
export default {
  data() {
    return {
      isBigDataMenu:true,
      style:{
        width:"100px"
      },
      menu:[]
    }
  },
  created() {
    this.menu_for_credit = [];
    this.menu_for_xian = [];
    this.menu_default = [];
    this.$router.options.routes[0].children.forEach(l=>{
      if(!l.meta.menu)return;
      let f1 = l.path.indexOf("/credit") !==-1,f2 = l.path.indexOf("/xian") !==-1;
      if(f1){this.menu_for_credit.push(l);return;}
      if(f2){this.menu_for_xian.push(l);return;}
      if(!f1&&!f2){this.menu_default.push(l);}
    });
    this.init(this.$route);
  },
  directives: {
  },
  computed: {
  },
  watch:{
    "$route":function(v){this.init(v)}
  },
  filters: {
  },
  methods: {
    init(v){
      let path = v.fullPath;
      let credit = path.indexOf("/credit")!== -1;
      let xian = path.indexOf("/xian")!== -1;
      if(!xian)this.session.del("cityId").del("cityName");
      this.isBigDataMenu = true;
      if(credit)this.isBigDataMenu = false;
      this.menu = credit?this.menu_for_credit:xian?this.menu_for_xian:this.menu_default;
      this.$emit("setActiveCityObj",{id:this.session.get("cityId"),name:this.session.get("cityName")});
    },
    goBigData:function () {
      this.session.set("pageBackUrl",this.$route.fullPath);
      window.open("/bigData");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
ul {
  text-align: center;
  height: 70px;
  width:720px;
  font-size: 14px;
  li {
    width:120px;
    float: left;
    color: @base-text-color;
    cursor: pointer;
    font-family: 'Microsoft YaHei Regular','Microsoft YaHei';
    &:hover,&.active-menu{
      color:@base-text-hover-color;
    }
    &.first{
      display: none!important;
    }
  }
}
</style>
