/**
 * Created by zhaowei on 2017/9/19.
 */
import session from '@/config/session';
import dictServer from 'rs/dictServer';
window.codeTableObj={
  version:'1.0',
  codeTableObj:{},
  codeTableList:[],
  getKeyList(){
    let arr=[];
    for(var i=0;i<50;i++){
      arr.push(i);
    }
    return arr;
  },
  getAllCodeTable(){
    dictServer.list({params3: 1, params4: 1000}, {list: this.getKeyList()}, response => {
      if (response.data && response.data.pageData) {
        this.codeTableList = response.data.pageData;
        this.codeTableList.forEach((item)=>{
          if(!this.codeTableObj[item.typeId]){
            this.codeTableObj[item.typeId]={
              typeName:item.typeName,
              typeId:item.typeId,
              list:[]
            };
          }
          this.codeTableObj[item.typeId].list.push(item);
          session.set("codeTableList",JSON.stringify({list:this.codeTableList}));
          session.set("codeTableObj",JSON.stringify(this.codeTableObj));
          session.set("codeTableObjVersion",this.version);
        });
      } else {

      }
    }, err => {

    });
  },
  getCodeName(key){
    if(!codeTableObj.codeTableList.length) codeTableObj.codeTableList=(JSON.parse(session.get("codeTableList"))).list;
    codeTableObj.codeTableList.forEach((item)=>{
      if(item.id==key)  key=item.value
    });
    return key
  },
  getCodeTable (key,callBack) {
    let co=codeTableObj.codeTableObj[key];
    if(!co){
      co=(JSON.parse(session.get("codeTableObj")))[key];
    }
    if(co){
      if(callBack) callBack(co.list);
      return co.list;
    }
  }
};
if(!session.get("codeTableObj")||!session.get("codeTableList")||session.get("codeTableObjVersion")!=codeTableObj.version) codeTableObj.getAllCodeTable();

export default codeTableObj;
