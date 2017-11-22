/**
* 文件共享
* Edit by chenchen on 2017/11/10.
*/

<template>
    <div class="FileShare">
        <Loading v-show="loading"></Loading>
        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
        <Col  style="text-align:right;padding-right:30px">
             <Button icon="plus-round" type="success" @click="newCallback">添加资源</Button>
             <!-- <Button :disabled="keyWordType==0" :title="sortAlt" icon="plus-round" type="info" @click="sortCallback">重新排序</Button> -->
        </Col>
        </Row>
        <Table border :columns="tableHead" :data="tableData" v-show="!loading"></Table>

        <Modal
            class="upload-modal"
            v-model="modalShow"
            :title="modalTitle"
            :loading="addLoading"
            :mask-closable="false"
            :styles="{top: '20px'}"
            :ok-text="modalData.id?'确定':'提交'"
             @on-ok="modelSubmit"
             @on-cancel="modelCancle"
            width="700">
            <div class="form-head">
                <label class="head-title">标题</label>
                <div class="head-item">
                    <Input v-if="!modalData.id" v-model.trim="modalData.name" ></Input>
                    <label v-else>{{modalData.name||"未填写"}}</label>
                </div>
                <label class="head-title">说明</label>
                <div class="head-item">
                    <Input  v-if="!modalData.id" v-model.trim="modalData.remark"  ></Input>
                    <label v-else>{{modalData.remark||"未填写"}}</label>
                </div>
                <label class="head-title">可见区域</label>
                <div class="head-item">
                    <GetCitys  v-if="!modalData.id" ref='getCity' @onChange="adminDivisionIdChange"></GetCitys>
                    <label v-if="modalData.id&&modalData.divisionsValue.length>0"><span v-for="(item,index) in modalData.divisionsValue" :key="index">{{item}}</span> </label>
                    <label v-if="modalData.id&&modalData.divisionsValue.length==0">{{'未填写'}}</label>
                </div>
            </div>
            
            <ul>
              <li class="table-head">
                <Row style="text-align:center">
                    <Col span="6">
                        <span>状态</span>
                    </Col>
                    <Col span="8">
                        <span>文件描述</span>
                    </Col>
                    <Col span="10">
                        <span>操作</span>
                    </Col>
                </Row>
              </li>
              
              <li v-show="modalData.id" class="content-line" v-for="(item,index) in modalData.fileListVos" :key="index">
                <Row  style="text-align:center">
                    <Col span="6">
                        <label v-text='index+1'></label>
                    </Col>
                    <Col span="8">
                        <label v-text='item.name'></label>
                    </Col>
                    <Col span="6">
                        <a target="_blank" :href="downloadUrl+item.id" >下载</a>
                    </Col>
                    <Col span="4">
                      <Button size="small" type="error" @click="deleteFile(item.id)">删除</Button>
                    </Col>
                </Row>
              </li>
              <li class="upload-line" v-if="!modalData.id">
                <Row  style="text-align:center">
                    <Col span="6">
                     <label style="line-height:32px;">{{tempFile.upLoadstate}}</label>
                    </Col>
                    <Col span="8">
                     <!-- <Input v-model='tempFile.inputName'></Input> -->
                     <label style="line-height:32px;">{{tempFile.inputName?tempFile.inputName:"---"}}</label>
                    </Col>
                    <Col span="6">
                        <Upload  :show-upload-list="false"
                                 style="display:inline-block;vertical-align:middle;"
                                 :on-success="fileSuccess"
                                 :action="uploadUrl" >
                            <Button class="upbtn" type="ghost">{{tempFile.uploadText}}</Button>
                        </Upload>
                    </Col>
                    <Col span="4">
                      <Button   type="info" @click="addLine()">{{'加入列表'}}</Button>
                    </Col>
                </Row>
              </li>
              <li v-show="!modalData.id&&modalData.respVos.length == 0" style="height:40px;line-height:40px;text-align:center">
                <Row  style="text-align:center">
                    <Col span="24">
                        列表为空
                    </Col>
                </Row>
            </li>
              <li v-show="!modalData.id" class="content-line" v-for="(item,index) in modalData.respVos" :key="index">
                <Row  style="text-align:center">
                    <Col span="6">
                        <label v-text='"文件"+(index+1)'></label>
                    </Col>
                    <Col span="8">
                        <label v-text='item.inputName'></label>
                    </Col>
                    <Col span="6">
                        <a :href="downloadUrl+item.fileId" >下载</a>
                    </Col>
                    <Col span="4">
                      <Button icon="minus-round"  type="error" @click="deleteLine(index)"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <p v-show="!modalData.id" style="margin-top:12px;">提示：将上传文件添加到列表，并点击提交才能保存！</p>
        </Modal>

    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import otherServer from 'rs/otherServer';
    import businessResourceServer from 'rs/businessResourceServer';
    import session from '@/config/session';
    export default {
        name: 'recommend',
        data () {
            return {
                total:0,
                current:1,
                pageSize:10,
                addLoading:false,
                loading:false,
                uploadUrl:"/v1/file/upload",
                downloadUrl:"/v1/file/download/",
                modalShow:false,
                modalTitle:"添加文件共享",
                
                tableHead: [
                    {
                        title: '序号',
                        width: 40,
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
                                    },"查看"),
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
                
                tableData:[],
                modalData:{
                    "divisions": [],
                    "name": "",
                    "remark": "",
                    "respVos": []
                },
                tempFile:{
                    upLoadstate:"未上传",
                    fileId: '',
                    inputName: "",
                    uploadText:'上传'
                }
            }
        },
        created: function () {
            let host = window.location.host;
            if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
                this.uploadUrl = "http://192.168.1.42:18080/v1/file/upload"
                this.downloadUrl = "http://192.168.1.42:18080/v1/file/download/"
            }

            if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
            if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
            this.getTableData();
        },
        computed:{
        },
        components: {
            draggable
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
            getTableData (){
                this.$router.push('?current=' + this.current + "&pageSize=" + this.pageSize);
                businessResourceServer.list({
                    params2: this.current,
                    params3: this.pageSize
                }, {},  (response)=>{
                    if (response.errorCode == 0) {
                        this.tableData = response.data.pageData;
                        this.total = response.data.totalCount;
                        this.loading = false;
                    }
                },err=>{ 

                })
            },
            deleteCallback({id}){
                businessResourceServer.deleteAll( {id},{},  (response)=>{
                    if (response.errorCode == 0) {
                        this.getTableData();
                    }
                },err=>{ 
                        this.$message.error("网络异常，文件上传未成功！")
                })
                this.getTableData();
            },
            editCallback(row){
                this.modalTitle = "查看共享文件"
                this.modalShow = true;
                console.log(row);
                this.getModalDetail(row.id)
                this.modalData = JSON.parse(JSON.stringify(row));
            },
            newCallback(){
                this.modalTitle ="添加文件共享"
                this.modalData={
                    "divisions": [],
                    "name": "",
                    "remark": "",
                    "respVos": []
                }
                this.tempFile={
                    upLoadstate:"未上传",
                    fileId: '',
                    inputName: "",
                    uploadText:'上传'
                }
                this.modalShow = true;
            },
            modelSubmit(){
                if(this.modalData.id){
                    return;
                }
                if(this.modalData.respVos.length == ""){
                    this.$Message.error("你未上传任何文件，操作无效！");
                    return;
                }
                businessResourceServer.add({}, this.modalData,  (response)=>{
                    if (response.errorCode == 0) {
                        this.modalData={
                            "divisions": [],
                            "name": "",
                            "remark": "",
                            "respVos": []
                        }
                        this.tempFile={
                            upLoadstate:"未上传",
                            fileId: '',
                            inputName: "",
                            uploadText:'上传'
                        }
                        this.getTableData();
                    }
                },err=>{ 
                        this.$Message.error("网络异常，文件上传未成功！")
                })
            },
            modelCancle(){
                this.modalData={
                    "divisions": [],
                    "name": "",
                    "remark": "",
                    "respVos": []
                }
                this.tempFile={
                    upLoadstate:"未上传",
                    fileId: '',
                    inputName: "",
                    uploadText:'上传'
                }
            },
            adminDivisionIdChange(data){
                this.modalData.divisions = [];
                data.forEach(item => {
                    if(item.value){
                        this.modalData.divisions.push(item.value[item.value.length - 1])
                    }
                });
            },
            addLine(){
                if(this.tempFile.fileId == ''){
                    this.$Message.error("你还没上传文件");
                    return;
                }
                this.modalData.respVos.push({
                    inputName:this.tempFile.inputName ,
                    fileId: this.tempFile.fileId,
                })
                this.tempFile = {
                    upLoadstate:"未上传",
                    fileId: '',
                    inputName: "",
                    uploadText:'上传'
                }
            },
            deleteLine(index){
                this.modalData.respVos.splice(index,1)
            },
            deleteFile(fileId){
                businessResourceServer.deleteSingle( {
                    id:this.modalData.id,
                    fileId
                },{},  (response)=>{
                    if (response.errorCode == 0) {
                        this.getModalDetail(this.modalData.id)
                    }
                },err=>{ 
                        this.$message.error("网络异常，文件上传未成功！")
                })
            },
            getModalDetail(id){
                businessResourceServer.detailById( {
                    id
                },{},  (response)=>{
                    if (response.errorCode == 0) {
                        if(response.data.id == null){
                            this.modalShow = false;
                            this.$Message.error("当前资源文件已删完，自动删除资源")
                            this.getTableData();
                        }
                        else{
                            this.modalData = response.data;
                        }
                    }
                },err=>{ 
                        this.$message.error("网络异常，文件上传未成功！")
                })
            },
            fileSuccess(response,file){
                let retData ={};
                if(response.errorCode == 0&&response.data&&response.data.length>0){
                    this.tempFile.fileId =  response.data[0].fileId;
                    // this.tempFile.inputName =  response.data[0].inputName;
                     this.tempFile.inputName = file.name;
                     this.tempFile.upLoadstate = "已上传文件："
                    this.tempFile.uploadText =  "更换文件";
                }
            },
            beforeFileUp(file){
                this.tempFile.inputName = file.name;
            },
        }
    }
</script>

<style lang='less'>
    .FileShare {
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
    .upload-modal{
        .form-head{
            .head-title{
                line-height: 32px;
                font-size: 16px;
            }
            .head-item{
                margin-bottom: 10px; 
                line-height: 24px;
                label{
                    border:1px solid #d0d0d0;
                    width: 100%;
                    padding:2px 10px;
                    border-radius: 3px;
                    font-weight: 800;
                    display: inline-block;
                    span{margin-right:20px;}
                }
            }
        }
        ul{
            border:1px solid #d0d0d0;
            padding: 5px 0;
            border-radius: 4px;
            li.table-head{
                // border-bottom: 1px solid #d0d0d0;
            }
            li.upload-line{
                height: 52px;
                line-height: 52px;
                border-bottom: 1px solid #d0d0d0;
            }
            li.content-line{
                line-height: 36px;
            }
        }
    }
</style>
