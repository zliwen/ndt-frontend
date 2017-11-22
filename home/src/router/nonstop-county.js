
import choose from "cmpts/nonstop-county/choose"
export default [
  {
    path:'/nonstop-county',
    name:'nonstop-county',
    component:choose,
    meta: {
      name: "直达区县",
      parent:'直达区县',
      menu:true,
      hasChild:true
    },
    children:[

    ]
  },
  // {
  //   path:'/xian/nonstop-county',
  //   name:'xianNonstopCounty',
  //   component:choose,
  //   meta: {
  //     name: "直达区县",
  //     parent:'直达区县',
  //     menu:true,
  //     hasChild:true
  //   },
  //   children:[

  //   ]
  // }
];
