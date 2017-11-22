import Index from "cmpts/financial-service/index"
import applyFor from "cmpts/financial-service/applyFor"
import bank from "cmpts/financial-service/bank"
import insurance from "cmpts/financial-service/insurance"

export default [
  {
    path:'/financial-service',
    name:'financial-service',
    component:Index,
    meta: {
      name: "金融服务",
      menu:true
    },
    children:[]
  },
  {
    path:'/financial-service/applyFor',
    name:'applyFor',
    component:applyFor,
    meta: {
      name: "贷款申请"
    },
    children:[]
  },
  {
    path:'/xian/financial-service',
    name:'xianFinancialService',
    component:Index,
    meta: {
      name: "金融服务",
      menu:true
    },
    children:[]
  },
  {
    path:'/xian/financial-service/applyFor',
    name:'xianApplyFor',
    component:applyFor,
    meta: {
      name: "贷款申请"
    },
    children:[]
  },
  {
    path:'/financial-service/bank',
    name:'bank',
    component:bank,
    meta: {
      name: "银行"
    },
    children:[]
  },
  {
    path:'/xian/financial-service/bank',
    name:'xianBank',
    component:bank,
    meta: {
      name: "银行"
    },
    children:[]
  },
  {
    path:'/financial-service/insurance',
    name:'insurance',
    component:insurance,
    meta: {
      name: "银行"
    },
    children:[]
  },
  {
    path:'/xian/financial-service/insurance',
    name:'xianInsurance',
    component:insurance,
    meta: {
      name: "银行"
    },
    children:[]
  }
];
