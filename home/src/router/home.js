import Index from "cmpts/home/index"
import XianIndex from "cmpts/nonstop-county/index"
import loginAndRegister from 'cmpts/home/loginAndRegister';
import companyRegister from 'cmpts/home/companyRegister';
import ProductModal from 'cmpts/common/ProductModal';
import resetPassword from 'cmpts/home/resetPassword';
import bindWeiXin from 'cmpts/home/bindWx';
export default [
  {
    path:'/index',
    name:'index',
    component:Index,
    meta: {
      name: "首页",
      parent:'首页',
      menu:true
    },
    children:[]
  },
  {
    path:'/xian/index',
    name:'nonstop-county-index',
    component:XianIndex,
    meta: {
      name: "首页",
      parent:'直达区县',
      menu:true
    },
    children:[]
  },
  {
    path: '/login-and-register',
    component:loginAndRegister,
    name:"loginAndRegister",
    meta: {
      name: "注册登录",
      hideIndexLoginButton:true
      // parent:'首页',
      // menu:true
    },
    children:[]
  },
  {
    path: '/ProductModal',
    component:ProductModal,
    name:"ProductModal",
    meta: {
      name: "ProductModal",
      // hideIndexLoginButton:true
      // parent:'首页',
      // menu:true
    },
    children:[]
  },
  {
    path: '/company-register',
    component:companyRegister,
    name:"company-register",
    meta: {
      name: "企业注册",
      hideIndexLoginButton:true
      // parent:'首页',
      // menu:true
    },
    children:[]
  },
  {
    path: '/reset-password',
    component:resetPassword,
    name:"resetPassword",
    meta: {
      name: "重置密码",
      // hideIndexLoginButton:true
      // parent:'首页',
      // menu:true
    },
    children:[]
  },
  {
    path: '/bind_wei_xin',
    component:bindWeiXin,
    name:"bindWeiXin",
    meta: {
      name: "微信绑定",
      // hideIndexLoginButton:true
      // parent:'首页',
      // menu:true
    },
    children:[]
  },
];
