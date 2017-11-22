import axios from 'axios';
import {Message} from 'iview';
import session from '@/config/session';
import {baseURL} from './constant';
var Promise = require("bluebird");
/*添加请求拦截器*/
window.getToken = false;
axios.interceptors.request.use(function (request) {
  let token = session.get('adminToken');

  if(request.url.indexOf("adminRefreshToken")!=-1||request.url.indexOf("login")!=-1){

  }else {
    setTimeout(() => {
      let tokenTime = session.get("adminTokenTime");
      let tokenTimeKey = session.get("adminTokenTimeKey");
      if (((new Date) - 0) > tokenTime) {
        window.location.href = "/admin/#/";
      } else if (tokenTime-((new Date) - 0) < tokenTimeKey / 2) {
        let url=baseURL+"/v1/refreshToken";
        axios.get(url+'?refreshToken=' + session.get('adminRefreshToken'), {})
          .then(function (response) {
            if (response.code == 0) {
              this.session.set("adminToken", response.data.token);
              this.session.set("adminTokenTime", ((new Date())-0)+response.data.tokenExpireMinutes*1000*60);
              this.session.set("adminTokenTimeKey", response.data.tokenExpireMinutes*1000*60);
              this.session.set("adminRefreshToken", response.data.refreshToken);
            }
          })
          .catch(function (error) {

          });
      }
    }, 2000)
  }

  /*在发送请求之前做某事*/
  if (token) request.headers.Authorization = token;
  return request;
}, function (error) {
  /*请求错误时做些事*/
  return Promise.reject(error);
});

/*添加响应拦截器*/
axios.interceptors.response.use(function (response) {
  switch (response.data.errorCode) {
    case 1101:
      window.location.href = "/admin/#/";
      break;
    case 1100:
      window.location.href = "/admin/#/";
      break;
    case 1001:
      Message.error({
        content: '手机号已存在',
        duration: 10,
        closable: true
      });
      break;
    case 1006:
      Message.error({
        content: '用户被禁用',
        duration: 10,
        closable: true
      });
      window.location.href = "/admin/#/";
      break;
    /*case 1000:
     Message.error({
     content: '用户名或密码错误',
     duration: 10,
     closable: true
     });
     break;*/
  }

  return response.data;
}, function (error) {
  let status = error.response.status;

  switch (status) {
    case 404:
      Message.error('请求地址不存在');
      break;
    case 401:
      Message.error('请求未授权，请重新登录');
      break;
    case 500:
      Message.error('后端服务器出现错误');
      break;
    default:
      Message.error('请求出错啦！');
      break;
  }
  /*请求错误时做些事*/
  return Promise.reject(error);
});
export default axios;
