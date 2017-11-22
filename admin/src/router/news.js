/**
 * Created by zhaowei on 2017/9/4.
 */
import Policy from 'cmpts/news/Policy.vue';
import PolicyCheck from 'cmpts/news/PolicyCheck.vue';
import PolicyEdit from 'cmpts/news/PolicyEdit.vue';
import NdtPolicy from 'cmpts/news/NdtPolicy.vue';
import NdtPolicyCheck from 'cmpts/news/NdtPolicyCheck.vue';
import NdtPolicyEdit from 'cmpts/news/NdtPolicyEdit.vue';
import News from 'cmpts/news/News.vue';
import NewsCheck from 'cmpts/news/NewsCheck.vue';
import NewsEdit from 'cmpts/news/NewsEdit.vue';
import VillageInfo from 'cmpts/news/VillageInfo.vue';
import VillageInfoCheck from 'cmpts/news/VillageInfoCheck.vue';
import VillageInfoEdit from 'cmpts/news/VillageInfoEdit.vue';
import recommend from 'cmpts/news/recommend.vue';
import fileShare from 'cmpts/news/fileShare.vue';
export default [

  {
    path:'/news',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"organization",
    meta: {
      name: "信息管理",
      icon:'funnel',
      userType:[201,204],
      roleIds:[1,2,3,23,26,27,28,29,33,34,35,36],
      menu:true
    },
    children: [
      {
        path:'policy',
        component:Policy,
        name:"Policy",
        meta: {
          name: "农业政策",
          roleIds:[1,2,3,23,24,25,26,27,28,29,35],
          menu:true
        }
      },
      {
        path:'policy-check',
        component:PolicyCheck,
        name:"PolicyCheck",
        meta: {
          name: "农业政策审核",
          roleIds:[1,2,3,23,24,25,26,27,28,29,35],
          // menu:true
          // 关闭审核
        }
      },
      {
        path:"policy/details",
        component:PolicyEdit,
        name:"PolicyEdit",
        meta: {
          name: "政策编辑",
          menu:false
        }
      },
      {
        path:"policy-check/details",
        component:PolicyEdit,
        name:"PolicyCheckDetails",
        meta: {
          name: "农业政策审核详情",
          menu:false
        }
      },
      {
        path:'ndt-policy',
        component:NdtPolicy,
        name:"NdtPolicy",
        meta: {
          name: "农贷通政策",
          roleIds:[1,2,3,23,24,25,26,27,28,29,35],
          menu:true
        }
      },
      {
        path:'ndt-policy-check',
        component:NdtPolicyCheck,
        name:"NdtPolicyCheck",
        meta: {
          name: "农贷通政策审核",
          roleIds:[1,2,3,23,24,25,26,27,28,29,35],
           // menu:true
          // 关闭审核
        }
      },
      {
        path:'ndt-policy/details',
        component:NdtPolicyEdit,
        name:"NdtPolicyEdit",
        meta: {
          name: "农贷通政策编辑",
          roleIds:[1,2,3],
          menu:false
        }
      },
      {
        path:"ndt-policy-check/details",
        component:NdtPolicyEdit,
        name:"NdtPolicyCheckDetails",
        meta: {
          name: "农贷通政策审核详情",
          menu:false
        }
      },
      {
        path:"news",
        component:News,
        name:"News",
        meta: {
          name: "新闻资讯",
          roleIds:[1,2,3,23,26,27,28,29,35,34],
          menu:true
        }
      },
      {
        path:"news-check",
        component:NewsCheck,
        name:"NewsCheck",
        meta: {
          name: "新闻资讯审核",
          roleIds:[1,2,3,23,26,27,28,29,35],
           // menu:true
          // 关闭审核
        }
      },
      {
        path:"news/details",
        component:NewsEdit,
        name:"NewsEdit",
        meta: {
          name: "新闻编辑",
          menu:false
        }
      },
      {
        path:"news-check/details",
        component:NewsEdit,
        name:"NewsCheckDetails",
        meta: {
          name: "新闻审核详情",
          menu:false
        }
      },
      {
        path:'VillageInfo',
        component:VillageInfo,
        name:"VillageInfo",
        meta: {
          name: "村务信息",
          roleIds:[1,2,3,33,34,36],
          menu:true
        }
      },
      {
        path:'VillageInfo-check',
        component:VillageInfoCheck,
        name:"VillageInfoCheck",
        meta: {
          name: "村务信息审核",
          roleIds:[1,2,3,33,34,36],
          // menu:true
          // 关闭审核
        }
      },
      {
        path:"VillageInfo/details",
        component:VillageInfoEdit,
        name:"VillageInfoEdit",
        meta: {
          name: "村务信息编辑",
          menu:false
        }
      },
      {
        path:"VillageInfo-check/details",
        component:VillageInfoEdit,
        name:"VillageInfoCheckDetails",
        meta: {
          name: "村务信息审核详情",
          menu:false
        }
      },
      {
        path:"recommend",
        component:recommend,
        name:"recommend",
        meta: {
          name: "推荐管理",
          roleIds:[1,2,3],
          menu:true
        }
      },
      {
        path:"fileShare",
        component:fileShare,
        name:"fileShare",
        meta: {
          name: "资源管理",
          roleIds:[1,2,3],
          menu:true
        }
      },
    ]
  }
];
