
import Loading from '@/components/common/Loading';
import GetCity from '@/components/common/GetCity';
import GetCitys from '@/components/common/GetCitys';
import UploadImg from '@/components/common/UploadImg';
import Cropper from '@/components/common/vue-cropper';
export default {
	install:function(Vue){
    //在这里添加全局组件
    Vue.component('Loading',Loading);
    Vue.component('GetCity',GetCity);
    Vue.component('GetCitys',GetCitys);
    Vue.component('UploadImg',UploadImg);
    Vue.component('imgCropper',Cropper);
		Vue.component('Btn',{
      functional:true,
      render(h,c){
        let f =c.parent.$store.state.scope;
        if(f===0)return h("Button",c.data,c.slots().default);
      },
    });
    Vue.component('Tab',{
      functional:true,
      render(h,c){
        let f =c.parent.$store.state.scope;
        let columns =c.props.columns;
        let childrens=[],slots=c.slots();
        //这里有点坑啊。。。整了好久！
        for(let k in slots){
          childrens.push(h("template",{slot:k},slots[k]));
        }
        if(f!==0&&columns[0].type==="selection")columns.shift();
        return h("Table",c.data,childrens);
      }
    });
	}
};
