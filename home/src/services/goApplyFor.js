/**
 * Created by zhaowei on 2017/9/29.
 */
import {Modal,Notice} from 'iview';
import session from '@/config/session';
import loanProductServer from 'rs/loanProduct';
let goApplyFor=function (item,that) {
  if(!session.get('token')){
    Modal.confirm({
      title: '您还未登录',
      content: '<p>是否去登录？</p>',
      onOk: () => {
        that.$router.push({
          name:'loginAndRegister',
          query:{id:item.id,type:1}
        });
        //window.open("#/login-and-register?type=1")
      },
      onCancel: () => {
      }
    });
    return
  }
  loanProductServer.isLoanable({params:{productId:item.id}},response=>{
    if(response.data==true){
      // window.open("/#/financial-service/applyFor?id="+item.id);
      that.$router.push({name:that.$route.fullPath.includes('/xian')?"xianApplyFor":"applyFor",query:{id:item.id}});
    }else if(response.data){
      Notice.destroy();
      Modal.remove();
      if(!/^(16)/.test(response.errorCode)){
        Notice.warning({
          title:"温馨提示",
          desc: response.data
        });
      }else {
        Modal.confirm({
          title: '温馨提示',
          render(h){
            return h("div",{style:{paddingTop:"20px"}},[h("Icon",{props:{type:"android-alert",size:50},style:{color:"#ff762b",marginRight:"16px"}}),h("div",{style:{
              display:"inline-block",lineHeight:"25px"
            }},[h("p",{style:{color:"#ff762b"}},response.data),h("p",'是否现在就去完善资料？')])]);
          },
          onOk: () => {
            that.$router.push({name:"material"});
          },
        });
      }
    }else{
      Notice.warning({
        title:"温馨提示",
        desc: "不能贷款,您可能不在产品受理范围",
      });
    }
  });
  //window.open("/#/financial-service/applyFor?id="+item.id)
};
export default goApplyFor;
