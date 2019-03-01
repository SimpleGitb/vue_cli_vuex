<template>
	<div class="uploadreport">
    <!-- <div class="report_Overview">
        <header>
          报表总览
          <span style="margin-left:40px;">报告ID</span> <span v-text="report.report_id" style="color: #409EFF;margin-left:10px"></span>
          <span style="margin-left:40px;">系统类型</span> <span v-text="report.os_name" style="color: #409EFF;margin-left:10px"></span>
        </header>
        <div class="overview_box">
          <div>
            <div class="circle-border" :class="{border_danger:circleDanger}">
              <div class="circle-core">
              </div>
            </div>  
            <div class="circle-title" v-text="circleTitle" :class="{title_danger:circleDanger}"></div>
          </div>
          <div class="overview_detail">
            <ul>
              <li><p>系统类型</p> <span v-text="report.os_name"></span></li>
              <li><p>检查项</p> <span v-text="report.total"></span></li>
              <li><p>安全</p> <span v-text="report.safe"></span></li>
              <li><p>危险</p> <span v-text="report.danger"></span></li>
              <li><p>未知</p> <span v-text="report.unknown"></span></li>
            </ul>
          </div>
        </div>
    </div> -->
    <div class="content-box">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" @change="CollapseMethod">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">检测结果</el-radio-button>
      </el-radio-group>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="总览" name="base_overview">
          <div class="over_block" v-loading="loading">
            <div class="gray overBorder">
              <span class="overHeader">账号名称</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-account"></i>
              <span>UserName：</span><span v-text="overviewData.UserName">无</span>
            </div>
            <div class="gray overBorder">
              <span class="overHeader">硬件信息</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-neicun"></i>
              <span>
                内存:
              </span>
              <span class="overRam" :class="{redclass:raw>=80}" v-text="available+'GB'">无</span>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="raw" status="exception" v-if="raw>=80"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="raw" v-else></el-progress>
              <span v-text="osTotal+'GB'"></span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-chuliqi"></i>
              <span>
                处理器:
              </span>
              <span v-text="overviewData.Processor">无</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-cipan"></i>
              <span>
                磁盘信息:
              </span>
              <!-- <img src="/static/img/u248.svg" alt=""> -->
              <embed src="/static/img/u248.svg" />
              <span>{{DISK[0].name}}盘</span>
              <span class="overRam" :class="{redclass:parseInt(DISK[0].percent)>=80}" style="margin-left:10px;" v-text="DISK[0].unused">无</span>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[0].percent)" status="exception" v-if="parseInt(DISK[0].percent)>=80"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[0].percent)" v-else></el-progress>
              <span v-text="DISK[0].total" style="margin-right:20px;margin-left:-20px"></span>
              <div class="diskD" v-if="DISK[1]">
                <embed src="/static/img/u255.svg" />
                <span>{{DISK[1].name}}盘</span>
                <span class="overRam" :class="{redclass:parseInt(DISK[1].percent)>=80}" style="margin-left:10px;" v-text="DISK[1].unused">无</span>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[1].percent)" status="exception" v-if="parseInt(DISK[1].percent)>=80"></el-progress>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[1].percent)" v-else></el-progress>
                <span v-text="DISK[1].total" style="margin-left:-20px"></span>
              </div>
            </div>
            <div class="overBorder" v-if="DISK[2]">
              <embed src="/static/img/u255.svg" style="
              padding-left: 148px;
              padding-right: 10px;
              vertical-align: middle;"/>
              <span>{{DISK[2].name}}盘</span>
              <span class="overRam" :class="{redclass:parseInt(DISK[2].percent)>=80}" style="margin-left:10px;" v-text="DISK[2].unused"></span>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[2].percent)" status="exception" v-if="parseInt(DISK[2].percent)>=80"></el-progress>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(DISK[2].percent)" v-else></el-progress>
              <span v-text="DISK[2].total" style="margin-left:-20px"></span>
            </div>
            <el-collapse accordion v-for="(network,key,index) in overviewData.Network_card" :key="key">
              <el-collapse-item >
                <template slot="title">
                    <div class="overBorder overbody overCollapse">
                      <template v-if="index==0">
                        <i class="iconfont icon-danxingwangqia"></i>
                        <span>网卡：</span><span>{{key}}</span>
                      </template>
                      <template v-else>
                        <i class="iconfont icon-danxingwangqia" style="visibility: hidden;"></i>
                        <span style="visibility: hidden;">网卡：</span><span>{{key}}</span>
                      </template>
                    </div>
                </template>
                <div>
                  <ul >
                    <li v-for="(net,key) in network[0]"  :key="key">{{key}}:{{net}}</li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div class="gray overBorder">
              <span class="overHeader">OS信息</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-xitongbanben"></i>
              <span>系统版本：</span><span v-text="overviewData.system_version">无</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-anzhuangbao"></i>
              <span>安装时间：</span><span v-text="overviewData.InstallDate">无</span>
            </div>
            <div class="overBorder overbody">
              <i class="iconfont icon-banbenhao"></i>
              <span>版本号：</span><span v-text="overviewData.version">无</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账号" name="UserAccount">
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">用户组</el-col>
                <el-col :span="3">用户名</el-col>
                <el-col :span="3">上次登录</el-col>
                <el-col :span="3">密码到期</el-col>
                <el-col :span="10">描述</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.tag&&result.tag!='unknown'">
                      <div slot="content" style="width:330px" :disabled="result.match_file_attr == ''?true:false">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.tag==''||result.check_result=='unknown'?'未知':result.tag">系统</el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.user_name">Name</span> 
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.last_last">Administrator</span>
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.assword_expired"></span>
                  </el-col>
                  <el-col :span="10">
                    <span v-text="result.Description"></span>
                  </el-col>
                </el-row>
                
                <!-- <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button> -->
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">
                    <!-- <p>{{filekey}}：</p><span>{{file}}</span>  -->
                    {{filekey}}：{{file}}
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane name="Process">
          <span slot="label">进程<el-badge class="mark" :value="danger_overview.Process" v-if="danger_overview.Process != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="12">命令</el-col>
                <el-col :span="3">网络连接</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="12">
                    <span v-text="result.CommandLine" v-if="result.CommandLine"></span> 
                    <div v-else v-text="result.Description"></div> 
                  </el-col>
                  <el-col :span="3">
                    <!-- 网络连接 -->
                    <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.net_connect != 'empty'">
                      <div slot="content" style="min-width:330px">
                        <p>pid:{{result.net_connect[0].PID}}</p>
                        <template v-for="(net) in result.net_connect">
                          <div :key="net.index">
                            <div class="pidTip">
                              <el-tag>{{net.协议}}</el-tag>
                              <span>{{net.本地地址}}</span>
                              <img src="/static/img/doubarrow.png" alt="">
                              <span>{{net.外部地址}}</span>
                              <span>{{net.状态}}</span>
                            </div>
                          </div>
                        </template>
                      </div>
                      <el-button>
                        <el-tag>网络连接</el-tag>
                      </el-button>
                    </el-tooltip>
                  </el-col>
                </el-row>
                <!-- 网络连接 -->
                
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button>
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务" name="Service">
          <span slot="label">服务<el-badge class="mark" :value="danger_overview.Service" v-if="danger_overview.Service != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="8">名称</el-col>
                <el-col :span="5">状态</el-col>
                <el-col :span="5">启动类型</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <span v-text="result.Caption"></span> 
                  </el-col>
                  <el-col :span="5">
                    <span v-text="result.State"></span>
                  </el-col>
                  <el-col :span="5">
                    <span v-text="result.StartMode"></span>
                  </el-col>
                </el-row>
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button>
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="启动项" name="Startup">
          <span slot="label">启动项<el-badge class="mark" :value="danger_overview.Startup" v-if="danger_overview.Startup != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="8">标签</el-col>
                <el-col :span="8">名称</el-col>
                <el-col :span="8">启动用户</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="8">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <span v-text="result.Caption"></span> 
                  </el-col>
                  <el-col :span="8">
                    <span v-text="result.User"></span>
                  </el-col>
                </el-row>
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button>
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="定时任务" name="Schtasks">
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="6">名称</el-col>
                <el-col :span="7">任务</el-col>
                <el-col :span="3">计划类型</el-col>
                <el-col :span="3">状态</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.name"></span> 
                  </el-col>
                  <el-col :span="7">
                    <span v-text="result.task_name"></span>
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.plan_type"></span> 
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.Status"></span>
                  </el-col>
                </el-row>
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button>
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="环境变量" name="Environment">
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="7">名称</el-col>
                <el-col :span="14">值</el-col>
                <el-col :span="3">用户</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="7">
                    <span v-text="result.Name">Name</span> 
                  </el-col>
                  <el-col :span="14">
                    <span v-text="result.VariableValue"></span> 
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.UserName"></span>
                  </el-col>
                </el-row>
                <!-- <el-tooltip class="item" effect="dark" placement="right-start">
                  <div slot="content" style="width:330px" :disabled="result.match_file_attr == ''?true:false">
                    {{result.match_file_attr}}
                  </div>
                  <el-button>
                    <el-tag v-text="result.check_result==''||result.check_result=='unknown'?'未知':result.check_result">系统</el-tag>
                  </el-button>
                </el-tooltip> -->
                
                <!-- <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button> -->
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="安装程序" name="ProductList">
          <span slot="label">安装程序<el-badge class="mark" :value="danger_overview.ProductList" v-if="danger_overview.ProductList != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="10">名称</el-col>
                <el-col :span="6">发布者</el-col>
                <el-col :span="3">安装时间</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result[0]"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="10">
                    <span v-text="result.product_name" v-if="result.product_name"></span> 
                    <span v-else>空</span>
                  </el-col>
                  <el-col :span="6">
                    <!-- <span v-text="result.Publisher" ></span> -->
                    <!-- <span v-text="result.URLInfoAbout" ></span> -->
                    <!-- <router-link :to="result.URLInfoAbout">跳转</router-link> -->
                    <a :href="result.URLInfoAbout?result.URLInfoAbout:'javascript:;'" target="_blank" style="color:#409EFF" v-if="result.Publisher">{{result.Publisher}}</a>
                    <span v-else>空</span>                  
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.InstallDate"></span>
                  </el-col>
                </el-row>
                
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button>
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="共享文件" name="Share">
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="6">名称</el-col>
                <el-col :span="6">路径</el-col>
                <el-col :span="6">备注</el-col>
                <el-col :span="6">权限</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="6">
                    <span v-text="result.ShareName">Name</span>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.PathName"></span> 
                    <div v-if="!result.PathName">无</div>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.Remark"></span>
                    <div v-if="!result.Remark">无</div>
                  </el-col>
                  <el-col :span="6">
                    <span v-for="(permiss,perkey) in result.Permission" :key="permiss">
                      <span v-text="perkey"></span>
                      <span style="margin-left:0" v-if="permiss == 'FULL'">:完全控制</span>
                      <span style="margin-left:0" v-else-if="permiss == 'READ'">:读取</span>
                      <span style="margin-left:0" v-else-if="permiss == 'CHANGE'">:修改</span>
                      <span style="margin-left:0" v-else-if="permiss == 'WRITE'">:写入</span>
                      <span style="margin-left:0" v-else v-text="':'+permiss"></span>
                    </span>
                  </el-col>
                </el-row>
                <!-- <el-tooltip class="item" effect="dark" placement="right-start">
                  <div slot="content" style="width:330px" :disabled="result.match_file_attr == ''?true:false">
                    {{result.match_file_attr}}
                  </div>
                  <el-button>
                    <el-tag v-text="result.check_result==''||result.check_result=='unknown'?'未知':result.check_result">系统</el-tag>
                  </el-button>
                </el-tooltip> -->
                <!-- <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button> -->
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="驱动文件" name="Sysdriver">
          <span slot="label">驱动文件<el-badge class="mark" :value="danger_overview.Sysdriver" v-if="danger_overview.Sysdriver != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="8">名称</el-col>
                <el-col :span="8">路径</el-col>
                <el-col :span="3">类型</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <el-tooltip class="item" effect="dark" placement="right-start" :disabled="result.match_file_attr == ''?true:false" v-if="result.check_result&&result.check_result!='unknown'">
                      <div slot="content" style="width:330px">
                        {{result.match_file_attr}}
                      </div>
                      <el-button>
                        <el-tag v-text="result.check_result"></el-tag>
                      </el-button>
                    </el-tooltip>
                    <span v-else>无</span>
                    <template v-for="match in result.match_yara">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.match_yara" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <span v-text="result.Description"></span> 
                    <div v-if="!result.Description">无</div>
                  </el-col>
                  <el-col :span="8">
                    <span v-text="result.PathName"></span>
                    <div v-if="!result.PathName">无</div>
                  </el-col>
                  <el-col :span="3">
                    <span v-text="result.ServiceType"></span>
                  </el-col>
                </el-row>
                
                <!-- <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button> -->
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="补丁" name="QFE">
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="6">补丁号</el-col>
                <el-col :span="6">安装时间</el-col>
                <el-col :span="6">备注</el-col>
                <el-col :span="6">状态</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess" :key="result._id.$oid">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="6">
                    <span v-text="result.HotFixID"></span> 
                    <div v-if="!result.HotFixID">无</div>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.InstalledOn"></span> 
                    <div v-if="!result.InstalledOn">无</div>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.Description"></span>
                    <div v-if="!result.Description">无</div>
                  </el-col>
                  <el-col :span="6">
                    <span v-text="result.Status"></span>
                  </el-col>
                </el-row>
                <!-- <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid,result.path_name)">标记</el-button> -->
              </template>
              <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- <div v-if="resultProcess.length == 0" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div> -->
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="网络连接" name="network_connect">
          <div id="container" style="height: 800px;width:800px;margin:auto;" v-loading="loading"></div>
        </el-tab-pane>
        <el-tab-pane label="文件检查" name="filecheck">
          <span slot="label">文件检查<el-badge class="mark" :value="danger_overview.filecheck" v-if="danger_overview.filecheck != 0"/></span>
          <el-collapse accordion v-loading="loading">
            <div class="tab_header_background">
              <el-row>
                <el-col :span="5">标签</el-col>
                <el-col :span="19">文件</el-col>
              </el-row>
            </div>
            <el-collapse-item v-for="result in resultProcess1" :key="result.index">
              <template slot="title">
                <!-- <el-tag>系统</el-tag> -->
                <el-row>
                  <el-col :span="5">
                    <template v-for="match in result.tag">
                      <el-tooltip class="item" effect="dark" placement="right-start" v-if="result.tag" :key="match.index">
                        <div slot="content" style="width:330px">
                          {{match.content}}
                        </div>
                        <el-button>
                          <el-tag v-text="match.name" :type="match.level=='medium'?'warning':'danger'"></el-tag>
                        </el-button>
                      </el-tooltip>
                    </template>
                  </el-col>
                  <el-col :span="19">
                    <span v-text="result.file_name"></span> 
                    <div v-if="!result.file_name">无</div>
                  </el-col>
                </el-row>
                <el-button type="text" class="biaoji" @click="bjMethod($event,result._id.$oid)">标记</el-button>
              </template>
              <!-- <div v-if="result.allinfo">
                <ul>
                  <li v-for="(file,filekey) in result.allinfo" :key="file.index">{{filekey}}：{{file}} </li>
                </ul>
              </div> -->
            </el-collapse-item>
          </el-collapse>
          <div v-if="resultProcess1.length == 0&&loading==true" style="width:100%;text-align:center;padding:10px 0;">暂无数据</div>
          <div style="margin-top:20px;text-align:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 标记 -->
    <el-dialog
    title="添加标签"
    :visible.sync="infoVisible"
    width="25%"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <span class="markDialog">
        <!-- <span class="list-laber">选择</span>
        <ul class="report-list">
            <li :class="{active:value3Clone == 1}" @click="value3Clone = 1">黑名单</li>
            <li :class="{active:value3Clone == 2}" @click="value3Clone = 2">白名单</li>
        </ul> -->
        <div style="clear:both;">
          <span>标签：</span>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)">
            {{tag}}
          </el-tag>
          <el-select
            v-model="inputValue" 
            placeholder="请选择"
            v-if="inputVisible"
            @change="handleInputConfirm()">
            <el-option
              v-for="item in options"
              :key="item.label_name"
              :label="item.label_name"
              :value="item.label_name">
            </el-option> 
          </el-select>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 更新标签</el-button>
        </div>
        <div style="clear:both;padding-top:30px;display:flex;flex-wrap:wrap">
          <div><span>备注：</span></div>
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textareaText">
          </el-input>
        </div>
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
        <el-button type="primary" @click="bjMethodSure">确定</el-button>
    </span>
    </el-dialog>

	</div>
</template>
<script>
// var echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/pie')
//       // 引入提示框和标题组件
//       require('echarts/lib/component/tooltip')
//       require('echarts/lib/component/title')
//       require('echarts/lib/component/legend')
import Pagination from './Pagination'
import echarts from 'echarts'
export default {
  name: 'uploadreport',
  data: function () {
    return {
      isCollapse: false,
      activeName: 'base_overview',
      infoVisible: false,
      value3Clone:1,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      options:[{label_name:'系统'},{label_name:'黑客工具'},{label_name:'web软件'}],
      textareaText:"",
      circleTitle:"安全",
      circleDanger: false,
      report:[],
      resultProcess:[],
      resultProcess1:[],
      attr_name:'base_overview',
      //分页
      currentPage:1,
      total: 0,
      pageSize:10,
      bijiId:'',
      path_name:'',
      loading: true,
      paramsId:1,
      resultProcess2:[],
      token:"",
      danger_overview:[],
      collapseType:'all',
      overviewData:{},
      raw:0,
      available:'',
      osTotal:'',
      DISK:[{name: "C:", total: "175.02GB", unused: "19.02GB", percent: "89.13"}]
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
    handleClick(tab, event) {
      this.currentPage = 1;
      this.resultProcess = [];
      this.total = 0;
      this.attr_name = tab.paneName;
      this.loading = true;
      if(tab.paneName == 'network_connect'){
        this.echart();
      }else{
        this.fecthReport();
      }
      
      // this.circleTitle = "危险";
      // this.circleDanger = true;
    },
    handleClose(done) {
      done();
    },
    bjMethod(e,id,name){
      e.stopPropagation();
      this.infoVisible = true;
      this.bijiId = id;
      this.path_name = name;
    },
    bjMethodSure(){
      // var list_type;
      // if(this.value3Clone == 1){
      //   list_type = "黑名单";
      // }else{
      //   list_type = "白名单";
      // }
      var _self = this;
      let config = {
          headers: {
              'token':this.token,
              'username':sessionStorage.name
          }
      };
      this.$axios.post(process.env.API_HOST+"api/report/store",{
        id:this.bijiId,
        path_name: this.path_name,
        // list_type:list_type,
        tag:this.dynamicTags.join(','),
        remark:this.textareaText,
        is_update:0
      },config).then((res) => {
        _self.infoVisible = false;
        if(res.data.info == "名单有与该项SHA256相等的记录 是否要更新"){
          _self.$confirm('名单有与该项SHA256相等的记录 是否要更新?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _self.$axios.post(process.env.API_HOST+"api/report/store",{
              id:this.bijiId,
              path_name: this.path_name,
              tag:this.dynamicTags.join(','),
              remark:this.textareaText,
              is_update:1
            },config).then((res) => {
              // console.log(res);
              _self.$message.success(res.data.info);
            }).catch((error) => {
              _self.$message.error(error.response.data.message);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消更新'
            });          
          });
        }else{
          _self.$message.success(res.data.info)
        }
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
          _self.infoVisible = false;
      });
    },
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags = [];
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    fecthReport(){
      if(sessionStorage.token){
        this.token = sessionStorage.token;
      }
      let config = {
            headers: {
                'token':this.token,
                'username':sessionStorage.name
            }
        };
      if(this.$route.query.id){
        this.paramsId = this.$route.query.id;
      }
      if(this.attr_name == 'filecheck'){
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/report/show/"+this.collapseType+"?report_id="+this.paramsId+"&attr_name="+this.attr_name+"&page="+this.currentPage+"&pageSize="+ this.pageSize,config).then((res) => {
          var data =res.data;
          this.report = data.report_overview[0];
          this.total = data.total;
          _self.resultProcess1 = data.data;
          this.danger_overview = data.danger_overview;
          this.loading = false;
          // _self.$message.success(res.data.info)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }else if(this.attr_name == 'base_overview'){
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/report/show/"+this.collapseType+"?report_id="+this.paramsId+"&attr_name="+this.attr_name+"&page="+this.currentPage+"&pageSize="+ this.pageSize,config).then((res) => {
          var data =res.data;
          this.overviewData = data.data;
          this.loading = false;
          this.available = this.overviewData.RAM.available;
          this.osTotal = this.overviewData.RAM.total;
          this.DISK = this.overviewData.DISK;
          this.danger_overview = data.danger_overview;
          this.raw = parseInt((Number(this.overviewData.RAM.total)-Number(this.overviewData.RAM.available))*100/Number(this.overviewData.RAM.total));
          // _self.$message.success(res.data.info)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }else{
        var _self = this;
        this.$axios.get(process.env.API_HOST+"/api/report/show/"+this.collapseType+"?report_id="+this.paramsId+"&attr_name="+this.attr_name+"&page="+this.currentPage+"&pageSize="+ this.pageSize,config).then((res) => {
          var data =res.data;
          this.report = data.report_overview[0];
          _self.resultProcess = data.data;
          _self.total = data.total;
          this.options = data.label_list;
          this.danger_overview = data.danger_overview;
          this.loading = false;
          // _self.$message.success(res.data.info)
        }).catch((error) => {
            _self.$message.error(error.response.data.message);
        });
      }
      
    },
    //分页
    handleSizeChange(val){
      // console.log(`每页 ${val} 条`);
      // console.log(val);
      this.pageSize = val;
      this.fecthReport();
    },
    handleCurrentChange(val){
      // console.log(val);
      this.currentPage = val;
      this.fecthReport();
    },
    echart(){
      let config = {
            headers: {
                'token':this.token,
                'username':sessionStorage.name
            }
        };
      var myChart = echarts.init(document.getElementById('container'));
      myChart.showLoading();
      
      myChart.hideLoading();
      var _self = this;
      this.$axios.get(process.env.API_HOST+"/api/report/show/"+this.collapseType+"?report_id="+this.paramsId+"&attr_name="+this.attr_name+"&page="+this.currentPage+"&pageSize="+ this.pageSize,config).then((res) => {
        var data =res.data;
        _self.loading = false;
        // this.report = data.report_overview[0];
        // this.total = data.total;
        _self.resultProcess2 = data.data;
        var dataEchart = [];
        _self.resultProcess2.Local.forEach(element => {
          if(element.out_ip){
            dataEchart.push({
                          "name": element.in_port,
                          "sname":"process",
                          "value": element.process_name,
                          "symbolSize": 10,
                          "symbol": 'circle',
                          label: {
                              "fontSize": 12
                          },
                          "itemStyle": {
                              "borderColor": '#2b5796',
                          },
                          children: [{
                                      "name": element.out_ip,
                                      "formatter": ' ',
                                      "itemStyle": {
                                          color: '#81cfeb',
                                          borderColor:'#81cfeb'
                                      },
                                      children: [{
                                              "name": element.out_port,
                                              "symbolSize": 10,
                                              "symbol": 'circle',
                                              "value": element.status,
                                              "sname":"tcp",
                                              "itemStyle": {
                                                  borderColor: '#214f92',
                                              },
                                              "label": {
                                                  "fontSize": 12
                                              }
                                          }
                                      ]
                                  }
                          ]
                      })
          }else{
            dataEchart.push({
                          "name": element.in_port,
                          "sname":"process",
                          "value": element.process_name,
                          "symbolSize": 10,
                          "symbol": 'circle',
                          label: {
                              "fontSize": 12
                          },
                          "itemStyle": {
                              "borderColor": '#2b5796',
                          }
                      })
          }
          
        });
        myChart.setOption({
          tooltip: {
              trigger: 'item',
              enterable:true,
              alwaysShowContent:true,
              renderMode:'html',
              triggerOn: 'onmousemove', 
              "formatter": function(params,ticket,callback){
                  if(params.data.sname == 'process'){
                      return  '进程:'+params.value;
                  }else if(params.data.sname == 'tcp'){
                      return  'TCP:'+params.value;
                  }
  　          },
  　          textStyle:{
  　              
  　          }
          },
          // toolbox: {
          //     show : true,
          //     feature : {
          //         mark : {show: true},
          //         dataView : {show: true, readOnly: false},
          //         magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          //         restore : {show: true},
          //         saveAsImage : {show: true}
          //     }
          // },
          silent:false,
          series: [{
              type: 'tree',
              
              data: [{
                  "name": "本机",
                  "symbolSize": 14,
                  "symbol": 'circle',
                  "itemStyle": {
                                      borderColor: '#409EFF',
                                      color:"#eee"
                                  },
                  "children": dataEchart
              }, ],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '50%',
              symbolSize: 12,
              label: {
                  normal: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 13,
                  }
              },
              leaves: {
                  label: {
                      normal: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left'
                      }
                  }
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
          }]
      });
        // _self.$message.success(res.data.info)
        _self.loading = false;
      }).catch((error) => {
          _self.$message.error(error.response.data.message);
      });
    },
    CollapseMethod (){
      if(this.isCollapse == true){
        this.collapseType = 'danger'
      }else{
        this.collapseType = 'all'
      }
      this.fecthReport();
    }
  },
  created () {
    this.fecthReport();
  },
  mounted(){
    // this.echart();
  },
   components: {
        Pagination
    }

}
</script>
<style scoped lang="less">
.uploadreport{
  // min-height: 700px;
  background: #F0F2F5;
  padding: 20px 0 40px;
  
}
.report_Overview{
  margin: auto;
  width: 85%;
  height: 260px;
  box-shadow: 0 0 2px #cccccc;
  border-radius: 5px;
  background: white;
  margin-bottom: 20px;
  padding: 20px 50px;
  box-sizing: border-box;
}
.report_Overview header{
  font-family: '微软雅黑';
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #666666;
}
.content-box{
  margin: auto;
  width: 85%;
  min-height: 650px;
  box-shadow: 0 0 2px #cccccc;
  border-radius: 5px;
  background: white;
  padding: 20px 50px;
  box-sizing: border-box;
}
.overview_box{
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63,249,220);
  background: linear-gradient(0deg, rgba(63,249,220,0.1) 75%, rgba(63,249,220,1) 100%);
  animation: spin .8s linear 0s infinite;
}
.circle-core {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
}
.circle-title{
  position: absolute;
  top: 65px;
  left: 55px; 
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #34BA77;
  letter-spacing: 5px;
}
.border_danger{
  background: linear-gradient(0deg, #F89696 75%, #F61C1C 100%);
}
.title_danger{
  color: #F56C6C;
}
.overview_detail{
  margin-left: 50px;
  font-family: '微软雅黑 Regular', '微软雅黑';
  font-weight: 400;
  font-style: normal;
  color: #999999;
  font-size: 14px;
  padding-top: 15px;
}
.overview_detail ul li{
 list-style: none;
 text-decoration: none;
 margin-bottom: 12px;
}
.overview_detail p {
  display: inline-block;
  width: 100px
}
.overview_detail span{
  color: #409EFF;
  display: inline-block;
  width: 150px;
}
.el-collapse {
  border-top: 0;
}
.el-collapse-item__header{
  span:nth-child(1){
    margin-left: 0;
  }
  span{
    margin-left: 30px;
  }
}
.el-collapse-item__header .biaoji{
  float: right;
  margin-top: 17px;
  margin-right: 50px;
}

.el-collapse-item__content ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  width: 80%;
  margin: auto;
}
.el-collapse-item__content ul li{
  display: inline-block;
  width: 50%;
  padding-left: 20px;
  box-sizing: border-box;
  font-weight: 400;
  font-style: normal;
  color: #999999;
  font-size: 14px;
}
.el-collapse-item__content li p{
  display: inline-block;
  width: 50%;
}
.el-collapse-item__content li span{
  display: inline-block;
  width: 50%;
  color: #666666;
  word-break: break-all;
}
// @media screen and (max-width: 1366px) {
//   .el-collapse-item__content li p{
//     width: 50%;
//   }
//   .el-collapse-item__content li span{
//     width: 50%;
//   }
// }
.pidTip{
  // line-height: 27px;
  height: 27px;
  padding-top: 10px;
}
.pidTip img{
  width: 50px;
  height: 20px;
  vertical-align: middle;
}
// 复选框
.report-list li.active {
    position: relative;
    border-color: #00aaff;
    border: 1px solid #00aaff !important;
    background: #fff;
    color: #00aaff;
}

.report-list li.active::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 20px;
    height: 20px;
    background: url('/static/img/tab_selected.png');
}
.list-laber{
  float: left;
  margin-top: 5px;margin-right: 30px;
}
.report-list {
  display: inline;
    li {
        float: left;
        width: 30%;
        height: 30px;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-right: 2%;
        font-size: 14px;
    }

    .active {
        border: 1px solid #00a9ff
    }
}
ul{
  list-style: none;
}
.markDialog .el-select{
  width: 95px;
}
.el-row {
  color: #909399;
  // font-size: 14px;
  // font-weight: bold;
  display: inline-block;
    width: 90%;
}
.el-col{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.tab_header_background{
  width:100%;background-color:#EEEEEE;padding:10px 0;
  .el-row{
    color: #909399;font-weight: 700;font-size: 14px;
  }
}
.over_block{
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  min-height: 400px;
  font-family:'微软雅黑';
  font-style: normal;
  font-size: 14px;
  color: #606266;
}
.over_block:hover{
  box-shadow: 0 0 8px 0 rgb(232, 237, 250,.6),
  0 2px 4px 0 rgb(232, 237, 250,.5);
}
.gray{
  background:#f5f7fa; 
}
.overBorder{
  border-bottom: 1px solid #ebebeb;
  line-height: 45px;
  padding-left: 30px;
}
.overHeader{
  border-left: 3px solid #409EFF;
  color: #409EFF;
  padding-left: 10px;
  font-weight: 700;
}
.iconfont{
  font-size: 20px;
  padding-right: 20px;
  vertical-align: middle;
}
.overbody{
  padding-left: 40px;
  span{
      color: #606266;
    }
  span:nth-child(2){
    color: #999999;
    display: inline-block;
    width: 90px;
  }
  .overRam{
    color: #409EFF;
  }
  embed{
    vertical-align: middle;
    margin-right: 10px;
  }
}
.el-progress{
  display: inline-block;
  width: 400px;
  margin-left: 20px;
  margin-right: 50px;
}
.overCollapse{
  span{
    margin-left: 0;
  }
}
.diskD{
  display: inline;
  span:nth-child(2){
    color: #606266;
    display: inline;
  }
}
@media screen and (max-width: 1566px) {
.diskD{
  display: block;
  margin-left: 135px;
  span:nth-child(2){
    color: #606266;
    display: inline;
  }
}
}
.redclass{
  color: #fa5555 !important;
}
</style>
<style>
.uploadreport .el-collapse-item__content{
  background: #F7F8FA;
  padding-top: 10px;
}
/* 文字提示封装修改 */
.uploadreport .el-collapse-item__header .el-button{
    border: 0;
    padding: 0;
    background: transparent;
}
.uploadreport .el-collapse-item__header .el-button+.el-tooltip{
    margin-left: 0;
}
.uploadreport .el-collapse-item__header .el-button+.el-button{
    margin-left: 0;
}
.el-dialog__header{
  border: 1px solid #e9e9e9;
}
.el-dialog__footer{
  padding: 10px 15px 10px;
  border-top: 1px solid #e9e9e9;
}
.uploadreport .el-textarea{
  width: 80%;
}
.el-scrollbar__wrap{
  margin-bottom: 0px !important;
}
.uploadreport .el-tag--small{
  margin-right: 10px;
}
.uploadreport .el-dialog__headerbtn{
  top: 20px;
}
.uploadreport .el-badge__content{
  background-color: #f56c6c;
}
</style>


