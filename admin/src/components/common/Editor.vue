<template>
    <div @input="result" id="editor">
    </div>
</template>

<script>
    import WangEditor from 'wangeditor';
    // 引用 npm包在开发环境会有上传跨域的问题，原因是wangeditor.js 6768行逻辑导致，withCredentials值配置始终为true。可手动修改，不影响线上版本。
    import session from "@/config/session";
    export default {
        props: ['content'],
        data() {
            return {
                editor: '',
                uploadImgUrl :'/v1/file/upload',
                downLoadUrl:'/v1/file/download/',
            }
        },
        created(){
            let host = window.location.origin;
            // 开发环境拼接42服务器
            if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
                host = "http://192.168.1.42:18080";
                this.uploadImgUrl = host+this.uploadImgUrl;
                this.downLoadUrl = host+this.downLoadUrl;
            }
        },
        mounted() {
            console.log(WangEditor);
            // 自定义上传附件插件
            WangEditor.createMenu(function (check) {
                // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
                var menuId = 'uploadFile';

                // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
                if (!check(menuId)) {
                    return;
                }

                // this 指向 editor 对象自身
                var editor = this;

                // 创建 menu 对象
                var menu = new WangEditor.Menu({
                    editor: editor,  // 编辑器对象
                    id: menuId,  // 菜单id
                    title: '上传附件', // 菜单标题
                    $domNormal: $('<a href="#" tabindex="-1"><i class="ivu-icon ivu-icon-ios-folder"></i></a>'),
                    $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="ivu-icon ivu-icon-ios-folder"></i></a>')
                });

                // 创建 panel content
                var $panelContent = $('<div class="content-container"><div class="content"></div></div>');
                var $uploadIcon = $('<div class="upload-icon-container"><i class="wangeditor-menu-img-upload"></i></div>');
                $panelContent.append($uploadIcon);

                // ---------- 构建上传对象 ----------
                var upfile = new WangEditor.UploadFile({
                    editor: editor,
                    uploadUrl: this.uploadImgUrl,
                    timeout: 20 * 1000,
                    fileAccept: '*/*' ,  // 允许任何文件上传
                });
                upfile.upload=function (file) {
                    console.log(file)
                    var self = this;
                    var editor = self.editor;
                    var filename = file.name || '';
                    var fileType = file.type || '';
                    var uploadFileName = filename||'wangEditorH5File';
                    var uploadFileFns = editor.config.uploadFileFns;
                    var onload = uploadFileFns.onload;
                    var ontimeout = uploadFileFns.ontimeout;
                    var onerror = uploadFileFns.onerror;
                    var reader = new FileReader();
                    WangEditor.log('=======进入自定义上传函数=======');
                    WangEditor.log('开始执行 ' + filename + ' 文件的上传');
                    // 清空 input 数据
                    function clearInput() {
                        self.clear();
                    }
                    if(file.size>=10485760){
                    // if(file.size>=1048){
                        alert("你传的文件超过大小限制10M！");
                        clearInput();
                        return;
                    }
                    // onload事件
                    reader.onload = function (e) {
                        WangEditor.log('已读取' + filename + '文件');
                        var base64 = e.target.result || this.result;
                        editor.xhrUploadImg({
                            event: e,
                            filename: filename,
                            base64: base64,
                            fileType: fileType,
                            name: uploadFileName,
                            loadfn: function (resultText, xhr) {
                                clearInput();
                                // 执行配置中的方法
                                var editor = this;
                                onload.call(editor, resultText, xhr);
                            },
                            errorfn: function (xhr) {
                                clearInput();
                                // 执行配置中的方法
                                var editor = this;
                                onerror.call(editor, xhr);
                            },
                            timeoutfn: function (xhr) {
                                clearInput();
                                // 执行配置中的方法
                                var editor = this;
                                ontimeout(editor, xhr);
                            }
                        });
                    };
                    // 开始取文件
                    reader.readAsDataURL(file);
                };
                
                // 选择本地文件，上传
                $uploadIcon.click(function (e) {
                    event = e;
                    upfile.selectFiles();
                });
                // 添加panel
                menu.dropPanel = new WangEditor.DropPanel(editor, menu, {
                    $content: $panelContent,
                    width: 200,
                });
                
                // 增加到editor对象中
                editor.menus[menuId] = menu;
    
            })
            // 自定义插件结束
            const editor = new WangEditor('editor');
            editor.config.menus = [ 'source','eraser','indent','bold', 'underline', 'italic', 'strikethrough','alignleft', 'aligncenter', 'alignright',  'forecolor', 'bgcolor', 'quote', 'fontsize', 'head', 'unorderlist', 'orderlist',
                'link', 'unlink', 'table', 'img',  'undo', 'redo','uploadFile']
            // editor.config.pasteText = true;editor.config.withCredentials
             editor.config.pasteFilter = false;
             editor.config.withCredentials = false;
            editor.config.uploadImgUrl = this.uploadImgUrl;
            editor.config.uploadHeaders = {
                Authorization:session.get("adminToken")
            }
            editor.config.uploadFileFns = {};
            editor.config.uploadFileFns.onload =  (resultText, xhr)=>{
                let result = JSON.parse(resultText);
                if(result.errorCode == 0){
                    for(let i in result.data){
                        let url  =this.downLoadUrl + result.data[i].fileId;
                        let fileName= result.data[i].inputName;
                        console.log( result.data[i]);
                        editor.command(null, 'insertHtml', '<a target="_blank" href="' + url + '">附件：&nbsp;'+fileName+'&nbsp;&nbsp;</a>');
                        console.log(url);
                    }
                }
            }
            editor.config.uploadFileFns.ontimeout = ()=>{
                this.$Message.error("连接超时，上传文件失败")
            } 
            editor.config.uploadFileFns.onerror = ()=>{
                this.$Message.error("网络异常，上传文件失败")
            } 
            editor.config.uploadImgFns.onload = (resultText, xhr)=>{
                let result = JSON.parse(resultText);
                if(result.errorCode == 0){
                    for(let i in result.data){
                        let url  =this.downLoadUrl + result.data[i].fileId;
                        editor.command(null, 'insertHtml', '<img src="' + url + '"  style="width:80%;"/>');
                        console.log(url);
                    }
                }
            }
            editor.create();
            this.editor = editor;
            if(this.disabled){
                editor.editor.disable();
            }
        },
        methods: {
            result() {
                this.$emit('input', this.editor.$txt.html())
            },
            getUEContent() { // 获取内容方法
                return this.editor.$txt.html()
            },
            setUEContent(str){
                this.editor.$txt.html(str)
            }
        }
    }
</script>
<style lang="less">
#editor {
    min-height: 600px;
    font-size: 16px;
}
.wangEditor-container {
    border-radius: 2px;
    overflow: hidden;
    font-family: "微软雅黑";
    border: 1px solid #CCC;
}
.wangEditor-container .img-drag-point{
    background-color: #d82;
}
.wangEditor-container .wangEditor-txt p, .wangEditor-container .wangEditor-txt h1, .wangEditor-container .wangEditor-txt h2, .wangEditor-container .wangEditor-txt h3, .wangEditor-container .wangEditor-txt h4, .wangEditor-container .wangEditor-txt h5{
    line-height: 24px;
    margin: 0;
}
</style>
