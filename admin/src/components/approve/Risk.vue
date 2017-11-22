/**
* 风险分担审批流程
* Created by chenchen on 2017/9/8.
*/

<template>
    <div class="Award">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end">
            <Col :xs="2" :sm="4" :md="6" :lg="5">
            <Input v-model="keyWord" placeholder="输入关键字">
            <Button slot="append" icon="ios-search" @click="search"></Button>
            </Input>
            </Col>
            <Col :xs="20" :sm="16" :md="12" :lg="16">
            </Col>
            <Col :xs="2" :sm="4" :md="6" :lg="3">
            </Col>
        </Row>

        <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
        <Page :total="total" :current="current" :page-size="pageSize"
            show-total show-elevator show-sizer
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
        ></Page>

        <Modal
            class="award-modal"
            v-model="modalShow"
            :title="modalTitle"
            :loading="addLoading"
            :mask-closable="false"
            :styles="{top: '20px'}"
             width="900">

        </Modal>
    </div>
</template>

<script>
    import otherServer from 'rs/otherServer';
    import session from '@/config/session'
    export default {
        name: 'Award',
        data () {
            return {
                treeShow:false,
                treeData:[],
                keyWord:"",
                msg: 'hello',
                roleId :session.get('roleId'),
                tableHeard: [
                    {
                        title: '申请人',
                        render: (h, params) => {
                            let proposer = '';
                            if(params.row.realname != null){
                                proposer = params.row.realname;
                            }
                            else if(params.row.name != null){
                                proposer = params.row.name;
                            }
                            else if(params.row.phone != null){
                                proposer = params.row.phone;
                            }
                            return h('span', proposer);
                        }
                    },
                    {
                        title: '申请日期',
                        render: (h, params) => {
                            return h('span', params.row.datedoc);
                        }
                    },
                    {
                        title: '单据编号',
                        render: (h, params) => {
                            return h('span', params.row.documentno);
                        }
                    },
                    {
                        title: '相关政策',
                        render: (h, params) => {
                        return h('span', params.row.title);
                        }

                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                         return h('span',this.statusObj[params.row.docstatus]);
                        }

                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            let flagDR = (params.row.docstatus == "DR");
                            let status = Number(params.row.docstatus); 
                            let flagSH = ( status==1 || status%3 ==0 &&status !=27&&status !=24)
                                    &&(this.roleId =='200'||this.roleId =='220'||this.roleId =='230');
                            let flagFK =  ( status== 24)&&(this.roleId =='299');
                            let flagCK =  ( status== 27);
                            let flagBH = (status%3 == 2) ;

                            if(flagDR){
                                return h('div', [
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
                                                this. editCallBack(params.row.m_requisition_id);
                                            }
                                        }  
                                    },"修改"),
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
                                                this.subreviewCallBack(params.row.m_requisition_id)
                                            }
                                        }  
                                    },"提交审核"),
                                ])
                            }
                            else if(flagSH){
                                 return h('div', [
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
                                                this.checkCallBack(params.row.m_requisition_id);
                                            }
                                        }  
                                    },"审核")
                                 ])
                            }
                            else if(flagFK){
                                 return h('div', [
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
                                                this.giveMoneyCallBack(params.row.m_requisition_id);
                                            }
                                        }  
                                    },"放款")
                                 ])
                            }
                            else if(flagBH){
                                 return h('div', [
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
                                                this.modalType = 'edit';
                                                this.modalTitle = '编辑奖补申请';
                                                this.modalShow = true;
                                            }
                                        }  
                                    },"修改"),
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
                                                this.bhReviewCallBack(params.row.m_requisition_id)
                                            }
                                        }  
                                    },"重新提交")
                                 ])
                            }
                            else if(flagCK){
                                 return h('div', [
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
                                                this.viewCallBack(params.row.m_requisition_id);
                                            }
                                        }  
                                    },"查看")
                                 ])
                            }
                        }
                    }
                ],
                tableData: [],
                total: 0,
                current: 1,
                pageSize: 10,
                loading: false,
                addLoading:false,
                modalShow:false,
                modalTitle:'风险分担申请',
                modalType:'info',
                recordId:"",
                modalFormData:{},
                modalData:{},
                modalCheckHistory:[],
                modalTableData:[],
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
            modalDataTotalAmt(){
                let totalAmt = 0;
                for(let item of this.modalTableData){
                    totalAmt += Number(item.qty)*Number(item.priceactual);
                }
                return totalAmt;
            },
            modalTableLineAmt(item){
                return Number(item.qty)*Number(item.priceactual);
            }
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
            getTableData (){//获取列表
                let that = this;
            }
        }
    }
</script>

<style scoped lang='less'>
    .Award {

    }
    .award-modal{
        .modal-sub-title{
            font-size:14px;
            font-weight: 100;
            line-height: 20px;
            margin:10px 0 5px;
            .award-details{
                font-size:12px;
            }
        }
        .modal-sub-content{
            padding-left: 10px;
        }
        .history-list{
            line-height: 24px;
            padding: 4px;
        }
        .history-list:nth-child(2n){
            background-color: #f0f0f0;
        }
        .history-list:nth-child(2n-1){
            background-color: #dddee1;
        }
    }

</style>
