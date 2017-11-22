/**
 * Created by chenchen on 2017/9/20.
 */

import Report from 'cmpts/bigdata/report.vue';
import LoanBusinessReport from 'cmpts/bigdata/loanBusinessReport';
import operateplatformReport from 'cmpts/bigdata/operateplatformReport'
import villageWorkReport from 'cmpts/bigdata/villageWorkReport'
import statementLoanReport from 'cmpts/bigdata/statementLoanReport'

export default [

  {
    path:'/bigdata',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"bigdata",
    meta: {
      name: "大数据",
      icon:'stats-bars',
      userType:[201,204,205,206,207],
      roleIds:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
        20,23,24,25,26,27,28,30,33,34,35],
      menu:true
    },
    children: [
      {
        path:'report',
        component:Report,
        name:"report",
        meta: {
          name: "总体概要",
          userType:[201,204,205],
          roleIds:[1,2,3,4,5,6,11,16,23,24,25,26,27,28,35],
          menu:true
        }
      },
      {
        path:'loan-business-report',
        component:LoanBusinessReport,
        name:"loan-business-report",
        meta: {
          name: "贷款业务详情",
          userType:[201,205],
          roleIds:[1,2,3,4,5,6,35],
          menu:true
        }
      },{
      	path:'operate-Platform-Report',
        component:operateplatformReport,
        name:"operate-Platform-Report",
        meta: {
          name: "运营平台报表",
          userType:[201,204,205],
          roleIds:[1,2,3,4,5],
          menu:true
        }
      },
      {
        path:'village-work-report',
        component:villageWorkReport,
        name:"villageWorkReport",
        meta: {
          name: "村站工作报表",
          userType:[201,204,205],
          roleIds:[1,2,3,4,5,23,24,25,26,27,28,34,35],
          menu:true
        }
      },
      {
        path:'statement-loan-report',
        component:statementLoanReport,
        name:"statementLoanReport",
        meta: {
          name: "贷款业务报表",
          userType:[201,204,205],
          roleIds:[1,2,3,4,5,6,11,16,23,24,25,26,27,28,35],
          menu:true
        }
      }
    ]
  }
];

