<template>
<div class="myinformation">
  <div class="system_heard">
    <i class="iconfont icon-xiaoxi"></i>
    系统通知
  </div>
  <!-- 消息折叠面板 -->
  <el-collapse accordion>
    <el-collapse-item>
      <template slot="title">
        <div class="sys-badge">
          <div class="sys-badge_content"></div>
        </div>
        【异常更新】6月27日部分账号登陆访问异常通告
        <span class="system_time" is-dot>2019-03-13 10:11:26</span>
      </template>
      <h3>【异常更新】6月27日部分账号登陆访问异常通告</h3>
      <div class="system_content">近日爆出的Intel处理器的Meltdown与Spectre漏洞,存在极其严重的安全风险，可能导致内核信息泄露、权限提升等问题。UCloud已经积极和Intel、微软以及各Linux厂商沟通验证解决方案。针对UCloud的云主机产品，解决该安全隐患的完整修复方案包含两个部分，一是云平台的热补丁修复，二是云主机的操作系统/内核更新。近日爆出的Intel处理器的Meltdown与Spectre漏洞,存在极其严重的安全风险，可能导致内核信息泄露、权限提升等问题。UCloud已经积极和Intel、微软以及各Linux厂商沟通验证解决方案。针对的云主机产品，解决该安全隐患的完整修复方案包含两个部分，一是云平台的热补丁修复，二是云主机的操作系统/内核更新。</div>
    </el-collapse-item>
    <el-collapse-item>
      <template slot="title">
        <span :class="{isShadow:isShadowbool}">
          <div class="sys-badge" :style="{visibility: isShadowbool == true?'hidden':''}">
            <div class="sys-badge_content"></div>
          </div>
          【异常更新】6月27日部分账号登陆访问异常通告
          <span class="system_time" is-dot>2019-03-13 10:11:26</span>
        </span>
      </template>
      <h3>【异常更新】6月27日部分账号登陆访问异常通告</h3>
      <div class="system_content">近日爆出的Intel处理器的Meltdown与Spectre漏洞,存在极其严重的安全风险，可能导致内核信息泄露、权限提升等问题。UCloud已经积极和Intel、微软以及各Linux厂商沟通验证解决方案。针对UCloud的云主机产品，解决该安全隐患的完整修复方案包含两个部分，一是云平台的热补丁修复，二是云主机的操作系统/内核更新。近日爆出的Intel处理器的Meltdown与Spectre漏洞,存在极其严重的安全风险，可能导致内核信息泄露、权限提升等问题。UCloud已经积极和Intel、微软以及各Linux厂商沟通验证解决方案。针对的云主机产品，解决该安全隐患的完整修复方案包含两个部分，一是云平台的热补丁修复，二是云主机的操作系统/内核更新。</div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script>
export default {
  name: 'myinformation',
  data: function () {
    return {
      isShadowbool:true
    }
  },
  methods: {
    
  },
  created () {
  },
  mounted () {}

}
</script>
<style scoped lang="less">
.myinformation{
  background: #ffffff;
  min-height: 600px;
  padding: 20px;
}
.system_heard{
  color: #409EFF;
  font-size: 16px;
  i{
    font-size: 24px;
    vertical-align: sub;
    padding-right: 10px;
  }
}
.el-collapse{
  margin-top: 30px;
}
h3{
  font-size: 18px;
  color: #555555;
  margin: auto;
  text-align: center;
  font-weight: normal;
}
.system_content{
  text-indent: 2em;
  font-weight: 400;
  font-style: normal;
  color: #666666;
  line-height: 28px;
}
.system_time{
  float: right;
  margin-right: 40px;
}
@media screen and (max-width: 1566px) {

}
.sys-badge{
  position: relative;
  vertical-align: super;
  display: inline-block;
  margin-left: 30px;
  margin-right: 10px;
  .sys-badge_content{
    position: absolute;
    height: 5px;
    width: 5px;
    padding: 0;
    right: 0;
    border-radius: 50%;
    background-color: #409EFF;
  }
}
.isShadow{
  color: #999999;
}
</style>
<style>
.myinformation .el-collapse-item__content{
  padding-left: 60px;
  padding-right: 60px;
}
</style>


