import Vue from "vue"
import storage from './storage';
import codeTableObj from '@/services/getCodeTable';
Vue.prototype.jurisdiction=localStorage.getItem('jurisdiction')||0;
Vue.prototype.session=storage;
Vue.prototype.getCodeTable=codeTableObj.getCodeTable;
Vue.prototype.getCodeName=codeTableObj.getCodeName;
Vue.prototype.open=(str)=>{window.open(str)};
if(console)Vue.prototype.console=console;
export default Vue;
