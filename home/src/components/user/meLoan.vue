<template>
    <div class="meLoan">
        <h2 class="sub-title">贷款记录</h2>
        <div class="switch-box">
            <i-switch size="small" @on-change="hideSwitchChange"></i-switch>
            <span>隐藏已完成任务</span>
        </div>
        <ul class="tabs">
            <li v-for="(item,index) in tabs"
                :class="{'cur':item.cur}"
                :key="index"
                @click="tabChange(index)">{{item.name}}</li>
        </ul>
        <ul class="loan-history">
            <li v-for="(item,index) in listData"
                v-if="item.period != 3804 ||showOver"
                :key="index">
                <Row>
                    <Col span="3">
                        <img :src="item.orgSquareLogo">
                    </Col>
                    <Col span="3">
                        <h3>{{item.productName}}</h3>
                    </Col>
                    <Col span="4">
                        <p class="td-value">{{item.applyAmount+item.applyAmountUnitValue}}</p>
                        <p class="td-title">贷款金额</p>
                    </Col>
                    <Col span="3">
                        <p class="td-value">{{item.applyTerm+item.applyTermUnitValue}}</p>
                        <p class="td-title">贷款期限</p>
                    </Col>
                    <Col span="4">
                        <p class="td-value">{{item.createAt|date('yyyy-MM-dd')}}</p>
                        <p class="td-title">申请时间</p>
                    </Col>
                    <Col span="3">
                        <span class="status">{{item.periodValue}}</span>
                    </Col>
                    <Col span="4">
                        <a class="btn" @click="showDetail(item)">查看详情</a>
                    </Col>
                </Row>
            </li>
        </ul>
        <Page :total="total" :current="current" :page-size="pageSize"
                style="margin:30px;text-align:center"
                show-total show-elevator show-sizer
                v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
        ></Page>
        <div style="height:100px;"></div>

        <Modal
            class="detail-modal"
            v-model="modelShow"
            :mask-closable="false"
            width="800">
            <Icon type="ios-close-empty" size="134" slot="close"></Icon>
            <div>
                <div class="modal-head">
                    <div class="logo">
                        <img :src="detail.orgSquareLogo" alt="">
                    </div>
                    <div class="main-msg">
                        <h3 class="overflow" :title="detail.name">{{detail.productName}}</h3>
                        <p class="orgname overflow">{{detail.orgName}}</p>
                        <div>
                            <span class="label" v-for="o in detail.labels" :key="o">{{o|codeName}}</span>
                        </div>
                    </div>
                    <div>
                        <p class="id">流水号：{{detail.id}}</p>
                        <p class="gray">目前状态：</p>
                        <p class="largex">{{detail.stateValue}}</p>
                        <!-- <a class="sure-btn" @click="cancleApply">取消申请</a> -->
                    </div>
                </div>
                <Row  class="product-lines">
                    <Col span="11">
                        <div>
                            <span>贷款主体：</span>
                            <span class="right">
                                {{detail.name}}
                            </span>
                        </div>
                        <div>
                            <span>申请区域：</span>
                            <span class="right">
                                {{detail.adminDivisionIdValue}}
                            </span>
                        </div>
                        <div>
                            <span>贷款方式：</span>
                            <span class="right">
                                <span v-for="(o,i) in detail.guaranteeTypeName" :key="i">{{o}}<i v-if="i!==detail.guaranteeTypeName.length-1">,</i></span>
                            </span>
                        </div>
                    </Col>
                    <Col span="7">
                        <div>
                            <span>申请时间：</span>
                            <span class="right">
                                {{detail.createAt|date('yyyy-MM-dd')}}
                            </span>
                        </div>
                        <div>
                            <span>申请金额：</span>
                            <span class="right">
                                {{detail.applyAmount+detail.applyAmountUnitValue}}
                            </span>
                        </div>
                        <div>
                            <span>贷款期限：</span>
                            <span class="right">
                                {{detail.applyTerm+detail.applyTermUnitValue}}
                            </span>
                        </div>
                    </Col>
                    <Col span="6">
                        <div>
                            <span>贷款用途：</span>
                            <span class="right">
                                {{detail.applyPurposeName}}
                            </span>
                        </div>
                        <div>
                            <span>联系人：</span>
                            <span class="right">{{detail.name}}</span>
                        </div>
                        <div>
                            <span>联系方式：</span>
                            <span class="right">{{detail.phoneNo}}</span>
                        </div>
                    </Col>
                </Row>
                <div class="product-text">
                    <Row class="state-list" style="padding-left: 47px">
                        <Col v-for="(item,index) in stepList"
                            :key="index" :span="3"
                            :class="{'cur':item.current,'last'
                            :index==stepList.length-1}" class="list-item-box">
                            <div class="list-item" >
                                <i :class="item.class" class="list-icon"></i>
                                <p class="node-name">{{item.nodeName}}</p>
                            </div>
                        </Col>
                    </Row>
                    <ul>
                        <li v-for="(item,index) in stepListArray" :key="index">
                            <i :class="{'first':index==0,'last':index==stepList.length-1}"></i>
                            <span>{{item.syncTime|date}}</span>
                            <span style="margin-left:10px">【{{item.stateValue}}】</span>
                            <span style="margin-left:10px">{{item.msg}}</span>
                            <span style="margin-left:10px">更新人：{{item.orgName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import personServer from 'rs/person'
    export default {
        name: 'meLoan',
        data () {
            return {
                // 弹窗的事情
                modelShow:false,
                detail:{},
                current:1,
                pageSize:10,
                total:0,
                showOver:true,
                stepList: [
                    {
                        current:true,
                        class:["tj"],
                        nodeName: "提交申请",
                        status: "finish",//可选值为wait、process、finish、error
                        msg: "",
                        nodeCode: 1,
                        btnK2: 1,
                        icon: ""
                    },
                    {
                        class:["sl"],
                        nodeName: "受理",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 2,
                        btn1: "受理驳回",
                        btnK1: 2,
                        btn2: "已受理",
                        btnK2: 3,
                        btn3: "拒绝受理",
                        btnK3: 4
                    },
                    {
                        class:["dd"],
                        nodeName: "贷前尽职调查",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 3,
                        btn1: "调查驳回",
                        btnK1: 5,
                        btn2: "已调查",
                        btnK2: 6,
                        btn3: "拒绝调查",
                        btnK3: 7,
                    },
                    {
                        class:["cs"],
                        nodeName: "银行初审",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 3,
                        btn1: "初审驳回",
                        btnK1: 8,
                        btn2: "已初审",
                        btnK2: 9,
                        btn3: "拒绝初审",
                        btnK3: 10,
                    },
                    {
                        class:["fs"],
                        nodeName: "银行复审",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 4,
                        btn1: "复审驳回",
                        btnK1: 11,
                        btn2: "已复审",
                        btnK2: 12,
                    },
                    {
                        class:["hq"],
                        nodeName: "合同签订",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 5,
                        btn3: "签订合同失败",
                        btnK3: 14,
                        btn2: "已签订合同",
                        btnK2: 13,

                    },
                    {
                        class:["fk"],
                        nodeName: "放款",
                        status: null,
                        msg: "",
                        icon: "",
                        nodeCode: 6,
                        btn2: "已放款",
                        btnK2: 15,
                    }
                ],
                stepListArray:[],
                tabs:[
                    {
                        name:"银行",
                        cur:true,
                        productTypeId:3301
                    },
                    /*{
                        name:"保险",
                        cur:false,
                        productTypeId:3302
                    },
                    {
                        name:"担保",
                        cur:false,
                        productTypeId:3303
                    }*/
                ],
                searchData:{
                    productTypeId:3301
                },
                listData:[],
            }
        },
        created(){
            this.getTableData();
        },
        methods:{
            pageChange (current){
                this.current = current;
                this.getTableData();
            },
            pageSizeChange (pageSize){
                this.current = 1;
                this.pageSize = pageSize;
                this.getTableData();
            },
            search(){//搜索
                this.current = 1;
                this.getTableData();
            },
            hideSwitchChange(value){
                this.showOver = !value;
            },
            tabChange(i){
                for(let o of this.tabs){
                    o.cur = false;
                }
                this.tabs[i].cur = true;
                this.searchData.productTypeId = this.tabs[i].productTypeId;
                this.getTableData();
            },
            getTableData (){//请求
                personServer.myLoanHistory({
                    params:{
                        params3:this.current,
                        params4:this.pageSize
                        },
                    data: this.searchData,
                    },({data:{pageData,totalCount},errorCode})=>{
                        if(errorCode==0){
                            console.log(JSON.parse(JSON.stringify(this.detail)) );
                            this.total = totalCount;
                            this.listData = pageData;
                        }

                });
            },
            getState(invitationId){
                personServer.stateValueList({
                        params:{
                            params3: 1,
                            params4: 10
                        },
                        data:{
                            invitationId
                        }
                    }, response => {
                        if (response.data && response.data && response.data.pageData.length) {
                            this.stepListArray =JSON.parse(JSON.stringify(response.data.pageData)) ;
                            response.data.pageData.reverse().forEach((item, index) => {
                            this.stepList.forEach(obj => {
                                if (item.state && item.state == obj.btnK2) {
                                    obj.current = true;
                                    obj.createTime = item.createAt;
                                    obj.status = "finish";
                                }
                            });
                            });

                        }
                    }, err => {

                    })
            },
            cancleApply(){

            },
            showDetail(item){
                this.detail = item;
                this.getState(item.id);
                this.modelShow =true;
            }
        }
    }
</script>

<style lang='less'>

    .meLoan {
        .sub-title{
            font-size: 16px;
            line-height: 17px;
            height: 16px;
            border-left: 2px solid #ff762b;
            padding-left: 10px;
            margin-top: 6px;
            color: #000;
        }
        .switch-box{
            float: right;
            margin-top:35px;
            margin-right:30px;
            .ivu-switch-checked{
                border-color:#ae81e8;
                background-color: #ae81e8;
            }
            span{
                margin-left:6px;
                vertical-align: middle;
            }
        }
        .tabs{
            font-size: 0;
            margin: 20px 0;
            height: 45px;
            border-bottom: 1px solid #e5e5e5;
            li{
                font-size: 14px;
                display: inline-block;
                text-align: center;
                line-height: 24px;
                padding: 10px 0;
                width: 100px;
                cursor: pointer;
            }
            li.cur{
                color: #ff762b;
                border-bottom: 1px solid #ff762b;
            }
        }
        .loan-history{
            li{

              cursor: default;
              &:hover{background-color: #f6f6f6;}
                img{
                    width: 50px;
                    height: 50px;
                    display: block;
                    margin: 15px auto;
                }
                h3{
                    font-size: 16px;
                    padding: 14px 0;
                    color: #000;
                }
                p{
                    margin: 0;
                }
                p.td-value{
                    padding-top:27px;
                    text-align: center;
                    font-size: 12px;
                    line-height: 20px;
                    color: #000;
                }
                p.td-title{
                    text-align: center;
                    font-size: 12px;
                    line-height: 16px;
                    color:#999;
                }
                span.status{
                    display: block;
                    text-align: center;
                    font-size: 12px;
                    line-height: 20px;
                    margin: 27px auto 0;
                    color: #ff762b;
                    border:1px solid #ff762b;
                    width: 66px;
                    border-radius: 10px;
                }
                a.btn{
                    font-size: 12px;
                    line-height: 20px;
                    margin: 27px auto 0;
                    width: 66px;
                    text-align: center;
                    color: #000;
                    display: block;
                  &:hover{text-decoration: underline}
                }

            }
        }
    }
    .detail-modal{
        padding: 0;
        position: relative;
      .ivu-modal-close{
        position: absolute;
        right:-100px;
        top:-42px;
        i{
          color: #fff;
        }
        &:hover i{
          color: #b2b2b2;}
      }
        .modal-head{
            padding: 34px 50px 0;
            height: 184px;
            >div{
            float: left;
            &:nth-of-type(2){
                width: 160px;
                text-align: center;
                float: right;
                .id{
                     color:#999;
                     position: relative;
                     top:-15px;
                }
                .gray{
                    color:#999;
                }
                .largex{
                    font-size: 24px;
                    line-height: 42px;
                    margin-bottom:20px;
                }
            }
            }
            .logo{
            width: 100px;
            height: 100px;
            margin-right: 30px;
            img{
                width: 100%;
                height: 100%;
            }
            }
            .main-msg{
            width: 370px;
            h3{
                font-size: 20px;
            }
            .orgname{
                font-size: 14px;
                color:#999;
                line-height: 14px;
                margin-bottom:24px;
                margin-top: 12px;
            }
            .label{
                display: inline-block;
                border:1px solid #d0d0d0;
                color:#999;
                width: 70px;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                text-align: center;
                border-radius: 10px;
                margin-right: 5px;
            }
            }
            .sure-btn{
                display: inline-block;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
                color:#ff6800;
                border:1px solid #ff6800;
                width: 80px;
                text-align: center;
                transition: all 200ms linear;
                &:hover{
                    background-color: #ff762b;
                    color: #fff;
                }
            }
        }
        .product-msg{
            margin-top: 25px;
            display: flex;
            padding: 20px;
            div{
            flex:1;
            text-align: center;
            h4{
                font-size: 16px;
                color:#000;
                line-height: 22px;
            }
            p{
                font-size: 14px;
                color:#aaa;
            }
            }
        }
        .limit{
            height: 100px;
            padding-top: 30px;
            >div{
            float: left;
            text-align: center;
            &:nth-of-type(1){
                width: 365px;
            }
            &:nth-of-type(2){
                width: 202px;
                border-left:1px solid rgba(153,153,153,.3);
                border-right:1px solid rgba(153,153,153,.3);
            }
            &:nth-of-type(3){
                width: 233px;
            }
            span{
                font-size: 16px;
                color: #000;
            }
            p{
                font-size: 12px;
                margin-top: 8px;
                color: #999;
            }
            }
        }
        .product-lines{
            background-color: #f2f2f2;
            padding: 20px 60px 20px;
            line-height: 30px;
            font-size: 14px;
            color:#909090;
            img{
            position: relative;
            top:5px;
            margin-right: 10px;
            }
            .lit-ico{
            position: relative;
            top:3px;
            width: 16px;
            height: 16px;
            }
            .right{
            color:#000;
            }
        }
        .product-text{
            min-height: 120px;
            padding:30px 60px 20px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            .state-list{
                @nomal-top1 : -9px;
                @nomal-top2 : -45px;

                @cur-top1 : -110px;
                @cur-top2 : -146px;
                .list-item-box{
                    position: relative;
                    text-align: center;
                }
                .list-item-box::after{
                    content:"";
                    height: 0;
                    width: 80%;
                    border-top:1px solid #bfbfbf;
                    display: block;
                    position: absolute;
                    top:15px;
                    left:50%;
                    z-index: 1;
                }
                .list-item-box.last::after{
                    display: none;
                }
                .list-item-box.cur::after{
                    border-color: #ff8e33;
                }
                .list-item-box.right-flow{
                    float: right;
                }
                .list-item{
                    z-index: 2;
                    position: relative;
                    display: inline-block;
                    height: 80px;
                    p{
                        text-align: center;
                        color:#bfbfbf;
                    }
                    .list-icon{
                        display: block;
                        margin: 0 auto;
                        width: 30px;
                        height: 30px;
                        margin-bottom: 10px;
                        background-image:url('../../assets/images/icos.png');
                    }
                    .list-icon.tj{
                        background-position: -8px @nomal-top1;
                    }
                    .list-icon.sl{
                        background-position: -50px @nomal-top1;
                    }
                    .list-icon.dd{
                        background-position: -96px @nomal-top1;
                    }
                    .list-icon.cs{
                        background-position: -137px @nomal-top1;
                    }
                    .list-icon.fs{
                        background-position: -181px @nomal-top1;
                    }
                    .list-icon.hq{
                        background-position: -180px @nomal-top2;
                    }
                    .list-icon.fk{
                        background-position: -137px @nomal-top2;
                    }
                }
                .list-item-box.cur{
                    p{
                    color: #333;
                    }
                    .list-icon.tj,.list-icon.cs,.list-icon.dd,.list-icon.sl,.list-icon.fs{
                        background-position-y: @cur-top1;
                    }
                    .list-icon.hq,.list-icon.fk{
                        background-position-y: @cur-top2;
                    }
                }
            }
            ul{
                margin-top: 20px;
                margin-left: 80px;
                li{
                    line-height: 18px;
                    height: 36px;
                    position: relative;
                    span{
                        vertical-align: middle;
                    }
                    i{
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: #ccc;
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                    i.first{
                        background-color: #ff8e33;
                        box-shadow:0 0 5px 2px #ff8e33;
                    }
                    i:after{
                        content: "";
                        display: block;
                        position: absolute;
                        height: 36px;
                        width: 1px;
                        background-color: #ccc;
                        top:20px;
                        left:2px;
                    }
                    i.last:after{
                        display: none;
                    }
                }
            }
        }

        .ivu-modal-body{
            padding: 16px 0 0 ;
        }
        .ivu-modal-footer{
            display: none;
        }
    }
</style>
