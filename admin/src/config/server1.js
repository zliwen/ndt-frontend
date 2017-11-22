import defaultInstance from './axios'
function S(url,config,obj,diyInstance) {
  for(let key in obj){
    this[key] =function(cf,c1,c2){
      let cfg = Object.assign({},config,obj[key],cf,{params:{}});
      let params = Object.assign({},config.params,obj[key].params,cf.params);
      let new_url =url,str="",urlArr=new_url.split('/');
      for(let p in params){
        if(urlArr.includes(":"+p))new_url=new_url.replace(":"+p,params[p]);
        else{
          let tag =str?"&":"?";
          str+=tag+p+"="+params[p];
        }
      }
      new_url=new_url.split("/").filter(i=>i[0]!==":").join('/')+str;
      cfg.url = new_url;
      let instance = diyInstance ||defaultInstance;
      return instance(cfg).then(c1,c2);
    };
  }
}
function server(url,config,obj,diyInstance){
	return new S(url,config,obj,diyInstance);
}
export default server;
