/**
 * Created by zhaowei on 2017/10/19.
 */


import VillageFarmer from 'cmpts/village/VillageFarmer.vue';
import VillageFarmerAdd from 'cmpts/village/VillageFarmerAdd.vue';
import VillageEnterprise from 'cmpts/village/VillageEnterprise.vue';
import VillageEnterpriseAdd from 'cmpts/village/VillageEnterpriseAdd.vue';
import VillageEnterpriseCheckSee from 'cmpts/village/VillageEnterpriseCheckSee.vue'
import VillageEnterpriseTap from 'cmpts/village/VillageEnterpriseTap.vue';

import VillageFarmerView from 'cmpts/village/VillageFarmerView.vue';


export default [

  {
    path:'/village',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"Village",
    meta: {
      name: "信用采集",
      icon:'social-pinterest',
      userType:[201,204],
      roleIds:[1,2,3,4,5,29,30,34,35,36],
      menu:true
    },
    children: [
      {
        path:'village-farmer',
        component:VillageFarmer,
        name:"VillageFarmer",
        meta: {
          name: "农户管理",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path: 'village-farmer/add',
        component: VillageFarmerAdd,
        name: "VillageFarmerAdd",
        meta: {
          name: "添加农户"
        }
      },
      {
        path: 'village-farmer/update',
        component: VillageFarmerAdd,
        name: "VillageFarmerUpdate",
        meta: {
          name: "编辑农户"
        }
      },
      {
        path: 'village-farmer/view',
        component: VillageFarmerView,
        name: "VillageFarmerView",
        meta: {
          name: "查看农户"
        }
      },
      {
        path:'village-enterprise',
        component:VillageEnterprise,
        name:"VillageEnterprise",
        meta: {
          name: "农业经营主体",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path: 'village-enterprise/add',
        component: VillageEnterpriseAdd,
        name: "VillageEnterpriseAdd",
        meta: {
          name: "添加农业经营主体"
        }
      },
      {
        path: 'village-enterprise/checkSee',
        component: VillageEnterpriseCheckSee,
        name: "VillageEnterpriseCheckSee",
        meta: {
          name: "查看农业经营主体"
        }
      }
      /*{
        path:'village-enterprise-tap',
        component:VillageEnterpriseTap,
        name:"VillageEnterpriseTap",
        meta: {
          name: "龙头企业数据",
          //userType:[201,205],
          menu:true
        }
      }*/

    ]
  }
];
