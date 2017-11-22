/**
* Created by chenchen on 2017/9/21.
*/

<template>
  <div class="SyncConfig">

    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
        <label class="search-label">
            <span> 组织机构代码</span>
            <Input class="search-input"  v-model="keyword.orgCode" placeholder="组织机构代码" style="width:240px;"></Input>
        </label>
        <label class="search-label">
            <span>产品代码</span>
            <Input class="search-input"  v-model="keyword.productCode" placeholder="产品代码" style="width:240px;"></Input>
        </label>
        <Button icon="search" type="info"  @click="search">搜索</Button>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16" >
        <Col>
        <Button type="info" icon="plus-round" @click="add">添加同步</Button>
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
      v-model="addModal"
      :title="modalTitle"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-ok="modalSubmit"
      width="900">
        <Table border :columns="modalTableHeard" :data="modalTableData" v-show="!loading"></Table>
        <Page :total="modaltotal" :current="modalcurrent" :page-size="modalpageSize"
              show-total show-elevator show-sizer
              v-on:on-change="modalpageChange" v-on:on-page-size-change="modalpageSizeChange"
        ></Page>
    </Modal>

  </div>
</template>

<script>
  import syncConfigServer from 'rs/syncConfigServer';
  import productServer from 'rs/productServer';
  import axios from '@/config/axios';
  export default {
    name: 'SyncConfig',
    data () {
      return {
        loading:false,
        addModal:false,
        addLoading:false,
        current:1,
        pageSize:10,
        total:0,
        modalcurrent:1,
        modalpageSize:10,
        modaltotal:0,
        keyword:{
            orgId:'',
            orgCode:'',
            productId:'',
            productCode:'',
        },
        modalTitle:"添加同步配置",
        tableData:[],
        tableHeard:[
          {
            title: '机构ID',
            render: (h, params) => {
               return h('span', params.row.orgId);
            }
          },
          {
            title: '产品ID',
            render: (h, params) => {
               return h('span', params.row.productId);
            }
          },
          {
            title: '同步地址',
            render: (h, params) => {
               return h('span', params.row.syncUrl);
            }
          },
          {
            title: '更新时间',
            render: (h, params) => {
               return h('span', params.row.updateAt);
            }
          },
          {
            title: '当前状态',
            render: (h, params) => {
               return h('span', params.row.isAutosync?'自动同步':'非自动同步');
            }
          },
          {
              title: '操作',
              key: 'action',
              width: 270,
              align: 'center',
              render: (h, params) => {
                  if(true){
                      return h('div',[
                          h('Button',{
                              style: {
                                  'margin-right': '10px'
                              },
                              props: {
                                  type:  params.row.isAutosync?'warning':'success',
                                  size: 'small',
                                  icon: params.row.isAutosync?"locked":"unlocked"
                              },
                              on: {
                                  click: () => {
                                      this.editCallback(params.row);
                                  }
                              }
                          },params.row.isAutosync?"停用同步":'启用同步'),
                          h('Button',{
                              style: {
                                  'margin-right': '10px'
                              },
                              props: {
                                  type: 'error',
                                  size: 'small',
                                  icon:'close'
                              },
                              on: {
                                  click: () => {
                                      this.deleteCallback(params.row);
                                  }
                              }
                          },"删除")
                      ])
                  }
              }
          }
        ],
        modelInputs:"",
        modalTableData:[],
        modalTableHeard:[
          {
            title: '机构ID',
            render: (h, params) => {
               return h('span', params.row.orgId);
            }
          },
          {
            title: '机构名称',
            render: (h, params) => {
               return h('span', params.row.orgName);
            }
          },
          {
            title: '产品ID',
            render: (h, params) => {
               return h('span', params.row.id);
            }
          },
          {
            title: '产品名称',
            render: (h, params) => {
               return h('span', params.row.name);
            }
          },
          {
              title: '操作',
              key: 'action',
              width: 300,
              align: 'center',
              render: (h, params) => {
                  if(true){
                      return h('div',[
                          h('Input',{
                              attrs:{
                                    id:"input"+params.index
                              },
                              props: {
                                  size: 'small',
                                  // icon:"edit"
                                  placeholder:"输入同步地址",
                              },
                              style: {
                                  'display': 'inline-block',
                                  "width":"200px",
                                  'margin-right': '10px'
                              },
                          }),
                          h('Button',{
                              props: {
                                  type: 'warning',
                                  size: 'small',
                                  // icon:"edit"
                              },
                              on: {
                                  click: () => {
                                      this.modalAdd(params.row,params.index);
                                  }
                              }
                          },"同步")
                      ])
                  }
              }
          }

        ]
      }
    },
    created(){
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.orgCode) this.keyword.orgCode = this.$route.query.orgCode;
      if (this.$route.query.productCode) this.keyword.productCode = this.$route.query.productCode;
      this.getTableData();
    },
    methods: {
      pageChange (current){
        this.current = current;
        this.getTableData();

      },
      pageSizeChange (pageSize){
        this.current = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      modalpageChange (current){
        this.modalcurrent = current;
        this.modalGetList();

      },
      modalpageSizeChange (pageSize){
        this.modalcurrent = 1;
        this.modalpageSize = pageSize;
        this.modalGetList();
      },
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
          let that = this;
          that.loading = true;
        this.$router.push('sync-config?current=' + this.current + "&pageSize=" + this.pageSize
          +"&orgCode="+this.keyword.orgCode+"&productCode="+this.keyword.productCode);


        syncConfigServer.list({
            params2:this.current,
            params3:this.pageSize
          },{}
          ,function (response) {
              if(response.errorCode == 0){
                  that.total = response.data.totalCount;
                  that.tableData = response.data.pageData;
                  that.loading = false;
              }
              else{
                  that.tableData =[];
                  that.loading = false;
                  that.$Message.error("获取配置列表失败！")
              }
          }, function (err) {
              that.$Message.error("网络异常")
              that.loading = false;
          })
      },
      modalAdd(row,index){
          let sync_url = $("#input"+index+" input").val();
          if( sync_url== ""){
              this.$Message.warning("填写同步地址")
              return;
          }
          let that =this;
          syncConfigServer.add({},{
            orgId:row.orgId,
            orgCode:row.orgCode,
            productId:row.id,
            productCode:row.productCode,
            is_autosync:true,
            sync_url
          }
          ,function (response) {
              if(response.errorCode == 0){
                that.modalGetList();
                that.getTableData();
                that.$Message.success("添加成功")
              }
              else{
                that.$Message.error("添加失败")
              }
          }, function (err) {
              that.$Message.error("网络异常")
              that.loading = false;
          })
      },
      modalSubmit(){

      },
      modalGetList(){
        let that=this;

        productServer.getProductListForOwn({
            params2: this.modalcurrent,
            params3: this.modalpageSize
        },{},function (response) {
            // 请求返回结果
            if(response.errorCode == 0&&response.data.pageData&&response.data.pageData.length>0){
              that.modalTableData = response.data.pageData;
              that.modaltotal = response.data.totalCount;
            }
            else{
                that.$Message.error("获取产品列表失败")
            }
        }, function (err) {
            that.tableData = [];
            // 请求失败
        })
      },
      add(){
        let that=this;
        this.addModal = true;
        this.modalGetList();
      },
      editCallback(row){
        let updateData = {
          id:row.id,
          orgId:row.orgId,
          orgCode:row.orgCode,
          productId:row.productId,
          productCode:row.productCode,
          sync_url:row.sync_url,
          is_autosync:!row.isAutosync
        };
        let that =this;
        syncConfigServer.update({},updateData
        , function (response) {
            if(response.errorCode ==0){
                that.getTableData();
            }
            else{
                that.$Message.error("操作失败")
            }
        }, function (err) {
            that.$Message.error("操作失败，网络错误！")
        })
      },
      deleteCallback(row){
          let that = this;
          this.$Modal.confirm({
              title: '确认删除本条同步信息',
              content: '<p>删除后不能恢复</p>',
              onOk: () => {
                  syncConfigServer.delete({},[row.id]
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
      }
    }
  }
</script>

<style  lang='less'>
  .SyncConfig {
        .search-label{
            display: inline-block;
            margin-right: 30px;
            margin-bottom: 10px;
            span{
                width: 80px;
                letter-spacing: 4px;
                padding: 4px;
            }
        }

  }
</style>
