/**
 * Created by chenchen on 2017/9/21.
 */

import SyncConfig from 'cmpts/system/SyncConfig.vue';
import LabelManage from 'cmpts/system/LabelManage.vue';
import VillageNewEnterprise from 'cmpts/system/VillageNewEnterprise.vue';
import VillageNewEnterpriseAdd from 'cmpts/system/VillageNewEnterpriseAdd.vue';
import sensitiveWordsManage from 'cmpts/system/sensitiveWordsManage.vue';

export default [

  {
    path:'/system',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"bigdata",
    meta: {
      name: "系统管理",
      icon:'ios-gear',
      userType:[201],
      roleIds:[1,2,3,4,5,6],
      menu:true
    },
    children: [
      {
        path:'sync-config',
        component:SyncConfig,
        name:"SyncConfig",
        meta: {
          name: "自动化配置",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path:'sensitive-word-manage',
        component:sensitiveWordsManage,
        name:"sensitiveWordsManage",
        meta: {
          name: "敏感词管理",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path:'label-manage',
        component:LabelManage,
        name:"LabelManage",
        meta: {
          name: "标签管理",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path:'village-new-enterprise',
        component:VillageNewEnterprise,
        name:"VillageNewEnterprise",
        meta: {
          name: "新型农业经营主体",
          //userType:[201,205],
          menu:true
        }
      },
      {
        path: 'village-new-enterprise/add',
        component: VillageNewEnterpriseAdd,
        name: "VillageNewEnterpriseAdd",
        meta: {
          name: "添加新型农业经营主体"
        }
      }
    ]
  }
];

