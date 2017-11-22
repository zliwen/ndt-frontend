/**
* 信用指标管理
* Created by chenchen on 2017/9/6.
*/

<template>
    <div class="Norm">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col :xs="22" :sm="20" :md="18" :lg="22">
            <label class="search-label">
                <span> 标题</span>
                <Input class="search-input"  v-model="keyWord.title" placeholder="标题关键字" style="width:240px;"></Input>
            </label>
            <label class="search-label">
                <span> 摘要</span>
                <Input class="search-input"  v-model="keyWord.summary" placeholder="摘要关键字" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 类型</span>
                <Input class="search-input"  v-model="keyWord.type" placeholder="类型" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 状态</span>
                <Input class="search-input"  v-model="keyWord.state" placeholder="状态" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 来源</span>
                <Input class="search-input"  v-model="keyWord.source" placeholder="来源" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 优先级</span>
                <Input class="search-input"  v-model="keyWord.importance" placeholder="优先级" style="width:240px;"></Input>
            </label>
            <a class="search-toggle" v-show="keyWord.toggle" @click="showMoreSearch">收起<Icon type="arrow-up-b"></Icon></a>
            <Button icon="search" type="info"  @click="search">搜索</Button>
            <a class="search-toggle" v-show="!keyWord.toggle" @click="showMoreSearch">更多搜索<Icon type="arrow-down-b"></Icon></a>
        </Col>
        <Col :xs="2" :sm="4" :md="6" :lg="2">
             <Button icon="plus-round" type="info" @click="newCallback">新建资讯</Button>
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
            <Form  v-show="modalType=='edit'||modalType=='new'" ref="formCustom" :model="modalData" :rules="ruleCustom" :label-width="220">
                <!-- <FormItem label="信息类型" prop="infotype">
                     <Select v-show="modalType=='edit'" v-model="modalData.informationtype">
                    <Option v-for="(key,value) in infoTypeMap" :value='value' :key="value">{{key}}</Option>
                    </Select>
                </FormItem> -->
                <FormItem label="标题" prop="title">
                    <Input v-model="modalData.title" placeholder="文章标题"></Input>
                </FormItem>
                <FormItem label="摘要" prop="summary">
                    <Input v-model="modalData.summary" placeholder="文章摘要，如未填写则自动截取文章前50字"></Input>
                </FormItem>
                <FormItem label="标签" prop="tag">
                    <Input v-model="modalData.tag" placeholder="每个标签二到五个字，用空格隔开"></Input>
                </FormItem>
                <FormItem label="区域" prop="eara">
                     <Select v-model="modalData.divisions">
                        <Option value="1">市</Option>
                        <Option value="2">区县</Option>
                        <Option value="3">乡镇</Option>
                        <Option value="4">村</Option>
                    </Select>
                </FormItem>
                <FormItem label="优先级" prop="importance">
                    <Input  v-model="modalData.importance" placeholder="填写数字，最高100，最低0"></Input>
                </FormItem>
                <FormItem label="封面" prop="img">
                    <Upload  :on-success="imgSuccess"  action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>
                <FormItem label="正文" prop="artcle">
                    <div class="form-label UE">
                        <UE defaultMsg=""  :config="ueConfig" ref="ue"></UE>
                    </div>
                </FormItem>
            </Form>
            <div v-show="modalType=='view'||modalType=='check'">
                <div class="form-inline">
                    <label class="form-title">信息类型</label>
                    <label  class="form-label">{{infoTypeMap[modalData.informationtype]}}</label>
                </div>
                <div class="form-inline">
                    <label class="form-title">标题</label>
                    <label class="form-label">{{modalData.title}}</label>
                       
                </div>
                <div class="form-inline">
                    <label class="form-title">行业</label>
                    <label  v-show="modalType!='edit'" class="form-label">{{modalData.industry_names}}</label>
                </div>
                <div  class="form-inline">
                    <label class="form-title">摘要</label>
                    <label  v-show="modalType!='edit'" class="form-label">{{modalData.title}}</label>
                    </div>
                <div  class="form-inline">
                    <label class="form-title">发布单位</label>
                    <label  v-show="modalType!='edit'" class="form-label">{{modalData.name}}</label>
                </div>
                <div  class="form-inline"> 
                    <label class="form-title">发布时间</label>
                    <label  v-show="modalType!='edit'" class="form-label">{{modalData.issue_time}}</label>
                </div>
                <div  class="form-inline">
                    <label class="form-title">内容</label>
                    <div v-show="modalType != 'edit'"  class="form-label artcle"  v-html="modalData.content"></div>
                 </div>
                <div  class="form-inline">
                    <label class="form-title">状态</label>
                    <label  v-show="modalType!='edit'" class="form-label">{{policyStatusMap[modalData.docstatus]}}</label>
                </div>
            </div>
        
        </Modal>
    </div>
</template>

<script>
    import UE from '../ue/ue.vue';
    import newsServer from 'rs/infoServer';
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        components:{UE},
        name: 'News',
        data () {
            return {
                uploadImg:null,
                ruleCustom: {
                    // infotype: [
                    //     {required: true, message: '请选择资讯类型', trigger: 'blur'}
                    // ],
                    title:[
                        { required: true, message: '填写资讯标题', trigger: 'blur' }
                    ],
                    summary:[],
                    tag:[],
                    img:[],
                    eara:[
                        { required: true, message: '填写资讯标题', trigger: 'blur' }
                    ],
                    importance:[
                        { required: true, message: '资讯重要级', trigger: 'blur' },
                        {pattern:/^[1-9]|[1-9]\d|100$/,message:'请填写1到100数字',trigger:'blur'}
                    ],
                    artcle:[
                         { required: true, message:""}
                    ]
                },
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
                    title:"",
                    summary:"",
                    state:"",
                    type:"",
                    source:"",
                    importance:""
                },
                modalShow:false,
                policyStatusMap:{
                    'DR':"待提交",
                    '01':"已提交",
                    '02':"复核驳回",
                    '03':"已复核",
                    '04':"流程终止",
                    '05':"发布驳回",
                    '06':"已发布",
                },
                infoTypeMap:{
                    "ZC":"农业政策",
                    "ZZ":"种植指导",
                    "NDT":"农贷通政策",
                    "CW":"村务信息",
                    "NY":"农业信息",
                    "SNZ":"区县涉农政策",
                    "QX":"区县动态",
                    "VAINFO":"村务信息",
                    "VANOTICEZC":"村务通知",
                    "DT":"信息动态",
                    "MS":"特色美食",
                    "JD":"特色景点",
                },
                tableHead: [
                    {
                        title: 'id',
                        render: (h, params) => {
                            return h('span',params.row.id);
                        }
                    },
                    {
                        title: '标题',
                        render: (h, params) => {
                            return h('span',params.row.title);
                        }
                    },
                    {
                        title: '更新时间',
                        render: (h, params) => {
                            return h('span',params.row.updateAt);
                        }
                    },
                    {
                        title: '更新者',
                        render: (h, params) => {
                            return h('span',params.row.updateBy);
                        }

                    },
                    {
                        title: '地区',
                        render: (h, params) => {
                            return h('span',params.row.divisions);
                        }
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            return h('span',params.row.state);
                        }
                    },
                    {
                        title: '发布机构',
                        render: (h, params) => {
                            return h('span',params.row.publishOrgId);
                        }
                    },
                    {
                        title: '优先级',
                        render: (h, params) => {
                            return h('span',params.row.importance);
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
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.viewCallback(params.row);
                                            }
                                        }  
                                    },"查看"),
                                    h('Button',{
                                        style: {
                                            'margin-right': '10px'
                                        },
                                        props: {
                                            type: 'info',
                                            size: 'small'
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
                                            type: 'info',
                                            size: 'small'
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
                this.$refs.ue.setUEContent(row.content)
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
                this.$refs.ue.setUEContent("")
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
            .UE{
                padding: 0;
            }
        }
    }
</style>
