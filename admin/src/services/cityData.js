/**
 * Created by zhaowei on 2017/9/7.
 */
import otherServer from 'rs/otherServer';
import session from '@/config/session';

var cityData = {
  getData(id) {
    otherServer.findAllChildsTree({id: id}, {}, response => {
      this.setData(response);
      this.dg(response,cityData.dataList);
      let ar=[];

      response.forEach(fk => {
        var json={
          value: fk.id,
          label: fk.name
        };
        if(fk.childs && fk.childs.length){
          json.loading= false;
          json.children= [];
        }
        ar.push(json);
      });
      this.dataList[id]=ar;

    }, err => {

    });
  },
  dg(obj,dataList){
    obj.forEach(item => {
      if (item.childs && item.childs.length) {
        dataList[item.id] = [];
        item.childs.forEach(fk => {
          var json = {
            value: fk.id,
            label: fk.name,
            children: []
          };
          if (fk.childs && fk.childs.length) json.loading = false;
          dataList[item.id].push(json);
        });
        (function (item,dataList) {
          setTimeout(function () {
            cityData.dg(item.childs,dataList);
          }, 10)
        })(item,dataList)
      }
    });

  },
  getChild(item, callback,type){
    for (var i in cityData.dataList) {
      if (i == item.value) {
        item.children = [];
        switch (type) {
          case '1': {
            cityData.dataList[i].forEach(obj => {
              var json = {
                label: obj.label,
                value: obj.value
              };
              if (obj.value > 5101) {
              } else {
                json.children = [];
                json.loading = false;
              }
              item.children.push(json);
            });
            break;
          }
          case '2': {
            cityData.dataList[i].forEach(obj => {
              var json = {
                label: obj.label,
                value: obj.value
              };
              if (obj.value > 51010402) {
              } else {
                json.children = [];
                json.loading = false;
              }
              item.children.push(json);
            });
            break;
          }
          default: {
            item.children = cityData.dataList[i];
          }
        }
        item.loading = false;
        break
      }
    }
    callback();
  },
  setData(response){
    var arr = ["市辖区"];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < response.length; j++) {
        if (response[j].name == arr[i]) {
          response.splice(j, 1);
        }
      }
    }
  },
  getDetails(code, callBack){
    otherServer.getCityDetails({params3: code}, {}, response => {
      if (response.errorCode == 0) {
        response.data.parent.splice(0, 1);
        let arr = [];
        response.data.parent.forEach(item => {
          arr.push(item.id);
        });
        arr.push(response.data.id);
        callBack(arr);
      }
    }, err => {

    })
  },
  init(ids){
    this.dataList = [];
    this.bigCity=[];
    ids.forEach(item => {
      otherServer.getCityDetails({params3: item}, {}, response => {
        let item = response.data;
        let json={
          value:item.id,
          label:item.name
        };
        if(item.level != 5&&item.id<5101050040){
          json.loading=false;
          json.children=[];
        }

        this.bigCity.push(json);

        this.getData(item.id);
      })
    });
  },
  dataList: [],
  bigCity: []
};

if (session.get("divisions")) {
  cityData.init(JSON.parse(session.get("divisions")));
}


export default cityData
