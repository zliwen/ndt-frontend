/**
* 奖补申请审核
* Created by chenchen on 2017/9/8.
**/

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
            @on-ok="modalSubmit"
            @on-cancel="modalCancle" width="900">
            <Row class="modal-sub-title">
                <Col :xs="6" :sm="6" :md="3" :lg="2" >
                    <span>申请人员</span>
                </Col>
                <Col :xs="18" :sm="18" :md="21" :lg="22" >
                    <p class="award-details">{{modalData.realname}}</p>    
                </Col>
            </Row> 
            <Row class="modal-sub-title">
                <Col :xs="6" :sm="6" :md="3" :lg="2" >
                    <span>申请理由</span>
                </Col>
                <Col :xs="18" :sm="18" :md="21" :lg="22" >
                    <p class="award-details">{{modalData.title}}</p>    
                </Col>
            </Row> 
            <Row class="modal-sub-title">
                <Col :xs="6" :sm="6" :md="3" :lg="2" >
                    <span>总计金额</span>
                </Col>
                <Col :xs="18" :sm="18" :md="21" :lg="22" >
                    <p class="award-details">{{modalDataTotalAmt}}</p>    
                </Col>
            </Row> 
            <div>
                <h5 class="modal-sub-title">机具详情</h5>
                <Button v-if="modalType=='edit'" type="primary" icon="plus-round" @click="addsubAppFun">添加机具</Button>  
            </div>
            <div class="modal-sub-content">
                <Table v-show="modalType!='edit'" border :columns="modalTableHeard" :data="modalTableData"></Table>
                <div v-show="modalType=='edit'" class="ivu-table-wrapper">
                    <div class="ivu-table ivu-table-border">
                        <div class="ivu-table-header">
                            <table cellspacing="0" cellpadding="0" border="0"  style="width:857px;">
                                <colgroup>
                                <col width="142">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th class=""><div class="ivu-table-cell"><span>类型</span></div></th>
                                        <th class=""><div class="ivu-table-cell"><span>说明</span></div></th>
                                        <th class=""><div class="ivu-table-cell"><span>单价（元）</span></div></th>
                                        <th class=""><div class="ivu-table-cell"><span>数量</span></div></th>
                                        <th class=""><div class="ivu-table-cell"><span>金额（元）</span></div></th>
                                        <th class=""><div class="ivu-table-cell"><span>操作</span></div></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="ivu-table-body">
                            <table cellspacing="0" cellpadding="0" border="0" style="width:857px;">
                                <colgroup>
                                <col width="142">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                <col width="143">
                                </colgroup>
                                <tbody class="ivu-table-tbody">
                                    <tr class="ivu-table-row" v-for="(item,index) in modalTableData" :key="index">
                                        <td class=""><div class="ivu-table-cell"> <span>{{item.categoryname}}</span></div></td>
                                        <td class=""><div class="ivu-table-cell">
                                            <Input v-model="item.description"></Input>
                                            </div></td>
                                        <td class=""><div class="ivu-table-cell">
                                            <InputNumber  :min='0' v-model="item.priceactual"></InputNumber>
                                        </div></td>
                                        <td class=""><div class="ivu-table-cell">
                                            <InputNumber  :min='0' v-model="item.qty"></InputNumber>
                                        </div></td>
                                        <td class=""><div class="ivu-table-cell">{{item.qty*item.priceactual}}</div></td>
                                        <td class="">
                                            <div class="ivu-table-cell">
                                                <button type="button" @click="modelLineDelete(index)" class="ivu-btn ivu-btn-error ivu-btn-small"><span>删除</span></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
               
            </div>
            <div>
                <h5 class="modal-sub-title">审核历史</h5>
                <ul class="modal-sub-content">
                    <li class="history-list" v-if="modalCheckHistory.length ==0">暂无审核历史!</li>
                    <li class="history-list" v-for="(item,index) in modalCheckHistory" :key="index">
                        <Row>
                            <Col :xs="24" :sm="18" :md="8" :lg="8">
                                <span>结果:</span>
                                <span>{{item.reviewStatus}}</span>
                            </Col>
                            <Col :xs="24" :sm="18" :md="8" :lg="8">
                                <span>时间:</span>
                                <span>{{item.reviewTime}}</span>
                            </Col>
                            <Col :xs="24" :sm="18" :md="8" :lg="8">
                                <span>意见:</span>
                                <span>{{item.reviewOpinion}}</span>
                            </Col>
                        </Row>
                    </li>
                </ul>              
            </div>
            <div v-if="modalType=='check'">
                <h5 class="modal-sub-title">审核结果</h5>
                <Row class="modal-sub-content">
                    <Col style="margin-top:10px;" :xs="24" :sm="18" :md="12" :lg="8">
                        <label>结果</label>
                        <Select v-model="modalFormData.reviewStatus" style="width: 240px">
                             <Option v-for="(item,key) in modalCheckResults" :value="item.value" :key="key">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col  style="margin-top:10px;"  :xs="24" :sm="18" :md="12" :lg="8">
                        <label>时间</label>
                         <DatePicker  v-model="modalFormData.reviewTime" type="date" placeholder="选择日期" style="width: 240px"></DatePicker>
                    </Col>
                    <Col  style="margin-top:10px;"  :xs="24" :sm="18" :md="12" :lg="8">
                        <label>意见</label>
                        <Input  v-model="modalFormData.reviewOpinion" placeholder="请输入..." style="width: 240px"></Input>
                    </Col>
                </Row>  
            </div>
        </Modal>
        
        <Modal
            v-model="treeShow"
            title="选择机具"
            :mask-closable="false"
            :styles="{top: '20px'}"
            @on-ok="treeSubmit"
            @on-cancel="treeCancle" width="500">
            <Tree ref="tree" style="margin-left:30px" :data="treeData" :multiple = "false"></Tree>
        </Modal>

    </div>
</template>

<script>
    // import award from 'rs/awardServer';
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
                statusObj:{
                    "DR":"待提交",
                    "01":"已提交",
                    "1":"已提交",
                    "02":"农机中心驳回",
                    "2":"农机中心驳回",
                    "03":"已受理",
                    "3":"已受理",
                    "04":"审核结束",
                    "4":"审核结束",
                    "05":"镇农机站驳回",
                    "5":"镇农机站驳回",
                    "06":"镇农发站已核对",
                    "0":"镇农发站已核对",
                    "07":"审核结束",
                    "0":"审核结束",
                    "08":"镇财政所驳回",
                    "8":"镇财政所驳回",
                    "09":"镇财政所已核对",
                    "9":"镇财政所已核对",
                    "10":"审核结束",
                    "11":"县农发局驳回",
                    "12":"县农发局已核对",
                    "13":"审核结束",
                    "14":"县财政局驳回",
                    "15":"县财政局已核对",
                    "16":"审核结束",
                    "17":"县纪检驳回",
                    "18":"县纪检已核对",
                    "19":"审核结束",
                    "20":"县农发局复审驳回",
                    "21":"县农发局已复审",
                    "22":"审核结束",
                    "23":"县财政局复审驳回",
                    "24":"县财政局已复审",
                    "25":"审核结束",
                    "27":"已放款"
                },
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
                modalTitle:'奖补申请',
                modalType:'info',
                recordId:"",
                modalFormData:{},
                modalData:{},
                modalCheckHistory:[],
                modalTableData:[],
                modalCheckResults:{
                    tgvalue:{
                        label:"通过",
                        value:3
                    },
                    bhvalue:{
                        label:"驳回",
                        value:2
                    },
                    jsvalue:{
                        label:"结束",
                        value:4
                    },
                },
                modalTableHeard:[
                      {
                        title: '类型',
                        render: (h, params) => {
                            return h('span', params.row.categoryname);
                        }
                    },
                    {
                        title: '说明',
                        render: (h, params) => {
                            return h('span', params.row.description);
                        }
                    },
                    {
                        title: '单价（元）',
                        render: (h, params) => {
                            return h('span', params.row.priceactual);
                        }
                    },
                    {
                        title: '数量',
                        render: (h, params) => {
                            return h('span', params.row.qty);
                        }
                    },
                    {
                        title: '金额（元）',
                        render: (h, params) => {
                            return h('span',params.row.qty* params.row.priceactual);
                        }
                    }
                ]
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
                // that.loading = true;
                // this.$router.push('award?current=' + this.current + "&pageSize=" + this.pageSize + "&keyWord=" + this.keyWord);

                // award.getList({}, {
                //     pageIndex: this.current,
                //     pageSize: this.pageSize,
                //     userId:session.get("ad_user_id"),
                //     ad_org_id:session.get("ad_org_id"),
                //     search: this.keyWord
                // }, function (response) {
                //     that.tableData = response.data.requisitions;
                //     that.total = response.data.count;
                //     that.loading = false;
                // }, function (err) {
                //     that.loading = false;
                // })
            },
            giveMoneyCallBack(m_requisition_id){//放款回调
                function getToday(){
                    let date = new Date();
                    let year = date.getFullYear();
                    let month =  date.getMonth()+1;
                    let day =  date.getDate();
                    let time = year+'-'+month+'-'+day;
                    return time;
                }
                award.allowanceFinishProcess({}, {
                    recordId:row.m_requisition_id,
                    reviewStatus:'27',
                    reviewOpinion:'已放款',
                    reviewTime:getToday(),
                    userId:session.get("ad_user_id"),
                    ad_org_id:session.get("ad_org_id"),
                    search: this.keyWord
                }, function (response) {
                    that.$Message.success('放款成功！');
                    that.getTableData();
                }, function (err) {
                    that.$Message.error('放款失败！');
                })
            },
            subreviewCallBack(m_requisition_id){//首次提交回调
                award.startAllowanceReviewProcess({}, {
                    recordId:m_requisition_id,
                    userId:session.get("ad_user_id"),
                    orgId:session.get("ad_org_id")
                }, function (response) {
                    if(response.msg =="success"){
                        that.$Message.success('提交成功！');
                        that.getTableData();
                    }
                    else{
                        that.$Message.error('提交失败！');   
                        that.loading = false;                     
                    }
                }, function (err) {
                    that.$Message.error('网络异常');
                })
            },
            bhReviewCallBack(m_requisition_id){//驳回提交回调
                award.allowanceRejectSubmit({}, {
                    recordId:m_requisition_id,
                    userId:session.get("ad_user_id"),
                    orgId:session.get("ad_org_id")
                }, function (response) {
                    if(response.msg =="success"){
                        that.$Message.success('提交成功！');
                        that.getTableData();
                    }
                    else{
                        that.$Message.error('提交失败！');   
                    }
                }, function (err) {
                    that.$Message.error('网络异常');
                })
            },
            viewCallBack(m_requisition_id){//查看回调
                this.modalTitle ="查看奖补申请",
                this.modalType= 'info',
                this.modalData = {};
                this.modalFormData = {};
                this.getOneLineDetail(m_requisition_id);
                this.modalShow = true;
            },
            checkCallBack(m_requisition_id){//审核回调
                this.modalTitle ="审核奖补申请",
                this.modalType= 'check',
                this.modalData = {};
                this.modalFormData = {};
                this.getOneLineDetail(m_requisition_id);
                this.recordId = m_requisition_id;
                this.modalShow = true;
            },
            editCallBack(m_requisition_id){//编辑回调
                this.modalTitle ="编辑奖补申请",
                this.modalType= 'edit',
                this.modalData = {};
                this.modalFormData = {};
                this.getTreeNodes();
                this.getOneLineDetail(m_requisition_id);
                this.recordId = m_requisition_id;                
                this.modalShow = true;
            },
            getOneLineDetail(m_requisition_id){//获取条目面板信息
                let that = this;
                award.findOne({}, {
                    recordId:m_requisition_id,
                    ad_user_id:session.get('ad_user_id')
                }, function (response) {
                    let user = response.data.user;
                    that.modalTableData = [];
                    if(response.msg =="success"){
                         if(user.length > 0){
                            that.modalData = user[0];
                            for (let item of user){
                                //改用computed实现每行的金额以及总金额的计算
                                // item.linenetamt = Number(item.qty)*Number(item.priceactual);
                                // that.modalData.totalAmt += item.linenetamt;
                                that.modalTableData.push(item);
                            }
                         }
                         that.historyRecord(m_requisition_id);
                     }else{
                        that.$Message.error("获取条目信息失败！");
                        that.modalShow = false;
                     }
                }, function (err) {
                    that.$Message.error("网络异常");
                    that.modalShow = false;
                })
            },
            historyRecord(m_requisition_id){//弹窗内 获取条目历史审核记录
                let that = this;
                award.findHistoryComment({}, {
                    recordId:m_requisition_id
                }, function (response) {
                    if(response.msg =="success"){
                        that.modalCheckHistory.length = 0;
                        let data = response.data;
                        if(data!=null&&data.length>0){
                            let status = data[0].message.split(',')[1];
                            let tempSet0 = new Set();
                            for(let n of data){
                                tempSet0.add(n.message);
                            }
                            for(let n of tempSet0){
                                let tempArr2 = n.split(",");
                                that.modalCheckHistory.push({
                                    reviewStatus:that.statusObj[tempArr2[1]],
                                    reviewTime:tempArr2[0],
                                    reviewOpinion:tempArr2[2]
                                })
                            }
                            console.log(that.modalCheckHistory);
                            if(status==24){
                                that.modalCheckResults.tgvalue.value = 27;
                                that.modalCheckResults.bhvalue.value = 26;
                                that.modalCheckResults.jsvalue.value = 28;
                            }else if(status==21){
                                that.modalCheckResults.tgvalue.value = 24;
                                that.modalCheckResults.bhvalue.value = 23;
                                that.modalCheckResults.jsvalue.value = 25;
                            }else if(status==18){
                                that.modalCheckResults.tgvalue.value = 21;
                                that.modalCheckResults.bhvalue.value = 20;
                                that.modalCheckResults.jsvalue.value = 22;
                            }else if(status==15){
                                that.modalCheckResults.tgvalue.value = 18;
                                that.modalCheckResults.bhvalue.value = 17;
                                that.modalCheckResults.jsvalue.value = 19;
                            }else if(status==12){
                                that.modalCheckResults.tgvalue.value = 15;
                                that.modalCheckResults.bhvalue.value = 14;
                                that.modalCheckResults.jsvalue.value = 16;
                            }else if(status==9){
                                that.modalCheckResults.tgvalue.value = 12;
                                that.modalCheckResults.bhvalue.value = 11;
                                that.modalCheckResults.jsvalue.value = 13;
                            }else if(status==6){
                                that.modalCheckResults.tgvalue.value = 9;
                                that.modalCheckResults.bhvalue.value = 8;
                                that.modalCheckResults.jsvalue.value = 10;
                            }else if(status==3){
                                that.modalCheckResults.tgvalue.value = 6;
                                that.modalCheckResults.bhvalue.value = 5;
                                that.modalCheckResults.jsvalue.value = 7;
                            }else if(Number(status)%3==2){
                                that.modalCheckResults.tgvalue.value = 3;
                                that.modalCheckResults.bhvalue.value = 2;
                                that.modalCheckResults.jsvalue.value = 4;
                            };
                        }else{
                            that.modalCheckResults.tgvalue.value = 3;
                            that.modalCheckResults.bhvalue.value = 2;
                            that.modalCheckResults.jsvalue.value = 4;
                        }
                       // that.modalFormData.revTime = setToday(); //把日期初始化到今天，日期控件应该有这个初始化功能 
                    }
                    else{
                        that.$Message.error("获取历史审核信息失败！");
                        that.modalShow = false;
                    }
                }, function (err) {
                    that.$Message.error("网络异常");
                    that.modalShow = false;
                })
            },
            reviewFlow(data){ //弹窗内 审核请求函数
                let that = this;
                award.againAllowanceReview({},data, function (response) {
                    if(response.msg =="success"){
                        that.$Message.success("审核提交成功");
                     }else{
                        that.$Message.error("审核提交失败");
                     }
                }, function (err) {
                    that.$Message.error("网络异常");
                })
            },
            getTreeNodes(){//弹窗内 机具树的数据获取
                let that = this;
                award.getTreeNodes({},{
                    'treeId':111,
		            'parentId':111
                }, function (response) {
                    if(response.msg =="success"){
                        let data= response.data;
                        if(data!=null&&data.length>0){
                            that.treeData=[{
                                expand:true,
                                title:data[0].treeName,
                                disabled:true,
                                children:[]
                            }]
                            for(let item of data){
                                that.treeData[0]['children'].push({
                                    title:item.treeNodeName,
                                    nodeId:item.nodeId
                                })
                            }
                        }
                        else{
                            that.$Message.warning("未请求到机具相关数据！");
                        }
                     }else{
                         that.$Message.warning("未请求到机具相关数据！");
                     }
                }, function (err) {
                    that.$Message.error("网络异常！");
                })
            },
            modelLineDelete(index){//弹窗内 机具删除
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>确定要删除本条内容吗？</p>',
                    onOk: () => {
                        this.modalTableData.splice(index,1);
                    },
                    onCancel: () => { }
                });
                
            },
            addsubAppFun(){//弹窗内 机具添加
                this.treeShow = true;
            },
            treeSubmit(){
                var chooseData = this.$refs.tree.getSelectedNodes()[0];
                this.modalTableData.push({
                    categoryname:chooseData.title,
                    m_product_category_id:chooseData.nodeId,
                    description:"",
                    priceactual:0,
                    qty:0
                })
            },
            treeCancle(){},//选择机具弹窗的取消
            modalSubmit(){//弹窗确认
                if(this.modalType == "edit"){
                    console.log(this.modalTableData,this.modalData);
                    for(item of this.modalTableData){
                        item.ad_org_id = item.ad_org_id?item.ad_org_id:session.get("ad_org_id");
                        item.m_requisition_id =item.m_requisition_id?item.m_requisition_id:this.m_requisition_id;
                    }
                    let tempData = Object.assign({},this.modalData);
                    tempData.m_requisition_id = this.m_requisition_id;
                    tempData.ad_org_id = session.get("ad_org_id");
                    tempData.requisitionline =  Object.assign({},this.modalTableData);

                    let that = this;
                    award.addOrUpdate({},{
                        data:JSON.stringify(tempData)
                    }, function (response) {
                        if(response.msg =="success"){
                            that.$Message.success("保存成功");
                        }else{
                            that.$Message.error("保存失败");
                        }
                    }, function (err) {
                        that.$Message.error("网络异常，保存失败");
                    })
                }
                else if(this.modalType == "check"){
                    let data = {
                        userId: session.get('ad_user_id'),
                        orgId: session.get('ad_org_id'),
                        reviewTime:dayToString(this.modalFormData.reviewTime),
                        reviewStatus: this.modalFormData.reviewStatus ,
                        reviewOpinion: this.modalFormData.reviewOption,
                        recordId: this.recordId
                    }
                    this.reviewFlow(data)
                }else{
                    consle.log(11);
                }
                function dayToString(date){
                    let year = date.getFullYear();
                    let month =  date.getMonth()+1;
                    let day =  date.getDate();
                    let time = year+'-'+month+'-'+day;
                    return time;
                }
            },
            modalCancle(){//弹窗取消
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
