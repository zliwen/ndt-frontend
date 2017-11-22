/**
 * Created by zhanglw on 2017/11/09.
 */
import server from '@/config/server';
let statementLoanReport = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  acceptLoanDoneTrent:{ //银行受理/放款趋势统计
  	method:'post',
    params:{
      params1:'statistics',
      params2:'acceptLoanDoneTrent'
    }
  },
  loanApplyCount:{ //统计申请笔数
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanApplyCount'
    }
  },
  loanApplyAmount:{ //统计申请金额
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanApplyAmount'
    }
  },
  loanAcceptCount:{ //统计受理笔数
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanAcceptCount'
    }
  },
  loanAcceptAmount:{ //统计受理金额
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanAcceptAmount'
    }
  },
  loanDoneCount:{ //统计放款或已还完笔数，查询已还完是传入码值6907
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanDoneCount'
    }
  },
  loanDoneAmount:{ //统计放款或已还完金额，查询已还完是传入码值6907
    method:'post',
    params:{
      params1:'statistics',
      params2:'loanDoneAmount'
    }
  },
  orgApplyAmount:{ //统计银行申请金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'orgApplyAmount'
    }
  },
  orgAcceptAmount:{ //统计银行受理金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'orgAcceptAmount'
    }
  },
  orgLoanDoneAmount:{ //统计银行放款金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'orgLoanDoneAmount'
    }
  },
  countyApplyAmount:{ //统计区县申请金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'countyApplyAmount'
    }
  },
  countyAcceptAmount:{ //统计区县受理金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'countyAcceptAmount'
    }
  },
  countyLoanDoneAmount:{ //统计区县放款金额
  	method:'post',
    params:{
      params1:'statistics',
      params2:'countyLoanDoneAmount'
    }
  },
  loanStatementTotal:{ //贷款报表总计接口
  	method:'post',
    params:{
      params1:'statistics',
      params2:'loanStatementTotal'
    }
  }
});
export default statementLoanReport;
