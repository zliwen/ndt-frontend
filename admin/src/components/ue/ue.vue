<template>
  <div>
    <div :disabled="disabled" ref="wangEditor">
    </div>
  </div>
</template>
<script>
  import wangEditor from '../../../static/wangEditor.js';
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      disabled:{
        type:Boolean,
      }
    },
    created(){
    },
    mounted() {
      let dom = this.$refs.wangEditor;
      let editor = new wangEditor(dom);
      editor.customConfig.uploadImgServer = '/v1/file/upload'
      editor.customConfig.zIndex = 100;
      editor.customConfig.uploadImgHooks = {
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              if(result.errorCode == 0){
                let fileId = result.data[0].fileId;
                let url  = "/v1/file/download/"+fileId;
                insertImg(url)
              }
              // result 必须是一个 JSON 格式字符串！！！否则报错
          }
      }
      editor.create();
      this.editor = editor;
      if(this.disabled){
        editor.$textElem.attr('contenteditable', false)
      }
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.txt.html()
      },
      setUEContent(str){
        this.editor.txt.html(str)
      }
    }
  }
</script>