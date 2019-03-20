<template>
	<div class="ret_passworld">
      <div class="container_box">
        <div class="form_left">
          <el-tabs>
            <!-- {{count}} -->
              <header class="registered">找回密码 <span @click="rebackPhoneEmail"><a>{{rebackPhoneEmailTxt}}</a></span></header>
              <div class="registerPanel">
                <div v-bind:class="{ phonepanel:true,color:isPhone }">
                  01
                  <p>{{phoneEmailContext}}</p>
                </div>
                <div class="paneline"></div>
                <div v-bind:class="{ color:isReset }">
                  02
                  <p>重置密码</p>
                </div>
              </div>
              <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <div v-show="repassw">
                  <div v-show="reback">
                    <el-form-item
                      prop="email">
                      <el-input type="username" name="username" v-model="ruleForm2.email" auto-complete="off" placeholder="请输入注册时的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="authcod"
                    :rules="[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                      ]"
                    >
                      <el-input v-model="ruleForm2.authcod" auto-complete="off" placeholder="请输入邮箱验证码" class="code"></el-input>
                      <el-button @click="getCode" :disabled="disablecode">{{codeText}}</el-button>
                    </el-form-item>
                  </div>
                  <div v-show="!reback">
                    <el-form-item prop="phone">
                      <el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入注册时使用的手机号"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="phoneAuthcod"
                    :rules="[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                      ]"
                    >
                      <el-input v-model="ruleForm2.phoneAuthcod" auto-complete="off" placeholder="请输入短信验证码" class="code"></el-input>
                      <el-button @click="getCode" :disabled="disablecode">{{codeText}}</el-button>
                    </el-form-item>
                  </div>
                </div>
                <div v-show="!repassw">
                  <el-form-item prop="newPass">
                      <el-input type="password" v-model="ruleForm2.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="rpnewPass">
                      <el-input type="password" v-model="ruleForm2.rpnewPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
                  </el-form-item>
                </div>
                <el-form-item class="goback">
                  <el-button type="primary" @click="goback">{{gobackText}}</el-button>
                </el-form-item>
              </el-form>
          </el-tabs>
        </div>
        <div class="form_right">
          <img src="/static/img/bg_right2.jpg" alt="" class="bg_right">
          <!-- <div class="box_right">
            <img src="../../../static/img/login/u13052.jpg" alt="">
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
// import store from '@/vuex/store'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'retpassworld',
  data: function () {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
        this.emailcheck = true;
      } else {
        let remail = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (remail.test(value)) {
          callback();
          this.disablecode = false;
          this.emailcheck = false;
        } else {
          this.emailcheck = true;
          this.disablecode = true;
          callback(new Error('请输入正确的邮箱'));
        }
        // callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
        this.phonecheck = true;
      } else {
        let rephone = /^1\d{10}$/;
        if (rephone.test(value)) {
          callback();
          this.phonecheck = false;
        } else {
          this.phonecheck = true;
          callback(new Error('请输入正确的手机号'));
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
        if (this.ruleForm2.rpnewPass !== '') {
          this.$refs.ruleForm2.validateField('rpnewPass');
        }
        
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        this.pass2check = true;
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.newPass) {
        callback(new Error('两次输入密码不一致!'));
        this.pass2check = true;
      } else {  
        this.pass2check = false;
        callback();  
      }
    };
    return {
      ruleForm2: {
        email: '',
        authcod: '',
        phone: '',
        phoneAuthcod: '',
        newPass: '',
        rpnewPass: '',
      },
      isPhone: true,
      isReset:false,
      repassw: true,
      gobackText:"找回密码",
      reback: true,
      rebackPhoneEmailTxt: "通过手机号找回",
      phoneEmailContext: "输入邮箱地址",
      rules2: {
        email: [
          { validator: validateEmail, trigger: 'change'}
        ],
        phone:[
          { validator: validatePhone, trigger: 'change'}
        ],
        newPass: [
          {validator: validatePass, trigger: 'change' }
        ],
        rpnewPass: [
          {validator: validatePass2, trigger: 'change' }
        ]
      },
      emailcheck: true,
      phonecheck: true,
      passcheck: true,
      pass2check: true,
      disablecode: true,
      codeText: '获取验证码',
      codeTime: 60,
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   console.log("准备进入pass模板");
  //   next();
  // },
  // beforeRouteLeave: (to, from, next) => {
  //   console.log("准备离开pass模板");
  //   next();
  // },
  methods: {
    handleClick (tab, event) {

    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    getCode () {
      var _self = this;
      if(this.reback){
        if(this.emailcheck){
          _self.$message.error("表单验证不通过");
          return;
        }
        this.$axios.post(process.env.API_HOST+"/api/user/get_VerifyCode",{
          phone_email:this.ruleForm2.email,
          action:'forgot'
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
      }else{
        if(this.phonecheck){
          _self.$message.error("表单验证不通过");
          return;
        }
        this.$axios.post(process.env.API_HOST+"/api/user/get_VerifyCode",{
          phone_email:this.ruleForm2.phone,
          action:'forgot'
        }).then((res) => {
          // console.log(res.data);
          _self.$message.success(res.data.info)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }
      
    },
    goback () {
      var _self = this;
      if(this.repassw){
        if(this.reback){
          //邮箱找回
          if(!this.ruleForm2.email || !this.ruleForm2.authcod || this.emailcheck){
            _self.$message.error("表单验证不通过");
            return;
          }
          this.$axios.post(process.env.API_HOST+"/api/user/forgot_password/email",{
            email:this.ruleForm2.email,
            verify_code:this.ruleForm2.authcod
          }).then((res) => {
            // console.log(res.data);
            _self.$message.success(res.data.info)
            this.isPhone = false;
            this.isReset = true;
            this.gobackText = "确定";
            this.repassw = false;
          }).catch((error) => {
            this.repassw = true;
            this.isPhone = true;
            this.isReset = false;
            this.gobackText = "找回密码";
            _self.$message.error(error.response.data.message);
          });
        }else{
          //手机号找回
          if(!this.ruleForm2.phone || !this.ruleForm2.phoneAuthcod || this.phonecheck){
            _self.$message.error("表单验证不通过");
            return;
          }
          this.$axios.post(process.env.API_HOST+"/api/user/forgot_password/phone",{
            phone:this.ruleForm2.phone,
            verify_code:this.ruleForm2.phoneAuthcod
          }).then((res) => {
            // console.log(res.data);
            _self.$message.success(res.data.info)
          }).catch((error) => {
              _self.$message.error(error.response.data.message);
          });
        }
      }else{
        //重置密码
        if(this.reback){
          //邮箱重置
          if(this.passcheck || this.pass2check){
            this.$message.error("表单验证不通过");
            return;
          }
          _self.$axios.post(process.env.API_HOST+"/api/user/reset_password/email",{
            new_password:this.ruleForm2.newPass,
            password_confirmation:this.ruleForm2.rpnewPass,
            phone_email:this.ruleForm2.email
          }).then((res) => {
            _self.$message.success(res.data.info)
            _self.$router.push('/login');
          }).catch((error) => {
              _self.$message.error(error.response.data.message);
          });
        }else{
          //手机号重置
          if(this.passcheck || this.pass2check){
            this.$message.error("表单验证不通过");
            return;
          }
          _self.$axios.post(process.env.API_HOST+"api/user/reset_password/phone",{
            new_password:this.ruleForm2.newPass,
            password_confirmation:this.ruleForm2.rpnewPass,
            phone_email:this.ruleForm2.phone
          }).then((res) => {
            _self.$message.success(res.data.info)
            _self.$router.push('/login');
          }).catch((error) => {
              _self.$message.error(error.response.data.message);
          });
        }
      }
    },
    rebackPhoneEmail (){
      this.$message.error("暂未开放");
      return;
      this.reback = !this.reback;
      this.repassw = true;
      this.isPhone = true;
      this.isReset = false;
      this.gobackText = "找回密码";
      if(this.rebackPhoneEmailTxt === "通过手机号找回"){
        this.rebackPhoneEmailTxt = "通过邮箱找回";
      }else{
        this.rebackPhoneEmailTxt = "通过手机号找回";
      }
      if(this.phoneEmailContext === "输入邮箱地址"){
        this.phoneEmailContext = "验证手机号";
      }else{
        this.phoneEmailContext = "输入邮箱地址";
      }
    },
    buttonM(){
      this.$store.commit('repalce', 'rrrrrrr');
    }
  },
  mounted () {
    
  },
  // computed 计算属性
  computed: {
    count () {
      return this.$store.state.count;
    },
    ...mapState([
      'count'
    ])
  }
}
</script>
<style scoped lang="less">
.container_box {
  margin: auto;
  margin-top: 80px;
  margin-bottom: 60px;
  width: 1000px;
  height: 600px;
  box-shadow: 0 0 10px #cccccc;
}
.container_box .form_left {
  float: left;
  padding-top: 40px;
  padding-left: 60px;
}
.container_box .form_right {
  width: 550px;
  height: 600px;
  float: right;
  // margin: -20px;
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
  font-family: "Arial Normal", "Arial";
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
.code {
  width: 200px;
  margin-right: 10px;
}
.code + .el-button {
  width: 120px;
  height: 41px;
}
.denglu {
  margin-top: 80px;
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
.goback .el-button{
  width: 100%;
  height: 39px;
}
.registerPanel{
  margin: 20px auto;
  display: flex;
  justify-content:space-around;
  font-size: 28px;
  color: #999999;
}
.color{
  color: #409EFF !important;
}
.registerPanel p{
  font-size: 14px;
}
.paneline{
  width:20%;height:1px;background:#d8dce5;margin-top:27px;
}
</style>
<style>
.ret_passworld .el-form-item__content {
  margin-left: 0 !important;
  height: 41px;
}
.ret_passworld .el-form-item__content .el-input__inner {
  height: 41px;
}
.ret_passworld .el-input__inner {
  background-color: rgba(57, 61, 82, 0) !important;
}
</style>
