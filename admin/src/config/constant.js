/**
 * Created by xms on 2017/10/18.
 */
let host = window.location.hostname;
let url="";
let exclude = [
  "127.0.0.1",
  "localhost",
  "192.168.1.175"
];
let flag = exclude.includes?exclude.includes(host):exclude.indexOf(host)!==-1;
if(flag){
  url="http://192.168.1.42:18080";
  //url="http://www.ndtcd.cn";
}
export const baseURL = url;
export const townURL = "http://182.140.213.68:9080";//农村信用代理
