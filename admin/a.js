 function doit(obj){
    return findDeep(obj)
    function findDeep(obj){
        var ary = [];
        var keing = {};
        function biggest(ary){
            var i = 0;
            var name = ""
            for(var index in ary){
                if(ary[index]>=i){
                    i = ary[index]
                    name = index
                }
            }
            return {i,name};
        }
        if(typeof obj != 'object'){
            console.log("发现一个叶子开始回溯");
            return 0;
        }
        else{
            for(var a in obj){
                ary[a] = findDeep(obj[a]);
                console.log(a+"属性的值是"+ ary[a] );
            }
            keing = biggest(ary);
            console.log("这一层选择了"+keing.name);
            return keing.i+1;
        }
     }
 }