/**
* 保险产品
* Created by zhaowei on 2017/11/06.
*/

<template>

  <div class="Product">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15" >
        <Col>
        <span>关键字搜索:</span>
            <Input style="display: inline-block; width: 200px;" v-model="keyWord.queryNameOrCode" placeholder="输入产品名称"></Input>
       </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16" >
        <Col>
        <!-- <Button type="info" icon="arrow-down-c" :disabled="!isFinace" @click="add">产品排序</Button> -->
        <Button type="info" icon="plus-round" :disabled="!isFinace" @click="add">添加保险产品</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
  </div>
</template>

<script>
  import organizationServer from 'rs/organizationServer';
  import otherServer from 'rs/otherServer';
  import productServer from 'rs/insureProductServer';
  export default {
    name: 'Product',
    data () {
      return {
        isFinace:false,
        readOnly:false,
        cutSize:[100,100],
        initCitys:[],
        stateList:[],
        loanTypeList:[],
        productToList:[],
        labelList:[],
        loadingStatus:false,
        localData:[],
        waitUploadImgs:[],
        organizationTypeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        addLoading: false,
        formCustom:{},
        formCustomInit: {
            "name": "",
            "logoImageUrl": "",
            "productCode": "",
            "mixAmount": 0,
            "mixAmountUnit": 1,
            "maxAmount": 0,
            "maxAmountUnit": 1,
            "mixTerm": 0,
            "mixTermUnit": 1,
            "maxTerm": 0,
            "maxTermUnit": 1,
            "productTo": [],
            "loanTypes": [],
            "paybackType": 1,
            "labels": [],
            "supportPolicy": "",
            "remark": "",
            "divisions": [],
        },
        ruleCustom: {
        },
        keyWord: {
          queryNameOrCode:"",
          state:"",
        },
        addModal: false,
        tableHeard: [
          {
            title: '序号',
            width: 70,
            render: (h, params) => {
              return h('span', (params.index+1)+(this.current-1)*this.pageSize);
            }
          },
          {
            title: '产品名称',
            render: (h, params) => {
               if (params.row.name)return h('span', params.row.name);
            }
          },
          {
            title: '机构',
            render: (h, params) => {
              return h('span', params.row.orgName);
            }

          },
          {
            title: '更新时间',
            render: (h, params) => {
               return h('span', params.row.updateTime);
            }
          },
          {
            title: '更新者',
            render: (h, params) => {
               return h('span', params.row.updateUser);
            }
          },

          {
            title: '操作',
            key: 'action',
            width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  style: {
                    'margin': '5px'
                  },
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.editInit(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'close'
                  },
                  style: {
                    'margin': '5px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                }, '删除')

              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true,
        activeEdit:"",

      }
    },
    created: function () {
      this.$route.query;
      this.getCodeTable('34', data => {
        this.stateList = data;
      });
      this.getCodeTable('28', data => {
        this.loanTypeList = data;
      });
      this.getCodeTable('27', data => {
        this.productToList = data;
      });
      this.getCodeTable('20', data => {
        this.labelList = data;
      });
      if(this.session.get("userType")==205||this.session.get("userType")==206||this.session.get("userType")==207){
        this.isFinace = true
      }
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.queryNameOrCode) this.keyWord.queryNameOrCode = this.$route.query.queryNameOrCode;
      if (this.$route.query.state) this.keyWord.state = this.$route.query.state;
      this.getTableData();

    },
    methods: {
      upImgSuccess(response){
        if(response.errorCode==0){
            this.formCustom.logoImageUrl = response.url;
            console.log(response.url)
        }

      },
      pageChange (current){
        this.current = current;
        this.getTableData();

      },
      pageSizeChange (pageSize){
        this.current = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
          let that = this;
          that.loading=true;
        this.$router.push('insure-product?current=' + this.current + "&pageSize=" + this.pageSize
          +"&queryNameOrCode="+this.keyWord.queryNameOrCode+"&state="+this.keyWord.state);
        productServer.getProductListForOwn({
              params2: this.current,
              params3: this.pageSize
          },Object.assign({},this.keyWord),function (response) {
              // 请求返回结果
              if(response.errorCode == 0){
                that.tableData = response.data.pageData;
                that.total = response.data.totalCount;
              }
              else{
                that.tableData = [];
              }
                that.loading=false;
          }, function (err) {
              that.tableData = [];
              that.loading=false;
              // 请求失败
          })
      },
      add(data){
        let obj = {
            type:"new"
        }
        this.session.set("productObj",JSON.stringify(obj));
        this.$router.push("insure-product/details")
      },
      editInit(data){

        let obj = {
            type:"edit",
            data
        };
        this.session.set("productObj",JSON.stringify(obj));
        this.$router.push("insure-product/details")


        // this.activeEdit=data;
        // this.formCustom =  JSON.parse(JSON.stringify(data));
        // this.initCitys = JSON.parse(JSON.stringify(data.divisions));
        // this.modalType = "edit";
        // this.addModal = true;
      },
      changeState(row){
          let formData = {
            ids:[
              row.id
            ]
          };
          let that = this;
          if(row.state == 3401)formData.state = 3402;
          else if(row.state == 3402)formData.state = 3403;
          else if(row.state == 3403)formData.state = 3402;
          else formData.state = 3402;
          productServer.updateState({},formData
          , function (response) {
              if(response.errorCode ==0){
                  that.$Message.success("操作成功");
                  that.getTableData();
              }
              else{
                  that.$Message.error("操作失败")
              }
          }, function (err) {
              that.$Message.error("操作失败，网络错误！")
          })
      },
      delete(row){
          let that = this;
          this.$Modal.confirm({
              title: '确认删除本条产品',
              content: '<p>删除后不能恢复</p>',
              onOk: () => {
                  productServer.deleteProduct({id:row.id},{},function (response) {
                      if(response.errorCode ==0){
                          that.$Message.success("删除成功");
                          that.getTableData();
                      }
                      else{
                          that.$Message.error("删除失败")
                      }
                  }, function (err) {
                      that.$Message.error("操作失败，网络错误！")
                  })
              },
              onCancel: () => {
              }
          })
      },
      divisionsChange(data){
        this.formCustom.divisions = [];
        data.forEach(item => {
           if(item.value){
              this.formCustom.divisions.push(item.value[item.value.length - 1])
           }

        });
      },
      modalSubmit () {
        let that = this;
        if(this.modalType=='new'){
          productServer.addProduct({},this.formCustom
          , function (response) {
              // 请求返回结果
              if(response.errorCode ==0){
                  that.$Message.success("保存成功");
                  that.getTableData();
              }else{
                  that.$Message.error("保存失败");
              }
          }, function (err) {
              that.loading=false;
              // 请求失败
          })
        }else if(this.modalType == "edit"){
          console.log(this.formCustom)
          productServer.editProduct({},this.formCustom
          , function (response) {
              // 请求返回结果
              if(response.errorCode ==0){
                  that.$Message.success("保存成功");
                  that.getTableData();
              }else{
                  that.$Message.error("保存失败");
              }
          }, function (err) {
              that.loading=false;
              // 请求失败
          })
        }
        // this.$refs.formCustom.validate((valid) => {
        //   if (valid) {
        //   // 完成表单验证功能后把上面的代码移动到这里
        //   } else {
        //     //this.addLoading = false;
        //     this.$Message.error('表单验证失败!');
        //   }
        // })

      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .Product {
  }
</style>
