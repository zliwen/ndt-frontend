import Vue from 'vue';
import session from './session';
import codeTableObj from '@/services/getCodeTable';
export default Vue;
Vue.prototype.showStage=function(color,text) {
    //color:success,warning,danger
    let vm = this.$root;
    vm.stage.color = color;
    vm.stage.text = text;
    vm.stage.flag = true;
    clearTimeout(vm.stage.id);
    vm.stage.id = setTimeout(() => {
        vm.stage.flag = false
    }, 2000);
};
Vue.prototype.session=session;
Vue.prototype.getCodeTable=codeTableObj.getCodeTable;
Vue.prototype.getCodeName=codeTableObj.getCodeName;
