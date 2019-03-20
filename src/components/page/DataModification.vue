<template>
<div class="datamodification">
  <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top" style="height: 510px;">
    <el-tab-pane label="我的资料" name="first">
      <div class="myData">
        <div  class="mydata_heard">
          <i class="iconfont icon-ziliaoxiugai"></i>
          我的资料
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="城市:" prop="city">
            <!-- <el-input v-model="ruleForm.city"></el-input> -->
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>

          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="man">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="签名:">
            <el-input type="textarea" v-model="ruleForm.signature" :rows="6" placeholder="个性签名~"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" class="mydata_button" @click="MyDataSure">确认修改</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="头像修改" name="second">
      <div class="myData avatar">
        <div  class="avatar_heard">
          <i class="iconfont icon-touxiang1"></i>
          头像修改
        </div>
        <!-- <img :src="'http://192.168.30.135/api/home/getAvator/?url='+imgurl" alt=""> -->
        <div class="pictureUpload">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="customize"
            :http-request="requsetHttp"
            :before-upload="beforeAvatarUpload"
            list-type="picture">
            <ul class="el-upload-list el-upload-list--picture">
                <li class="el-upload-list__item is-ready syncAvator">
                  <img :src="api+'/api/home/getAvator/?url='+imgurl" alt="">
                </li>
              </ul>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过1M
                
            </div>
          </el-upload>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="密码修改" name="third">
      <div class="myData passModify">
        <div  class="passModify_heard">
          <i class="iconfont icon-mimaxiugai"></i>
          密码修改
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="现在的密码:" prop="nowpass">
            <el-input v-model="ruleForm2.nowpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码:" prop="newpass">
            <el-input v-model="ruleForm2.newpass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkpass">
            <el-input v-model="ruleForm2.checkpass" type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" size="medium" class="passmodify_button" @click="passModifySure">确认修改</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import { regionData ,CodeToText,TextToCode } from 'element-china-area-data'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'datamodification',
  data: function () {
    var validatenowPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入现在的密码'));
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
        if (this.ruleForm2.checkpass !== '') {
          this.$refs.ruleForm2.validateField('checkpass');
        }
        
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        this.pass2check = true;
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.newpass) {
        callback(new Error('两次输入密码不一致!'));
        this.pass2check = true;
      } else {  
        this.pass2check = false;
        callback();  
      }
    };
    return {
      activeName: 'first',
      ruleForm:{
        email:'',
        name: '',
        city:'',
        phone:'',
        sex: 'man',
        signature: ''
      },
      ruleFormback:{},
      rules: {
          name: [
            {  message: '请输入用户名', trigger: 'blur' },
          ],
      },
      ruleForm2:{
        nowpass: '',
        newpass: '',
        checkpass: ''
      },
      rules2: {
          nowpass: [
            { validator: validatenowPass, trigger: 'blur' }
          ],
          newpass: [
            { validator: validatePass, trigger: 'change blur' }
          ],
          checkpass: [
            { validator: validatePass2, trigger: 'change blur' }
          ]
      },
      config:{},
      options: regionData ,
      selectedOptions: [],
      passcheck:true,
      pass2check:true,
      config:{},
      imgurl:'',
      api:''
    }
  },
  methods: {
    handleChange (value) {
      this.ruleForm.city = this.selectedOptions;
      // console.log(this.ruleForm.city)
      // console.log(CodeToText[this.selectedOptions[0]]+CodeToText[this.selectedOptions[1]]+CodeToText[this.selectedOptions[2]])
    },
    handleClick(tab, event) {
      // console.log(tab.label);
    },
    requsetHttp(params){
      this.$refs['upload'].clearFiles();
      var fileObj = params.file;
      var form = new FormData();
      // 文件对象
      form.append("avator", fileObj);
      // console.log(form.get('file_name'));
      this.config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'token':localStorage.token,
              'userid':localStorage.userid
          },
          // onUploadProgress: progressEvent => {
          //     var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          //     this.percentage = complete
          // },
          // timeout: 600000
      }
      this.$axios.post(process.env.API_HOST+"/api/home/uploadAvatar",form,this.config).then((res) => {
          this.$message.success(res.data.info);
          localStorage.imgurl = res.data.data.url;
          this.imgurl = res.data.data.url;
          this.$store.commit('repalce', localStorage.imgurl);
          // this.$refs['upload'].clearFiles();
      }).catch(error => {
          this.$message.error(error.response.data.message);
      });
    },
    beforeAvatarUpload(file){
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 jpg/png格式!',
          type: 'warning'
        });
      }
      if(!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M
    },
    fecthData(){
      this.imgurl = localStorage.imgurl;
      this.config = {
        headers: {
            'token':localStorage.token,
            'userid':localStorage.userid
        }
      };
      this.$axios.get(process.env.API_HOST+"/api/home/person/index?userid="+localStorage.userid,this.config).then((res) => { 
        var data = res.data.data;
        this.ruleFormback = data[0];
        if(data){
          this.ruleForm.email = data[0].email;
          this.ruleForm.name = data[0].name;
          if(data[0].city){
            this.selectedOptions = data[0].city;
          }
          this.ruleForm.city = this.selectedOptions;
          this.ruleForm.phone = data[0].phone;
          this.ruleForm.sex = data[0].sex;
          this.ruleForm.signature = data[0].signature;
        }
      }).catch((error) => {
          this.$message.error(error.response.data.message);
      });
    },
    MyDataSure(){
      var update_content=[{email:'',name:'',city:'',phone:'',sex:'',signature:''}];
      if(this.ruleFormback.email !=this.ruleForm.email){
        update_content[0].email = this.ruleForm.email;
      }
      if(this.ruleFormback.name !=this.ruleForm.name){
        update_content[0].name = this.ruleForm.name;
      }
      if(this.ruleFormback.city !=this.ruleForm.city){
        update_content[0].city = this.ruleForm.city;
      }
      if(this.ruleFormback.phone !=this.ruleForm.phone){
        update_content[0].phone = this.ruleForm.phone;
      }
      if(this.ruleFormback.sex !=this.ruleForm.sex){
        update_content[0].sex = this.ruleForm.sex;
      }
      if(this.ruleFormback.signature !=this.ruleForm.signature){
        update_content[0].signature = this.ruleForm.signature;
      }
      // if(this.ruleForm == this.ruleFormback){
      //   this.$message.error('未修改任何内容');
      //   return;
      // }
      this.$axios.put(process.env.API_HOST+"/api/home/person/edit",{
          _id:this.ruleFormback._id.$oid,
          update_content:this.ruleForm
        },this.config).then((res) => {
          localStorage.name = this.ruleForm.name;
          this.$message.success(res.data.info);
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    passModifySure(){
      if(!this.ruleForm2.nowpass){
        this.$message.error('请填写现在的密码');
        return;
      }
      if(!this.ruleForm2.newpass){
        this.$message.error('请填写新密码');
        return;
      }
      if(!this.ruleForm2.checkpass){
        this.$message.error('请填写确认密码');
        return;
      }
      if(this.pass2check == true||this.passcheck  == true){
        return;
      }
      this.$axios.put(process.env.API_HOST+"/api/home/person/password",{
          _id:this.ruleFormback._id.$oid,
          old_password:this.ruleForm2.nowpass,
          password:this.ruleForm2.newpass,
          password_confirmation:this.ruleForm2.checkpass
        },this.config).then((res) => {
          this.$message.success(res.data.info);
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    }
  },
  created () {
    this.api = process.env.API_HOST;
    this.fecthData();
  },
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
.datamodification{
  background: #ffffff;
  min-height: 600px;
  padding: 20px;
  // padding-top: 20px;
}
.myData{
  // border: 1px solid #ebebeb;
  // border-radius: 3px;
  transition: .2s;
  border-top: 5px solid #409EFF;
  width: 98%;
  min-height: 500px;
  padding: 20px 30px;
  box-sizing: border-box;
  font-size: 16px;
  i{
    font-size: 24px;
    vertical-align: sub;
    padding-right: 20px;
  }
  .mydata_heard{
    color: #409EFF;
  }
  .el-form{
    margin-top: 30px;
    .el-input{
      width: 380px;
    }
  }
  .el-textarea{
    width: 50% !important;
  }
  .mydata_button{
    margin-top: 20px;
    margin-left: 720px;
  }
}
.avatar{
  border-top: 5px solid #FF9933;
  .avatar_heard{
    color: #FF9933;
  }
  .pictureUpload{
    margin-top: 30px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    padding: 20px 40px;
    .upload-demo{
      width: 60%;
    }
  }
  .pictureUpload:hover{
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),0 2px 4px 0 rgba(232, 237, 250, .5);
  }
}
.passModify{
  border-top: 5px solid #67C23A;
  .passModify_heard{
    color: #67C23A;
    i{
      font-size: 26px;
    }
  }
  .passmodify_button{
    margin-top: 20px;
    margin-left: 380px;
  }
}
@media screen and (max-width: 1566px) {
  .myData{
    .mydata_button{
      margin-left: 548px;
    }
  }
}
.syncAvator img{
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    margin-left: -80px;
}
</style>
<style>
.datamodification .el-form-item__label{
  text-align: left !important;
}
.datamodification .el-upload-list--picture .el-upload-list__item{
  border: 0;
}
</style>

