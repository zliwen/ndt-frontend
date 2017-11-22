<template>
	<div class="country-credit-index">
		<div class="input_container">
      <p>专业农村信用查询工具</p>
			<Input v-model="value" icon="ios-search" :autofocus="true" @on-enter="search" @on-click="search" placeholder="请输入企业名称、法人名称等关键词进行搜索"/>
		</div>
    <div class="main-container" v-show="!(datas.length&&!isLoad)">
      <img src="../../assets/images/county_credit/event_banner.png" alt="" style="width: 100%">
      <div class="main-wrapper">
        <img src="../../assets/images/county_credit/footer.png" alt="" class="top">
        <img src="../../assets/images/county_credit/footer.png" alt="" class="bottom">
          <!--<div>-->
            <!--<div class="img_bg">评定说明</div>-->
            <!--<span class="text_title">评&nbsp;&nbsp;定&nbsp;&nbsp;办&nbsp;&nbsp;法&nbsp;：</span>-->
            <!--<p class="text_content">虎嗅2014年度作者评选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变自虎嗅2014年度作者评选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变自</p>-->
            <!--<span class="text_title">评定指标说明：</span>-->
            <!--<p class="text_content">虎嗅2014年度作者评选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变自虎嗅2014年度作者评选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变自虎嗅2014年度作者评选开始啦！登陆后投票哦，机会只有一次，扩散扩散~这一年，你是看了谁的文章、谁的观点而备受启发，愤而改变自</p>-->
          <!--</div>-->
          <div style="height: 373px;">
            <div class="img_bg">照片墙</div>
            <photo-wall></photo-wall>
          </div>
          <div>
            <div class="img_bg">评定结果</div>
            <template v-for="item in counties">
              <span class="text_title" v-html="item.name" :style="{letterSpacing:item.name.length===4?'13px':'6px'}"></span>
              <p class="text_content towns">
                <span v-for="t in item.towns" v-text="t"></span>
              </p>
            </template>
          </div>
        <div>
          <div class="img_bg">结果统计</div>
          <table>
            <tr v-for="item in result">
              <td v-text="item.name"></td>
              <td v-text="item.xyh"></td>
              <td v-text="item.ydh"></td>
              <td v-text="item.xyc"></td>
              <td v-text="item.xzc"></td>
              <td v-text="item.xyz"></td>
              <td v-text="item.xzxc"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
	    <Row style="margin:15px auto 30px;text-align: left;width: 1200px;" v-show="datas.length&&!isLoad">
	        <Col span="24">
	        	<Spin fix v-show="isLoad" size="large" style="margin-top: 200px;">
	                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
	                <div>加载中...</div>
	            </Spin>
            <div v-show="!isLoad" class="card-div-bg" v-for="item in datas" @click="creditDetail(item)">
                <Card :bordered="false" style="height: 155px;">
                  <Row>
                    <Col span="4">
                    <img src="../../assets/images/entr.png" />
                    </Col>
                    <Col span="20">
                    <Row>
                      <Col span="24">
                      <div><span style="color: #464c5b; font-size: 18px;margin-right: 10px;">{{item.companyName}}</span>
                        <Tag type="border" color="yellow">{{item.companyEnterpriseStatus}}</Tag></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="10">
                      <div><label>统一社会信息代码 : {{item.creditCode}}</label></div>
                      <div><label>法定代表人 : {{item.frName}}</label></div>
                      <div><label>成立时间 : {{item.esDate}}</label></div>
                      </Col>
                      <Col span="14">
                      <div><label>类型 : {{item.companyType}}</label></div>
                      <div><label>注册资本 : {{item.regCap}}</label></div>
                      <div><label>住所 : {{item.address}}</label></div>
                      </Col>
                    </Row>
                    </Col>
                  </Row>
                </Card>
              </div>
			    <Page v-show="isPage" :total="total" :current='page' :page-size="pageSize" :page-size-opts="pageSizeOpts" @on-change="onChange" @on-page-size-change="onPageSizeChange" show-sizer show-total show-elevator style="float: right; padding-top:10px;"></Page>
	        </Col>
	    </Row>
      <v-footer></v-footer>
    <Modal
	        v-model="testCode"
	        title="查询验证码"
	        :closable = 'false'
	        :mask-closable = 'false'>
	        <label style="text-align: center;display: block;">
	        	<Input v-model="checkCode" placeholder="请输入验证码" style="width: 200px"/>
	        	<span style="background: dodgerblue;color: white;padding: 5px 10px;font-size: 16px;border-radius: 4px;margin-left: 10px;">{{code}}</span>
	        </label>

	        <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
	    </Modal>
	</div>
</template>

<script>
import loanCreditServer from 'rs/credit'
import photoWall from "../common/photoWall.vue"
export default {
	data() {
	    return {
	        value: '',
	        datas: [],
	        total: 0,
	        page: 1,
	        pageSize: 5,
	        pageSizeOpts: [5,20,30,50],
	        isPage: false,
	        isLoad: false,
	        testCode: false,
	        code: '',
	        checkCode:'',
          counties:[],//评定结果统计
          result:[],//table
	    }
	},
	beforeCreate() {

	},
  created(){
	  this.counties = [
      {
        name:"崇州市",
        towns:"白头镇、桤泉镇、崇阳镇、羊马镇、元通镇、隆兴镇、锦江乡、公议乡、济协乡、大划镇、崇平镇、三江镇、江源镇、王场镇、燎原乡",
      },
      {
        name:"新津县",
        towns:"五津镇、永商镇、新平镇、邓双镇、金华镇、文井乡",
      },
      {
        name:"新都区",
        towns:"新都街道办、大丰街道办、斑竹园镇、新繁镇、龙桥镇、三河街道办、马家镇",
      },
      {
        name:"温江区",
        towns:"天府街道办、万春镇、和盛镇",
      },
      {
        name:"双流县",
        towns:"华阳街道办、东升街道办、西航港街道办、黄水镇、彭镇、籍田镇、黄龙溪镇、金桥镇、万安镇、九江街道办、正兴镇、兴隆镇、三星镇",
      },
      {
        name:"邛崃市",
        towns:"临邛镇、桑园镇、固驿镇、卧龙镇、羊安镇、夹关镇、前进镇、高埂镇、牟礼镇、平乐镇、宝林镇、回龙镇",
      },
      {
        name:"青白江区",
        towns:"大同镇、城厢镇、祥福镇、清泉镇、龙王镇、福洪镇、人和乡",
      },
      {
        name:"龙泉驿区",
        towns:"大面街道办、柏合镇、西河镇",
      },
      {
        name:"蒲江县",
        towns:"寿安镇、成佳镇",
      },
      {
        name:"郫都区",
        towns:"郫筒镇、红光镇、安德镇、团结镇、友爱镇、唐昌镇、花园镇",
      },
      {
        name:"彭州市",
        towns:"天彭镇、致和镇、敖平镇、丹景山镇、新兴镇、葛仙山镇、桂花镇、红岩镇、军乐镇、隆丰镇",
      },
      {
        name:"金堂县",
        towns:"淮口镇、竹篙镇、赵家镇、福兴镇、广兴镇、隆盛镇、又新镇、云合镇、五凤镇、转龙镇、平桥乡",
      },
      {
        name:"都江堰市",
        towns:"幸福镇、蒲阳镇、青城山镇、大观镇、胥家镇、崇义镇、玉堂镇、向峨乡、天马镇、翠月湖镇",
      },
      {
        name:"大邑县",
        towns:"上安镇、沙渠镇、苏家镇、青霞镇、金星乡、鹤鸣乡、悦来镇、斜源镇、出江镇、蔡场镇、雾山乡",
      },
    ].map(l=>({name:l.name+':',towns:l.towns.split("、")}));
	  this.result = [
      {
        name:"区县",
        xyh:"信用户",
        ydh:"有贷户",
        xyc:"信用村",
        xzc:"行政村",
        xyz:"信用镇",
        xzxc:"行政乡镇",
      },
      {
        name:"郫县",
        xyh:"2058",
        ydh:"2080",
        xyc:"121",
        xzc:"200",
        xyz:"7",
        xzxc:"14",
      },
      {
        name:"蒲江县",
        xyh:"4088",
        ydh:"4661",
        xyc:"80",
        xzc:"132",
        xyz:"2",
        xzxc:"10",
      },
      {
        name:"新津县",
        xyh:"1666",
        ydh:"1728",
        xyc:"63",
        xzc:"106",
        xyz:"6",
        xzxc:"12",
      },
      {
        name:"金堂县",
        xyh:"4775",
        ydh:"5025",
        xyc:"135",
        xzc:"232",
        xyz:"11",
        xzxc:"21",
      },
      {
        name:"温江区",
        xyh:"1150",
        ydh:"1660",
        xyc:"37",
        xzc:"111",
        xyz:"3",
        xzxc:"9",
      },
      {
        name:"双流县",
        xyh:"2246",
        ydh:"2415",
        xyc:"148",
        xzc:"247",
        xyz:"13",
        xzxc:"25",
      },
      {
        name:"新都区",
        xyh:"1737",
        ydh:"1737",
        xyc:"75",
        xzc:"127",
        xyz:"7",
        xzxc:"13",
      },
      {
        name:"邛崃县",
        xyh:"6602",
        ydh:"8062",
        xyc:"101",
        xzc:"202",
        xyz:"12",
        xzxc:"24",
      },
      {
        name:"青白江区",
        xyh:"2134",
        ydh:"2134",
        xyc:"75",
        xzc:"121",
        xyz:"7",
        xzxc:"11",
      },
      {
        name:"崇州市",
        xyh:"3693",
        ydh:"1329",
        xyc:"153",
        xzc:"153",
        xyz:"15",
        xzxc:"25",
      },
      {
        name:"彭州市",
        xyh:"6181",
        ydh:"7881",
        xyc:"161",
        xzc:"342",
        xyz:"10",
        xzxc:"20",
      },
      {
        name:"都江堰市",
        xyh:"1657",
        ydh:"1826",
        xyc:"133",
        xzc:"218",
        xyz:"10",
        xzxc:"20",
      },
      {
        name:"大邑县",
        xyh:"2303",
        ydh:"2320",
        xyc:"86",
        xzc:"218",
        xyz:"11",
        xzxc:"20",
      },
      {
        name:"龙泉驿",
        xyh:"1292",
        ydh:"2563",
        xyc:"5",
        xzc:"76",
        xyz:"3",
        xzxc:"8",
      },
      {
        name:"合计",
        xyh:"41582",
        ydh:"45421",
        xyc:"1373",
        xzc:"2485",
        xyz:"117",
        xzxc:"232",
      },
    ]
  },
	directives: {

	},
  components:{
    photoWall
  },
	computed: {

	},
	filters: {
	},
	methods: {
		search() {
		    if(!this.session.get('token')){
		        this.$Modal.confirm({
		          title: '您还未登录',
		          content: '<p>是否去登录？</p>',
		          onOk: () => {
		            this.$router.push({name:'loginAndRegister',query:{type:1,id:"country-credit"}})
		          },
		          onCancel: () => {
		//            this.$router.go(-1);
		          }
		       });
		       return
		    }
		    this.datas = [];
			this.total = parseInt(0);
			this.page = parseInt(1);
			this.createCode();
			this.testCode = true;
		},
		ok(){
			if(this.checkCode.toUpperCase() == this.code){
				this.checkCode = '';
				this.code = '';
				this.isLoad = true;
				this.isPage = false;
				this.testCode = false;
				loanCreditServer.searchCompanyInfoByKey({params: {name:this.value,type:"company",page:this.page,pageSize:this.pageSize}}, rsp => {
					let response = rsp.data;
					if(response.reCode === '00000'){
						this.$Message.success('查询成功!');
						this.datas = response.result;
						this.total = parseInt(response.total);
						this.page = parseInt(response.page);
						this.pageSize = parseInt(response.pageSize);
						if(this.total > this.pageSize){
							this.isPage = true;
						}
					}else{
						this.$Message.error(response.reMsg);
					}
					this.isLoad = false;
				}, err => {
					this.isLoad = false;
					this.$Message.error('查询失败...');
				});
			}else{
				this.$Message.error("验证码输入错误");
			}

		},
		cancel(){
			this.testCode = false;
			setTimeout(()=>{
				this.checkCode = '';
				this.code = '';
			},200)
		},
		onChange(val) {
			this.page = val;
			this.ok();
		},
		onPageSizeChange(val) {
			this.pageSize = val;
			if(this.page === 1){
				this.ok();
			}
		},
		creditDetail(item) {
      		this.session.set("firmName",item.frName).set("firmRegCap",item.regCap).set("firmStatus",item.companyEnterpriseStatus).set("firmCompanyName",item.companyName);
			open('#/credit/firmHome')
		},
		createCode(){
			this.code = "";
			var codeLength = 4;//验证码的长度
			var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
			'S','T','U','V','W','X','Y','Z');//随机数
			for(var i = 0; i < codeLength; i++) {//循环操作
				var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
				this.code += random[index];//根据索引取得随机数加到code上
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .country-credit-index{
    .ivu-input-wrapper{
      height: 34px;
      border-radius:17px;
      width: 350px;
      color: #fffefe;
      ::-webkit-input-placeholder{
        color: #fffefe;
      }
      .ivu-input{
        padding-left: 10px;
        background-color: rgba(0,0,0,.2);
        border:1px solid #fffefe;
        width: 348px;
        height:32px;
        border-radius:16px;
        color: #fffefe;
        &:focus{
          box-shadow: none;
        }
      }
      .ivu-icon{
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
        color: #fffefe;
        height: 30px;
        width: 30px;
        top:1px;
        right: 2px;
        &:active{
          background-color: #ff762b;
        }
      }
    }
  }
</style>
<style scoped lang='less'>
  .country-credit-index{
    .input_container{
      height: 250px;
      background: url('../../assets/images/county_credit/search_bg.png') no-repeat center;
      padding-top: 68px;
      text-align: center;
      color: #fffefe;
      margin-bottom:50px;
      p{
        width: 242px;
        margin: 0 auto 35px;
        font-size: 24px;
        padding-bottom: 2px;
        border-bottom:1px solid #fffefe;
      }

    }
    .main-container{
      width: 1200px;
      margin: 0 auto;
      .main-wrapper{
        background-color:#fffcf8;
        padding: 67px 84px 200px;
        position: relative;
        overflow: hidden;
        >img{
          position: absolute;
          &.top{
            top:-148px;
            left:-88px;
          }
          &.bottom{
            right:0;
            bottom:0;
          }
        }
        >div{
          &:nth-last-of-type(1){
            margin-bottom: 0;
          }
          margin-bottom: 57px;
          border:1px solid #ffa38a;
          background-color: #fff;
          position: relative;
          padding-top: 74px;
          padding-bottom: 20px;
          font-size: 14px;
          color: #000;
          .img_bg{
            background: url("../../assets/images/county_credit/title_icon.png") no-repeat;
            width: 214px;
            height:86px;
            padding-left: 80px;
            padding-top: 22px;
            font-size: 20px;
            color: #fff;
            line-height:20px;
            position: absolute;
            top:-35px;
            left:-30px;
            background-color: #fff;
          }
          .text_title{
            width: 175px;
            padding-left: 50px;
            display: inline-block;
            font-weight: 600;
            padding-right: 25px;
            float: left;
            white-space: nowrap;
          }
          .text_content{
            &.towns{
              padding-right: 36px;
              padding-bottom: 0;
            }
            padding: 0 54px 26px 175px;
            span{
              display: inline-block;
              width: 91px;
              border-right: 1px solid #000;
              text-align: center;
              font-size: 14px;
              line-height: 14px;
              height:12px;
              margin-bottom: 18px;
              &:nth-last-of-type(1){
                border-right: none;
              }
            }
          }
          table{
            width: 750px;
            margin:0 auto 100px;
            text-align: center;
            position: relative;
            &::before{
              position: absolute;
              content: "";
              display: block;
              width: 750px;
              height: 5px;
              top:-5px;
              left:0;
              background-color: #fc6237;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
            td{
              border:1px solid #ffa38a;
              border-collapse: collapse;
              height: 40px;
              font-size: 12px;
            }
            tr:nth-last-of-type(1),tr:nth-of-type(1){
              font-weight: 600;font-size: 14px;
            }
            tr:nth-of-type(2n){
              background-color: #f2f2f2;
            }
          }
        }
      }
    }
  }
 .card-div-bg{
 	background:#eee;
 	padding: 10px 20px;
 	cursor: pointer;
 	div{
 		margin-bottom: 4px;
 	}
 }
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>
