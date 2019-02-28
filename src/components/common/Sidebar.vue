<template>
    <div class="sidebar">
       <el-footer>
        <div>
          <div class="icon_f">
            <img src="/static/img/u11.png" alt="">
          </div>
          <div class="foot_left">
            <h3>捕影平台更多产品</h3>
            <!-- <ul>
              <li>云悉情报</li> 
              <li>云悉指纹</li>
            </ul> -->
          </div>
          <div class="foot_center">
            <h3>关于我们</h3>
            <p>ATK  TEAM</p>
          </div>
          <div class="foot_right">
            <h3>关注捕影</h3>
            <div class="erweima">
              <img src="/static/img/login/u13052.jpg" alt="">
            </div>
          </div>
          <p class="botm">捕影使用协议   | Powered by ATK TEAM | Copyright  Ⓒ  2017 yunsee.cn All Rights Reserved  |  皖ICP备13019276号-2</p>
        </div>
      </el-footer> 
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data () {
        return {
            collapse: false,

        }
    },
    computed: {

    },
    created () {

    }
}
</script>

<style scoped>
.el-footer {
  background-color: RGB(57, 61, 73);
  height: 217px !important;
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 30px 40px;
  text-align: center;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
.foot_left {
  position: absolute;
  left: 580px;
  top: 40px;
}
.foot_left ul li {
  list-style: none;
  font-weight: 400;
  padding-top: 10px;
}
.el-footer h3 {
  font-size: 14px;
}
.icon_f img {
  border-width: 0px;
  position: absolute;
  left: 200px;
  top: 40px;
  width: 140px;
  height: 57px;
}
.botm {
  margin-top: 150px;
  font-weight: 400;
}
.foot_center {
  position: absolute;
  left: 900px;
  top: 40px;
}
.foot_center p {
  padding-top: 10px;
  font-weight: 400;
}
.foot_right {
  position: absolute;
  left: 1200px;
  top: 40px;
}
.foot_right h3 {
  margin-left: 10px;
}
.erweima img {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 30px;
  width: 90px;
  height: 90px;
}
@media screen and (max-width: 1366px) {
  .icon_f img {
    left: 100px;
  }
  .foot_left {
    left: 380px;
  }
  .foot_center {
    left: 650px;
  }
  .foot_right {
    left: 900px;
  }
}
</style>
