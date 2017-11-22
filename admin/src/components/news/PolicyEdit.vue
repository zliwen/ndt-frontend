/**
* 政策编辑
* Create by chenchen on 2017/9/11.
*/

<template>
    <div class="PolicyEdit">
        <Loading v-show="loading"></Loading>

        
        <div  class="edit-eara" style="width:910px; margin: 0 auto">
            <Form  v-show="true" ref="formData" :model="formData" inline label-position="right" :rules="ruleCustom">
                    <div style="margin-bottom:10px;">
                        <Button icon="ios-undo" type="default" @click="modalCancle">返回</Button>
                        <Button v-show="readOnly&&isCheck" icon="checkmark" type="success" @click="checkPass(404)">通过</Button>
                        <Button v-show="readOnly&&isCheck" icon="close" type="error" @click="checkPass(403)">驳回</Button>
                        <Button v-show="!readOnly" icon="arrow-down-a" type="info" @click="modalSubmit(401)">保存</Button>
                        <Button v-show="!readOnly" icon="forward" type="success" @click="modalSubmit(404)">保存并发布</Button>
                        <!-- 审核流程已做，如果要打开就到router中打开审核的菜单显示，将保存并发布的参数改成402 -->
                    </div>
                    <FormItem required label="覆盖地区" :label-width='80' >
                        <GetCity ref='getCity' :disabled='readOnly' style="width:320px;" :setValue="initValue" @onChange="adminDivisionIdChange"></GetCity>
                    </FormItem>
                    <FormItem label="标签" :label-width='60'  >
                         <Select :disabled='readOnly' v-model="formData.labels" clearable multiple style=" width: 320px;">
                            <Option v-for="(item,index) in labelList" :key="index" :value="item.id">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="置顶" :label-width='50'>
                        <Checkbox size="large" :disabled='readOnly' v-model="importanceBool"></Checkbox>
                    </FormItem>
                    <FormItem prop="title" style="width:100%" :label-width="0">
                        <Input  :disabled='readOnly' v-model.trim="formData.title" class="title" placeholder="请输入文章标题"></Input>
                    </FormItem>
                    <p v-if="readOnly" class="article-info">
                        <span>发布时间：{{formData.updateAt}}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>消息来源：{{formData.updateName}}</span>
                    </p>
                    <!-- <FormItem prop="summary" style="width:100%" :label-width="0">
                        <Input  :disabled='readOnly' v-model="formData.summary" class="summary" placeholder="文章摘要，如未填写则自动截取文章前50字"></Input>
                    </FormItem> -->
                    <FormItem style="width:100%" :label-width="0">
                        <div class="form-label UE">
                            <UE v-if="!readOnly" ref="ue"></UE>
                            <div class="article-read" v-else  v-html="content" ></div>
                        </div>
                    </FormItem>
            </Form>
        </div>
        <Modal v-model="sensitiveWordsModel"
            title="敏感词拦截"
            :mask-closable="true"
            :styles="{top: '50px'}"
            :transfer ='false'
            width="600">
            <h3>你的提交内容含有以下敏感词!请修改内容后重新提交。</h3>
            <div v-for="(item,index) in sensitiveWords" :key="index">
                <label style="line-height:24px;">{{item.type}}：</label>
                <p>
                    <span style="margin-left:10px;" :key="index" v-for="(word,index) in item.sensitiveWords">{{word}}</span>
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
    import UE from '../common/Editor';
    import PolicyServer from 'rs/infoServer';
    import dictServer from 'rs/dictServer';
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        components:{UE},
        name: 'PolicyDetails',
        data () {
            return {
                sensitiveWordsModel:false,
                sensitiveWords:[],
                content:"",
                initValue:'',
                labelList:[],
                modalType:"view",
                readOnly:true,
                isCheck:false,
                uploadImg:null,
                importanceBool:false,
                ruleCustom: {
                    title:[
                        { required: true, message: '填写政策标题', trigger: 'blur,change' }
                    ],
                    summary:[],
                   // labels:[ {required: true, message: '选择标签', trigger: ''}]
                },
                loading:false,
                formData:{
                    title:'',
                    summary:'',
                    divisions:[],
                    content:"",
                    labels:[]
                }
            }
        },
        created: function () {
            if(!session.get('policyObj')){
                this.modalCancle();
                return;
            }
            this.getCodeTable('19', data => {
                this.labelList= data;
                console.log(this.labelList);
            });
            let obj = JSON.parse(session.get('policyObj'));
            session.remove("policyObj");
            this.modalType = obj.type;
            if(obj.type == "check"){
                this.isCheck = true;
            }
            if(obj.type == "new"){
                this.readOnly = false;
            }
            else{
                this.getDetails(obj.id);
            }
        },
        methods: {
            getDetails (id){//获取内容
                let that = this;
                PolicyServer.getPolicyDetail({
                    id
                },{},function (response) {
                    if(response.errorCode == 0){
                        if(response.data.labels == null){
                            response.data.labels = [];
                        }
                       if(that.modalType == "view"||that.modalType == "check"){

                            that.viewCallback(response.data);
                        }
                        else if(that.modalType == "edit"){
                            that.editCallback(response.data);
                        }
                    }
                }, function (err) {
                    that.$Message.error("获取详细信息失败！")
                })

            },
            adminDivisionIdChange(data){
                console.log(data)
                if (data && data.length)  this.formData.divisions = [data[data.length - 1]];
            },
            modalSubmit(state){//模态提交
                let that = this;
                let content = this.$refs.ue.getUEContent();
                let importance = this.importanceBool?504:501;
                this.$refs.formData.validate((valid) => {
                     if (valid) {
                        console.log(1);
                        console.log(content);
                        console.log(this.modalType );
                        
                        if(content == ""){
                            this.$Message.warning("你没有输入内容！")
                            return;
                        }
                        if(this.formData.divisions.length==0){
                            this.$Message.warning("请选择覆盖区域！")
                            return;
                        }
                        if(!state){
                            state = this.formData.state||401
                        }
                        if(this.modalType == 'new'){//新增
                            PolicyServer.addPolicy({}
                            ,Object.assign({},this.formData,{content,importance,state,type:6501})
                            , function (response) {
                                if(response.errorCode == 0){
                                    that.$Message.success("新增成功");
                                    that.$router.push('../policy');
                                }
                                else if(response.errorCode == 2100){
                                    that.sensitiveWords = response.data;
                                    that.sensitiveWordsModel = true;
                                }
                                else{
                                    that.$Message.error("新增失败");
                                }
                            }, function (err) {
                                that.$Message.error("操作失败，网络错误");     
                            })
                        }
                        else if(this.modalType == 'edit'){//修改
                            PolicyServer.editPolicy({}
                            ,Object.assign({},this.formData,{content,importance,state,type:6501})
                            , function (response) {
                                if(response.errorCode == 0){
                                    that.$Message.success("修改成功");
                                    that.$router.push('../policy');
                                }
                                else if(response.errorCode == 2100){
                                    that.sensitiveWords = response.data;
                                    that.sensitiveWordsModel = true;
                                }
                                else{
                                    that.$Message.erroe("修改失败");
                                }
                            }, function (err) {
                                that.$Message.error("操作失败，网络错误");     
                            })
                        }
                        else if(this.modalType == 'check'){//审核
                        }
                     }
                });
         
            },
            modalCancle(){//模态取消
                //  this.$router.push('../policy');
                history.go(-1);
            },
            checkPass(state){
                let that = this;
                this.$Modal.confirm({
                    title:"操作确认",
                    content:state==403?"驳回发布，发布者可再次编辑提交。":"通过发布，发布者若修改，需再次审核。",
                    onOk:()=>{doit()}
                })
                function doit(){
                    PolicyServer.editPolicy({}
                    ,Object.assign({},that.formData,{state})
                    , function (response) {
                        if(response.errorCode == 0){
                            that.$Message.success("审核成功");
                            that.modalCancle()
                        }
                        else if(response.errorCode == 2100){
                            that.sensitiveWords = response.data;
                            that.sensitiveWordsModel = true;
                        }
                        else{
                            that.$Message.error("审核操作未成功");
                        }
                    }, function (err) {
                        that.$Message.error("操作失败，网络错误");
                    })
                }
            },
            viewCallback(row){//查看回调
                this.readOnly = true;
                this.formData = Object.assign({},row);
                this.importanceBool = row.importance==504;
                this.initValue = row.divisions[0];
                setTimeout(()=>{
                        this.content = (row.content);
                    },400)
                
            },
            editCallback(row){//编辑回调
                this.readOnly = false;
                this.formData = Object.assign({},row);
                this.importanceBool = row.importance==504;
                this.initValue = row.divisions[0];
                
                console.log(this.formData.divisions)
                setTimeout(()=>{
                        this.$refs.ue.setUEContent(row.content);
                        console.log(this.initValue);
                        this.formData.divisions = [this.initValue];
                    },400)

            }
        }
    }
</script>

<style lang='less'>
    .PolicyEdit {
        .edit-eara{
            background-color: #f5f5f5;
            padding: 10px 5px 0px;
            .title{
                input {
                    height: 48px;
                    font-size: 24px;
                    text-align:center;
                    background:none;
                    border:1px dashed #666;
                }
                input:disabled{
                    border:0;
                    cursor: default;
                    color: #333;
                }
            }
            .summary{
                input{
                    background:none;
                    border:1px dashed #666;
                }
                input:disabled{
                    border:0;
                    cursor: default;
                    color: #333;
                }
            }
            .article-read{
				color: #657180;
				font-size:16px;
				margin: 0;
				line-height: 28px;
            }
            .article-info{
				text-align: center;
				color:#696969;
				font-size: 12px;
				line-height: 36px;
            }
        }
    }
</style>
