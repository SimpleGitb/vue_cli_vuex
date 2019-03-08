<template>
<div class="checkrecord">
  <div class="headimg">
    <img src="/static/img/u2320.png" alt="">
  </div>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" @change="CollapseMethod" size="small">
    <el-radio-button :label="false">按顺序分类</el-radio-button>
    <el-radio-button :label="true">按主机分类</el-radio-button>
  </el-radio-group>
  <div style="display:inline-block;min-width:450px;float:right;" :class="{keywordShow:keywordShow}">
    <el-input placeholder="请输入关键字搜索" v-model="input1" class="input-with-select" size="medium">
      <el-select v-model="filename" slot="prepend" placeholder="请选择" size="medium">
        <el-option label="报告id" value="report_id"></el-option>
        <el-option label="主机id" value="host_uuid"></el-option>
        <el-option label="备注" value="remark"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" size="medium" @click="keywordSearch"></el-button>
    </el-input>
  </div>
  <div :class="{tableTab:tabShow}">
    <el-collapse @change="handleChange" accordion v-model="activeName">
      <el-collapse-item :name="uuid.uuid" v-for="uuid in tableUuid" :key="uuid.uuid">
        <template slot="title">
          <div class="zhujistyle"><i class="iconfont icon-zhuji"></i> 主机 {{uuid.uuid}}  {{uuid.os_name}}</div>
        </template>
        <div>
          <el-table
            :data="tableData2"
            style="width: 100%"
            @filter-change="filterChange"
            :default-sort = "{prop: 'register_time', order: 'descending'}"
            >
            <el-table-column
              prop="report_id"
              label="报告id"
              >
            </el-table-column>
            <el-table-column
              label="状态"
              prop="file_status"
              column-key="file_status"
              :filters="[{text:'任务已经完成',value:'任务已经完成'}]"
              filter-placement="bottom"
              >
              <template slot-scope="scope">
                <span v-if="scope.row.file_status == 'is_success'">任务已经完成</span>
                <span v-else-if="scope.row.file_status == 'is_checking' || scope.row.file_status == 'is_imported'">任务正在进行中</span>
                <span v-else>任务失败</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="check_total"
              label="检查项"
              show-overflow-tooltip
              >
            </el-table-column>
            <el-table-column
              prop="danger"
              label="危险项"
              show-overflow-tooltip
              sortable>
            </el-table-column>
            <el-table-column
              prop="suspect"
              label="可疑项"
              show-overflow-tooltip
              sortable>
            </el-table-column>
            <el-table-column
              prop="collect_date"
              label="采集时间"
              show-overflow-tooltip
              sortable>
            </el-table-column>
            <el-table-column
              prop="check_date"
              label="检查时间"
              sortable>
            </el-table-column>
            <el-table-column
              label="备注"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.remark">
                  <el-input
                    type="textarea"
                    autosize
                    :value="scope.row.remark"
                    v-bind:class="'tta'+scope.row._id.$oid"
                    class="tta"
                    @focus="textareaFos(scope.row._id.$oid)"
                    @blur="textareaBlur(scope.row._id.$oid)"
                    @change="getTextareaValue($event,scope.row._id.$oid)">
                  </el-input>
                </span>
                <span v-else>
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="添加备注"
                    @change="getTextareaValue($event,scope.row._id.$oid)">
                  </el-input>
                </span>
              </template>
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
          <div style="margin-top:20px;text-align:right;">
            <!-- <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2">
            </el-pagination> -->
            <el-pagination
              :page-size="10"
              :pager-count="11"
              @current-change="handleCurrentChange2"
              layout="prev, pager, next"
              :total="total2">
            </el-pagination>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    @filter-change="filterChange"
    :default-sort = "{prop: 'register_time', order: 'descending'}"
    :class="{tableTab:!tabShow}"
    @cell-click="watchReport">
    <el-table-column
      prop="report_id"
      label="报告id"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column
      label="状态"
      prop="file_status"
      column-key="file_status"
      :filters="[{text:'任务已经完成',value:'is_success'},{text:'任务正在进行中',value:'is_checking'}]"
      filter-placement="bottom"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.file_status == 'is_success'">任务已经完成</span>
        <span v-else-if="scope.row.file_status == 'is_checking' || scope.row.file_status == 'is_imported'">任务正在进行中</span>
        <span v-else>任务失败</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="UUID"
      label="主机id"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column
      prop="os_name"
      label="操作系统"
      column-key="os_name"
      :filters="os_name_list"
      filter-placement="bottom">
    </el-table-column>
    <el-table-column
      prop="check_total"
      label="检查项"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column
      prop="danger"
      label="危险项"
      show-overflow-tooltip
      sortable>
    </el-table-column>
    <el-table-column
      prop="suspect"
      label="可疑项"
      show-overflow-tooltip
      sortable>
    </el-table-column>
    <el-table-column
      prop="collect_date"
      label="采集时间"
      show-overflow-tooltip
      sortable>
    </el-table-column>
    <el-table-column
      prop="check_date"
      label="检查时间"
      sortable>
    </el-table-column>
    <el-table-column
      label="备注"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="scope.row.remark">
          <el-input
            type="textarea"
            autosize
            :value="scope.row.remark"
            v-bind:class="'tta'+scope.row._id.$oid"
            class="tta"
            @focus="textareaFos(scope.row._id.$oid)"
            @blur="textareaBlur(scope.row._id.$oid)"
            @change="getTextareaValue($event,scope.row._id.$oid)">
          </el-input>
        </span>
        <span v-else>
          <el-input
            type="textarea"
            autosize
            placeholder="添加备注"
            @change="getTextareaValue($event,scope.row._id.$oid)">
          </el-input>
        </span>
      </template>
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
  <div style="margin-top:20px;text-align:right;">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: 'checkrecord',
  data: function () {
    return {
     tableData:[],
     tableData2:[],
     token:"",
     isCollapse:false,
     collapseType:'def',
     input1:'',
     filename:'report_id',
     currentPage:1,
     total: 0,
     pageSize:10,
     currentPage2:1,
     total2: 0,
     pageSize2:10,
     tabShow:true,
     keywordShow:false,
     config:{},
     filter1:[],
     filter2:[],
     os_name_list:[],
     tableUuid:[],
     activeName:'1',
     hostUuid:''
    }
  },
  methods: {
    //分页
    handleSizeChange(val){
      // console.log(`每页 ${val} 条`);
      // console.log(val);
      this.pageSize = val;
      this.StartupMethod();
    },
    handleCurrentChange(val){
      // console.log(val);
      this.currentPage = val;
      this.StartupMethod();
    },
    //分页
    handleSizeChange2(val){
      // console.log(`每页 ${val} 条`);
      // console.log(val);
      this.pageSize2 = val;
    },
    handleCurrentChange2(val){
      // console.log(val);
      this.currentPage2 = val;
      this.$axios.get(process.env.API_HOST+"/api/home/check_record?sort="+this.collapseType+"&host_uuid="+this.hostUuid+"&page="+this.currentPage2+"&pageSize="+this.pageSize2,this.config).then((res) => {
          this.tableData2 = res.data.data;
          this.total2 = res.data.total;
          // this.tableUuid = res.data.data;
          // this.os_name_list = res.data.os_name_list.map(element => {
          //       return { text: element, value: element }
          //     });
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    StartupMethod () {
      if(localStorage.token){
        this.token = localStorage.token;
      }
      this.config = {
        headers: {
            'token':this.token,
            'username':localStorage.name
        }
      };
      this.tableData = [];
      this.tableUuid = [];
      this.$axios.get(process.env.API_HOST+"/api/home/check_record?sort="+this.collapseType+"&filter_condition[status]="+this.filter1+"&filter_condition[os_name]="+this.filter2+"&page="+this.currentPage+"&pageSize="+this.pageSize,this.config).then((res) => {
          if(this.collapseType == 'def'){
            this.tableData = res.data.data;
            this.os_name_list = res.data.os_name_list.map(element => {
              return { text: element, value: element }
            });
          }
          if(this.collapseType == 'uuid'){
            this.tableUuid = res.data.data;
          }
          this.total = res.data.total;
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
    },
    CollapseMethod (){
      this.activeName = '1';
      if(this.isCollapse == true){
        this.collapseType = 'uuid'
        this.tabShow = false;
        this.keywordShow = true;
      }else{
        this.collapseType = 'def'
        this.tabShow = true;
        this.keywordShow = false;
      }
      this.StartupMethod();
      
    },
    filterChange(filters){
      if(filters){
        if(filters.file_status){
          this.filter1 =filters.file_status;
        }
        if(filters.os_name){
          this.filter2 = filters.os_name;
        }
      }
      this.$axios.get(process.env.API_HOST+"/api/home/check_record?sort="+this.collapseType+"&filter_condition[status]="+this.filter1+"&filter_condition[os_name]="+this.filter2+"&page="+this.currentPage+"&pageSize="+this.pageSize,this.config).then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    watchReport(row, column, cell, event){
      if(column.label == '危险项' || column.label == '可疑项'){
        if(row.file_status == 'is_checking' || row.file_status == 'is_imported'){
          this.$message.warning("任务正在进行中，请稍后查看");
        }else{
          this.$router.push({
              path:'/uploadreport',
              query:{id:row.report_id}
              }
            );
        }
      }
    },
    handleChange(val){
      this.hostUuid = val;
      if(!val){
        return;
      }
      this.$axios.get(process.env.API_HOST+"/api/home/check_record?sort="+this.collapseType+"&host_uuid="+this.hostUuid+"&page="+this.currentPage2+"&pageSize="+this.pageSize2,this.config).then((res) => {
          this.tableData2 = res.data.data;
          this.total2 = res.data.total;
          // this.tableUuid = res.data.data;
          // this.os_name_list = res.data.os_name_list.map(element => {
          //       return { text: element, value: element }
          //     });
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
    },
    //获取备注value
      getTextareaValue(value,tagId){
        this.$axios.put(process.env.API_HOST+"/api/home/check_record/remark",{
          id:tagId,
          remark:value
        },this.config).then((res) => {
          // this.StartupMethod();
          // this.handleChange();
          this.tableData2.remark = value;
          this.$message.success("添加备注成功!");
        }).catch((error) => {
            this.$message.error(error.response.data.message);
        });
      },
      //改变文本框焦点
      textareaFos(id){
        $('.tta'+id+'>textarea').css("color","#5a5e66");
      },
      textareaBlur(id){
        $('.tta'+id+'>textarea').css("color","#B4BCCC");
      },
      keywordSearch(){
        if(!this.input1){
          this.$message.error("请输入关键词搜索!");
          return;
        }
        if(this.collapseType == 'uuid'){
          this.$message.error("主机分类暂不支持搜索!");
          return;
        }
        this.$axios.get(process.env.API_HOST+"/api/home/check_record?sort="+this.collapseType+"&filter_condition[status]="+this.filter1+"&filter_condition[os_name]="+this.filter2+"&search_condition["+this.filename+"]="+this.input1+"&page="+this.currentPage+"&pageSize="+this.pageSize,this.config).then((res) => {
          if(this.collapseType == 'def'){
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.os_name_list = res.data.os_name_list.map(element => {
                  return { text: element, value: element }
                });
          }
          if(this.collapseType == 'uuid'){
            this.tableUuid = res.data.data;
          }
          
        }).catch((error) => {
          this.$message.error(error.response.data.message);
        });
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
  min-height: 795px;
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
.tableTab{
  display: none;
}
.keywordShow{
  display: none !important;
}
.zhujistyle{
  background: #ECF5FF;
  width: 100%;
  // height: 38px;
  color: #409EFF;
  font-size: 14px;
  // line-height: 38px;
  i{
    padding:0 20px;
  }
}
.el-select{
  width: 120px;
}
.el-collapse-item{
  // margin-bottom: 20px;
  border-top: 1px solid #e6ebf5;
}
.el-collapse{
  border: 0;
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
.el-input-group__append, .el-input-group__prepend{
  padding: 0 20px !important;
  background-color: #ffffff !important;
}
.checkrecord .tta>textarea{
  color: #B4BCCC;
}
.el-scrollbar__wrap{
  margin-bottom: 0px !important;
}
</style>
