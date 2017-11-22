/**
* Created by zhaowei on 2017/11/2.
*/

<template>
  <div class="bank" id="productAll">
    <div class="box">
      <div class="history overflow">
        <a @click="goback('index')">首页</a>
       <!-- <span>></span>
        <a @click="goback('financial-service')">金融机构</a>-->
        <span>></span>
        <span class="title">{{objData.name}}</span>
      </div>
      <div class="topDl">
        <div class="tt clearfix">
          <div class="log">
            <img :src="objData.logoImageUrl" alt="">
          </div>
          <div class="tr">
            <h1>{{objData.name}}</h1>
            <p>网点地址：{{objData.address}}</p>
            <p>联系电话：{{objData.phone}}</p>
          </div>
        </div>
        <div class="ms">
          <h2>机构简介</h2>
          <div>
            <span v-if="!objData.remarkMin||showM" v-html="objData.remark"></span>
            <span v-if="objData.remarkMin&&!showM">{{objData.remarkMin}}</span>
            <b v-if="objData.remarkMin&&!showM" class="more" @click="goMoll(1)"><Icon type="chevron-down"></Icon>查看完整</b>
            <b v-if="objData.remarkMin&&showM" class="more" @click="goMoll(0)"><Icon type="chevron-up"></Icon>收起</b>
          </div>

        </div>
      </div>
      <div class="tabTitle">
        <span v-for="item in typeList" v-bind:class="{active:item.active}"
        @click="tabClick(item)">{{item.value}}</span>
      </div>
      <div class="select">
        <project-filter v-on:change="selectChange" style="padding-left: 30px"></project-filter>
      </div>
      <div style=" min-height: 100px; position: relative;">
        <v-loading slot="content" v-show="loading"></v-loading>
        <ul class="list" v-if="list.length">
          <li class="clearfix" v-for="item in list" @click="goDl(item.id)">
            <div class="i1">
              <h3 class="overflow" :title="item.name">{{item.name}}</h3>
              <!--<div class="bq">
                <span v-for="s in item.labelNames">{{s}}</span>
              </div>-->
              <p>
                <span>最高借款额度:</span>
                <b>{{item.maxAmount | matrixing(1,item.maxAmountUnitName)}}</b>
                <span>{{item.maxAmount | matrixing(0,item.maxAmountUnitName)}}</span>
              </p>
              <p>
                <span>最长借款期限:</span>
                <b>{{item.maxTerm}}</b>
                <span>{{item.maxTermUnitName}}</span>
                </span>
              </p>
            </div>
            <div class="i2">
              <h4>贷款方式</h4>
              <p>
              <span v-for="(b,index) in item.loanTypeNames">{{b}}
                <i v-if="item.loanTypeNames.length-1!=index">、</i>
              </span>

              </p>
            </div>
            <div class="i3">
              <h4>适用对象</h4>
              <p>
              <span v-for="(b,index) in item.productToNames">{{b}}
                <i v-if="item.productToNames.length-1!=index">、</i>
              </span>
              </p>
            </div>
            <div class="i4">
              <h4>受理范围</h4>
              <p>
              <span v-for="(b,index) in item.divisionNames">{{b}}
                <i v-if="item.divisionNames.length-1!=index">、</i>
              </span>
              </p>
            </div>
          </li>
        </ul>
        <v-no-data v-if="!list.length" style="height:300px" :src="project"></v-no-data>
      </div>

      <Page v-if="list.length" class="pagef" :total="total" :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            show-total show-elevator
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
      ></Page>


    </div>
    <vProductModal ref="pModal"></vProductModal>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import project from "../../assets/images/financial07.png"
  import loanProductServer from "rs/loanProduct"
  import orgServer from "rs/org"
  import projectFilter from "../../components/common/projectFilter"
  export default {
    name: 'bank',
    data () {
      return {
        sele:{},
        showM:true,
        loading:false,
        total: 0,
        current:1,
        pageSize:10,
        pageSizeOpts:[1,10,20,30,40],
        project:project,
        list:[],
        typeList:[
          {"id":3301,"key":1,"typeId":33,"typeName":"产品类型","value":"产品",active:true},
         /* {"id":3302,"key":2,"typeId":33,"typeName":"产品类型","value":"保险产品"}*/
        ],
        productType:3301,
        objData:{}
      }
    },
    components:{projectFilter:projectFilter},
    created(){
      this.getData();
      this.getList();
      //$(".productAll")[0].scrollIntoView();
    },
    methods:{
      goMoll(k){
        this.showM=k;
      },
      goDl(id){
        this.$refs.pModal.showModal(id);
        //this.$router.push({name:"",query:{id:item.id}});
      },
      tabClick(item){
        this.typeList.forEach(o=>{
            o.active=false;
        });
        item.active=true;
        this.productType=item.id;
        this.getList({});
      },
      getData(){
        orgServer.findById({params:{id:this.$route.query.id}},response=>{
          this.objData=response.data;
          //this.objData.remark=this.objData.remark.slice(0,60)
          if(this.objData.remark.length>100){
            this.showM=false;
            this.objData.remarkMin=this.objData.remark.slice(0,100)+"..."
          }
        })
      },
      pageChange (current){
        this.current = current;
        this.getList();
      },
      pageSizeChange (pageSize){
        this.current = 1;
        this.pageSize = pageSize;
        this.getList();
      },
      selectChange(data){
        this.current = 1;
        this.sele=data;
        this.getList();
      },
      getList(){
        if(!this.$route.query.id) return;
        this.loading=true;
        loanProductServer.find({
          params: {params4: this.current, params5: this.pageSize},
          data:   Object.assign({
            orgId:this.$route.query.id,
            productType:this.productType
          },this.sele)
        }, response => {
          this.loading=false;
          response.data.pageData.forEach(item=>{
            item.active=false
          });
          this.total=response.data.totalCount;
          if (response.data) this.list=response.data.pageData;
        },err=>{
          this.loading=false;
        })
      },
      goback(name){
        if(this.$route.name=="xianBank"){
          if(name=='index'){
              this.$router.push({name:"nonstop-county-index"});
          }else{
            this.$router.push({name:"xianFinancialService"});
          }
        }else {
          this.$router.push({name:name});
        }

      }
    }
  }
</script>

<style scoped lang='less'>
  .bank { background: #F7F8F8; min-height: 800px;
    .box{ width:880px; margin:0 auto; }
    .history{
      padding-top: 5px;
      line-height: 50px;
      text-indent: 5px;
      font-size: 12px;
      a{
        color: #000;
      }
      span.title{
        color:#666;
      }
    }
    .topDl{
      background:rgba(255,255,255,1);
      border-radius: 6px 6px 0 0 ;
      .tt{ padding:20px; border-bottom: 1px solid #ededed;
        &>div{ float: left;}
          .log{
            width:220px;
            height:80px;

            margin-right: 20px;
            img{ width: 100%; height: 100%;}
          }
          h1{ color: #222;}
      }
      .ms{ padding:10px 20px; line-height: 26px;
        h2{font-size:16px; line-height: 40px; font-weight: bold; color:rgba(102,102,102,1);}
        p{font-size:12px;  color:rgba(102,102,102,1);}
        .more{ color: #4BB0EF; margin-left: 20px; cursor: pointer;
          &:hover{ opacity: 0.8;}
          i{ margin-right: 4px;}
        }
      }
    }
    .tabTitle{ height:55px;  background:rgba(251,251,251,1); line-height: 55px;
      span{ margin: 0 20px; font-size: 16px; cursor:pointer; font-weight: bold;
        &:hover,&.active{ color: #FF762B;}
      }
    }
    .select{
      .project_filter_container{ background: #fff; border-radius: 0 0 6px 6px;}
    }
    .list{ min-height: 300px;
      li{height:105px; background:#FBFBFB; border-radius: 6px ; margin: 15px 0;
        &:hover{ transform: translateY(-2px);
           box-shadow: 0 0 10px #ccc; cursor: pointer;
          h3{ cursor: pointer; color:#FF762B; font-weight: bold; }
         }
      }
      .i1{width:240px; background: #fff; height: 100%; border-radius: 6px 0 0 6px ;
        h3{ margin: 10px 0 10px; border-left: 4px solid #FF762B; padding-left: 15px; font-size: 16px;
          color: #222; width: 100%; height: 24px;
        }
        p{ padding-left: 20px;
          b{ color:#FF762B; font-size: 16px; }
        }
        .bq{ padding: 0 20px; height: 56px; overflow: hidden;}
        .bq span{ display: inline-block;height:20px; background:rgba(245,245,245,1); line-height: 20px;
          border-radius: 10px ; padding: 0 10px; color: rgba(153,153,153,1); margin: 4px 3px;}
      }
      .i2,.i3,.i4{ width: 210px; padding: 15px 0 15px 30px;
        h4{ margin-bottom: 15px;}
        p{ color: #777;}
      }
      li>div{ float: left;}
    }
    .pagef{ text-align: right;}
  }
</style>
