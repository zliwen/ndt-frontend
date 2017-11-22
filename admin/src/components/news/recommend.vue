/**
* 推荐
* Edit by chenchen on 2017/9/18.
*/

<template>
    <div class="Policy">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col :xs="22" :sm="20" :md="18" :lg="18">
            <label  class="search-label">
                <span> 类型</span>
                 <Select v-model="keyWordType" @on-change="getTableData" style=" width: 200px;">
                     <Option  value=0 >全部</Option>
                     <OptionGroup label="推荐资讯">
                        <Option v-for="(item,index) in recommendType.info" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="推荐机构">
                        <Option v-for="(item,index) in recommendType.organization" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="政策推荐">
                        <Option v-for="(item,index) in recommendType.policy" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="推荐产品">
                        <Option v-for="(item,index) in recommendType.product" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                </Select>
            </label>
        </Col>
        <Col :xs="2" :sm="4" :md="6" :lg="6">
             <Button icon="plus-round" type="success" @click="newCallback">新建推荐</Button>
             <Button :disabled="keyWordType==0" :title="sortAlt" icon="plus-round" type="info" @click="sortCallback">重新排序</Button>
        </Col>
        </Row>
        <Table border :columns="tableHead" :data="tableData" v-show="!loading"></Table>

        <Modal
            v-model="modalShow"
            title="新增推荐"
            :loading="addLoading"
            :mask-closable="false"
            :styles="{top: '20px'}"
            ok-text="完成"
             @on-ok="modelSubmit"
             @on-cancel="modelSubmit"
            width="900">
            <div style="margin-bottom:10px;" >
                <label  style=" width: 100px;">推荐类型</label>
                 <Select :disabled="modalType=='edit'"  v-model="modalSelect" @on-change="modalSelectChange" style=" width: 200px;">
                     <OptionGroup label="推荐资讯">
                        <Option v-for="(item,index) in recommendType.info" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="推荐机构">
                        <Option v-for="(item,index) in recommendType.organization" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="政策推荐">
                        <Option v-for="(item,index) in recommendType.policy" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                     <OptionGroup label="推荐产品">
                        <Option v-for="(item,index) in recommendType.product" :value="item.id" :key="index">{{item.value}}</Option>
                     </OptionGroup>
                </Select>
                <label v-show="modalType=='edit'" style=" width: 100px; display:inline-block; margin-left:10px;">序号:<b>{{modalData.index}}</b></label>
                <label v-show="modalType=='edit'" style=" width: 200px; display:inline-block; margin-left:10px;">原关联id:<b>{{modalData.refId}}</b></label>
                <label v-show="modalType=='edit'" style=" width: 200px; display:inline-block; margin-left:10px;">原关联标题:<b>{{modalData.name}}</b></label>
            </div>
            <label v-show="modalType=='edit'">修改为</label>
            <Table border :columns="modalTableHead" :data="modalTableData"></Table>
            <Page :total="total" :current="current" :page-size="pageSize"
                show-total show-elevator show-sizer
                v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
            ></Page>
        </Modal>

        <Modal
            v-model="sortShow"
            title="推荐排序"
            :mask-closable="false"
            class="sort-modal"
            :styles="{top: '20px'}"
            ok-text="提交"
            @on-ok="sortSubmit"
            width="600">
            <draggable :list="tempTableData" :options="{draggable:'.list-item'}" @start="drag=true" @end="drag=false">
                <div v-for="(item,index) in tempTableData" :key="index" class="list-item">
                    <!-- <label style=" display:inline-block; margin-left:10px;">新序号:{{index}}</label>
                    <Icon type="arrow-right-a"></Icon> -->
                    <label style=" display:inline-block; margin-left:10px;">
                        <span>原序号:</span>
                        <span class="old-index">{{item.index}}</span>
                    </label>
                    <label style=" display:inline-block; margin-left:10px;">推荐id:{{item.id}}</label>
                    <label style="width: 200px; display:inline-block; margin-left:10px;">标题:{{item.name}}</label>
                </div>
            </draggable>
        </Modal>

    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import recommendServer from 'rs/infoServer';
    import infoServer from 'rs/infoServer';
    import organizationServer from 'rs/userServer';
    import dictServer from 'rs/dictServer';
    import productServer from 'rs/productServer';
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        name: 'recommend',
        data () {
            return {
                total:0,
                current:1,
                pageSize:10,
                sortShow:false,
                tempTableData:[],
                addLoading:false,
                content:"",
                loading:false,
                selectIsLoad1:true,
                selectIsLoad2:true,
                recommendType:{
                    product:[],
                    info:[],
                    organization:[],
                    policy:[]
                },
                keyWordType:0,
                modalSelect:0,
                modalShow:false,
                modalType:"",
                modalData:{},
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
                        return h('span',params.row.name);
                      }
                    },
                    {
                        title: '类型',
                        width: 100,
                        render: (h, params) => {
                            return h('span',params.row.typeName);
                        }
                    },
                    {
                        title: 'refId',
                        width: 100,
                        render: (h, params) => {
                            return h('span',params.row.refId);
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
                                            type: 'warning',
                                            size: 'small',
                                            icon:"edit"
                                        },
                                        on: {
                                            click: () => {
                                                this.editCallback(params.row);
                                            }
                                        }
                                    },"编辑"),
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
                modalTitle:"",
                tableData:[],
                modalTableHead:[
                    {
                        title: 'id',
                        render: (h, params) => {
                            return h('span',params.row.id);
                        }
                    },
                    {
                        title: '标题',
                        render: (h, params) => {
                            return h('span',params.row.title||params.row.name);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 270,
                        align: 'center',
                        render: (h, params) => {
                            if(this.modalType =="new"){
                                return h('div',[
                                    h('Button',{
                                        style: {
                                            'margin-right': '10px'
                                        },
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon:"plus-round"
                                        },
                                        on: {
                                            click: () => {
                                                this.modalAdd(params.row);
                                            }
                                        }
                                    },"添加")
                                ])
                            }
                            else  if(this.modalType =="edit"){
                                return h('div',[
                                    h('Button',{
                                        style: {
                                            'margin-right': '10px'
                                        },
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon:"arrow-up-c"
                                        },
                                        on: {
                                            click: () => {
                                                this.modalReplace(params.row);
                                            }
                                        }
                                    },"替换")
                                ])
                            }
                        }
                    }
                ],
                modalTableData:[],
            }
        },
        created: function () {
            this.$route.query;
            if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
            if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
            if (this.$route.query.keyWord) this.keyWord = this.$route.query.keyWord;
            this.getTableData();
            dictServer.list({params3: 1, params4: 100}, {list: [31]}, response => {
                if(response.errorCode==0) this.recommendType.info= response.data.pageData;
                this.selectIsLoad1 = false;
            });
            dictServer.list({params3: 1, params4: 100}, {list: [32]}, response => {
                if(response.errorCode==0) this.recommendType.organization= response.data.pageData;
                this.selectIsLoad2 = false;
            });
            dictServer.list({params3: 1, params4: 100}, {list: [41]}, response => {
                if(response.errorCode==0) this.recommendType.policy= response.data.pageData;
                this.selectIsLoad3 = false;
            });
            dictServer.list({params3: 1, params4: 100}, {list: [33]}, response => {
                if(response.errorCode==0) this.recommendType.product= response.data.pageData;
            })
        },
        computed:{
            selectIsLoad(){
                return this.selectIsLoad1||this.selectIsLoad2;
            },
            sortAlt(){
                return this.keyWordType==0?"请先选择一个类型":""
            }
        },
        components: {
            draggable
        },
        methods: {

            pageChange (current){
                this.current = current;
                this.getModalTableData();
            },
            pageSizeChange (pageSize){
                this.current = 1;
                this.pageSize = pageSize;
                this.getModalTableData();
            },
            modalSelectChange(){
                this.current = 1;
                this.getModalTableData();
            },
            getModalTableData(){
                let that = this;
                for(let item of this.recommendType.info.concat(this.recommendType.organization).concat(this.recommendType.policy).concat(this.recommendType.product)){
                     if(this.modalSelect== item.id){
                         if(item.typeId == 31){
                               infoServer.searchNews({
                                    params3:this.current,
                                    params4:this.pageSize
                                },{
                                    type:Number(String(item.id).replace("31","3"))
                                }, function (response) {
                                    if(response.errorCode == 0){
                                        that.modalTableData = response.data.pageData;
                                        that.total = response.data.totalCount;
                                    }
                                    else{
                                        that.modalTableData =[];
                                        that.$Message.error("获取资讯列表失败！")
                                    }
                                }, function (err) {
                                    that.$Message.error("获取资讯列表失败！")
                                })

                         }else if(item.typeId == 32){
                                organizationServer.findOrgList({
                                    params3:this.current,
                                    params4:this.pageSize
                                }, {
                                    orgType:902,
                                    orgSubtypes:[Number(String(item.id).replace("32","30").replace("01","04").replace("02","05").replace("03","06"))]
                                }, response => {
                                    if (response.errorCode == 0) {
                                        this.total = response.data.totalCount;
                                        this.modalTableData = response.data.pageData;
                                    } else {
                                        this.$Message.error('获取机构列表失败!');
                                    }

                                }, err => {
                                    this.loading1 = false;
                                    this.$Message.error('获取机构列表失败!');
                                });
                         }else if(item.typeId == 41){
                                infoServer.searchPolicy({
                                    params3:this.current,
                                    params4:this.pageSize
                                }, {
                                }, response => {
                                    if (response.errorCode == 0) {
                                        this.total = response.data.totalCount;
                                        this.modalTableData = response.data.pageData;
                                    } else {
                                        this.$Message.error('获取政策列表失败!');
                                    }

                                }, err => {
                                    this.loading1 = false;
                                    this.$Message.error('获取政策列表失败!');
                                });
                         }else if(item.typeId == 33){
                            productServer.getProductListForOwn({
                                    params3:this.current,
                                    params4:this.pageSize
                            },{
                                 productType:item.id
                            },response => {
                                if (response.errorCode == 0) {
                                    this.total = response.data.totalCount;
                                    this.modalTableData = response.data.pageData;
                                } else {
                                    this.$Message.error('获取产品列表失败!');
                                }

                            }, err => {
                                this.loading1 = false;
                                this.$Message.error('获取产品列表失败!');
                            });
                         }
                     }
                }
            },
            modalAdd(row){
                let that = this;
                 recommendServer.addRecommend({}
                    ,{
                        type:this.modalSelect,
                        refId:row.id
                    }
                    , function (response) {
                        if(response.errorCode == 0){
                            that.$Message.success("添加推荐成功");
                            that.getTableData();
                        }
                        else{
                            that.$Message.error("添加推荐失败:"+response.data);
                        }
                    }, function (err) {
                        that.$Message.error("操作失败，网络错误");
                    })
                    return;
            },
            modelSubmit(){
                this.getTableData();
            },
            modalReplace(row){
                let that = this;
                 recommendServer.editRecommend({}
                    ,{
                        id:this.modalData.id,
                        index:this.modalData.index,
                        type:this.modalSelect,
                        refId:row.id
                    }
                    , function (response) {
                        if(response.errorCode == 0){
                            that.$Message.success("替换成功");
                        }
                        else{
                            that.$Message.success("替换失败");
                        }
                    }, function (err) {
                        that.$Message.error("操作失败，网络错误");
                    })
                    return;
            },
            sortSubmit(){
                let that =this;
                let arrayData = []
                for(let i = 0;i<this.tempTableData.length;i++){
                    arrayData[i] = {
                        id: this.tempTableData[i].id,
                        index:i+1
                    }
                }
                 recommendServer.sortRecommend({}
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
            getTableData (){//获取列表
                let that = this;
                this.keyWordType = Number(this.keyWordType)
                that.loading = true;
                recommendServer.searchRecommend({
                    type: this.keyWordType
                },{}
                ,function (response) {
                    if(response.errorCode == 0){
                        that.tableData = response.data;
                        that.loading = false;
                    }
                    else{
                        that.tableData =[];
                        that.loading = false;
                        that.$Message.error("获取推荐列表失败！")
                    }
                }, function (err) {
                    that.loading = false;
                })
            },

            sortCallback(){//排序回调
                this.tempTableData = JSON.parse(JSON.stringify(this.tableData));
                this.sortShow =true;
            },
            viewCallback(row){//查看回调
                // let obj = {
                //     id:row.id,
                //     type:"view"
                // }
                // session.set("newsObj",JSON.stringify(obj));
                // this.$router.push('news-details');
                 this.$Message.error("不支持查看")

            },
            editCallback(row){//编辑回调

                // let obj = {
                //     id:row.id,
                //     type:"edit"
                // }
                // session.set("newsObj",JSON.stringify(obj));
                // this.$router.push('news-details');
                this.modalType = "edit";
                this.modalData = row;
                this.modalSelect = row.type;
                this.modalShow =true;
            },
            newCallback(){//新增回调
                // let obj = {
                //     type:"new"
                // }
                // session.set("newsObj",JSON.stringify(obj));
                // this.$router.push('news-details');
                this.modalType = "new";
                if(this.keyWordType!=0) this.modalSelect = this.keyWordType
                else this.modalSelect = this.recommendType.info[0].id;

                this.modalShow =true;
            },
            deleteCallback(row){//删除回调
                let that = this;
                this.$Modal.confirm({
                    title: '删除本条推荐',
                    content: '<p>删除后可以重新从列表中添加！</p>',
                    onOk: () => {
                        recommendServer.deleteRecommend({},[row.id]
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

<style scoped lang='less'>
    .Policy {
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
        .search-toggle{
            color:#6ad;
            margin: 10px;
            display: inline-block;
            i{
                margin-left: 4px;
            }
        }
    }
    .sort-modal{
        .list-item{
            line-height: 22px;
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
