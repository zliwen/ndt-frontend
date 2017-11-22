/**
* 新闻资讯
* Created by zhaowei on 2017/9/4.
* Edit by chenchen on 2017/9/4.
*/

<template>
  <div class="Policy">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;" type="flex" justify="end">
      <Col :xs="22" :sm="20" :md="18" :lg="22">
      <label class="search-label">
        <span> 标题</span>
        <Input class="search-input" v-model.trim="keyWord.title" placeholder="标题关键字" style="width:180px;"></Input>
      </label>
      <label class="search-label">
        <span> 优先级</span>
        <Select v-model="keyWord.importance" placeholder="优先级" clearable style=" width: 180px;">
          <Option v-for="(item,index) in importanceList" :key="index" :value="item.id">{{item.value}}</Option>
        </Select>
      </label>
      <label class="search-label">
        <span> 类型</span>
        <Select v-model="keyWord.type" style=" width: 180px;" clearable>
          <Option  v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.value}}
          </Option>
        </Select>
      </label>
      <!-- <label v-show="keyWord.toggle" class="search-label">
          <span> 状态</span>
          <Select v-model="keyWord.state"  placeholder="状态"  clearable  style=" width: 200px;">
              <Option v-for="(item,index) in stateList" :key="index" :value="item.id">{{item.value}}</Option>
          </Select>
      </label> -->
      <!-- <label v-show="keyWord.toggle" class="search-label">
          <span> 来源</span>
          <Input class="search-input"  v-model="keyWord.source" placeholder="来源" style="width:200px;"></Input>
      </label> -->
      <!-- <a class="search-toggle" v-show="keyWord.toggle" @click="showMoreSearch">收起<Icon type="arrow-up-b"></Icon></a> -->
      <Button icon="search" type="info" @click="search">搜索</Button>
      <!-- <a class="search-toggle" v-show="!keyWord.toggle" @click="showMoreSearch">更多搜索<Icon type="arrow-down-b"></Icon></a> -->
      </Col>
      <Col :xs="2" :sm="4" :md="6" :lg="2">
      </Col>
    </Row>
    <Table border :columns="tableHead" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
  </div>
</template>

<script>
  import newsServer from 'rs/infoServer';
  import otherServer from 'rs/otherServer';
  import dictServer from 'rs/dictServer';
  import session from '@/config/session';
  export default {
    name: 'News',
    data () {
      return {
        content: "",
        loadingStatus: false,
        waitUploadImgs: [],
        uploadImg: null,
        loading: false,
        current: 1,
        typeList: [],
        stateList: [],
        importanceList: [],
        pageSize: 10,
        total: 0,
        keyWord: {
          toggle: false,
          title: "",
          summary: "",
          state: 402,
          type: "",
          source: "",
          importance: ""
        },
        modalShow: true,
        modalTitle: "资讯详情",
        modalData:{},
        tableHead: [
          {
            title: '序号',
            width: 55,
            className: "min",
            render: (h, params) => {
              return h('span', params.index + 1);
            }
          },
          {
            title: '标题',
            width: 140,
            className:"text-overstep",
            render: (h, params) => {
              return h("span",params.row.title)
            }
          },
          {
            title: '类型',
            render: (h, params) => {
              return h('span', params.row.typeValue);
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
              return h('span', params.row.updateOr);
            }
          },
          {
            title: '地区',
            render: (h, params) => {
              if (params.row.divisionsValue && params.row.divisionsValue.length > 0) {
                return h('span', params.row.divisionsValue[0]);
              }
              else {
                return "";
              }

            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.stateValue);
            }
          },
          {
            title: '发布机构',
            render: (h, params) => {
              return h('span', params.row.publishOrgId);
            }
          },
          {
            title: '优先级',
            render: (h, params) => {
              return h('span', params.row.importanceValue);
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.stateValue);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              if (true) {
                return h('div', [
                  h('Button', {
                    style: {
                      'margin-right': '10px',
                      'margin-bottom': '5px',
                      'margin-top': '5px'
                    },
                    props: {
                      type: 'warning',
                      size: 'small',
                      icon: "edit"
                    },
                    on: {
                      click: () => {
                        this.checkCallback(params.row);
                      }
                    }
                  }, "审核"),
                ])
              }
            }
          }
        ],
        tableData: [],
      }
    },
    created: function () {
      this.getCodeTable('3', data => {
        this.typeList = data.filter(item=>item.id!=302);
      });
      this.getCodeTable('4', data => {
        this.stateList = data;
      });
      this.getCodeTable('5', data => {
        this.importanceList = data;
      });
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.title) this.keyWord.title = this.$route.query.title;
      if (this.$route.query.importance) this.keyWord.importance = parseInt(this.$route.query.importance);
      if (this.$route.query.type) this.keyWord.type = parseInt(this.$route.query.type);
      this.getTableData();
    },
    computed: {},
    methods: {
      handleUpload(file){
        this.waitUploadImgs.length = 0;
        this.waitUploadImgs.push(file);
        return false;
      },
      uploadImgs(){
        let that = this;
        this.loadingStatus = true;
        console.log(this.waitUploadImgs)
        otherServer.uploadFiles({}, {
          files: this.waitUploadImgs
        }, function () {
          that.waitUploadImgs.length = 0;
          that.loadingStatus = false;
        }, function () {
          alert("fail")
          that.loadingStatus = false;
        })
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
        let searchData = Object.assign({}, this.keyWord)
        that.loading = true;
        this.$router.push('?current=' + this.current + "&pageSize=" + this.pageSize + "&title=" + this.keyWord.title + "&importance=" + this.keyWord.importance + "&type=" + this.keyWord.type);
        let postData = {
          type: this.keyWord.type,
          importance: this.keyWord.importance,
          state: this.keyWord.state,
          source: this.keyWord.source,
          title: this.keyWord.title,
        }
        if(!this.keyWord.type){
          delete postData.type;
          postData.types = [];
          for(let i of this.typeList){
            postData.types.push(i.id);
          }
        }
        newsServer.searchNews({
          params3: this.current,
          params4: this.pageSize
        }, postData, function (response) {
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
      checkCallback({id}){//查看回调
        // 条页面法
        let obj = {
          id,
          type: "check"
        }
        session.set("newsObj", JSON.stringify(obj));
        this.$router.push('news-check/details');
      },

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
  .news-modal {

    .form-inline {
      display: flex;
      margin-top: 12px;

      .form-title {
        width: 200px;
        line-height: 32px;
        display: inline-block;
        text-align: right;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 20px;
      }

      .form-label {
        font-size: 14px;
        flex: 1;
        border: 1px solid #cfcfcf;
        padding-left: 4px;
        border-radius: 4px;
      }

      .form-label:not(.artcle) {
        line-height: 32px;
      }

      .artcle {
        padding: 4px;
        min-height: 200px;
      }

      .UE {
        padding: 0;
      }

    }
  }
</style>
