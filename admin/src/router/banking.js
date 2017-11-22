/**
 * Created by zhaowei on 2017/9/4.
 */

import Product from 'cmpts/banking/Product.vue';
import ProductDetails from 'cmpts/banking/ProductDetails.vue';

import InsureProduct from 'cmpts/banking/InsureProduct.vue';
import InsureProductDetails from 'cmpts/banking/InsureProductDetails.vue';

import FinanceLoanApply from 'cmpts/banking/FinanceLoanApply.vue';
import FinanceLoanApplyDetail from 'cmpts/banking/FinanceLoanApplyDetail.vue';
import FinanceLoanApplyState from 'cmpts/banking/FinanceLoanApplyState.vue';
import FinanceLoanFinish from 'cmpts/banking/FinanceLoanFinish.vue';
import CustomLoanApply from 'cmpts/banking/CustomLoanApply.vue';
import CustomLoanApplyAdd from 'cmpts/banking/CustomLoanApplyAdd.vue';
import CustomLoanFinish from 'cmpts/banking/CustomLoanFinish.vue';
import CustomProject from 'cmpts/banking/CustomProject.vue';
import FinanceProject from 'cmpts/banking/FinanceProject.vue';
import FinanceRisk from 'cmpts/banking/FinanceRisk.vue';
import FinanceRiskDetail from 'cmpts/banking/FinanceRiskDetail.vue';

import RiskBearing from 'cmpts/banking/RiskBearing.vue';
import RiskBearingState from 'cmpts/banking/RiskBearingState.vue';
import RiskBearingDetail from 'cmpts/banking/RiskBearingDetail.vue';

export default [

  {
    path:'/banking',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name:"banking",
    meta: {
      name: "金融业务",
      icon:'social-usd',
      userType:[201,202,204,205,206,207],
      menu:true
    },
    children: [
      {
        path:'product',
        component:Product,
        name:"product",
        meta: {
          name: "产品管理",
          userType:[201,205,206,207],
          roleIds:[1,2,3,4,5,6,7,8,9,10],
          menu:true
        }
      },
      {
        path:'product/details',
        component:ProductDetails,
        name:"product-details",
        meta: {
          name: "新增产品",
          userType:[201,205,206,207],
          menu:false
        }
      },
      {
        path:'insure-product',
        component:InsureProduct,
        name:"insure-product",
        meta: {
          name: "保险产品管理",
          userType:[201,206],
          roleIds:[1,2,3,4,5,11,12,13,14,15],
          menu:true
        }
      },
      {
        path:'insure-product/details',
        component:InsureProductDetails,
        name:"insure-product-details",
        meta: {
          name: "新增保险产品",
          userType:[201,206],
          menu:false
        }
      },
      {
        path:"financeloan-apply",
        component:FinanceLoanApply,
        name:"FinanceLoanApply",
        meta: {
          name: "金融机构贷款申请管理",
          userType:[201,205,206,207],
          roleIds:[1,2,3,4,5,6,7,8,9,10],
          menu:true
        }
      },
      {
        path:"financeloan-apply/financeloan-detail/:id",
        component:FinanceLoanApplyDetail,
        name:"FinanceLoanApplyDetail",
        meta: {
          name: "贷款申请详情",
          userType:[201,205,206,207]
        }
      },
      {
        path:"financeloan-apply/financeloan-state/:id",
        component:FinanceLoanApplyState,
        name:"FinanceLoanApplyState",
        meta: {
          name: "贷款申请状态修改",
          userType:[201,205,206,207]
        }
      },
      {
        path:"financeloan-finish",
        component:FinanceLoanFinish,
        name:"FinanceLoanFinish",
        meta: {
          name: "金融机构已放款管理",
          userType:[201,205,206,207],
          roleIds:[1,2,3,4,5,6,7,8,9,10],
          menu:true
        }
      },
      {
        path:"financerisk",
        component:FinanceRisk,
        name:"FinanceRisk",
        meta: {
          name: "金融机构风险分担管理",
          userType:[201,205,206,207],
          roleIds:[1,2,3,4,5,6,7,8,9,10],
          menu:true
        }
      },
      {
        path:"financerisk/detail",
        component:FinanceRiskDetail,
        name:"FinanceRiskDetail",
        meta: {
          name: "风险分担申请管理详情",
          userType:[201,205,206,207],
          menu:false
        }
      },
      {
        path:"risk-bearing",
        component:RiskBearing,
        name:"RiskBearing",
        meta: {
          name: "政府机构风险分担管理",
          roleIds:[29,31,32],
          menu:true
        }
      },
      {
        path:"risk-bearing/state",
        component:RiskBearingState,
        name:"RiskBearingState",
        meta: {
          name: "政府机构风险分担申请管理审核",
          roleIds:[29,32]
        }
      },
      {
        path:"risk-bearing/detail",
        component:RiskBearingDetail,
        name:"RiskBearingDetail",
        meta: {
          name: "政府机构风险分担申请详情",
          roleIds:[29,32]
        }
      },
      {
        path:"customloan-apply",
        component:CustomLoanApply,
        name:"CustomLoanApply",
        meta: {
          name: "贷款主体贷款申请管理",
          userType:[201,202],
          //menu:true
        }
      },
      {
        path:"customloan-apply/add",
        component:CustomLoanApplyAdd,
        name:"CustomLoanApplyAdd",
        meta: {
          name: "贷款申请",
          userType:[201,202]
        }
      },
      {
        path:"customloan-finish",
        component:CustomLoanFinish,
        name:"CustomLoanFinish",
        meta: {
          name: "贷款主体已放贷贷款管理",
          userType:[201,202]
          //menu:true
        }
      },
      {
        path:"financeproject",
        component:FinanceProject,
        name:"FinanceProject",
        meta: {
          name: "金融机构项目管理",
          userType:[201,202]
          //menu:true
        }
      },
      {
        path:"customproject",
        component:CustomProject,
        name:"CustomProject",
        meta: {
          name: "贷款主体项目管理",
          userType:[201,202]
          //menu:true
        }
      }

    ]
  }
];

