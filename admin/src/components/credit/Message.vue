/**
* 采集信息管理
* Created by chenchen on 2017/9/6.
*/

<template>
    <div class="Message">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col :xs="24" :sm="18" :md="16" :lg="20">
            <label class="search-label">
                <span> 主体</span>
                <Input class="search-input"  v-model="keyWord.title" placeholder="主体关键字" style="width:240px;"></Input>
            </label>
            <label class="search-label">
                <span> 主体类型</span>
                <Input class="search-input"  v-model="keyWord.summary" placeholder="主体类型" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 区域</span>
                <Input class="search-input"  v-model="keyWord.type" placeholder="所在区域" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 采集者</span>
                <Input class="search-input"  v-model="keyWord.state" placeholder="采集者" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> 采集机构</span>
                <Input class="search-input"  v-model="keyWord.source" placeholder="采集机构" style="width:240px;"></Input>
            </label>
            <label v-show="keyWord.toggle" class="search-label">
                <span> id</span>
                <Input class="search-input"  v-model="keyWord.importance" placeholder="id" style="width:240px;"></Input>
            </label>
            <a class="search-toggle" v-show="keyWord.toggle" @click="showMoreSearch">收起<Icon type="arrow-up-b"></Icon></a>
            <Button icon="search" type="info"  @click="search">搜索</Button>
            <a class="search-toggle" v-show="!keyWord.toggle" @click="showMoreSearch">更多搜索<Icon type="arrow-down-b"></Icon></a>
        </Col>
        <Col :xs="24" :sm="6" :md="8" :lg="4">
             <Button style="margin-bottom:5px; margin-right:5px;" icon="plus-round" type="info" @click="newCallback">个人信息采集</Button>
             <Button style="margin-bottom:5px; margin-right:5px;" icon="plus-round" type="info" @click="newCallback">企业信息采集</Button>
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
                <FormItem label="名称" prop="title">
                    <Input v-model="modalData.title" placeholder="单位名称或个人姓名"></Input>
                </FormItem>
                <FormItem label="所属区域" prop="summary">
                    <Input v-model="modalData.summary" placeholder="所属区域"></Input>
                </FormItem>
                <FormItem label="信用号码" prop="tag">
                    <Input v-model="modalData.tag" placeholder="个人身份证号"></Input>
                    <Input v-model="modalData.tag" placeholder="企业组织机构代码"></Input>
                </FormItem>
                <FormItem label="区域" prop="eara">
                     <Select v-model="modalData.divisions">
                        <Option value="1">市</Option>
                        <Option value="2">区县</Option>
                        <Option value="3">乡镇</Option>
                        <Option value="4">村</Option>
                    </Select>
                </FormItem>
            </Form>
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
                        title: '主体名称',
                        render: (h, params) => {
                            return h('span',params.row.title);
                        }
                    },
                    {
                        title: '主题类型',
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
                        title: '采集者',
                        render: (h, params) => {
                            return h('span',params.row.divisions);
                        }
                    },
                    {
                        title: '采集机构',
                        render: (h, params) => {
                            return h('span',params.row.state);
                        }
                    },
                    {
                        title: '采集时间',
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
                tableData:[],
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
            },
            modalSubmit(){//模态提交
                if(this.modalType == "edit"){

                }else if(this.modalType == "new"){

                }
            },
            modalCancle(){//模态取消
            },
            viewCallback(row){//查看回调
            },
            editCallback(row){//编辑回调
                this.modalType = "edit";
                this.modalData = Object.assign({},row);
                this.modalShow = true;
            },
            newCallback(){//新增回调
                this.modalType = "new";
                this.modalData = {};
                this.modalShow = true;
            },
            deleteCallback(row){//删除回调
                this.$Modal.confirm({
                    title: '确认删除本条资讯',
                    content: '<p>资讯删除后不能恢复</p>',
                    onOk: () => {
                    },
                    onCancel: () => {
                    }
                })
            },
            getOneNewsDetail(id,callback){//获取单条资讯详情.。列表就是详情的集合，单独请求详情有什么用？
            }
            
        }
    }
</script>

<style scoped lang='less'>
    .Message {
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
</style>
