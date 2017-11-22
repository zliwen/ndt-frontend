/**
 * Created by chenchen on 2017/9/8.
 */

import Award from 'cmpts/approve/Award.vue';
import Risk from 'cmpts/approve/Risk.vue';
export default [

  {
    path:'/process',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"process",
    meta: {
      name: "流程审批",
      icon:'shuffle',
      menu:true
    },
    children: [
      {
        path:'risk',
        component:Risk,
        name:"Risk",
        meta: {
          name: "风险分担",
          menu:true
        }
      },
      {
        path:"award",
        component:Award,
        name:"Award",
        meta: {
          name: "政策奖补",
          menu:true
        }
      }
    ]
  }
];

