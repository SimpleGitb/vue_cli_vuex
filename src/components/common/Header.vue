<template>
    <div class="header">
       <el-header>
        <div class="icon" @click="homePage">
            <img src="/static/img/u128.png" alt="">
        </div>
        <div class="header_title">
          <p><span>捕影主机检查系统</span></p>
        </div>
        <!-- <ul class="yunsee">
            <li @click="assetClick" :class="{activeA:isA}">云悉资产</li>
            <li @click="fingerClick" :class="{activeB:isB}">
            <el-dropdown trigger="click" :class="{color:isB}">
              <span class="el-dropdown-link">
                云悉指纹<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>批量任务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </li>
        </ul>
        <ul class="number" v-if="detection">
          <li style="padding-top:10px">指纹特征量：6126</li>
          <li>总检测次数：317765</li>
        </ul> -->
        <div class="Login_right" @click="personCenter" :class="{show:isShow}">
          <el-dropdown @command="handleCommand" trigger="hover" placement="bottom-start"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="rgb(255, 208, 75)">
            <span class="el-dropdown-link">
              <!-- <img src="/static/img/u157.png" alt=""> -->
              <img :src="api+'/api/home/getAvator/?url='+imgurl" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="username_class">
                {{name}} <span>12积分</span>
                <p>见习情报员</p>
              </div>
              <el-dropdown-item command="personal">
                <img src="/static/img/u176.png" alt="">我的主页
              </el-dropdown-item>
              <el-dropdown-item command="dataModification">
                  <i class="iconfont icon-ziyuan"></i>资料修改
              </el-dropdown-item>
              <el-dropdown-item command="myinformation">
                <img src="/static/img/u2083.png" alt="">我的消息
              </el-dropdown-item>
              <el-dropdown-item command="checkRecord">
                <img src="/static/img/u177.png" alt="">检查记录
              </el-dropdown-item>
              <el-dropdown-item command="loginout">
                <el-button type="info">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
       </el-header>
    </div>
</template>
<script>
import bus from '../common/bus';
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isA: false,
      isB: false,
      detection: false,
      name:'admin',
      isShow:true,
      imgurl:'',
      api:''
    }
  },
  methods: {
    assetClick () {
      this.$router.push('/upload');
      this.isA = true;
      this.isB = false;
      this.detection = false;
    },
    fingerClick () {
      this.$router.push('/finger');
      this.isA = false;
      this.isB = true;
      this.detection = true;
    },
    homePage () {
      this.$router.push('/upload');
    },
    personCenter () {
      // this.isA = false;
      // this.isB = false;
      // this.detection = false;
      // this.$router.push('/personal/home');
    },
    handleCommand(command) {
      switch(command){
        case 'loginout':
          window.location.href='/login';
          // localStorage.removeItem(name);
          // localStorage.removeItem(token);
          localStorage.clear();
          break;
        case 'personal':
          this.$router.push('/home');
          break;
        case 'dataModification':
          this.$router.push('/dataModification');
          break;
        case 'myinformation':
          this.$router.push('/myinformation');
          break;
        case 'checkRecord':
          this.$router.push('/checkRecord');
          break;
      }
      // if(command == 'loginout'){
      //   window.location.href='/login';
      // }else if(command == 'personal'){
      //   this.$router.push('/personal/home');
      // }
    }
  },
  created () {
    this.api = process.env.API_HOST;
    if(this.$route.name != 'login'&&this.$route.name != 'retpass'){
      this.isShow = false;
      let username = localStorage.getItem('name');
      this.imgurl = localStorage.imgurl;
      if(username){
        this.name = username;
      }else{
        // window.location.href='/login';
        this.$router.push('/login');
      }
    }else{
      this.isShow = true;
    }
  },
  computed: {
    count () {
      return this.$store.state.count;
    },
    ...mapState([
      'count'
    ])
  },
  watch: {
      count: {
          handler: function(val){
              if(val){// 已获取
                  this.imgurl = val;
              }
          },
          immediate: true
      },
      $route(routers){
        if(routers.name != 'login'&&routers.name != 'retpass'){
          this.isShow = false;
          let username = localStorage.getItem('name');
          this.imgurl = localStorage.imgurl;
          if(username){
            this.name = username;
          }else{
            // window.location.href='/login';
            this.$router.push('/login');
          }
        }else{
          this.isShow = true;
        }
      }
  }
}

</script>
<style scoped lang="less">
.header {
  text-align: center;
}
.el-header {
  background-color: #324157;
}
.icon img {
  border-width: 0px;
  position: absolute;
  left: 30px;
  top: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.header_title{
  position: absolute;
  left: 90px;
  line-height: 60px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #FFFFFF;
}
.Login_right{
  position: absolute;
  // top: 9px;
  right: 110px;
  cursor: pointer;
  width: 90px;
  height: 60px;
  overflow: hidden;
}
.show{
  display: none;
}
.Login_right:hover{
  background: #283446;
}
.Login_right img{
  width: 42px;
  height: 42px;
  margin-top: 9px;
  border-radius: 40px;
}
.Login_right .el-dropdown{
  width: 100%;
}
.yunsee {
  list-style: none;
  position: absolute;
  left: 650px;
  li {
    display: inline-block;
    line-height: 65px;
    font-size: 14px;
    width: 120px;
    height: 55px;
    cursor: pointer;
    color: #cccccc;
    border-left: 3px solid #324157; 
  }
  li:nth-child(1):hover {
    color: #ffffff;
    border-bottom: 5px solid RGB(64, 158, 255);
  }
  li:nth-child(2):hover {
    color: #ffffff;
    border-bottom: 5px solid RGB(64, 158, 255);
  }
}
@media screen and (max-width: 1366px) {
  .yunsee{
    left: 400px;
  }
  .number{
    left: 735px !important;
  }
}
.activeA,
.activeB {
  color: #ffffff !important;
  border-bottom: 5px solid RGB(64, 158, 255);
}
.number{
  list-style: none;
  position: absolute;
  top: 0;
  left: 1000px;
  height: 60px;
  color: #cccccc;
  font-size: 13px;
  text-align: left;
  li{
    width: 130px;
    height: 20px;
  }
  li:hover{
    color: #ffffff;
  }
  
}
.el-dropdown{
  width: 120px;
  color: #cccccc;
}
.el-dropdown:hover{
  color: #ffffff;
}
.color{
  color: #ffffff;
}
//主页
.el-dropdown-menu{
  width: 200px;
  background: #324157;
  color: #FFFFFF;
}
.popper__arrow{
  border-bottom-color: #324157;
}
.el-dropdown-menu__item{
  color: #FFFFFF;
}
.el-dropdown-menu__item:hover{
  color: #409EFF;
  background: #324157 !important;
}
.username_class{
  padding: 0 20px;
  p{
    color: #409EFF;
    font-size: 14px;
    padding-top: 10px;
  }
  span{
    float: right;
    font-size: 12px;
    color: #F2F2F2;
    display: inline-block;
    width: 70px;
    line-height: 30px;
    background: #283446;
    text-align: center;
  }
}
.el-dropdown-menu__item img{
  width: 20px;
  height: 20px;
  vertical-align: sub;
  padding-right: 20px;
}
.iconfont {
    padding-right: 22px;
    font-size: 18px;
}
.el-button {
  background: transparent;
  float: right;
}
</style>
 