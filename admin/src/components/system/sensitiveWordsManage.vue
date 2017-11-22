/**
* Created by chenchen on 2017/9/21.
*/

<template>
  <div class="SyncConfig">

    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;"  type="flex" justify="end" :gutter="16">

      <Col span="18">
        <Input style="width:240px" v-model="keyWord" placeholder="输入要查找的词条"></Input>
        <Button type="info" icon="search" @click="search">搜索</Button>
      </Col>
      <Col span="6">
        <Button type="info" icon="plus-round" @click="add">添加词汇</Button>
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
      :styles="{top: '80px'}"
      @on-ok="modalSubmit"
      width="600">
        <Input v-model="addName" :rows="10" type="textarea" placeholder="输入需要过滤的敏感词汇，可以多个输入，用空格隔开"></Input>
    </Modal>

  </div>
</template>

<script>
  import otherServer from 'rs/otherServer';
  export default {
    name: 'SyncConfig',
    data () {
      return {
        keyWord:'',
        searchWord:'',
        loading:false,
        modalTitle:'添加敏感词汇',
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
            title: "词条id",
            render: (h, params) => {
               return h('span', params.row.id);
            }
          },
          {
            title: '内容',
            render: (h, params) => {
               return h('span', params.row.word);
            }
          },
          {
            title: "操作",
            width:100,
            render: (h, params) => {
              return h('div',[
                h('Button',{
                    props: {
                        type: 'error',
                        size: 'small',
                        icon:"close"
                    },
                    on: {
                        click: () => {
                            this.delete(params.row.id);
                        }
                    }
                },"移除")
              ])
            }
          },
        ],
      }
    },
    created(){
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.keyWord) this.keyWord = this.$route.query.keyWord;
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
      getTableData (word){
          let that = this;
          that.loading = true;
        this.$router.push('sensitive-word-manage?current=' + this.current + "&pageSize=" + this.pageSize
          +"&keyWord="+this.keyWord);


        otherServer.getSensitiveWordList({
            params3:this.current,
            params4:this.pageSize,
          },{word:this.keyWord}
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
          const dealStringToArray = function(s){
            let b = new Set(s.split(/\s+/g));
            let c = [];
            for(let word of b){
              if(word != ""){
                c.push({word})
              }
            }
            return  c;
          }
          let arr =  dealStringToArray(this.addName);
          otherServer.addSensitiveWord({},arr,(res)=>{
              if(res.errorCode == 0){
                this.$Message.success("添加敏感词成功！");
                this.getTableData();
              }
          },(err)=>{
                this.$Message.error("网络错误")
          })
      },
      delete(id){
          otherServer.deleteSensitiveWord({id},{},(res)=>{
              if(res.errorCode == 0){
                this.$Message.success("删除敏感词成功！");
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
