import login from '@/components/user/Login';
import banking from 'cmpts/user/Banking';
import village from 'cmpts/user/Village';
import towns from 'cmpts/user/Towns';
import manager from 'cmpts/user/manager';
import BankingUser from '@/components/user/BankingUser';
import BankingChildren from '@/components/user/BankingChildren';
import user from 'cmpts/user/User';
import enterprise from '@/components/user/Enterprise';
import enterpriseDetail from '@/components/user/EnterpriseDetail';
import userAdd from '@/components/user/UserAdd';
import managerAdd from '@/components/user/ManagerAdd';
import PersonPage from '@/components/user/PersonPage';
import BankingAdd from '@/components/user/BankingAdd';
import villageAdd from '@/components/user/VillageAdd';
import townsAdd from '@/components/user/TownsAdd';
import government from '@/components/user/Government';
import governmentAdd from '@/components/user/GovernmentAdd';
import coordinate from '@/components/user/Coordinate';
import coordinateAdd from '@/components/user/CoordinateAdd';
import MyCorporation from '@/components/user/MyCorporation';
import MyCorporationEdit from '@/components/user/MyCorporationEdit';

export default [
  {
    path: '/',
    name: "login",
    component: login,
    meta: {
      name: "登录页面"
    }
  },
  {
    path: '*',
    name: "noFound",
    component: (resolve) => {
      require(['cmpts/common/NoFound'], resolve);
    },
    meta: {
      name: "404未找到页面"
    }
  },
  {
    path: '/user',
    component: (resolve) => {
      require(['@/components/App'], resolve);
    },
    name: "user",
    meta: {
      name: "用户机构",
      icon: 'star',
      menu: true,
      userType:[201,203,204,205,206,207],
      roleIds:[1,2,3,4,5,6,11,16,23,29]
    },
    children: [
      {
        path: 'userinfo',
        component: PersonPage,
        name: "userinfo",
        meta: {
          name: "个人中心",
          menu: false
        }
      },
      {
        path: 'mycorporation',
        component: MyCorporation,
        name: "mycorporation",
        meta: {
          name: "机构信息",
          menu: false
        }
      },
      {
        path: 'mymorporationedit',
        component: MyCorporationEdit,
        name: "mymorporationedit",
        meta: {
          name: "机构信息",
          menu: false
        }
      },

      {
        path: 'banking',
        component: banking,
        name: "user_banking",
        meta: {
          name: "金融机构管理",
          userType:[201,205,206,207],
          menu: true
        }
      },
      {
        path: 'banking/add',
        component: BankingAdd,
        name: "BankingAdd",
        meta: {
          name: "添加金融机构"
        }
      },
      {
        path: 'government',
        component: government,
        name: "user_government",
        meta: {
          name: "政府机构管理",
          userType:[201],
          roleIds:[1 ,2,3],
          menu: true
        }
      },
      {
        path: 'government/add',
        component: governmentAdd,
        name: "governmentAdd",
        meta: {
          name: "添加政府机构"
        }
      },
      {
        path: 'government/user/:orgId/:orgName/:orgType',
        component: BankingUser,
        name: "governmentUser",
        meta: {
          name: "政府机构用户"
        }
      },
      {
        path: 'coordinate',
        component: coordinate,
        name: "user_coordinate",
        meta: {
          name: "联席会议管理",
          userType:[201],
          roleIds:[1,2,3],
          menu: true
        }
      },
      {
        path: 'coordinate/add',
        component: coordinateAdd,
        name: "coordinateAdd",
        meta: {
          name: "添加联席会议"
        }
      },
      {
        path: 'coordinate/user/:orgId/:orgName/:orgType',
        component: BankingUser,
        name: "coordinateUser",
        meta: {
          name: "联席会议用户"
        }
      },
      {
        path: 'towns',
        component: towns,
        name: "user_towns",
        meta: {
          name: "乡镇管理",
          userType:[201],
          menu: true
        }
      },
      {
        path: 'towns/user/:orgId/:orgName/:orgType',
        component: BankingUser,
        name: "townsUser",
        meta: {
          name: "乡镇用户"
        }
      },
      {
        path: 'towns/add',
        component: townsAdd,
        name: "townsAdd",
        meta: {
          name: "添加乡镇机构"
        }
      },
      {
        path: 'village',
        component: village,
        name: "user_village",
        meta: {
          name: "村站管理",
          userType:[201],
          menu: true
        }
      },
      {
        path: 'village/user/:orgId/:orgName/:orgType',
        component: BankingUser,
        name: "villageUser",
        meta: {
          name: "村站用户"
        }
      },
      {
        path: 'village/add',
        component: villageAdd,
        name: "villageAdd",
        meta: {
          name: "添加村站机构"
        }
      },

      {
        path: 'banking/user/:orgId/:orgType/:orgName',
        component: BankingUser,
        name: "BankingUser",
        meta: {
          name: "机构用户"
        }
      },
      {
        path: 'banking/children/:orgId/:orgName/:orgSubtype',
        component: BankingChildren,
        name: "BankingChildren",
        meta: {
          name: "机构用户"
        }
      },
      {
        path: 'user',
        component: user,
        name: "user_user",
        meta: {
          name: "平台用户",
          userType:[201],
          menu: true
        }
      },
      {
        path: 'user/add',
        component: userAdd,
        name: "nom",
        meta: {
          name: "用户添加编辑"
        }
      },
      {
        path: 'manager',
        component: manager,
        name: "user_manager",
        meta: {
          name: "管理员用户",
          userType:[201],
          menu: true
        }
      },
      {
        path: 'manager/add',
        component: managerAdd,
        name: "nom",
        meta: {
          name: "管理员添加编辑"
        }
      },
      {
        path: 'enterprise',
        component: enterprise,
        name: "user_enterprise",
        meta: {
          name: "企业认证管理",
          userType:[201],
          menu: true
        }
      },
      {
        path: 'enterprise-detail/:id',
        component: enterpriseDetail,
        name: "user_enterpriseDetail",
        meta: {
          name: "企业认证"
        }
      }

    ]
  }
];
