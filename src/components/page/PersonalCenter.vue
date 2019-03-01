<template>
<div class="personalcenter">
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#314057"
        text-color="#CCCCCC"
        active-text-color="#fff">
        <el-menu-item index="1" @click="homePage">
          <img src="/static/img/u176.png" alt="">
          <span slot="title">我的主页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="proFile">
          <i class="iconfont icon-ziyuan"></i>
          <span slot="title">资料修改</span>
        </el-menu-item>
        <el-menu-item index="3" @click="message">
          <img src="/static/img/u2083.png" alt="">
          <span slot="title">我的消息</span>
        </el-menu-item>
        <el-menu-item index="4" @click="checkRecord">
          <img src="/static/img/u177.png" alt="">
          <span slot="title">检查记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>
<script>
export default {
  name: 'personalcenter',
  data: function () {
    return {
     
    }
  },
  methods: {
    homePage () {
      this.$router.push('/home');
    },
    proFile () {
      this.$router.push('/personal/profile');
    },
    message () {
      this.$router.push('/personal/message');
    },
    checkRecord () {
      this.$router.push('/checkRecord');
    }
  },
  created () {

  },
  mounted () {

  }

}
</script>
<style scoped lang="less">
.personalcenter{
  background: #F0F2F5;
  padding: 20px 0;
}
.el-container{
  width: 1120px;
  margin: auto;
  // margin-bottom: 60px;
}
.iconfont{
  margin-right: 5px;
  color: white;
  font-size: 18px;
  padding-right: 17px;
}
.el-menu-vertical-demo{
  height: 640px;
}
.el-menu-item:hover{
  background-color: #283446 !important;
}
.el-menu-item img{
  width: 20px;
  height: 20px;
  padding-right: 20px;
  vertical-align: middle;
}
</style>
