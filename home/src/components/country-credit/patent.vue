<template>
  <div class="patent_container">
    <header class="overflow">
      <img src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEwNkY4NkU4NDI4MDExRTc5RkU0OUZFNzJEMUY5MEY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEwNkY4NkU5NDI4MDExRTc5RkU0OUZFNzJEMUY5MEY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTA2Rjg2RTY0MjgwMTFFNzlGRTQ5RkU3MkQxRjkwRjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTA2Rjg2RTc0MjgwMTFFNzlGRTQ5RkU3MkQxRjkwRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gIYORAAACgElEQVR42rSWXYhNURTH75WPeymaMs2DBw9K8eJBUoYID/KtRAZDPspMMzT5yIOmuOGBEYUHSsSMMZgkRZRCjfGRRAoxD0aSh0HJx7gavzX9b+1O9559trLqN3vWuWuf/z5rr7P2SWdrmlMBNhBWwGI4AJ3fj1cFTU5iI6EB1sAoXRsGc0JXGmezJLASBkR++5UKtGJig2EprJNYKeu1P0NrWyoZJkMrKf0QJ+audgTk4B00R4R2wGg44lz7pvEqNEEXwtuSiKXhHuyCiiJxd7SIx8613xrzGodY0SD4FBbFiVk6x8Ys6go8gMNF5v6MxE6weARbYXwxsT7oca5fg2N6msINfyQoikdwVAtbDi8Q3Flsz1xbAHVwWf5CmAFbPGK1FEk94yrn2n4EK+JKfze8hGnyTeQ2LPOIbebG1515BcvEiTVG/A3CZ6uFa7ZFf+LSOB0GQbv8jfJzHrF6xVX73jPXulTSX+R3y//oEetmz/KKT9yuXuulLXeqs0c9Ms6s5D8xloU8mRXDJaf0rZQvwvMEpW9x90PE5lsZwwX5a/UqNHrE1pPGOjXuxGk8A2+h0Hasc3QmOFIOkUZrbZNCxKrVNTLy58FMyHrEZkNlqbhSaRynCefkL7HTBLZ6xKpIo8XNDRHLRp4863T2OMtE4hOl8Ql81Rln1qLGXOYRO8WeNYWW/kGogWfyLZ2b4IZHrF1xp0PEtsN5uCV/L7TBCY9Yjj1rUyMvmca8c+KmtLJXOlr6Sxru6ugp2OfIiV0o/ZuMU1wRFvC+/3OA78apjBNhDwwP+FjqgLOwL8FeWjN4aGJv+GdM6v9br6XxpF7avn+4QTrhPKuNjr8CDAAuRZx6dpjLPAAAAABJRU5ErkJggg=="/>
      <span v-text="name"></span>
    </header>
    <p class="description">法人：
      <span v-text="session.get('firmName')"></span>资本：
      <span v-text="session.get('firmRegCap')"></span>
      <span class="tip" v-text="session.get('firmStatus')"></span>
      <router-link tag="span" :to="{name:'credit-firmProRight-details',query:{name:name}}">信用报告</router-link>
    </p>
    <Tabs v-model="activeTabs" @on-click="function(str){page = 1;init(str)}">
      <TabPane name="queryBrandInforByName" label="商标信息" icon="document-text"></TabPane>
      <TabPane name="queryPatentDetailByName" label="专利信息" icon="document-text"></TabPane>
      <TabPane name="querySoftwareCopyrightByName" label="软件著作权" icon="document-text"></TabPane>
      <TabPane name="queryProductCopyrightByName" label="作品著作权" icon="document-text"></TabPane>
      <TabPane name="queryDomainReferenceByName" label="域名备案" icon="document-text">
      </TabPane>
    </Tabs>
    <Table :columns="columns" :data="data" v-show="!loading"></Table>
    <v-loading style="height: 532px;" v-show="loading"></v-loading>
    <Page :total="total" :current.sync="page" @on-change="init(activeTabs)" style="padding-bottom: 50px;padding-top: 10px"></Page>
    <v-footer></v-footer>
  </div>
</template>

<script>
import loanCreditServer from 'rs/credit'
export default {
	data() {
	    return {
        name:this.session.get("firmCompanyName"),
        page:1,
        pageSize:10,
        total:0,
        columns:[],
        data:[],
        loading:false,
        activeTabs:"queryBrandInforByName",
        beforeActiveTabs:""
	    }
	},
	created() {
    this.init("queryBrandInforByName");
	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {
	  init(str){
//	    if(this.beforeActiveTabs === this.activeTabs)return;
//	    this.beforeActiveTabs = str;
      this.loading = true;
      loanCreditServer.propertyRight({params:{
        params2:this.activeTabs+'.st',
        name:this.name,
        page:this.page,
        pageSize:this.pageSize
      }},({data})=>{
        this.loading = false;
        this.total = +data.total;
        this.columns = data.header.map(l=>{
          if(l.title === "品牌形象")return {
            title:l.title,
            render:(h,p)=>{
              return h('img',{
                attrs:{
                  src:"data:image/jpg;base64,"+p.row.brandImage,
                  width:"100px"
                }
              })
            }
          };
          return {title:l.title,key:l.dataIndex};
        });
        this.columns.unshift({type:"index",title:"序号"});
        this.data = data.result;
      });
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .patent_container{
    width: 1200px;
    margin:0 auto;
    padding-top: 50px;
    header{
      font-size: 22px;
      color: #333333;
      line-height: 45px;
      img{
        position: relative;
        top:3px;
      }
    }
    .description{
      font-size: 16px;
      padding-bottom: 4px;
      border-bottom:@border3;
      span{
        margin-right: 8px;
        &:nth-last-of-type(1){
          font-size: 14px;
          color:#337ab7;
          cursor: pointer;
        }
      }
      .tip{
        display: inline-block;
        height: 20px;
        width: 40px;
        border: 1px solid #FC7C63;
        color: #FC7C63;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
        position: relative;
        top:-2px;
      }
    }
  }
</style>
