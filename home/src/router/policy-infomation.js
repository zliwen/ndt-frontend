import Index from "cmpts/policy-infomation/index";
import infoDetails from "cmpts/policy-infomation/infoDetails"
import comprehensive from'cmpts/policy-infomation/comprehensive'
export default [
  {
    path:'/policy-infomation',
    name:'policy-infomation',
    component:Index,
    meta: {
      name: "政策资讯",
      parent:'政策资讯',
      menu:true
    },
    children:[]
  },
  {
    path:'/policy-infomation/comprehensive',
    name:'policy-infomation-comprehensive',
    component:comprehensive,
    meta: {
      name: "综合服务",
      parent:'政策资讯',
      // menu:true
    },
    children:[]
  },
  {
    path:'/policy-infomation/details',
    name:'infomation-details',
    component:infoDetails,
    meta: {
      name: "政策资讯详情",
      parent:'政策资讯',
      menu:false
    },
    children:[]
  },

  {
    path:'/xian/policy-infomation',
    name:'xian-policy-infomation',
    component:Index,
    meta: {
      name: "政策资讯",
      parent:'政策资讯',
      menu:true
    },
    children:[]
  },
  {
    path:'/xian/policy-infomation/details',
    name:'xian-infomation-details',
    component:infoDetails,
    meta: {
      name: "政策资讯详情",
      parent:'政策资讯',
      menu:false
    },
    children:[]
  },
  {
    path:'/xian/comprehensive',
    name:'xian-comprehensive',
    component:comprehensive,
    meta: {
      name: "综合服务",
      parent:'政策资讯',
      menu:true
    },
    children:[]
  },
  {
    path:'/xian/comprehensive/details',
    name:'xian-comprehensive-details',
    component:infoDetails,
    meta: {
      name: "综合服务详情",
      parent:'综合服务',
      menu:false
    },
    children:[]
  }
];
