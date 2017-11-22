import Index from "cmpts/country-credit/index"
import firmHome from "cmpts/country-credit/firmHome"
import firmBaseInfo from "cmpts/country-credit/firmBaseInfo"
import patent from "cmpts/country-credit/patent"
import firmCredit from "cmpts/country-credit/firmCredit"
import firmFinalReport from "cmpts/country-credit/firmFinalReport"
import patentDetails from "cmpts/country-credit/patentDetails"
import firmOperationInfor from "cmpts/country-credit/firmOperationInfor"
import firmTax from 'cmpts/country-credit/firmTax'
import firmEcharts from 'cmpts/country-credit/firmEcharts'

export default [
  {
    path:'/country-credit',
    name:'country-credit',
    component:Index,
    meta: {
      name: "农村信用体系",
      parent:'农村信用体系',
      menu:true
    },
    children:[]
  },
  {
    path:'/xian/country-credit',
    name:'xian-country-credit',
    component:Index,
    meta: {
      name: "农村信用体系",
      parent:'农村信用体系',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmHome',
  	name:'credit-firmHome',
    component:firmHome,
    meta: {
      name: "企业洞察",
      parent:'企业洞察',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmBaseInfo',
  	name:'credit-firmBaseInfo',
  	component:firmBaseInfo,
    meta: {
      name: "基本资料",
      parent:'基本资料',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmCredit',
  	name:'credit-firmCredit',
  	component:firmCredit,
    meta: {
      name: "信用行为",
      parent:'信用行为',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmOperationInfor',
  	name:'credit-firmOperationInfor',
  	component:firmOperationInfor,
    meta: {
      name: "经营信息",
      parent:'经营信息',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmProRight/patentDetails',
  	name:'credit-firmProRight-details',
    component:patentDetails,
    meta: {
    },
    children:[]
  },
  {
  	path:'/credit/firmProRight/',
  	name:'credit-firmProRight',
    component:patent,
    meta: {
      name: "知识产权",
      parent:'知识产权',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmEcharts',
  	name:'credit-firmEcharts',
  	component:firmEcharts,
    meta: {
      name: "关联图谱",
      parent:'关联图谱',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmTax',
  	name:'credit-firmTax',
  	component:firmTax,
    meta: {
      name: "国税信息",
      parent:'国税信息',
      menu:true
    },
    children:[]
  },
  {
  	path:'/credit/firmFinalReport',
  	name:'credit-firmFinalReport',
  	component:firmFinalReport,
    meta: {
      name: "信用报告",
      parent:'信用报告',
      menu:false
    },
    children:[]
  }
];
