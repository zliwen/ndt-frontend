/**
* Created by zhaowei on 2017/9/11.
*/

<template>
  <div class="Enterprise">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15">

        <Col>
        <span>审核状态:</span>
        <span style="display: inline-block; width: 100px;">
            <Select v-model="certificateType" placeholder="请选择证件类型">
              <Option v-for="item in certificateTypeList" :value="item.id"
                      :key="item.id">{{ item.value }}</Option>
            </Select>
            </span>
        </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>
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
  import userServer from 'rs/userServer';
  import companyCheckServer from 'rs/companyCheckServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'Enterprise',
    data () {
      return {
        certificateType: "",
        certificateTypeList: this.getCodeTable(35),
        modalTitle: "添加金融机构",
        isMom: 0,
        orgActiveItem: {},
        EnterpriseTypeList: [],
        addLoading: true,
        loginName: "",
        parentId: "",
        userType: "",
        adminDivisionId: "",
        addModal: false,
        tableHeard: [
          {
            title: '企业名称',

            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '组织机构代码',
            render: (h, params) => {
              return h('span', params.row.code);
            }
          },
          {
            title: '所属区域',
            render: (h, params) => {
              return h('span', params.row.divisionIdValue);
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', this.getCodeName(params.row.state));
            }

          },
          {
            title: '更新人',
            render: (h, params) => {
              return h('span', formatDate(params.row.setupTime));
            }

          },
          {
            title: '更新时间',
            render: (h, params) => {

              return h('span', formatDate(params.row.setupTime));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 390,
            align: 'center',

            render: (h, params) => {
              return h('div', [
                h('Button', {
                  style: {
                    'margin-right': '10px'
                  },
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'user_enterpriseDetail', params: {id: params.row.id}})
                    }
                  }
                }, '查看详情')

              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true

      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.certificateType) this.certificateType = parseInt(this.$route.query.certificateType);
      this.getTableData();
      this.$Modal.remove()
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
        this.tableData = [];
        this.loading = true;
        this.$router.push('enterprise?current=' + this.current + "&pageSize=" + this.pageSize
          + "&certificateType=" + this.certificateType);
        companyCheckServer.companyCheckList({
          params2: this.current,
          params3: this.pageSize,
        }, {
          state: this.certificateType
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) this.tableData = response.data.pageData;
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

<style rel="stylesheet/less" type="text/css">
  .Enterprise {

  }
</style>

