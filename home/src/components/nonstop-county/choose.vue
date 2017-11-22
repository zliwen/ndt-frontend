<template>
   <div class="choose_town_container">
      <p class="title"><span>热门区县</span></p>
      <ul class="hot_towns clearfix">
        <li v-for="item in hotCounties" v-text="item.name" @click="jump(item.id,hotCounties)"></li>
      </ul>
     <p class="title"><span>直达平台</span></p>
     <header style="padding-top: 20px;margin-bottom: 20px">
       <span v-if="id" class="my_division"  style="margin-right: 0">我所在的区县<Icon type="location" size="20" style="margin-left: 30px;padding-right: 8px"></Icon><span v-text="divisionName.name" @click="jump(divisionName.id,[divisionName],0)"></span></span>
     </header>
     <header>
       <span>直达区县平台</span>
       <Select placeholder="请选择区县" v-model="county2" :disabled="!counties.length">
         <Option v-for="item in counties" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
       <button @click="jump(county2,counties,0)" :disabled="!county2">确定</button>
     </header>
     <header>
       <span>直达村站平台</span>
       <Select placeholder="请选择区县" v-model="county" :disabled="!counties.length" @on-change="chooseChange(county,'towns')">
         <Option v-for="item in counties" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
       <Select placeholder="请选择镇" v-model="town" :disabled="!towns.length" @on-change="chooseChange(town,'villages')">
         <Option v-for="item in towns" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
       <Select placeholder="请选择村" v-model="village" :disabled="!villages.length">
         <Option v-for="item in villages" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
       <button @click="jump(village,villages,1)" :disabled="!village">确定</button>
     </header>
      <p class="title"><span>全部区县</span></p>
     <div class="town_details clearfix">
       <ul class="left">
         <li v-for="(item,index) in counties" :key="item.id" v-text="item.name" @click="findAllChildsTree(item.id,index,item)" :class="{active:item.active}"></li>
       </ul>
       <div class="right">
          <p class="checked_town_name">
            <i></i>
            <span v-text="current.name" @click="jump(current.id,counties,0)"></span>
          </p>
          <ul>
            <li v-for="item in sub_villages" :key="item.id">
              <p class="town_name" v-text="item.name"></p>
              <p class="village_wrapper">
                <span :title="v.name" v-for="v in item.childs" :key="v.id" v-text="v.name" @click="jump(v.id,item.childs,1)"></span>
              </p>
            </li>
          </ul>
       </div>
     </div>
   </div>
</template>

<script>
  import indexServer from 'rs/index'
export default {
	data() {
    return {
      id:this.session.get("userDivisionId"),
      divisionName:{},
      hotCounties:[
        {name:"彭州市",id:510182},
        {name:"崇州市",id:510184},
        {name:"都江堰市",id:510181},
        {name:"蒲江县",id:510131},
        {name:"邛崃市",id:510183},
        {name:"金堂县",id:510121},
      ],
      counties:[],
      towns:[],
      villages:[],
      sub_villages:[],
      lastIndex:-1,
      current:"",
      county:"",
      town:"",
      village:"",
      county2:""
    }
	},
	created() {
    indexServer.getDivisionChildren({params:{params3:5101}},({data})=>{
      this.counties = data.slice(1).map(l=>({name:l.name,id:l.id}));
      this.findAllChildsTree(this.counties[0].id,0,this.counties[0]);
      let id = this.id;
      this.divisionName = this.counties.find(l=>l.id == id)||{};
    });
	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {
    findAllChildsTree(id,index,item){
      if(this.lastIndex === index)return;
      let counties = this.counties;
      counties.forEach((l,i)=>{l.active = i===index});
      this.current = item;
      this.lastIndex = index;
      indexServer.findAllChildsTree({params:{id:id}},res=>{
        this.sub_villages = res;
      })
    },
    chooseChange(id,str){
      if(!id)return;
      switch (str){
        case 'towns':
          this.villages = [];this.town = this.village = undefined;
          break;
        case 'villages':
          this.village = undefined;
          break;
      }
      indexServer.getDivisionChildren({params:{params3:id}},({data})=>{this[str] = data;});
    },
    jump(id,array,type){
      let name = array.find(l=>l.id === id).name;
      let str = "#/xian/index?tsid="+id+"&tsname="+name;
      this.session.set("cityVillage",type);
      this.session.set("cityId",id);
      this.session.set("cityName",name);
      //this.$store.dispatch("setMenu", this);
      //this.$store.dispatch("activeCityObj", {id:id,name:name});

      this.open(str);
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.choose_town_container{
  padding-top:30px;
  width: 1200px;
  margin:0 auto;
  .my_division{
    span{
      cursor: pointer;
      position: relative;
      top:-1px;
      color: #000;
      font-size: 14px;
    }
    &:hover{
      span,i{
        color: #ff762b;
      }
    }
  }
  .title{
    height: 50px;
    line-height: 50px;
    font-size:20px;
    color: #000;
    text-align: center;
    border-bottom:1px solid #e5e5e5;
    /*background: url("../../assets/images/choose-town/title.jpg") no-repeat;*/
    span{
      float: left;
      width: 100px;
      border-bottom: 1px solid #a1d955;
      position: relative;
      top:-1px;
    }
  }
  .hot_towns{
    padding:20px 0 15px;
    li{
      cursor: pointer;
      float: left;
      width: 220px;
      height: 50px;
      overflow: hidden;
      margin-right: 25px;
      margin-bottom: 25px;
      border-radius: 4px;
      /*padding-left: 50px;*/
      text-align: center;
      color: #fff;
      font-size:16px;
      line-height: 50px;
      background: url("../../assets/images/choose-town/hot_town_bg.png") no-repeat 100% 100%;
      &:nth-child(5n){
        margin-right:0;
      }
    }
  }
  header{
    padding-left: 30px;
    margin-bottom: 30px;
    >span{
      font-size: 16px;
      color: #000;
      line-height: 40px;
      margin-right:30px;
      display: inline-block;
      vertical-align: middle;
    }
    .ivu-select{
      width:200px;
      height: 40px;
      margin-right: 30px;
      &.ivu-select-visible .ivu-select-selection,&:hover .ivu-select-selection{
        border-color: #a1d955;
        box-shadow:0 0 0 2px rgba(161,217,85,.2);
      }
      .ivu-select-selection{
        height: 40px;
        background: #f9f9f9;
        box-shadow: none;
        .ivu-select-placeholder,.ivu-select-selected-value{
          height: 100%;
          line-height:40px;
          font-size: 14px;
        }
        .ivu-select-placeholder{
          color: #999;
        }
      }
    }
    button{
      width: 100px;
      height:40px;
      border:1px solid #dddee1;
      background-color: transparent;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      transition: all 200ms ease-in;
      vertical-align: middle;
      outline: none;
      &:hover{
        border-color:@base-text-hover-color;
        color:@base-text-hover-color;
      }
    }
  }
  .town_details{
    padding:30px 50px 30px 30px;
    .left{
      width: 180px;
      float: left;
      margin-right: 50px;
      li{
        height:50px;
        line-height: 50px;
        border:1px solid #f2f2f2;
        color: #69b901;
        font-size: 16px;
        padding-left: 30px;
        cursor: pointer;
        &:hover,&.active{
          background-color: #a1d955;
          color: #fff;
        }
      }
    }
    .right{
      float: left;
      width: 890px;
      .checked_town_name{
        height:60px;
        line-height:60px;
        border:1px solid #f2f2f2;
        padding-left: 28px;
        font-size: 16px;
        color: #000;
        span{
          cursor: pointer;
        }
        i{
          display: inline-block;
          width: 2px;
          height: 17px;
          vertical-align: middle;
          margin-right: 10px;
          background-color:#69b901;
        }
      }
      ul{
        li{
          padding:20px 45px;
          &:hover{
            background-color:#f2f2f2;
          }
          .town_name{
            font-size: 16px;
            line-height:16px;
            color: #000;
            padding-bottom: 10px;
          }
          .village_wrapper{
            font-size: 14px;
            text-align: left;
            color: #000;
            span{
              display: inline-block;
              width: 100px;
              line-height:14px;
              height: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor:pointer;
              &:hover{
                color: @base-text-hover-color;
              }
            }
          }
        }
      }
    }
  }
}
</style>
