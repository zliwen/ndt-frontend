<template>
    <div class="material">
      <div class="userTitleb">
        用户资料
      </div>
      <div class="userTitleMin">
        <span>企业基本资料</span>
      </div>
      <ul class="tableB">
        <li>
          <span>公司名称</span>
          <template v-if="flags[0]">
            <Input v-model="company.name" placeholder="请输入公司名称" :autofocus="flags[0]"/>
            <b @click="update('name',company.name,0)">完成</b>
          </template>
          <template v-else>
            <i>{{company.name}}</i>
            <b @click="flags.splice(0,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>工商注册号/组织机构代码</span>
          <template v-if="flags[1]">
            <Input v-model="company.code" placeholder="请输入工商注册号/组织机构代码" :autofocus="flags[1]"/>
            <b @click="update('code',company.code,1)">完成</b>
          </template>
          <template v-else>
            <i>{{company.code}}</i>
            <b @click="flags.splice(1,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>企业所在区域</span>
          <template v-if="flags[2]">
            <div style="display: inline-block;width:550px">
              <Select v-model="cities.currentShi" placeholder="选择市" :disabled="!cities.shi.length" :class="{selected:cities.currentShi}">
                <Option v-for="item in cities.shi" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="cities.currentXian" placeholder="选择县" @on-change="getChild('zhen',cities.currentXian,cities.xian)" :disabled="!cities.xian.length" :class="{selected:cities.currentXian}">
                <Option v-for="item in cities.xian" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="cities.currentZhen" placeholder="选择乡镇" @on-change="getChild('cun',cities.currentZhen,cities.zhen)" :disabled="!cities.zhen.length" :class="{selected:cities.currentZhen}">
                <Option v-for="item in cities.zhen" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="cities.currentCun" placeholder="选择村" :disabled="!cities.cun.length" :class="{selected:cities.currentCun}">
                <Option v-for="item in cities.cun" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </div>
            <!--<Input v-model="company.address" placeholder="请输入企业注册地址" :autofocus="flags[2]"/>-->
            <b @click="updateAddress">完成</b>
          </template>
          <template v-else>
            <i>{{company.address}}</i>
            <b @click="flags.splice(2,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>法人代表</span>
          <template v-if="flags[3]">
            <Input v-model="company.legalPerson" placeholder="请输入法人代表" :autofocus="flags[3]"/>
            <b @click="checkLegalPersonName('legalPerson','法人',3)">完成</b>
          </template>
          <template v-else>
            <i>{{company.legalPerson}}</i>
            <b @click="flags.splice(3,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>法人代表身份证</span>
          <template v-if="flags[4]">
            <Input v-model="company.legalPersonIdentityId" placeholder="请输入法人代表身份证" :autofocus="flags[4]"/>
            <b @click="checkLegalPersonId('legalPersonIdentityId','法人',4)">完成</b>
          </template>
          <template v-else>
            <i>{{company.legalPersonIdentityId}}</i>
            <b @click="flags.splice(4,1,true);">修改</b>
          </template>
        </li>
      </ul>
      <div class="userTitleMin">
        <span>联系人资料</span>
      </div>
      <ul class="tableB">
        <li>
          <span>联系人姓名</span>
          <template v-if="flags[5]">
            <Input v-model="company.contactName" placeholder="请输入联系人姓名" :autofocus="flags[5]"/>
            <b @click="checkLegalPersonName('contactName','联系人',5)">完成</b>
          </template>
          <template v-else>
            <i>{{company.contactName}}</i>
            <b @click="flags.splice(5,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>联系人身份证</span>
          <template v-if="flags[6]">
            <Input v-model="company.contactIdentityId" placeholder="请输入联系人身份证" :autofocus="flags[6]"/>
            <b @click="checkLegalPersonId('contactIdentityId','联系人',6)">完成</b>
          </template>
          <template v-else>
            <i>{{company.contactIdentityId}}</i>
            <b @click="flags.splice(6,1,true);">修改</b>
          </template>
        </li>
        <li>
          <span>手机号</span>
          <i>{{company.bindTelephone}}</i>
          <router-link tag="b" :to="{name:'reviseMobile'}">修改</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import indexServer from 'rs/index'
  export default {
//    props:{
//      data:{
//        type:Object,
//        required: true,
//      }
//    },
    name:"materialCompany",
    data () {
      return {
        company:{},
        flags:[false,false,false,false,false,false,false,false],
        cities:{
          shi:[{name:"成都市",id:5101}],
          xian:[],
          zhen:[],
          cun:[],
          currentShi:5101,
          currentXian:"",
          currentZhen:"",
          currentCun:"",
        },
      }
    },
    created:function () {
      indexServer.companyDetails({params:{params4:this.session.get('userId')}},({data})=>{
        this.company = data;
        let id = data.divisionVo.id;
        if(id){
          id = id+"";
          indexServer.findAllChildsTree({params:{id:5101}},(data)=>{
            let cities = this.cities;
            cities.currentXian = +id.slice(0,6);
            cities.currentZhen = +id.slice(0,9);
            cities.currentCun = +id;
            cities.xian = data.slice(1);
            cities.zhen = data.find(l=>l.id === cities.currentXian).childs;
            cities.cun = cities.zhen.find(l=>l.id === cities.currentZhen).childs;
          });
        }
      });
    },
    methods:{
      getChild(s,n,data){
        let cities = this.cities;
        switch (s){
          case 'zhen':
            cities.currentZhen = undefined;
            cities.currentCun = undefined;
            cities.zhen = data.find(l=>l.id === n).childs;
            cities.cun = [];
            break;
          case 'cun':
            cities.currentCun = undefined;
            let obj = data.find(l=>l.id === n);
            cities.cun = obj?obj.childs:[];
            break;
        }
      },
      updateAddress(){
        let cities = this.cities;
        if(this.update('adminDivisionId',cities.currentCun)===null)return;
        indexServer.divisionDetails({params:{params3:cities.currentCun}},({data})=>{
          this.company.adminDivisionId = cities.currentCun;
          this.company.address = data.fullName;
          this.update("address",data.fullName,2);
        });
      },
      update(str,value,num){
        let flags = this.flags;
        if(!value){this.$Message.error("该字段不能为空！");return null}
        let obj = {};obj[str] = value;
        indexServer.companyUpdate({data:obj},({errorCode})=>{
          if(num===undefined)return;
          if(!errorCode)flags.splice(num,1,!flags[num])
        });
      },
      checkLegalPersonId(string,type,num){
        let company = this.company;
        let str = company[string];
        if(!str)this.$Message.error("请填写"+type+"身份证号码");
        else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)))this.$Message.error("身份证填写有误");
        else this.update(string,str,num);
      },
      checkLegalPersonName(string,type,num){
        let form = this.company;
        let str = form[string];
        if(!str)this.$Message.error("请填写"+type+"姓名");
        else if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(str)))this.$Message.error("姓名填写有误");
        else this.update(string,str,num);
      },
    }
  }
</script>
<style scoped lang='less'>
  .material {
    .authentication{
      cursor: pointer;
      span:hover{
        text-decoration: underline;
      }
    }
    .userTitleb{font-size: 16px; padding-left: 10px; border-left: 2px solid #ff762b; height: 18px;
      line-height: 18px;
    }
    .userTitleMin{ border-bottom: 1px solid #ededed; line-height: 36px; margin-top: 40px;
      position: relative; height: 36px;
      span{ position: absolute; display: inline-block; height: 36px; color: #ff762b;
        font-size: 14px; padding: 0 20px; border-bottom: 1px solid #ff762b;
      }
    }
    .txBox{ margin: 30px 0;
      >div{ float: left; width: 160px;}
      .xq{ padding: 3px; line-height: 34px;
        img,span{vertical-align: middle;}
        img{ margin-right: 4px;}
      }
      .rz{ padding: 3px; line-height: 34px;
        p{height: 34px;}
        img,span{vertical-align: middle;}
        img{ margin-right: 4px;}
      }
    }
    .tableB{
      li{ border-bottom: 1px solid #ededed; padding: 6px 20px;
        line-height:32px;
        span,i,b{ display: inline-block;}
        span{ width: 200px;color: #999;}
        i{ width: 550px; font-style: normal; font-weight: 700; }
        .ivu-input-wrapper{
          width: 550px;
        }
        b{ font-weight: normal; color: #ff762b; text-align: right; width: 94px;
          cursor: pointer;
          &:hover{ color: #ff988d; text-decoration:underline}
        }
      }
    }
  }
</style>
<style lang="less">
  .material .ivu-select{
    width: 100px;
    margin-right: 10px;
    li{ padding:7px 16px!important;line-height: normal!important;}
    &.selected .ivu-select-selection{
      border:1px solid @base-text-hover-color;
    }
  }
</style>
