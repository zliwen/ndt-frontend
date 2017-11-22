
import Index from "cmpts/property-transaction/index";
import transactionDetails from "cmpts/property-transaction/transactionDetails"
export default [
  {
    path:'/property-transaction',
    name:'propertyTransaction',
    component:Index,
    meta: {
      name: "产权交易",
      parent:'产权交易',
      menu:true,
    },
    children:[

    ]
  },

  {
    path:'/xian/property-transaction',
    name:'xianPropertyTransaction',
    component:Index,
    meta: {
      name: "产权交易",
      parent:'产权交易',
      menu:true,
    },
    children:[

    ]
  },
  {
    path:'/property-transaction/transaction-details',
    name:'propertyTransactionDetails',
    component:transactionDetails,
    meta: {
      name: "交易交易详情",
      parent:'产权交易',
      // menu:true
    },
    children:[]
  },
  {
    path:'/xian/property-transaction/transaction-details',
    name:'xianPropertyTransactionDetails',
    component:transactionDetails,
    meta: {
      name: "交易交易详情",
      parent:'产权交易',
      // menu:true
    },
    children:[]
  }
];
