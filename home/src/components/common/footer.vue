<template>
  <footer>
    <div class="footer_wrapper">
      <p>
        <span>友情链接</span>
        <a href="http://www.cd-jk.com/" target="_blank">成都金控集团</a>
        <a href="http://cdjkzx.net/" target="_blank">成都金控征信有限公司</a>
        <a href="http://www.cdaee.com/" target="_blank">成都市农村产权交易所</a>
      </p>
      <p>
        <span>联席会议单位</span>
        <a href="http://www.cdagri.gov.cn/" target="_blank">成都市农业委员会</a>
        <a href="http://www.cdjrb.gov.cn/" target="_blank">成都市金融工作局</a>
        <a href="http://chengdu.pbc.gov.cn/" target="_blank">中国人民银行成都分行营业管理部</a>
      </p>
      <p>
        <span>知信链接</span>
        <a href="http://zhixin.cdjkzx.net/" target="_blank">知信 </a>
      </p>
      <p style="font-size: 12px;margin-bottom: 0">
        <i style="font-style: normal">蜀ICP备17009127号-2&emsp;|&emsp;技术支持:</i>
        <a href="http://www.funmitech.com" target="_blank" style="text-decoration: underline" v-if="QS">成都方米科技有限公司</a>
        <a href="http://www.incitedata.cn" target="_blank" style="text-decoration: underline" v-else>成都清数科技有限公司</a>
      </p>
      <div class="right">
        <img src="../../assets/images/logo.png" alt="" style="width: 170px">
        <p>成都金控征信版权所有</p>
        <p>服务热线：028-65221888</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props:{
    QS:{
      type:Boolean,
      default:false
    }
  },
	data() {
    return {

    }
	},
	mounted() {

	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {

	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  //页脚
  footer{
    color:@text_color_3;
    font-size: 14px;
    width: 1200px;
    margin:0 auto;
    height: 280px;
    position: relative;
    .footer_wrapper{
      width: 100%;
      position: absolute;
      top:50%;
      transform: translate(0,-50%);
    }
    p{
      margin-bottom: 14px;
      span,a{
        display: inline-block;
        width:15.432%;
      }
      span{
        color:@text_color_1;
        font-weight: 600;
        line-height: 18px;
        width: 12.8395%;
      }
      a{
        color: #999;
      }
      a:last-child{
        width: auto;
      }
      a{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .right{
      position: absolute;
      right:0;
      top:0;
      text-align: right;
      p,img{
        margin-bottom: 12px;
      }
    }
  }
</style>
