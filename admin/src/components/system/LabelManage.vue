/**
* Created by chenchen on 2017/9/21.
*/

<template>
  <div class="SyncConfig">

    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
        <Select placeholder="选择区县" style="width:200px;" v-model="labelType" @on-change="search">
            <Option :value="18">资讯标签</Option>
            <Option :value="19">政策标签</Option>
            <Option :value="20">产品标签</Option>
        </Select>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16" >
        <Col>
        <Button type="info" icon="plus-round" @click="add">添加标签</Button>
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
      width="600">
        <Input v-model="addName" placeholder="标签名"></Input>
    </Modal>

  </div>
</template>

<script>
  import codeTableObj from '@/services/getCodeTable.js'
  import dictServer from 'rs/dictServer';
  export default {
    name: 'SyncConfig',
    data () {
      return {
        loading:false,
        modalTitle:'添加标签',
        addName:'',
        addModal:false,
        addLoading:false,
        labelType:18,
        current:1,
        pageSize:10,
        total:0,

        tableData:[],
        tableHeard:[
          {
            title: '标签名',
            render: (h, params) => {
               return h('span', params.row.value);
            }
          },
          {
            title: "标签ID",
            render: (h, params) => {
               return h('span', params.row.id);
            }
          },
          {
            title: "标签类别",
            render: (h, params) => {
               return h('span', params.row.typeName);
            }
          },
        ],
      }
    },
    created(){
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.labelType) this.labelType = parseInt(this.$route.query.labelType);
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
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
          let that = this;
          that.loading = true;
        this.$router.push('label-manage?current=' + this.current + "&pageSize=" + this.pageSize
          +"&labelType="+this.labelType);


        dictServer.list({
            params2:this.current,
            params3:this.pageSize,
          },{
            list:[this.labelType]
          }
          ,function (response) {
              if(response.errorCode == 0){
                  that.total = response.data.totalCount;
                  that.tableData = response.data.pageData;
                  that.loading = false;
              }
              else{
                  that.loading = false;
                  that.tableData =[];
              }
          }, function (err) {
              that.$Message.error("网络异常")
              that.loading = false;
          })
      },
      modalSubmit(){
          dictServer.add({
              typeId:this.labelType,
              value:this.addName
          },{
          },(res)=>{
              if(res.errorCode == 0){
                this.$Message.success("添加标签成功！");
                codeTableObj.getAllCodeTable()
                this.getTableData();
              }
          },(err)=>{
                this.$Message.error("网络错误")
          })
      },
      add(){
        this.addName = "";
        this.addModal = true;
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
