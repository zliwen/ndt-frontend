/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="VillageNewEnterpriseAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/village/village-new-enterprise">新型农业经营主体</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">

    </div>
  </div>
</template>

<script>
  import cooperationServer from 'rs/cooperation';
  export default {
    name: 'VillageNewEnterpriseAdd',
    props: ["orgItemData"],
    data () {
      const validateDivisions = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择管辖区域'));
        } else {
          callback();
        }
      };
      return {
        title: "添加新型农业经营主体",
        formBase: {},
        houseArray: [{}],
        formBaseCustom: {
          name: [
            {required: true, max: 100, message: '请输入政府名称且不能超过100个字', trigger: 'blur'}
          ],
          divisions: [
            {validator: validateDivisions, trigger: 'blur', required: true}
          ]
        },
        formProperty: {},
        formPropertyCustom: {}

      }
    },
    created: function () {

    },
    methods: {
      addSave () {
        this.$refs.formBase.validate((valid) => {
          var json = {};
          if (valid) {
            cooperationServer.add({}, {

            }, response => {

            })

          }else {
            this.$Message.error('表单验证失败!');
          }
        })

      }
    }
  }
</script>

<style lang='less'>
  .VillageNewEnterpriseAdd {

  }
</style>
