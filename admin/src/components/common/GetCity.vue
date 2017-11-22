/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="GetCity">
    <Cascader :data="data4" :change-on-select="changeOnSelect" v-model="value"
              :disabled="disabled" :load-data="loadData"
              @on-change="onChange"></Cascader>
  </div>
</template>

<script>
  import otherServer from 'rs/otherServer';
  import cityData from '@/services/cityData';
  export default {
    name: 'GetCity',
    data () {
      return {
        value: [],
        data4: []
      }
    },
    props: {
      item: {},
      setValue: {
        type: [String, Number],
        default: ""
      },
      changeOnSelect: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      type:{}
    },
    /*watch: {
      "setValue": function (value) {
        if (value == "") {
          this.init();
        }
        else {
          this._setValue(value);
        }
      }
    },*/
    methods: {
      init(){
        this.value = [];
      },
      _setValue(code){
        if (!code) return;
        cityData.getDetails(code, rsp => {
          this.value = rsp;
        })
      },

      loadData(item, callback){
        cityData.getChild(item, callback,this.type);
      },
      onChange(value, selectedData){
        this.$emit('onChange', value, selectedData, this.item ? this.item : null);
      },
      setData(){
        if(cityData&&cityData.dataList.length){
          this.data4 = JSON.parse(JSON.stringify(cityData.bigCity));
          if (this.setValue == "") {
            this.init();
          } else {
            this._setValue(this.setValue);
          }
        }else{
          setTimeout(()=>{
            this.setData();
          },1000)
        }
      }
    },
    created: function () {
      this.setData();
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .GetCity {

  }
</style>
