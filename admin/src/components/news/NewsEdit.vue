/**
* 新闻资讯
* Create by chenchen on 2017/9/12.
*/

<template>
    <div class="NewsEdit">
        <Loading v-show="loading"></Loading>


        <div  class="edit-eara" style="width:910px; margin: 0 auto">
            <Form  v-show="true" ref="formData" :model="formData"  inline :rules="ruleCustom">
                    <div style="margin-bottom:10px;">
                        <Button icon="ios-undo" type="default" @click="modalCancle">返回</Button>
                        <Button v-show="readOnly&&isCheck" icon="checkmark" type="success" @click="checkPass(404)">通过</Button>
                        <Button v-show="readOnly&&isCheck" icon="close" type="error" @click="checkPass(403)">驳回</Button>
                        <Button v-show="!readOnly" icon="arrow-down-a" type="info" @click="modalSubmit(401)">保存</Button>
                        <Button v-show="!readOnly" icon="forward" type="success" @click="modalSubmit(404)">保存并发布</Button>
                        <!-- 审核流程已做，如果要打开就到router中打开审核的菜单显示，将保存并发布的参数改成402 -->
                    </div>
                    <FormItem  label="地区" required label-position="right" :label-width='60' class="ivu-form-item-required">
                        <GetCity ref='getCity' :disabled='readOnly' style="width:300px;" :setValue="initValue" @onChange="adminDivisionIdChange"></GetCity>
                    </FormItem>
                    <FormItem label="类型" prop="type" label-position="right" :label-width='60'>
                        <Select :disabled='readOnly' v-model="formData.type"  style=" width: 185px;">
                            <Option v-if="item.id!=302"  v-for="(item,index) in typeList" :key="index" :value="item.id+''">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="优先级" prop="importance" label-position="right" :label-width='60'>
                        <Select :disabled='readOnly' v-model="formData.importance"  placeholder="优先级"   style=" width: 180px;">
                            <Option v-for="(item,index) in importanceList" :key="index" :value="item.id+''">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标签" label-position="right" :label-width='60'>
                         <Select :disabled='readOnly' v-model="formData.labels" clearable multiple style=" width: 400px;">
                            <Option v-for="(item,index) in labelList" :key="index" :value="item.id">{{item.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="来源" prop="source" style="width:400px;"  label-position="right" :label-width='50' >
                        <Input :disabled='readOnly' v-model="formData.source"></Input>
                    </FormItem>
                    <FormItem label="封面" prop="img" label-position="right" :label-width='60' class="ivu-form-item-required">
                        <UploadImg :cutSize="cutSize"  v-if="!readOnly" v-model="formData.linkImageUrl"></UploadImg>
                        <div style="display:inline-block;width:100px;" v-if="readOnly"><img :src="formData.linkImageUrl" style="width:100%"/></div>
                    </FormItem>
                    <FormItem prop="title" style="width:100%" label-position="top" :label-width="0">
                        <Input  :disabled='readOnly' v-model.trim="formData.title" class="title" placeholder="请输入文章标题"></Input>
                    </FormItem>
                    <p v-if="readOnly" class="article-info">
                        <span>发布时间：{{formData.updateAt}}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>消息来源：{{formData.source}}</span>
                    </p>
                    <!-- <FormItem prop="summary" style="width:100%" :label-width="0">
                        <Input  :disabled='readOnly' v-model="formData.summary" class="summary" placeholder="文章摘要，如未填写则自动截取文章前50字"></Input>

                    </FormItem> -->
                    <FormItem style="width:100%" :label-width="0">
                        <div class="form-label UE">
                            <UE v-if="!readOnly" ref="ue"></UE>
                            <div v-else  v-html="content" ></div>
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
    import NewsServer from 'rs/infoServer';
    import dictServer from 'rs/dictServer';
    import otherServer from 'rs/otherServer';
    import session from '@/config/session';
    export default {
        components:{UE},
        name: 'NewsDetails',
        data () {
            return {
                content:"",
                uploadHeader:{
                    Authorization:session.get("adminToken")
                },
                sensitiveWordsModel:false,
                sensitiveWords:[],
                waitUploadImgs:[],
                loadingStatus:false,
                cutSize:[390,220],
                typeList:[],
                labelList:[],
                importanceList:[],
                initValue:'',
                modalType:"view",
                readOnly:true,
                isCheck:false,
                uploadImg:null,
                ruleCustom: {
                    title:[
                        { required: true, message: '填写政策标题', trigger: 'blur,change' }
                    ],
                    type:[
                        { required: true, message: '请选择资讯类型', trigger: 'blur,change' }
                    ],
                    importance:[
                        { required: true, message: '请选择资讯优先级', trigger: 'blur,change' }
                    ],
                    // divisions:[
                    //      { required: true, message: '请选择覆盖地区', trigger: '' }
                    // ]
                    // source:[
                    //     { required: true, message: '请填写信息来源', trigger: 'blur,change' }
                    // ]
                },
                loading:false,
                formData:{
                    title:'',
                    summary:'',
                    divisions:[],
                    content:"",
                    labels:[],
                    linkImageUrl:""
                }
            }
        },
        created: function () {
            if(!session.get('newsObj')){
                this.modalCancle();
                return;
            }
            this.getCodeTable('3', data => {
                this.typeList= data;
            });
            this.getCodeTable('18', data => {
                this.labelList= data;
            });
            this.getCodeTable('5', data => {
                this.importanceList= data;
            });
            let obj = JSON.parse(session.get('newsObj'));
            //session.remove("newsObj");
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
                NewsServer.getNewsDetail({
                    id:id
                },
                {},function (response) {
                    if(response.errorCode == 0){
                        if(response.data.labels == null){
                            response.data.labels = [];
                        }
                        if(that.modalType == "edit"){
                            that.editCallback(response.data);
                        }
                        else {
                            that.viewCallback(response.data);
                        }
                    }
                }, function (err) {
                    that.$Message.error("获取详细信息失败！")
                })

            },
            adminDivisionIdChange(data){
                if (data && data.length)  this.formData.divisions = [data[data.length - 1]];
            },
            modalSubmit(state){//模态提交
                let that = this;
                let content = this.$refs.ue.getUEContent();
                this.$refs.formData.validate((valid) => {
                     if (valid) {
                        if(content == ""){
                            this.$Message.warning("你没有输入内容！")
                            return;
                        }
                        if(this.formData.divisions.length==0){
                            this.$Message.warning("请选择覆盖区域！")
                            return;
                        }
                        if(this.formData.linkImageUrl.length==0){
                            this.$Message.warning("你还未上传封面图片或上传失败！")
                            return;
                        }
                        if(!state){
                            state = this.formData.state||401
                        }
                        if(this.modalType == 'new'){//新增
                            NewsServer.addNews({}
                            ,Object.assign({},this.formData,{content,state})
                            , function (response) {
                                if(response.errorCode == 0){
                                    that.$Message.success("新增成功");
                                    that.$router.push('../news');
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
                            NewsServer.editNews({}
                            ,Object.assign({},this.formData,{content,state})
                            , function (response) {
                                if(response.errorCode == 0){
                                    that.$Message.success("修改成功");
                                    that.$router.push('../news');
                                }
                                else if(response.errorCode == 2100){
                                    that.sensitiveWords = response.data;
                                    that.sensitiveWordsModel = true;
                                }
                                else{
                                    that.$Message.error("修改失败");
                                }
                            }, function (err) {
                                that.$Message.error("操作失败，网络错误");
                            })
                        }
                        else if(this.modalType == 'check'){//审核
                        }
                     }
                })
            },
            modalCancle(){//模态取消
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
                    NewsServer.editNews({}
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
                this.formData.type += "";
                this.formData.importance += "";
                this.initValue = row.divisions?row.divisions[0]:"";
                setTimeout(()=>{
                        this.content = (row.content);
                    },400)

            },
            editCallback(row){//编辑回调
                this.readOnly = false;
                this.formData = Object.assign({},row);
                this.formData.type += "";
                this.formData.importance += "";
                this.initValue = row.divisions?row.divisions[0]:"";
                setTimeout(()=>{
                        this.$refs.ue.setUEContent(row.content);
                        this.formData.divisions = [this.initValue];
                    },400)
            },
            dothis(x){
                console.log(x);
            }
        }
    }
</script>

<style lang='less'>
    .NewsEdit {
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
