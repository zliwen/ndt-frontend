/**
 * Created by chenchen on 2017/9/6.
 */
import Norm from 'cmpts/credit/Norm.vue';
import NewOperate from 'cmpts/credit/NewOperateCustom.vue';
import Message from 'cmpts/credit/Message.vue';
export default [

  {
    path:'/credit',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"organization",
    meta: {
      name: "信用体系",
      icon:'filing',
      menu:true
    },
    children: [
      {
        path:'message',
        component:Message,
        name:"Message",
        meta: {
          name: "采集信息管理",
          menu:true
        }
      },
      {
        path:"norm",
        component:Norm,
        name:"Norm",
        meta: {
          name: "信用指标管理",
          menu:true
        }
      },
      {
        path:"newoperatecustom",
        component:NewOperate,
        name:"NewOperate",
        meta: {
          name: "新型经营主体",
          menu:true
        }
      }

    ]
  }
];
