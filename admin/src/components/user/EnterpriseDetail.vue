/**
* Created by zhaowei on 2017/9/11.
*/

<template>
  <div class="EnterpriseDetail">
    <Loading v-show="loading"></Loading>

    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/enterprise">企业认证管理</BreadcrumbItem>
      <BreadcrumbItem>{{data.name}}</BreadcrumbItem>
    </Breadcrumb>

    <Row style="line-height: 40px;">
      <Col span="12">
      <span>企业名称：</span>
      <b v-text="data.name"></b>
      </Col>

      <Col span="12">
      <span>组织机构代码：</span>
      <b v-text="data.code"></b>
      </Col>
      <Col span="12">
      <span>营业执照：</span>
      <b v-text="data.certificateTypeValue"></b>
      </Col>
      <Col span="12">
      <span>所属区域：</span>
      <b v-for="item in data.divisionIdValue" v-text="item"></b>
      </Col>
      <Col span="12">
      <span>状态：</span>
      <b v-text="data.stateValue"></b>
      </Col>

      <Col span="12">
      <span>公司法人：</span>
      <b v-text="data.legalPerson"></b>
      </Col>
      <Col span="12">
      <span>法人身份证号：</span>
      <b v-text="data.legalPersonIdentityId"></b>
      </Col>

      <Col span="12">
      <span>联系方式：</span>
      <b v-text="data.bindTelephone"></b>
      </Col>
      <Col span="12">
      <span>创建时间：</span>
      <b>{{data.createTime|date}}</b>
      </Col>
      <Col span="24">
      <span style="vertical-align: top;">营业执照：</span>
      <img style="vertical-align: top; margin-right: 20px;" width="300px;" v-for="item in data.relatedImgUrls"
           :src="'/v1/file/download/'+item" alt="">
      </Col>


    </Row>

    <div v-if="data.state==3501" style="margin: 20px;">
      <Button type="success" @click="over">认证通过</Button>
      <Button type="warning" @click="pus">认证不通过</Button>
    </div>

  </div>

</template>

<script>
  import companyCheckServer from 'rs/companyCheckServer';
  export default {
    name: 'EnterpriseDetail',
    data () {
      return {
        loading: false,
        noOver: "",
        orgName: null,
        data: {}
      }
    },
    created: function () {
      this.getTableData();
    },
    methods: {
      over(){
        companyCheckServer.companyCheck({}, {
          id: this.$route.params.id,
          state: 3503,
          reason: null
        }, data => {
          this.getTableData();
          this.$Message.success("认证通过")
        }, err => {
          this.$Message.error("失败")
        })
      },
      pus(){
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                type: 'textarea',
                value: this.noOver,
                autofocus: true,
                placeholder: '输入认证不通过原因'

              },
              on: {
                input: (val) => {
                  this.noOver = val;
                },

              }
            })
          },
          onOk: () => {
            if (this.noOver == null || this.noOver == "") {
              this.$Message.error("请输入认证不通过原因")
              return
            }
            companyCheckServer.companyCheck({}, {
              id: this.$route.params.id,
              state: 3502,
              reason: this.noOver
            }, data => {
              this.getTableData();
            }, err => {

            })
          }
        })
      },
      getTableData (){
        this.tableData = [];
        //this.loading = true;
        companyCheckServer.listByid({}, {
          id: this.$route.params.id,
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            response.data.relatedImgUrls=JSON.parse(response.data.relatedImgUrls);
            if (response.data) this.data = response.data;
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {
          this.loading = false;
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .EnterpriseDetail {

  }
</style>

