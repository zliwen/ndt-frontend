/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="GuaranteeSelect">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col span="5">
      <span>产权名称:</span>
      <span style="display: inline-block; width: 160px;">
                  <Input v-model="keyWord.name" placeholder="输入登录名称"></Input>
              </span>
      </Col>
      <Col span="9">
      <span>产权类型:</span>
      <Select v-model="keyWord.type" placeholder="产品" style="width: 360px;">
        <Option v-for="item in propertyTypeList" :value="item.id"
                :key="item.id">{{item.value}}</Option>
      </Select>
      </Col>
      <Col span="4">
      <Button type="success" icon="search" @click="search">搜索</Button>
      </Col>
      <Col span="4">
      <Button type="success" icon="checkmark-round" @click="over">完成选择</Button>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page v-if="total" :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>

  </div>
</template>

<script>
  import userPropertyrightServer from 'rs/userPropertyrightServer';
  export default {
    name: 'GuaranteeSelect',
    props: ["orgItemData"],
    data () {
      return {
        propertyTypeList: [],
        keyWord: {
          name: "",
          type: ""
        },
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        tableData: [],
        tableHeard: [
          {
            title: '选择',
            render: (h, params) => {
              return h('checkbox', {
                props: {
                  value: params.row.active
                },
                on: {
                  input: value => {
                    this.setActive(value, params.row._index);

                  }
                }
              });
            }
          },
          {
            title: '产权名称',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '产权类型',
            render: (h, params) => {
              return h('span', this.getCodeName(params.row.prType));
            }
          },
          {
            title: '产权描述',
            render: (h, params) => {
              return h('span', params.row.remark);
            }
          }
        ],
      }
    },
    watch: {
      'orgItemData': {
        handler: function (val, oldVal) {

        },
        deep: true
      }
    },
    created: function () {
      this.getTableData();
      this.getPropertyTypeList();
    },
    methods: {
      getPropertyTypeList(){
        this.getCodeTable('24', data => {
          this.propertyTypeList = data;
        });
      },
      setActive(value, index){
        this.tableData[index].active = value;
      },
      over(){

        let arr = [];
        this.tableData.forEach(item => {
          if (item.active) arr.push(item);
        });
        if (arr.length > 3) {
          this.$Message.error('最多选3个!');
          return;
        }
        this.$emit("close", arr);
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
        this.tableData = [];
        this.loading = true;
        userPropertyrightServer.list({
          params3: this.current,
          params4: this.pageSize,
        }, {
          name: this.keyWord.name,
          type: this.keyWord.type
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) {
              this.tableData = response.data.pageData
            }
            if (response.data) this.total = response.data.totalCount;
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

<style scoped lang='less'>

  .GuaranteeSelect {

  }
</style>
