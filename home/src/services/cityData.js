/**
 * Created by zhaowei on 2017/9/7.
 */
import otherServer from 'rs/otherServer';
var cityData = {
  getData(id, callBack) {
    otherServer.getCityById({params3: id}, {}, response => {
      var data = [];

      if (response.data) {
        data = response.data.filter(function (item) {
          item.value = item.id;
          item.label = item.name;
          if (item.level < 5) item.loading = false;
          if (item.level < 5) item.children = [];
          return item
        });
      }
      if (!callBack) {
        var arr = ["市辖区", "锦江区", "青羊区", "金牛区", "武侯区", "成华区"];
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (data[j].name == arr[i]) {
              data.splice(j, 1);
            }
          }
        }
        this.dataList = data;
      } else {
        callBack(data);
      }
    }, err => {
      if (callBack) callBack([]);
    });
  },
  getDetails(code,callBack){
    let self = this;
    otherServer.getCityDetails({params3:code},{},response =>{
        if(response.errorCode == 0){
          let thisObj = response.data;
          if(thisObj.level<3){
            callBack([]);
          }
          else if(thisObj.level == 3){
            callBack([thisObj.id]);
          }
          else if(thisObj.level == 4){
            let parent = thisObj.parent[2].id;
            for(let item of this.dataList){
                if(item.value == parent){
                  if(item.children.length>1){
                    callBack([parent,thisObj.id]);
                  }
                  else{
                    self.getData(parent,rsp=>{
                      item.children=rsp;
                      callBack([parent,thisObj.id]);
                    })
                  }
                  break;
                }
            }
          }
          else if(thisObj.level == 5){
            let parent = thisObj.parent[3].id;
            let Gparent = thisObj.parent[2].id;
            for(let itemG of this.dataList){
                if(itemG.value == Gparent){
                    if(itemG.children.length>1){
                      for(let item of itemG.children){
                          if(item.value == parent){
                              if(item.children.length>1){
                                callBack([Gparent,parent,thisObj.id]);
                              }
                              else{
                                self.getData(parent,rsp=>{
                                  item.children=rsp;
                                  callBack([Gparent,parent,thisObj.id]);
                                })
                              }
                              break;
                          }
                      }
                    }
                    else{
                        self.getData(Gparent,rsp=>{
                          itemG.children=rsp;
                          self.getData(parent,rsp=>{
                              for(let item of itemG.children){
                                  if(item.value == parent){
                                    item.children=rsp;
                                    callBack([Gparent,parent,thisObj.id]);
                                  }
                              }
                          })
                        })
                    }
                    break;
                }
            }
          }
        }
    },err =>{
        return;
    })
  },
  dataList: []
};
cityData.getData(5101);

export default cityData
