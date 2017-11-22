/**
 * Created by zhaowei on 2017/10/19.
 */
import server from '@/config/server';
let villagePersonalOtherinfoServer = server('/v1/:params1/update/:params3/:params4/:params5', {}, {
  // 房屋
  villagePersonalHouse:{
    method: 'post',
    params: {
      params1: 'villagePersonalHouse'
    }
  },
  // 车辆
  villagePersonalCarinfo:{
    method: 'post',
    params: {
      params1: 'villagePersonalCarinfo'
    }
  },
  // 权证
  villagePersonalWarrantinfo:{
    method: 'post',
    params: {
      params1: 'villagePersonalWarrantinfo'
    }
  },
  // 生产资料
  villagePersonalProductioninfo:{
    method: 'post',
    params: {
      params1: 'villagePersonalProductioninfo'
    }
  },
  // 设备
  villagePersonalEquipment:{
    method: 'post',
    params: {
      params1: 'villagePersonalEquipment'
    }
  },
  // 参保信息
  villagePersonalInsured:{
    method: 'post',
    params: {
      params1: 'villagePersonalInsured'
    }
  },
  // 信用称号信息
  villagePersonalCreditTitle:{
    method: 'post',
    params: {
      params1: 'villagePersonalCreditTitle'
    }
  },
  // 用工
  villagePersonalRecruitment:{
    method: 'post',
    params: {
      params1: 'villagePersonalRecruitment'
    }
  },
  // 个人其他信息
  villagePersonalOtherinfo:{
    method: 'post',
    params: {
      params1: 'villagePersonalOtherinfo'
    }
  },
  // 个人奖励惩罚信息
  villagePersonalAwardsPunishments:{
    method: 'post',
    params: {
      params1: 'villagePersonalAwardsPunishments'
    }
  },
  // 个人信用评价
  villagePersonalCreditRating:{
    method: 'post',
    params: {
      params1: 'villagePersonalCreditRating'
    }
  },
  // 个人专利资源
  villagePersonalPatent:{
    method: 'post',
    params: {
      params1: 'villagePersonalPatent'
    }
  },
  // 个人水电气费缴费情况
  villagePersonalPayment:{
    method: 'post',
    params: {
      params1: 'villagePersonalPayment'
    }
  },
  // 采购信息
  villagePersonalPurchasing:{
    method: 'post',
    params: {
      params1: 'villagePersonalPurchasing'
    }
  },


});
export default villagePersonalOtherinfoServer;
