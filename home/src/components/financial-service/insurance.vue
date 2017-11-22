/**
* Created by zhaowei on 2017/11/2.
*/

<template>
  <div class="bank">
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
      <div style=" min-height: 100px; position: relative;">
        <v-loading slot="content" v-show="loading"></v-loading>
        <ul class="list" v-if="list.length">
          <li class="" v-for="item in list" @click="goDl(item.id)">
            <h3 class="overflow"><span>{{item.name}}</span></h3>
            <div class="clearfix">
              <div class="i2">
                <h4>最高保障金额</h4>
                <p>
                  <span>{{item.insuranceLimit}}</span>
                </p>
              </div>
              <div class="i3">
                <h4>保费</h4>
                <p>
                  <span>{{item.insuranceCosts}}</span>
                </p>
              </div>
              <div class="i4">
                <h4>适用人群</h4>
                <p>
                  <span v-for="(b,index) in item.intendedFor">
                    {{b}}
                    <i v-if="item.intendedFor.length-1!=index">、</i>
                  </span>
                </p>
              </div>
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
    <insuranceModal ref="pModal"></insuranceModal>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import project from "../../assets/images/financial07.png"
  import insureProductServer from "rs/insureProduct"
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
         /* {"id":3301,"key":1,"typeId":33,"typeName":"产品类型","value":"产品"},*/
         {"id":3302,"key":2,"typeId":33,"typeName":"产品类型","value":"产品",active:true}
        ],
        productType:3302,
        objData:{}
      }
    },
    components:{projectFilter:projectFilter},
    created(){
        this.getData();
        this.getList();
    },
    methods:{
      goMoll(k){
        this.showM=k;
      },
      goDl(id){
        this.$refs.pModal.showModal(id,this.objData.phone);
        //this.$router.push({name:"",query:{id:item.id}});
      },
      tabClick(item){
        this.typeList.forEach(o=>{
            o.active=false;
        });
        item.active=true;
        this.productType=item.id;
        this.getList();
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
      getList(){
        if(!this.$route.query.id) return;
        this.loading=true;
        insureProductServer.find({
          params: {params4: this.current, params5: this.pageSize},
          data:   Object.assign({
            orgId:this.$route.query.id
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
        if(this.$route.name=="xianInsurance"){
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
      li{min-height:115px; background:#FBFBFB; border-radius: 6px ; margin: 15px 0;
        &:hover{ transform: translateY(-2px);
           box-shadow: 0 0 10px #ccc; cursor: pointer;
          h3{ cursor: pointer; color:#FF762B; font-weight: bold; }
         }
      }
      h3{ font-size: 16px; height: 40px; padding-top: 8px;
        color: #222; width: 100%; background: #fff; border-radius: 6px 6px 0 0;
        span{ display: inline-block;  height: 24px;
          border-left: 4px solid #FF762B; padding-left: 15px; }
      }
      .clearfix{ width: 100%;}
      .i2,.i3,.i4{ width: 33.33%; padding: 15px 0 15px 30px; float: left;
        h4{ margin-bottom: 5px;}
        p{ color: #777;}
      }
      .i2{p{color: #FF762B;}}
      .i4{ padding-right: 30px;}
    }
    .pagef{ text-align: right;}
  }
</style>
