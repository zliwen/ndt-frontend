/**
* 农业政策
* Created by chenchen on 2017/9/4.
*/

<template>
  <div class="Policy">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;" type="flex" justify="end">
      <Col :xs="22" :sm="20" :md="18" :lg="22">
      <label class="search-label">
        <span> 标题</span>
        <Input class="search-input" v-model.trim="keyWord.title" placeholder="标题关键字" style="width:240px;"></Input>
      </label>
      <!-- <label class="search-label">
          <span> 编号</span>
          <Input class="search-input"  v-model="keyWord.docNo" placeholder="发文编号" style="width:240px;"></Input>
      </label>
      <label v-show="keyWord.toggle" class="search-label">
          <span> 摘要</span>
          <Input class="search-input"  v-model="keyWord.summary" placeholder="摘要关键字" style="width:240px;"></Input>
      </label>
      <label v-show="keyWord.toggle" class="search-label">
          <span> 来源</span>
          <Input class="search-input"  v-model="keyWord.source" placeholder="来源" style="width:240px;"></Input>
      </label>
      <label v-show="keyWord.toggle" class="search-label">
          <span> 状态</span>
          <Select  v-model="keyWord.state"  placeholder="状态"  clearable  style=" width: 240px;">
              <Option v-for="(item,index) in stateList" :key="index" :value="item.id">{{item.value}}</Option>
          </Select>
      </label> -->
      <label class="search-label">
        <span> 优先级</span>
        <Select v-model="keyWord.importance" placeholder="优先级" clearable style=" width: 240px;">
          <Option v-for="(item,index) in importanceList" :key="index" :value="item.id">{{item.value}}</Option>
        </Select>
      </label>
      <!-- <a class="search-toggle" v-show="keyWord.toggle" @click="showMoreSearch">收起<Icon type="arrow-up-b"></Icon></a> -->
      <Button icon="search" type="info" @click="search">搜索</Button>
      <!-- <a class="search-toggle" v-show="!keyWord.toggle" @click="showMoreSearch">更多搜索<Icon type="arrow-down-b"></Icon></a> -->
      </Col>
      <Col :xs="2" :sm="4" :md="6" :lg="2">
      <Button icon="plus-round" type="success" @click="newCallback">新增政策</Button>
      </Col>
    </Row>
    <Table border :columns="tableHead" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
    <artcleView ref="artcleModal" :modalData="modalData" :modalTitle="modalTitle"></artcleView>
  </div>
</template>

<script>
  import artcleView from './commonArtcle';
  import PolicyServer from 'rs/infoServer';
  import dictServer from 'rs/dictServer';
  import otherServer from 'rs/otherServer';
  import session from '@/config/session';

  export default {
    name: 'Policy',
    components:{artcleView},
    data () {
      return {
        loading: false,
        current: 1,
        pageSize: 10,
        total: 0,
        stateList: [],
        importanceList: [],
        modalShow: true,
        modalTitle: "资讯详情",
        modalData:{},
        keyWord: {
          toggle: false,
          title: "",
          summary: "",
          state: "",
          importance: "",
          docNo: "",
          source: ''
        },
        tableHead: [
          {
            title: '序号',
            width: 55,
            className:"min",
            render: (h, params) => {
              return h('span', params.index+1);
            }
          },
          {
            title: '标题',
            className:"text-overstep",
            render: (h, params) => {
              return h("span",params.row.title)
            }
          },
          {
            title: '更新时间',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.updateAt);
            }
          },
          {
            title: '更新者',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.updateByName);
            }

          },
          {
            title: '地区',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.divisionNames);
            }
          },
          {
            title: '发布机构',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.publishOrgName);
            }
          },
          {
            title: '优先级',
            width: 80,
            render: (h, params) => {
              return h('span', params.row.importanceValue);
            }
          },
          {
            title: '状态',
            width: 90,
            render: (h, params) => {
              return h('span', params.row.stateName);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 270,
            align: 'center',
            //fixed: "right",
            render: (h, params) => {
              if (true) {
                return h('div', [
                  h('Button', {
                    style: {
                      'margin-right': '10px'
                    },
                    props: {
                      type: 'info',
                      size: 'small',
                      icon: 'ios-eye'
                    },
                    on: {
                      click: () => {
                        this.viewCallback(params.row);
                      }
                    }
                  }, "查看"),
                  h('Button', {
                    style: {
                      'margin-right': '10px'
                    },
                    props: {
                      type: 'warning',
                      size: 'small',
                      icon: 'edit'
                    },
                    on: {
                      click: () => {
                        this.editCallback(params.row);
                      }
                    }
                  }, "编辑"),
                  h('Button', {
                    style: {
                      'margin-right': '10px'
                    },
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'close'
                    },
                    on: {
                      click: () => {
                        this.deleteCallback(params.row);
                      }
                    }
                  }, "删除")
                ])
              }
            }
          }
        ],
        tableData: [],
      }
    },
    created: function () {
      this.$route.query;

      this.getCodeTable('4', data => {
        this.stateList = data;
      });
      this.getCodeTable('5', data => {
        this.importanceList = data;
      });
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.title) this.keyWord.title = this.$route.query.title;
      if (this.$route.query.importance) this.keyWord.importance = parseInt(this.$route.query.importance);
      this.getTableData();


    },
    computed: {},
    methods: {
      showMoreSearch(){
        this.keyWord.toggle = !this.keyWord.toggle;
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
      getTableData (){//获取列表
        let that = this;
        let searchData = Object.assign({type: 6501}, this.keyWord)
        that.loading = true;
        this.$router.push('?current=' + this.current + "&pageSize=" + this.pageSize + "&title=" + this.keyWord.title + "&importance=" + this.keyWord.importance);
        PolicyServer.searchPolicy({
            params3: this.current,
            params4: this.pageSize
          }, searchData
          , function (response) {
            if (response.errorCode == 0) {
              that.tableData = response.data.pageData;
              that.total = response.data.totalCount;
              that.loading = false;
            }
            else {
              that.tableData = [];
              that.loading = false;
              that.$Message.error("获取资讯列表失败！")
            }
          }, function (err) {
            that.loading = false;
          })
      },

      viewCallback({id}){//查看回调
        // 条页面法
        let obj = {
          id,
          type: "view"
        }
        session.set("policyObj", JSON.stringify(obj));
        this.$router.push('policy/details');

        //弹窗法
        // PolicyServer.getPolicyDetail({
        //     id
        // },{}, (response) => {
        //     if(response.errorCode == 0){

        //           this.modalData = response.data;
        //           this.modalTitle = "政策预览"
        //           this.$refs.artcleModal.show();
        //     }
        // },  (err) => {
        //     that.$Message.error("获取详细信息失败！")
        // })
      },
      editCallback(row){//编辑回调
        let obj = {
          id: row.id,
          type: "edit"
        }
        session.set("policyObj", JSON.stringify(obj));
        this.$router.push('policy/details');

        // let importanceBool = row.importance>0
        // this.modalType = "edit";
        // this.modalTitle = "编辑政策消息";
        // this.modalShow = true;
        // this.$refs.ue.setUEContent(row.content)
        // this.initValue = row.divisions[0];
        // this.modalData = Object.assign({},row,{importanceBool});
      },
      // checkCallback(row){//审核回调
      //     this.modalType = "check";
      //     this.modalTitle = "审核政策消息";
      //     this.modalShow = true;
      //     this.$refs.ue.setUEContent(row.content)
      //     this.modalData = Object.assign({},row);
      // },
      newCallback(){//新增回调
        let obj = {
          type: "new"
        }
        session.set("policyObj", JSON.stringify(obj));
        this.$router.push('policy/details');
      },
      deleteCallback(row){//删除回调
        let that = this;
        this.$Modal.confirm({
          title: '确认删除本条政策信息',
          content: '<p>删除后不能恢复</p>',
          onOk: () => {
            PolicyServer.deletePolicy({}, {
              "ids": [row.id],
            }, function (response) {
              if (response.errorCode == 0) {
                that.$Message.success("删除成功");
                that.getTableData();
              }
              else {
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

<style scoped lang='less'>
  .Policy {

    .search-label {
      display: inline-block;
      margin-right: 30px;
      margin-bottom: 10px;

      span {
        width: 80px;
        letter-spacing: 4px;
        padding: 4px;
      }

    }
    .search-toggle {
      color: #6ad;
      margin: 10px;
      display: inline-block;

      i {
        margin-left: 4px;
      }

    }
  }
</style>
