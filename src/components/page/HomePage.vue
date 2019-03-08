<template>
<div class="homepage">
  <div class="headimg">
    <img src="/static/img/u17.png" alt="">
  </div>
  <div>
    <img src="/static/img/u2229.png" alt="">
  </div>
  <h3>JXX</h3>
  <div class="basicInfo">
    <img src="/static/img/u2239.png" alt="">
    <span>见习情报员</span>
    <img src="/static/img/u2241.png" alt="">
    <span>已加入7天</span>
    <img src="/static/img/u2240.png" alt="">
    <span>24积分</span>
  </div>
  <div class="sigNature">
    <span>(个性签名)</span>
  </div>
  <div class="activity">
    活跃值：
  </div>
</div>
</template>
<script>
export default {
  name: 'homepage',
  data: function () {
    return {
     
    }
  },
  methods: {

  },
  created () {

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
}
</style>
