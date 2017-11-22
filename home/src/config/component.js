import Menu from "@/components/common/Menu"
import footer from "@/components/common/footer"
import ProductModal from "@/components/common/ProductModal"
import InsuranceModal from "@/components/common/InsuranceModal"
import steps from "@/components/common/steps"
import banner from "@/components/common/banner"
import noData from "@/components/common/noData"
import UploadImg from '@/components/common/UploadImg'
import Cropper from '@/components/common/vue-cropper'
import Loading from "@/components/common/loading"
import financialItem from "@/components/common/financialItem"
import financialItem2 from "@/components/common/financialItem2"
import psdIntensionVerify from "@/components/common/psdIntensionVerify"
export default {
	install:function(Vue){
    //在这里添加全局组件
		Vue.component('vMenu',Menu);
		Vue.component('vFooter',footer);
		Vue.component('vProductModal',ProductModal);
		Vue.component('vSteps',steps);
		Vue.component('vBanner',banner);
		Vue.component('vNoData',noData);
		Vue.component('vLoading',Loading);
		Vue.component('UploadImg',UploadImg);
		Vue.component('imgCropper',Cropper);
		Vue.component('financialItem',financialItem);
		Vue.component('financialItemForInsure',financialItem2);
    Vue.component('insuranceModal',InsuranceModal);
    Vue.component('psdIntensionVerify',psdIntensionVerify);
	}
};
