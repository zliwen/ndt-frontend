/**
* 消息通知
* Created by zhaowei on 2017/8/23.
* Edit by chenchen on 2017/8/29.
*/

<template>
    <div class="Message">
      消息通知
      <Loading v-show="loading"></Loading>
      <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col :xs="20" :sm="16" :md="12" :lg="8">
             <Button :class="msgType=='N'?'ivu-btn-primary':'ivu-btn-default'" @click="getMessage('N')">未读消息</Button>
             <Button :class="msgType=='Y'?'ivu-btn-primary':'ivu-btn-default'" @click="getMessage('Y')">已读消息</Button>
        </Col>
        <Col :xs="4" :sm="8" :md="12" :lg="16"></Col>
      </Row>
      <ul>
          <li v-for="(item,index) in msgData" :key="index" :class="'list-item'" >
             <Row style="margin-bottom: 15px;" type="flex" justify="end" >
                 <Col :xs="6" :sm="2" :md="2" :lg="2">
                 <img v-if="msgType=='N'" src="../../assets/images/meg.jpg" alt="">
                 <img v-if="msgType=='Y'" src="../../assets/images/meg-no.jpg" alt="">
                 </Col> 
                <Col :xs="18" :sm="22" :md="22" :lg="22">
                    <h4 :size="30">
                        <span class="title-span">{{item.title}}</span>
                        <span class="time-span" :size="12">{{item.created | date('yyyy-MM-dd hh:mm:ss')}}</span>
                        <Button class="delete-btn" type="default" size="small"  @click="deleteMsg(item.ad_notice_id)">删除</Button>
                    </h4>
                    <p>{{item.message}}</p>
                </Col>
                <!-- <Col :xs="6" :sm="2" :md="2" :lg="2">
                </Col> -->
            </Row>
          </li>
      </ul>
        <Page :total="total" :current="current" :page-size="pageSize"
            show-total show-elevator show-sizer
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
        ></Page>
        <Modal
            v-model="deleteModel"
            title="警告"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确定要删除本条消息？删除后不可恢复！</p>
        </Modal>
    </div>
</template>
<style scoped lang='less'>
    .Message {
        .list-item{
            padding: 4px;
            border-radius:3px;
            margin-bottom:10px;
            img{
                border-radius: 50%;
            }
            .title-span{
                font-size: 16px;
            }
            .time-span{
                font-weight: 100;
            }
            .delete-btn{
                margin-left: 30px;
            }
        }
    }
</style>
<script>
    import messageServer from 'rs/messageServer';
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        name: 'Message',
        data () {
            return {
                deleteIndex:-1,
                deleteModel:false,
                msgType:"N",
                msgData: [],
                total:0,
                current:1,
                pageSize:10,
                loading:true,
            }
        },
        created:function(){
            this.getTableData();
        },
        methods: {
            getMessage(type){
                this.msgType = type;
                this.current=1;
                this.pageSize=10;
                this.getTableData(type);
            },
            pageChange (current){
                this.current = current;
                this.getTableData();
            },
            pageSizeChange (pageSize){
                this.current = 1;
                this.pageSize = pageSize;
                this.getTableData(this.msgType);
            },
            getTableData(type='N'){
                let that = this;
                that.loading=true;
                messageServer.queryNoticeListForUser({}, {
                    pageIndex: this.current,
                    userId:session.get("ad_user_id"),
                    pageSize: this.pageSize,
                    userdef:type
                }, function (response) {
                    that.loading=false;
                    // 请求返回结果
                    that.msgData = response.data.result;
                    that.total = response.data.count;
                }, function (err) {
                    that.loading=false;
                    // 请求失败
                })
            },
            ok () {
                // 删除弹窗确定
                this.deleteModel = false;
                let that = this;
                if(that.deleteId != -1){
                    messageServer.deleteNotice({}, {
                        noticeId:that.deleteId 
                    }, function (response) {
                        // 请求返回结果
                        if(response.msg =="SUCCESS"){
                            that.$Message.success('删除成功！');
                            that.getTableData(that.msgType)        
                        }
                        else{
                            that.$Message.warning('删除失败！');
                        }
                    }, function (err) {
                        // 请求失败
                        that.$Message.error('删除失败！');
                    })
                }
            },
            cancel () {
                // 删除弹窗取消
                this.deleteId = -1;
                this.deleteModel = false;
            },
            deleteMsg(noticeId){
                // 绑定删除对象id
                this.deleteId = noticeId;
                this.deleteModel =true;
            }
        }
    }
</script>
