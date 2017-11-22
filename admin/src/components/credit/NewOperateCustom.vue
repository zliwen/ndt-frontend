/**
* 信用指标管理
* Created by chenchen on 2017/9/8.
*/

<template>
    <div class="Norm">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col :xs="22" :sm="22" :md="22" :lg="22">
            <label class="search-label">
                <span> 主题名称</span>
                <Input class="search-input"  v-model="keyWord.title" placeholder="标题关键字" style="width:240px;"></Input>
            </label>
            <label class="search-label">
                <span> 企业类型</span>
                <Select style="width:240px;">
                    <Option value="1">全部</Option>
                    <Option value="2">老大</Option>
                    <Option value="3">老二</Option>
                </Select>
            </label>
            <Button icon="search" type="info"  @click="search">搜索</Button>
        </Col>
        <Col :xs="2" :sm="2" :md="2" :lg="2">
             <Button icon="plus-round" style="margin:5px;" type="success" @click="newCallback">导入Excle</Button>
             <Button icon="plus-round" style="margin:5px;" type="success" @click="newCallback">新建资讯</Button>
        </Col>
        </Row>
        <Table border :columns="tableHead" :data="tableData" v-show="!loading"></Table>
        <Page :total="total" :current="current" :page-size="pageSize"
            show-total show-elevator show-sizer
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
        ></Page>
        <Modal
            class="news-modal"
            v-model="modalShow"
            :title="modalTitle"
            :mask-closable="false"
            :styles="{top: '20px'}"
            @on-ok="modalSubmit"
            @on-cancel="modalCancle" width="900">
        </Modal>
    </div>
</template>

<script>
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        name: 'News',
        data () {
            return {
                uploadImg:null,
                ruleCustom: {},
                modalType:"view",
                ueConfig:{
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                content:"2131231231",
                loading:false,
                current:1,
                pageSize:10,
                modalData:{
                    divisions:"1",
                },
                total:0,
                keyWord:{
                    toggle:false,
                    name:"",
                },
                modalShow:false,
                tableHead: [
                    {
                        title: 'id',
                        render: (h, params) => {
                            return h('span',params.row.id);
                        }
                    },
                    {
                        title: '主体名称',
                        render: (h, params) => {
                            return h('span',params.row.title);
                        }
                    },
                    {
                        title: '主体类型',
                        render: (h, params) => {
                            return h('span',params.row.updateAt);
                        }
                    },
                    {
                        title: '所属区域',
                        render: (h, params) => {
                            return h('span',params.row.updateBy);
                        }

                    },
                    {
                        title: '信用代码/身份证',
                        render: (h, params) => {
                            return h('span',params.row.divisions);
                        }
                    },
                    {
                        title: '企业类型',
                        render: (h, params) => {
                            return h('span',params.row.state);
                        }
                    },
                    {
                        title: '入库时间',
                        render: (h, params) => {
                            return h('span',params.row.publishOrgId);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
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
                                            icon:'edit'
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
                tableData:[]
            }
        },
        created: function () {
            this.$route.query;
            if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
            if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
            if (this.$route.query.keyWord) this.keyWord = this.$route.query.keyWord;
            this.getTableData();
        },
        computed:{
        },
        methods: {
            imgSuccess(){},
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
                let searchData = Object.assign({},this.keyWord,{
                    current:this.current,
                    pageSize:this.pageSize
                })
                // that.loading = true;
                //  this.$router.push('news?current=' + this.current + "&pageSize=" + this.pageSize + "&keyWord=" + JSON.stringify(this.keyWord));
                // newsServer.searchNews({},searchData
                // , function (response) {
                //     that.loading = false;
                // }, function (err) {
                //     that.loading = false;
                // })
            },
            modalSubmit(){//模态提交
                if(this.modalType == 'new'){//新增
                    let content = this.$refs.ue.getUEContent();
                    newsServer.addNews({}
                    ,Object.assign({},this.modalData,{content})
                    , function (response) {
                        this.$Message.success("新增成功")
                    }, function (err) {
                        this.$Message.error("新增失败")
                    })
                }
                else if(this.modalType == 'edit'){//修改
                    let content = this.$refs.ue.getUEContent();
                    newsServer.editNews({}
                    ,Object.assign({},this.modalData,{content})
                    , function (response) {
                        this.$Message.success("修改成功")
                    }, function (err) {
                        this.$Message.error("修改失败")
                    })
                }
                else if(this.modalType == 'check'){//审核
                }
            },
            modalCancle(){//模态取消
                this.modalType = "";
                this.modalData = {};
                this.modalTitle = "";
            },
            viewCallback(row){//查看回调
                this.modalType = "view";
                this.modalTitle = "查看资讯详情";
                this.modalShow = true;
                this.modalData = Object.assign({},row);
            },
            editCallback(row){//编辑回调
                this.modalType = "edit";
                this.modalTitle = "编辑资讯";
                this.modalShow = true;
                this.$refs.ue.setUEContent(row.content)
                this.modalData = Object.assign({},row);
            },
            // checkCallback(row){//审核回调
            //     this.modalType = "check";
            //     this.modalTitle = "审核政策消息";
            //     this.modalShow = true;
            //     this.$refs.ue.setUEContent(row.content)
            //     this.modalData = Object.assign({},row);
            // },
            newCallback(){//新增回调
                this.modalType = "new";
                this.modalTitle = "新增资讯";
                this.modalShow = true;
                this.modalData = {};
            },
            deleteCallback(row){//删除回调
                this.$Modal.confirm({
                    title: '确认删除本条资讯',
                    content: '<p>资讯删除后不能恢复</p>',
                    onOk: () => {
                        newsServer.deleteNews({},{
                            "infoId":row.infoId,
                        }, function (response) {
                            this.$Message.success("删除成功")
                        }, function (err) {
                            this.$Message.error("删除失败")
                        })
                    },
                    onCancel: () => {
                    }
                })
            },
            getOneNewsDetail(id,callback){//获取单条资讯详情.。列表就是详情的集合，单独请求详情有什么用？
                let returnData;
                newsServer.getNewsDetail({},{id}
                ,function (response) {
                    if(response.errorCode == 0)
                        callback(response);
                }, function (err) {
                    this.$Message.error("获取详细信息失败！")
                })

            }
            
        }
    }
</script>

<style scoped lang='less'>
    .Norm {
        .search-label{
            display: inline-block;
            margin-right: 30px;
            margin-bottom: 10px;
            span{
                width: 80px;
                letter-spacing: 2px;
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
    .news-modal{
        .form-inline{
            display: flex;
            margin-top: 12px;
            .form-title{
                width: 200px;
                line-height: 32px;
                display: inline-block;
                text-align: right;
                font-size: 14px;
                margin-left:10px;
                margin-right: 20px;
            }
            .form-label{
                font-size: 14px;
                flex:1;
                border:1px solid #cfcfcf;
                padding-left: 4px;
                border-radius: 4px;
            }
            .form-label:not(.artcle){
                line-height: 32px;
            }
            .artcle{
                padding:4px; 
            }
        }
    }
</style>
