/**
* 贷款产品
* Created by zhaowei on 2017/8/24.
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
        <span>状态:</span>
            <Select v-model="keyWord.state"  placeholder="状态"  clearable  style=" width: 240px;">
                <Option v-for="(item,index) in stateList" :key="index" :value="item.id">{{item.value}}</Option>
            </Select>
        </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16" >
        <Col>
          <Button type="info" icon="arrow-down-c" :disabled="!isFinace" @click="sort">产品排序</Button>
          <Button type="info" icon="plus-round" :disabled="!isFinace" @click="add">添加产品</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>

    <Modal
        v-model="sortShow"
        title="产品排序"
        :mask-closable="false"
        class="sort-modal"
        :styles="{top: '20px'}"
        ok-text="提交"
        @on-ok="sortSubmit"
        width="600">
        <draggable :list="tempTableData" :options="{draggable:'.list-item'}" @start="drag=true" @end="drag=false">
            <div v-for="(item,index) in tempTableData" :key="index" class="list-item">
                <label style=" display:inline-block; margin-left:10px;">
                    <span>原排序权重:</span>
                    <span class="old-index">{{item.index||0}}</span>
                </label>
                <label style="width: 200px; display:inline-block; margin-left:10px;">产品名称:{{item.name}}</label>
            </div>
        </draggable>
    </Modal>
    <Modal
        v-model="setPriorityShow"
        title="产品优先级"
        :mask-closable="false"
        class="sort-modal"
        :styles="{top: '20px'}"
        ok-text="提交"
        @on-ok="setPriority"
        width="600">
        <p>产品名称：<span>{{setPriorityProductName}}</span></p>
        <label>设置优先级，数字越大优先级越高 (范围: 1 - 99) ：</label>
        <InputNumber v-model="setPriorityProductValue" :min="1" :max="99" placeholder="设置优先级，"></InputNumber>
    </Modal>
  </div>
</template>

<script>
    import draggable from 'vuedraggable'
  import organizationServer from 'rs/organizationServer';
  import otherServer from 'rs/otherServer';
  import productServer from 'rs/productServer';
  export default {
    name: 'Product',
    data () {
      return {
        setPriorityObj:{},
        setPriorityProductName:'',
        setPriorityProductId:'',
        setPriorityProductValue:1,
        setPriorityShow:false,
        sortShow:false,
        tempTableData:[],
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
               return h('span', params.row.updateAt);
            }
          },
          {
            title: '更新者',
            render: (h, params) => {
               return h('span', params.row.updateName);
            }
          },
          {
            title: '地区',
            render: (h, params) => {
              if(params.row.divisionNames) return h('span', params.row.divisionNames.join(","));
            }
          },

          {
            title: '优先级',
            render: (h, params) => {
              return h('span', params.row.priority);
            }

          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.stateName);
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                this.isFinace?"":h('Button', {
                  style: {
                    'margin': '5px'
                  },
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit',
                  },
                  on: {
                    click: () => {
                      this.setPriorityObj = params.row;
                      this.setPriorityProductName = params.row.name;
                      this.setPriorityProductId = params.row.id;
                      this.setPriorityProductValue = params.row.priority||1;
                      this.setPriorityShow = true;
                    }
                  }
                }, "优先级"),
                h('Button', {
                  style: {
                    'margin': '5px'
                  },
                  props: {
                    type: params.row.state!=3402?'success':'warning',
                    size: 'small',
                    icon: params.row.state!=3402?'arrow-up-a':'arrow-down-a',
                  },
                  on: {
                    click: () => {
                      this.changeState(params.row)
                    }
                  }
                }, params.row.state==3402?'下架':( params.row.state==3403?'重新发布':'发布')),
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
    components: {
        draggable
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
      if (this.$route.query.state) this.keyWord.state = parseInt(this.$route.query.state);
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
        this.$router.push('product?current=' + this.current + "&pageSize=" + this.pageSize
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
      sort(){

        productServer.getProductListForOwn({
              params2: 1,
              params3: 1000
          },Object.assign({},this.keyWord),(response)=> {
              // 请求返回结果
              if(response.errorCode == 0){
                this.tempTableData = response.data.pageData;
                this.sortShow =true;
              }
              else{
                this.tempTableData = [];
              }
                this.loading=false;
          }, (err)=>{
              this.tempTableData = [];
              this.loading=false;
              // 请求失败
          })
      },
      sortSubmit(){
          let that = this;
          let arrayData = []
          for(let i = 0;i<this.tempTableData.length;i++){
              arrayData[i] = {
                  productId: this.tempTableData[i].id,
                  index:this.tempTableData.length-i
              }
          }
          productServer.sortIndex({}
              ,arrayData
              ,function (response) {
                  if(response.errorCode == 0){
                      that.$Message.success("排序成功");
                      that.getTableData();
                  }
                  else{
                      that.$Message.success("排序失败");
                      that.getTableData();
                  }
              }, function (err) {
                  that.$Message.error("操作失败，网络错误");
          })
          return;

      },
      add(data){
        let obj = {
            type:"new"
        }
        this.session.set("productObj",JSON.stringify(obj));
        this.$router.push("product/details")
      },
      editInit(data){

        let obj = {
            type:"edit",
            data
        };
        this.session.set("productObj",JSON.stringify(obj));
        this.$router.push("product/details")


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
                  productServer.deleteProduct({},[row.id]
                  , function (response) {
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
      setPriority(){
        this.setPriorityObj.priority = this.setPriorityProductValue
        let that = this;
         productServer.editProduct({},this.setPriorityObj,
          function (response) {
              // 请求返回结果
              if(response.errorCode ==0){
                  that.$Message.success("设置成功");
                  that.getTableData();
              }else{
                  that.$Message.error("设置失败");
              }
          }, function (err) {
              that.loading=false;
              // 请求失败
          })
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

<style lang='less'>
  .Product {
  }
    .sort-modal{
        .list-item{
            line-height: 22px;
            background-color: red;
            border:1px solid #c0c0c0;
            border-radius: 4px;
            margin: 5px;
            padding: 5px;
        }
        .old-index{
            display: inline-block;
            text-align: center;
            font-size: 16px;
            color: #fff;
            border-radius: 12px;
            width: 22px;
            background-color: #ccc;
        }
    }
</style>
