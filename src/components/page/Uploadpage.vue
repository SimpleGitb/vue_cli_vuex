<template>
	<div class="uploadpage">
    <div class="content-box"
      v-loading="loading"
      element-loading-text="数据上传中，请耐心等待。"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <img src="/static/img/u178.png" class="image">
        <div class="upload-box">
          <el-upload
            class="upload-demo"
            drag
            ref="upload"
            action="customize"
            :http-request="requsetHttp"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传json文件，且不超过50M</div>
          </el-upload>
        </div>
    </div>
    <div class="progressStyle" :class="{progressIs:!loading}"><el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress></div>
	</div>
</template>
<script>
export default {
  name: 'uploadpage',
  data: function () {
    return {
      loading:false,
      token:"",
      percentage: 0
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
    requsetHttp(params){
      this.$refs['upload'].clearFiles();
      this.loading = true;
      var fileObj = params.file;
      var form = new FormData();
      // 文件对象
      form.append("file_name", fileObj);
      // form.append("user_name", "admin");
      // console.log(form.get("file_name"));
      var _self = this;
      if(localStorage.token){
        this.token = localStorage.token;
      }
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'token':this.token,
              'userid':localStorage.userid
          },
          onUploadProgress: progressEvent => {
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            this.percentage = complete
          },
          timeout: 600000
      };
      this.$axios.post(process.env.API_HOST+"/api/report/import",form,config).then((res) => {
        // console.log(res.data.report_id)
        _self.loading = false;
        _self.$message.success("上传成功")
        setTimeout(function(){
          _self.$router.push({
            name:'checkRecord',
            params:{id:res.data.report_id}
            }
          );
        },500)
      }).catch(error => {
        _self.loading = false;
        if (error.response) {
            _self.$message.error(error.response.data.message);
        } else {
          _self.$message({
            showClose: true,
            message: '请求超时，请重新上传',
            type: 'warning',
            duration: 0
          })
        }
      });
   },
    beforeAvatarUpload(file){
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
      const extension = testmsg === 'json'
      const extension2 = testmsg === 'JSON'
      const isLt2M = file.size / 1024 / 1024 < 50
      if(!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 json格式!',
          type: 'warning'
                  });
      }
      if(!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 50MB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M
    },
  },
  created(){
    setTimeout(function(){},1000)
  },
  mounted () {
   
  },
  // computed 计算属性
  // computed: {
  //   count () {
  //     return this.$store.state.count;
  //   }
  // }
  computed: {
   
  }

}
</script>
<style scoped lang="less">
.uploadpage{
  // min-height: 700px;
  background: #F0F2F5;
  padding: 20px 0 40px;
}
.content-box{
  margin: auto;
  width: 1000px;
  height: 650px;
  box-shadow: 0 0 10px #cccccc;
  background: white;
  text-align: center;
}
.image{
  margin: auto;
  margin-top: 70px;
  width: 288px;
  height: 226px;
}
.upload-box{
  // margin-top: 50px;
  // padding: 20px;
  box-sizing: border-box;
}
.progressStyle{
    position: relative;
    width: 800px;
    margin: auto;
    top: -298px;
    z-index:10001;
}
.progressIs{
  display: none;
}
</style>
<style>
.uploadpage .el-upload-dragger{
  border: 0;
}
.uploadpage .el-upload--text:hover{
  border-color: #409EFF;
}
</style>

