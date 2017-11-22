import "babel-polyfill";
import TWEEN from "../config/tween.js"
import storage from '../config/storage'
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
  Array.prototype.includes = function() {
    return Array.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
if(storage.get("version")!=="1.5.1"){
  if(window.localStorage){
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
  storage.set("version","1.5.1","4w");
}
window.TWEEN = TWEEN;
