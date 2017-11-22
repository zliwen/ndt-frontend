/**
 * Created by zhaowei on 2017/10/17.
 */
import userMenu from "cmpts/user/userMenu";
import material from "cmpts/user/material";
import revisePassword from "cmpts/user/revisePassword";
import authentication from "cmpts/user/authentication";
import help from "cmpts/user/helpDoc";
import question from "cmpts/user/question";
import meLoan from "cmpts/user/meLoan";
import meInsurance from "cmpts/user/meInsurance";
import reviseMobile from "cmpts/user/reviseMobile";


export default [
  {
    path: '/user',
    name: 'user',
    component: userMenu,
    meta: {
      name: "用户"
    },
    children: [
      {
        path: 'meLoan',
        name: 'meLoan',
        component: meLoan,
        meta: {
          name: "贷款申请",
          parent: "产品申请"
        }
      },
      /*{
        path: 'meInsurance',
        name: 'meInsurance',
        component: meInsurance,
        meta: {
          name: "保险申请",
          parent: "产品申请"
        }
      },*/
      {
        path: 'material',
        name: 'material',
        component: material,
        meta: {
          name: "用户资料",
          parent: "个人中心"
        }
      },
      {
        path: 'reviseMobile',
        name: 'reviseMobile',
        component: reviseMobile,
        meta: {
          name: "修改手机号",
          parentMin: "material"
        }
      },
      {
        path: 'revisePassword',
        name: 'revisePassword',
        component: revisePassword,
        meta: {
          name: "修改密码",
          parent: "个人中心"
        }
      },
      /*{
        path: 'help',
        name: 'help',
        component: help,
        meta: {
          name: "帮助",
          parent: "帮助中心"
        }
      },
      {
        path: 'question',
        name: 'question',
        component: question,
        meta: {
          name: "常见问题",
          parent: "帮助中心"
        }
      },*/
      {
        path: 'material/authentication',
        name: 'authentication',
        component: authentication,
        meta: {
          parentMin:"material",
          name:"实名认证"
        }
      }
    ]
  },
  {
    path: '/xian/user',
    name: 'xianUser',
    component: userMenu,
    meta: {
      name: "用户"
    },
    children: [
      {
        path: 'meLoan',
        name: 'xianMeLoan',
        component: meLoan,
        meta: {
          name: "贷款申请",
          parent: "产品申请"
        }
      },
      /*{
       path: 'meInsurance',
       name: 'meInsurance',
       component: meInsurance,
       meta: {
       name: "保险申请",
       parent: "产品申请"
       }
       },*/
      {
        path: 'material',
        name: 'xianMaterial',
        component: material,
        meta: {
          name: "用户资料",
          parent: "个人中心"
        }
      },
      {
        path: 'reviseMobile',
        name: 'xianReviseMobile',
        component: reviseMobile,
        meta: {
          name: "修改手机号",
          parentMin: "material"
        }
      },
      {
        path: 'revisePassword',
        name: 'xianRevisePassword',
        component: revisePassword,
        meta: {
          name: "修改密码",
          parent: "个人中心"
        }
      },
      /*{
       path: 'help',
       name: 'help',
       component: help,
       meta: {
       name: "帮助",
       parent: "帮助中心"
       }
       },
       {
       path: 'question',
       name: 'question',
       component: question,
       meta: {
       name: "常见问题",
       parent: "帮助中心"
       }
       },*/
      {
        path: 'material/authentication',
        name: 'xianAuthentication',
        component: authentication,
        meta: {
          parentMin:"material",
          name:"实名认证"
        }
      }
    ]
  }
];
