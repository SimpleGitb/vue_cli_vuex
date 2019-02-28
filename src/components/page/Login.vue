<template>
	<div class="login-wrap">
      
      <div class="container_box">
        <div class="form_left">
          <el-tabs>
            <div class="registered_home" v-show="showhide">
              <header class="registered">注册 <span @click="registeredClick">已有账号,<a>直接登录</a></span></header>
              <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item  
                  prop="username"
                  :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                  ]">
                  <el-input v-model="ruleForm2.username" placeholder="用户名" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item
                  prop="email"
                >
                <el-input type="username" name="username" v-model="ruleForm2.email" placeholder="手机/邮箱地址" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item
                  prop="authcod"
                  :rules="[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                  ]"
                  >
                  <el-input v-model="ruleForm2.authcod" placeholder="输入验证码" class="code" auto-complete="off"></el-input>
                  <el-button @click="registerGetCode" :disabled="disablecode">{{codeText}}</el-button>
                </el-form-item>
                <el-form-item  prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" placeholder="设置密码" auto-complete="off" @focus="passTip = true"></el-input>
                </el-form-item>
                <!-- <div class="pass_tip" v-if="passTip">
                  <span>*</span>
                  <span>6-20个字符且必须包含大小写字母及数字</span>
                </div> -->
                <el-form-item prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
                </el-form-item>
                
                <div class="invitecode_tip">
                  <el-checkbox v-model="ruleForm2.checked">
                    我已同意
                    <a href="http://www.yunsee.cn/protocol.html" target="_blank" style="pointer-events: auto; color: #35a3d6; padding:0;margin-bottom: 5px;  font-size: 12px;background-color: #fff;">《捕影用户使用协议》</a>
                  </el-checkbox>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="registerMethod">立即注册</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="login_home" v-show="!showhide">
              <header class="registered">登录 <span @click="loginClick">没有捕影账号,<a>立即注册</a></span></header>
              <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" class="demo-ruleForm">
                <div v-show="denglustyle">
                  <el-form-item  prop="email">
                    <el-input type="username" name="username" v-model="ruleForm3.email" placeholder="手机/邮箱"></el-input>
                  </el-form-item>
                  <el-form-item  prop="pass">
                    <el-input type="password" name="pwd" v-model="ruleForm3.pass" placeholder="登录密码" auto-complete="off"></el-input>
                  </el-form-item>
                </div>
                <div v-show="!denglustyle">
                  <el-form-item prop="phone">
                    <el-input v-model="ruleForm3.phone" placeholder="手机/邮箱" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item
                    prop="authcod"
                    :rules="[
                      { required: true, message: '请输入验证码', trigger: 'blur' },
                    ]"
                    >
                    <el-input v-model="ruleForm3.authcod" placeholder="输入验证码" class="code" auto-complete="off"></el-input>
                    <el-button @click.prevent="getCode" :disabled="disabledGetcode">{{GetcodeLogin}}</el-button>
                  </el-form-item>
                </div>
                <el-form-item class="denglu">
                  <el-button type="primary" @click="loginMethod">立即登陆</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="text" style="float:left" @click="dengleStyle">{{dengluText}}</el-button>
                  <el-button type="text" @click="forget" style="float:right">忘记密码？</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tabs>
        </div>
        <div class="form_right">
          <img src="/static/img/bg_right2.jpg" alt="" class="bg_right">
          <!-- <div class="box_right">
            <img src="/static/img/login/u13052.jpg" alt="">
            <ul>
              <li>云悉官方公众号（关注后回复邀请码）</li>
              <li>云悉官方QQ群：580032224</li>
              <li>不定期发放邀请码</li>
            </ul>
          </div> -->
        </div>
      </div>
	</div>
</template>
<script>
import {mapActions} from 'vuex';
require('../../../static/js/gt.js');
export default {
  name: 'login',
  data: function () {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机/邮箱地址'));
      } else {
        let rephone = /^1\d{10}$/;
        let remail = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (rephone.test(value) || remail.test(value)) {
          callback();
          this.logincheck = false;
          this.registercheck = false;
          this.disablecode = false;
        } else {
          this.logincheck = true;
          this.registercheck = true;
          this.disablecode = true;
          callback(new Error('请输入正确的手机号或邮箱'));
        }
        // callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机/邮箱地址'));
      } else {
        let rephone = /^1\d{10}$/;
        let remail = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (rephone.test(value) || remail.test(value)) {
          callback();
          this.phonelogincheck = false;
          this.disabledGetcode = false;
        } else {
          this.phonelogincheck = true;
          this.disabledGetcode = true;
          callback(new Error('请输入正确的手机号或邮箱'));
        }
        // callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        let repass = /^[a-zA-Z]\w{5,17}$/;
        if(repass.test(value)){
          this.passcheck = false;
          callback();
        }else{
          this.passcheck = true;
          callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线'));
          // 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
          // 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)
        }
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        this.pass2check = true;
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
        this.pass2check = true;
      } else {  
        this.pass2check = false;
        callback();  
      }
    };
    return {
      logincheck:true,
      phonelogincheck:true,
      registercheck:true,
      passcheck: true,
      pass2check: true,
      disablecode: true,
      disabledGetcode:true,
      codeText: '获取验证码',
      GetcodeLogin:"获取验证码",
      codeTime: 60,
      GetcodeTime:60,
      passTip: false,
      showhide: false,
      denglustyle: true,
      dengluText:"验证码登录",
      display: 'none',
      display1: 'block',
      checked: false,
      isThere: false,
      left: '400px',
      opacity: 0,
      // ruleForm: {
      //   username: '1244971159@qq.com',
      //   password: '4Z(G.34TFXuj*@\'
      // },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
      activeName: 'first',
      ruleForm2: {
        username:'',
        email: '',
        authcod:'',
        pass: '',
        checkPass: '',
        checked:true
      },
      rules2: {
        email: [
          { validator: validateEmail, trigger: 'change'}
        ],
        pass: [
          { validator: validatePass, trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'change' }
        ]
      },
      ruleForm3: {
        authcod: '',
        email: '',
        pass: '',
        phone: ''

      },
      rules3: {
        email: [
          { validator: validateEmail, trigger: 'change'}
        ],
        phone: [
          { validator: validatePhone, trigger: 'change'}
        ]
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    getCode () {
      if (!this.ruleForm3.email) {
        this.$message.error("请输入手机/邮箱");
        return;
      }
      var _self = this;
      this.$axios.post(process.env.API_HOST+"/api/user/get_VerifyCode",{
        phone_email:this.ruleForm3.email,
        action:'login'
      }).then((res) => {
        // console.log(res.data);
        _self.$message.success(res.data.info);
         _self.disabledGetcode = true;
        var iCode = setInterval(function(){
          _self.GetcodeLogin = _self.GetcodeTime+"秒后重新获取";
          _self.GetcodeTime --; 
          if(_self.GetcodeTime === -1){
            clearInterval(iCode);
            _self.GetcodeTime = 60;
            _self.disabledGetcode = false;
            _self.GetcodeLogin = '获取验证码';
          }
        },1000);
        
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
      });
    },
    forget () {
      this.$router.push('/retpass');
    },
    registeredClick () {
      this.showhide = false;
    },
    loginClick (){
      this.showhide = true;
    },
    dengleStyle (){
      this.denglustyle=!this.denglustyle
      if(this.denglustyle==true){
        this.dengluText = "验证码登录";
      }else{
        this.dengluText = "密码登录";
      }
    },
    registerGetCode(){
      if (!this.ruleForm2.email) {
        this.$message.error("请输入手机/邮箱");
        return;
      }
      var _self = this;
      this.$axios.post(process.env.API_HOST+"/api/user/get_VerifyCode",{
        phone_email:this.ruleForm2.email,
        action:'register'
      }).then((res) => {
        // console.log(res.data);
        _self.$message.success(res.data.info)
        _self.disablecode = true;
        var iCode = setInterval(function(){
          _self.codeText = _self.codeTime+"秒后重新获取";
          _self.codeTime --; 
          if(_self.codeTime === -1){
            clearInterval(iCode);
            _self.codeTime = 60;
            _self.disablecode = false;
            _self.codeText = '获取验证码';
          }
        },1000);
        
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
      });
    },
    registerMethod(){
      if(!this.ruleForm2.username){
        this.$message.error("请输入用户名");
        return;
      }else if (!this.ruleForm2.email) {
        this.$message.error("请输入手机/邮箱");
        return;
      }else if (!this.ruleForm2.pass) {
        this.$message.error("请输入密码");
        return;
      }else if (!this.ruleForm2.authcod) {
        this.$message.error("请输入验证码");
        return;
      }else if (this.ruleForm2.pass != this.ruleForm2.checkPass) {
        this.$message.error("两次输入密码不一致");
        return;
      }else if(this.registercheck || this.passcheck || this.pass2check){
        this.$message.error("表单验证不通过");
        return;
      }
      // var is_agree;
      // if(this.ruleForm2.checked = true){
      //   is_agree = 1
      // }else{
      //   is_agree = 0;
      // }
      var _self = this;
      this.$axios.post(process.env.API_HOST+"/api/user/register",{
        name: this.ruleForm2.username,
        password:this.ruleForm2.pass,
        password_confirmation:this.ruleForm2.checkPass,
        phone_email:this.ruleForm2.email,
        verify_code:this.ruleForm2.authcod,
        is_agree:Number(this.ruleForm2.checked)
      }).then((res) => {
        // console.log(res.data);
        _self.$message.success("注册成功")
        _self.showhide = false;
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
      });
    },
    loginMethod(){
      var action='';
      if(this.denglustyle==true){
        action = 'by_password';
        if (!this.ruleForm3.email) {
          this.$message.error("请输入手机/邮箱");
          return;
        }else if (!this.ruleForm3.pass) {
          this.$message.error("请输入密码");
          return;
        }else if(this.logincheck){
          this.$message.error("表单验证不通过");
          return;
        }
      }else{
        action = 'by_verify_code';
        if(!this.ruleForm3.phone){
          this.$message.error("请输入手机/邮箱");
          return;
        }else if(!this.ruleForm3.authcod){
          this.$message.error("验证码不能为空");
          return;
        }else if(this.phonelogincheck){
          this.$message.error("表单验证不通过");
          return;
        }
      }
      var _self = this;
      this.$axios.post(process.env.API_HOST+"/api/user/login",{
        phone_email:this.ruleForm3.email,
        action:action,
        password:this.ruleForm3.pass,
        verify_code:this.ruleForm3.authcod
      }).then((res) => {
        // console.log(res.data);
        sessionStorage.token = res.data.data.token;
        sessionStorage.name = res.data.data.user_name;
        localStorage.username = this.ruleForm3.email;
        // this.$axios.defaults.headers.common['token'] = res.data.data;
        _self.$message.success("登录成功");
        setTimeout(function(){
          _self.$router.push('upload');
        },500)
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
      });
    }
  },
  mounted () {
    // var _this = this;
    // var handlerPopup = function (captchaObj) {
    //   captchaObj.onReady(function () {
    //     _this.display1 = 'none';
    //   }).onSuccess(function () {
    //     var result = captchaObj.getValidate();
    //     if (!result) {
    //       _this.$message.error('请完成验证');
    //       return;
    //     };
    //     _this.$axios.post('api/login', {
    //       email: _this.ruleForm.username,
    //       password: _this.ruleForm.password,
    //       remember: Number(_this.checked),
    //       geetest_challenge: result.geetest_challenge,
    //       geetest_validate: result.geetest_validate,
    //       geetest_seccode: result.geetest_seccode
    //     }).then((res) => {
    //       let data = res.data;
    //       console.log(data.status);
    //       if (data.status) {
    //         _this.$message.success(data.msg);
    //         sessionStorage.ms_username = _this.ruleForm.username;
    //         _this.$router.push('/');
    //         // sessionStorage.setItem('ms_username',_this.ruleForm.username);
    //       } else {
    //         _this.$message.error(data.msg);
    //         setTimeout(function () {
    //           _this.display = "none";
    //         }, 1500);
    //       }
    //     })
    //   });
    //   document.getElementById('btn').onclick = function () {
    //     captchaObj.verify();
    //   };

    //   // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
    // };

    // this.$axios.get("api/captcha?t=" + (new Date()).getTime()).then((res) => {
    //   let data = res.data;
    //   initGeetest({
    //     // 以下 4 个配置参数为必须，不能缺少
    //     gt: data.gt,
    //     challenge: data.challenge,
    //     offline: !data.success, // 表示用户后台检测极验服务器是否宕机
    //     new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
    //     timeout: '5000',
    //     product: "bind",    // 产品形式，包括：float，popup
    //     width: "300px"
    //     // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
    //   }, handlerPopup);
    // })
    
  }

}
</script>
<style scoped lang="less">              
.login-wrap {
  text-align: center;
  height: 100%;
  /* overflow-y: auto; */
}
#username {
  background-color: rgba(57, 61, 82, 0) !important;
}
#password {
  background-color: rgba(57, 61, 82, 0) !important;
}
.container_box {
  margin: auto;
  margin-top: 80px;
  margin-bottom: 60px;
  width: 1000px;
  height: 600px;
  box-shadow: 0 0 10px #cccccc;
  overflow: hidden;
}
.container_box .form_left {
  float: left;
  padding-top: 40px;
  padding-left: 60px;
}
.container_box .form_right {
  width: 560px;
  height: 640px;
  float: right;
  margin: -20px;
}
.form_right .bg_right {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-tabs {
  width: 335px;
  text-align: center;
}
.el-form-item__content {
  margin-left: 0 !important;
}
.pass_tip,
.invitecode_tip {
  width: 335px;
  text-align: left;
  margin-bottom: 5px;
  font-family: "微软雅黑";
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
.invitecode_tip {
  margin-bottom: 25px;
}
.pass_tip span:nth-child(1),
.invitecode_tip span:nth-child(1) {
  font-family: "微软雅黑";
  font-weight: 400;
  color: #cc3333;
}
.invitecode_tip span:nth-child(2) {
  text-decoration: underline;
  color: #409eff;
  margin-bottom: 10px;
}
#geetest-captcha {
  margin: 30px 0 10px 0;
}
.hide {
  display: none;
}
.box_right {
  position: absolute;
  margin-top: -170px;
  margin-left: 70px;
  width: 420px;
  height: 120px;
  background: white;
  text-align: left;
}
.box_right img {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
}
.box_right ul {
  float: left;
  margin-left: 10px;
  margin-top: 15px;
  font-size: 14px;
  li {
    list-style: none;
    margin-bottom: 15px;
  }
  li:nth-child(2) {
    color: #ff0000;
  }
}
.divider {
  margin-bottom: 20px;
  text-align: center;
}
.divider span {
  color: #999999;
  font-size: 13px;
  position: absolute;
  left: 110px;
  top: 160px;
  width: 100px;
  background: white;
  z-index: 1000;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #dfe4ed;
}
.code {
  width: 200px;
  margin-right: 10px;
}
.code + .el-button {
  width: 120px;
  height: 41px;
}
.denglu {
  margin-top: 60px;
  margin-bottom: 0;
}
.denglu .el-button{
  width: 100%;
  height: 39px;
}
.registered{
  border-left: 3px solid #409EFF;
  text-align: left;
  padding-left: 10px;
  margin-bottom:30px;
  font-family: "微软雅黑";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  overflow: hidden;
}
.registered span{
  float: right;
  color:#999999;
  font-size: 13px;
}
.registered span a{
  // text-decoration:underline;
  color:#409EFF;
  margin-left: 5px;
}
.login_home{
  clear: both;
}
</style>
<style>
.login-wrap .el-form-item__content {
  margin-left: 0 !important;
  height: 41px;
}
.login-wrap .el-form-item__content .el-input__inner {
  height: 41px;
}
.login-wrap .el-input__inner {
  background-color: rgba(57, 61, 82, 0) !important;
}
.el-input__inner{
  /* border-radius: 0; */
}
</style>

