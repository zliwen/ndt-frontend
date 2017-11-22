/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="GetCitys">
    <span v-for="(item,index) in sivisionList" :key="index" style="margin-bottom: 10px;display: inline-block;">
          <GetCity :type="type" style="width: 280px; display: inline-block;" :setValue="item.setValue" :item="item"
                   @onChange="divisionsChange"></GetCity>
          <Button v-if="index == sivisionList.length-1&&index!=0" icon="minus-round"
                  v-on:click="removeSivision(index)" shape="circle" type="error"></Button>
    </span>
    <Button style=" margin-left: 4px; bottom: 10px;" icon="plus-round" shape="circle"
            v-on:click="AddSivision"></Button>
  </div>
</template>

<script>
  export default {
    name: 'GetCitys',
    data () {
      return {
        sivisionList: [{index: 0, setValue: ''}]
      }
    },
    props: ["setValues",'type'],
    watch: {
      "setValues": function (arr) {
        if (arr && arr.length === 0) {
          this.init();
        }
        else {
          this._setValues(arr);
        }
      }
    },
    methods: {
      _setValues(arr){
        this.sivisionList = [];
        for (let i in arr) {
          this.sivisionList.push({
            index: i,
            setValue: ""
          })
        }
        for (let item in this.sivisionList) {
          this.sivisionList[item].setValue = arr[item];
          this.sivisionList[item].value = [arr[item]];
        }
      },
      init(){
        this.sivisionList = [{index: 0, setValue: ''}];
      },
      AddSivision() {
        this.sivisionList.push({index: this.sivisionList.length, setValue: ''});
        this.$emit('onChange', this.sivisionList);
      },
      removeSivision(index) {

        this.sivisionList.splice(index, 1);
        this.$emit('onChange', this.sivisionList);
      },
      divisionsChange(value, selectedData, item) {

        for (let o of this.sivisionList) {
          if (o.index != item.index && o.value.length) {
            let last = o.value[o.value.length - 1]+"";
            let last1 = value[value.length - 1]+"";
            if (last1.length >= last.length && last1.indexOf(last) != -1) {
              this.$Message.error("你选择的区域重复了");
              item.setValue=[];
            }
            if(last1.length < last.length&&last.indexOf(last1)!=1){
              //this.$Message.error("你选择了");
            }
          }else {
            o.value = value;
            o.selectedData = selectedData;
          }
        }

        this.$emit('onChange', this.sivisionList);
      },
    },
    created: function () {
      if (this.setValues && this.setValues.length) this._setValues(this.setValues);
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .GetCitys {

  }
</style>
