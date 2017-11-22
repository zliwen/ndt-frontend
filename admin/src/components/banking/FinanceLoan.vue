/**
* 金融机构贷款管理
* Created by chenchen on 2017/9/6.
*/

<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
    <!-- <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15" >
        <Col>
        <span>关键字搜索:</span>
        <span style="display: inline-block; width: 200px;">
                <Input v-model="keyWord" placeholder="输入产品名称"></Input>
            </span>
        </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16" >
        <Col>
        <Button type="info" icon="plus-round" @click="add">添加产品</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page> -->

    <Modal
      v-model="addModal"
      title="用户编辑"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-ok="addSave"
      width="900">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="220">
        <FormItem label="信用产品唯一编码：" prop="value">
          <Input v-model="formCustom.value" placeholder="请输入信用产品唯一编码"></Input>
        </FormItem>
        <FormItem label="登录手机号：" prop="ad_orgtype_id">
          <Select v-model="formCustom.ad_orgtype_id" v-on:on-change="organizationTypeChange" placeholder="请选择组织类型">
            <Option v-for="item in organizationTypeList" :value="item.name" :key="item.name"></Option>
          </Select>
        </FormItem>
        <FormItem label="身份证号：" prop="value">
          <Input type="text" v-model="formCustom.value" placeholder="请输入社会统一信用代码/工商注册代码"></Input>
        </FormItem>
        <FormItem label="登录名称：" prop="phone">
          <Input type="text" v-model="formCustom.phone" placeholder="请输联系电话"></Input>
        </FormItem>
        <FormItem label="真实姓名：" prop="emali">
          <Input type="text" v-model="formCustom.emali" placeholder="请输邮箱"></Input>
        </FormItem>
        <FormItem label="密码：" prop="emali">
          <Input type="text" v-model="formCustom.emali" placeholder="请输邮箱"></Input>
        </FormItem>

      </Form>
    </Modal>
  </div>
</template>

<script>
  import organizationServer from 'rs/organizationServer';
  import otherServer from 'rs/otherServer';
  import productServer from 'rs/productServer';
  export default {
    name: 'FinanceLoan',
    data () {

      return {
        organizationTypeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        addLoading: true,
        formCustom: {
          value: '',
          ad_orgtype_id: '',
          value: '',
          phone: '',
          emali: '',
          county: '',
          county_id: '',
          town_id: '',
          town: '',
          village_id: '',
          village: '',
          address: '',
          region_id: 51,
          regionname: '四川省',
          city_id: 5101,
          city: '成都市'
        },
        ruleCustom: {
          value: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
          ad_orgtype_id:[
            { required: true, message: '请选组织类型', trigger: 'change' }
          ],
          value: [
            {required: true, message: '社会统一信用代码/工商注册代码不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          emali: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'}
          ],
          county:[
            { required: true, message: '请选县', trigger: 'change' }
          ],
          /*town:[
           { required: true, message: '请选镇', trigger: 'change' }
           ],
           village:[
           { required: true, message: '请选村', trigger: 'change' }
           ],*/
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ]
        },
        keyWord: "",
        addModal: false,
        tableHeard: [
          {
            title: '产品名称',
            render: (h, params) => {
              if (params.row.name)return h('span', params.row.name);
            }
          },
          {
            title: '贷款期限(月)',
            render: (h, params) => {
              if (params.row && params.row.preference)return h('span', params.row.preference);
            }
          },
          {
            title: '贷款对象',
            render: (h, params) => {
              return h('span', params.row.investmentcycle);
            }
          },
          {
            title: '贷款利率',
            render: (h, params) => {
               return h('span', params.row.roi);
            }

          },
          {
            title: '机构名字',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '机构电话',
            render: (h, params) => {
              return h('span', params.row.orgphone);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
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
                      this.add(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'close'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

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
        loading: false,
        loadingMo: true,
        activeEdit:"",

      }
    },
    created: function () {
      this.$route.query;
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
      getTableData (){
        let that = this;
        // that.loading = true;
        // this.$router.push('product?current=' + this.current + "&pageSize="
        //   + this.pageSize + "&keyWord=" + this.keyWord);
        productServer.findInvestment({}, {
          pageIndex: this.current,
          pageSize: this.pageSize,
          search:this.keyWord,
          ad_org_id:this.session.get("ad_org_id")
        }, function (response) {
          that.tableData = response.data;
          that.total = response.total;
          that.loading = false;
        }, function (err) {
          that.loading = false;
        })
      },
      add(data){

        let that = this;
        this.addModal = true;
        this.getCityById(5101, function (response) {
          that.countyList = response.data;
          that.formCustom.county = '';
          that.formCustom.county_id = '';
          if (data&&data.location) that.countyChange(data.location.county);
        });

        if (data&&data.org){
          this.editInit(data);
        }else {
          this.activeEdit="";
        }
        if (!this.organizationTypeList.length) this.getOrganizationTypeList();

      },
      editInit(data){
        this.activeEdit=data;
        this.townChange(this.formCustom.town);

        this.formCustom = {
          name: data.org.name,
          ad_orgtype_id: data.org.ad_orgtype_id,
          value: data.org.value,
          phone: data.org.phone,
          emali: data.org.emali,
          county: data.location.county,
          county_id: data.location.county_id,
          town_id: data.location.town_id,
          town: data.location.town,
          village_id: data.location.village_id,
          village: data.location.village,
          address: data.location.address,
          region_id: 51,
          regionname: '四川省',
          city_id: 5101,
          city: '成都市'
        };


      },
      getOrganizationTypeList(){
        let that = this;
        that.loadingMo = true;
        organizationServer.getOrganizationTypeList({}, {}, function (response) {
          that.organizationTypeList = response.data;
          that.loadingMo = false;
        }, function (err) {
          that.loadingMo = false;
        })
      },
      addSave () {
        let that = this;
        this.addLoading =true;

        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            if(!this.activeEdit){
              organizationServer.addOrg({}, this.formCustom, function (data) {
                if (data.code == '1') {
                  that.$refs.formCustom.resetFields();
                  that.addModal = false;
                  that.$Message.success('添加成功!');
                } else {
                  that.addLoading = false;
                  that.$Message.error('添加失败失败!');
                }
              }, function (err) {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
              })
            }else{
              organizationServer.updateOrgInfo({}, $.extend(this.formCustom,
                {ad_org_id:this.activeEdit.org.ad_org_id}) , function (data) {
                if (data.code == '1') {
                  that.$refs.formCustom.resetFields();
                  that.addModal = false;
                  that.$Message.success('添加成功!');
                } else {
                  that.addLoading = false;
                  that.$Message.error('添加失败失败!');
                }
              }, function (err) {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
              })
            }


          } else {
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })

      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getCityById(id, callBack){

        organizationServer.getCityById({}, {
          parentId: id
        }, function (response) {
          callBack(response);
        }, function (err) {
        })
      },
      countyChange(name){
        let that = this;
        this.countyList.forEach(function (item) {
          if (item.name == name) that.formCustom.county_id = item.ad_admindivision_id;
        });
        this.getCityById(that.formCustom.county_id, function (response) {
          that.townList = response.data;
          that.formCustom.town = "";
          that.formCustom.town_id = "";
          that.formCustom.village = "";
          that.formCustom.village_id = "";
        });
      },
      townChange(name){
        let that = this;
        this.townList.forEach(function (item) {
          if (item.name == name) that.formCustom.town_id = item.ad_admindivision_id;
        });
        this.getCityById(that.formCustom.town_id, function (response) {
          that.villageList = response.data;
          that.formCustom.village = "";
          that.formCustom.village_id = "";
        });
      },
      villageChange(name){
        let that = this;
        this.villageList.forEach(function (item) {
          if (item.name == name) that.formCustom.village_id = item.ad_admindivision_id;
        });
      },
      organizationTypeChange(name){
        let that = this;
        this.organizationTypeList.forEach(function (item) {
          if (item.name == name){
            that.formCustom.ad_orgtype_id = item.ad_orgtype_id+"";

          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .Product {
  }
</style>
