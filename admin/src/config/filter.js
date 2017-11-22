import * as filter from '@/filters/enter'
export default {
	install:function(Vue){
   for(let k in filter){
    filter[k](Vue);
   }
	}
};
