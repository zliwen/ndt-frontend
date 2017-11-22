/**
 * Created by zhaowei on 2017/9/9.
 */
function date(Vue) {
  Vue.filter("codeChange", codeChange);
}
let codeObjList={
  "用户状态": [
    {
      label: '正常',
      value: 1401
    },
    {
      label: '临时锁定',
      value: 1402
    },
    {
      label: '锁定',
      value: 1403
    }
  ],
  "用户类型":[
    {
      label: '系统后端管理',
      value: 201
    },
    {
      label: '个人',
      value: 202
    },
    {
      label: '企业',
      value: 203
    },
    {
      label: '政府',
      value: 204
    },
    {
      label: '银行',
      value: 205
    },
    {
      label: '保险',
      value: 206
    },
    {
      label: '担保',
      value: 207
    },
    {
      label: '收储机构',
      value: 208
    }
  ],
  "机构类型": [
    {
      label: '政府',
      value: 901
    },
    {
      label: '银行',
      value: 902
    },
    {
      label: '保险',
      value: 903
    },
    {
      label: '担保',
      value: 904
    },
    {
      label: '收储',
      value: 905
    }
  ],
  "机构子类型":[
    {
      label: '默认',
      value: null
    },
    {
      label: '默认',
      value: 3001
    },
    {
      label: '联席会议',
      value: 3002
    },
    {
      label: '村站',
      value: 3003
    },
    {
      label: '银行',
      value: 3004
    },
    {
      label: '保险',
      value: 3005
    },
    {
      label: '担保',
      value: 3006
    }
  ],
  "机构状态":[
    {
      label: '正常',
      value: 1401
    },
    {
      label: '临时锁定',
      value: 1402
    },
    {
      label: '锁定',
      value: 1403
    }
  ],
  "企业审核类型":[
    {
      label: '未审核',
      value: 3501
    },
    {
      label: '不通过',
      value: 3502
    },
    {
      label: '通过',
      value: 3503
    }
  ],
  "贷款类型":[
    {
      label: '信用贷款',
      value: 3501
    },
    {
      label: '抵押贷款',
      value: 3502
    },
    {
      label: '质押贷款',
      value: 3503
    },
    {
      label: '担保贷款',
      value: 3503
    }
  ],
  "贷款状态":[
    {
      label: '已提交申请',
      value: 3801
    },
    {
      label: '处理中',
      value: 3802
    },
    {
      label: '已拒绝',
      value: 3803
    },
    {
      label: '已完成',
      value: 3804
    }
  ]
};

function codeChange(code, key, isKey) {
  let label = "";
  codeObjList[key].forEach(obj => {
    if (isKey) {
      if (obj.label == code) label = obj.value;
    } else {
      if (obj.value == code) label = obj.label;
    }
  })
  return label;
}


export {date as default, codeChange,codeObjList};

