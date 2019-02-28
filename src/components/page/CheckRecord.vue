<template>
<div class="checkrecord">
  <div class="headimg">
    <img src="/static/img/u2320.png" alt="">
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="report_id"
      label="任务id"
      >
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <span v-if="scope.row.file_status == 'is_success'">任务已经完成</span>
        <span v-else-if="scope.row.file_status == 'is_checking' || scope.row.file_status == 'is_imported'">任务正在进行中</span>
        <span v-else>任务失败</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="os_name"
      label="操作系统">
    </el-table-column>
    <el-table-column
      prop="date"
      label="时间">
    </el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <div class="btn-list">
                <el-button size="mini" class="list-item blue" @click="loolOver(scope.row.report_id,scope.row.file_status)">查看</el-button>
                <el-button size="mini" class="list-item orange">导出</el-button>
            </div>
        </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name: 'checkrecord',
  data: function () {
    return {
     tableData:[],
     token:""
    }
  },
  methods: {
    StartupMethod () {
      if(sessionStorage.token){
        this.token = sessionStorage.token;
      }
      let config = {
            headers: {
                'token':this.token,
                'username':sessionStorage.name
            }
        };
      this.$axios.get(process.env.API_HOST+"/api/home/check_record",config).then((res) => {
          this.tableData = res.data.data;
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    loolOver(id,status){
      if(status == 'is_checking' || status == 'is_imported'){
        this.$message.warning("任务正在进行中，请稍后查看");
      }else{
        this.$router.push({
            path:'/uploadreport',
            query:{id:id}
            }
          );
      }
    },
    getdate() {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
  },
  created () {
    this.StartupMethod();
  },
  mounted () {
    // console.log(this.$route)
  }

}
</script>
<style scoped lang="less">
.checkrecord{
  background: #ffffff;
  height: 555px;
  padding: 0 20px;
  padding-top: 65px;
}
.headimg{
    position: absolute;
    top: 75px;
    background: #F56C6C;
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

</style>
<style>
.el-table thead tr{
  background: #EEEEEE !important;
}
.el-table td,
.el-table th {
  text-align: center !important;
}
</style>
