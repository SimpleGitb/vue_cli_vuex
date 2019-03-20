<template>
<div class="homepage">
  <div class="headimg">
    <img src="/static/img/u17.png" alt="">
  </div>
  <div class="homepage_avator">
    <img :src="api+'/api/home/getAvator/?url='+imgurl" alt="头像">
  </div>
  <h3 v-text="username"></h3>
  <div class="basicInfo">
    <span class="interDegree">
      <el-tooltip class="item" effect="dark" placement="bottom-start">
        <div slot="content" class="tooltip_content">
          <span>等级名：积分范围</span>
          <ul v-for="(range,key) in homeData.level_range" :key="range.index" class="interRange">
            <li>{{key}}：  {{range.start}} ~ {{range.end}}</li>
          </ul>
        </div>
        <el-button>
          <img src="/static/img/u2239.png" alt="">
          <span v-text="homeData.level_name"></span>
        </el-button>
      </el-tooltip>
    </span>
    <img src="/static/img/u2241.png" alt="">
    <span>已加入{{homeData.join_day}}天</span>
    <img src="/static/img/u2240.png" alt="">
    <span>{{homeData.integral}}积分</span>
  </div>
  <div class="sigNature">
    <span>({{homeData.signature}})</span>
  </div>
  <div class="activity">
    活跃值：
    <el-progress :percentage="homeData.active"></el-progress>
  </div>
</div>
</template>
<script>
export default {
  name: 'homepage',
  data: function () {
    return {
      imgurl:'',
      api:'',
      username:'admin',
      config:{},
      homeData:{},
      level_name:''
    }
  },
  methods: {
    fetchData(){
      this.config = {
          headers: {
              'token':localStorage.token,
              'userid':localStorage.userid
          }
      };
      this.$axios.get(process.env.API_HOST+"/api/home/index",this.config).then((res) => {
          this.homeData = res.data.data;
          // this.homeData.level_range.map(function(range){
          //    console.log(range)
          // })
          for(var range in this.homeData.level_range){
            if(range == this.level_name){
              console.log(this.homeData.level_range[range])
            }
          }
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    }
  },
  created () {
    this.api = process.env.API_HOST;
    this.imgurl  = localStorage.imgurl;
    this.username = localStorage.name;
    this.fetchData();
  },
  mounted () {
    // console.log(this.$route)
  }

}
</script>
<style scoped lang="less">
.homepage{
  background: #ffffff;
  height: 500px;
  padding: 0 20px;
  padding-top: 65px;
  padding-bottom: 20px;
  margin: 0 250px;
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
}
.headimg{
    position: absolute;
    top: 90px;
    background: #409EFF;
    border-radius: 3px;
    width: 62px;
    height: 62px;
    text-align: center;
		box-shadow: 0px 0px 5px #a2a1a1;
    img{
      width: 30px;
      height: 30px;
      margin-top: 13px;
    }
}
h3{
  font-weight: 400;
  color: #333333;
  font-size: 22px;
}
.basicInfo{
  margin-top: 10px;
  color: #666666;
  img{
    width: 20px;
    height: 20px;
    vertical-align: sub;
  }
  span{
    margin-left: 10px;
    margin-right: 20px;
  }
}
.sigNature{
  color: #999999;
  margin: 20px 0;
}
.activity{
  color: #666666;
  .el-progress{
    display: inline-block;
    width: 100px;
    
  }
}
@media screen and (max-width: 1566px) {
.homepage{
  height: 400px;
} 
}
.homepage_avator img{
  width: 120px;
  height: 120px;
  border-radius: 50px;
}
.interDegree{
  cursor: pointer;
  margin-right: 10px;
}
.interRange li{
  line-height: 20px;
}
</style>
<style>
.homepage .el-progress__text{
    display: none !important;
  }
.homepage .el-progress-bar{
    padding-right: 0;
    margin-right: 0;
  }
/* 文字提示封装修改 */
.homepage .el-button{
    border: 0;
    padding: 0;
    background: transparent;
}
.homepage .el-button+.el-tooltip{
    margin-left: 0;
}
.homepage .el-button+.el-button{
    margin-left: 0;
}
</style>
