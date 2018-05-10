<template>
   <section>
     <div class="page-funcarea clearfix">
      <div class="block fl">
           <el-date-picker   v-model="time"  type="datetimerange"  :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  align="right"></el-date-picker>
      </div>
      <div class="pageFuncarea-ipt fl clearfix">
              <span for="" class="fl">卡号：</span><el-input  placeholder="请输入卡号"  v-model="searchinfo.ic_no" class="fl"></el-input>
      </div>
      <div class="pageFuncarea-btn clearfix fl">
          <el-button type="success" @click="getwatsteCardList()" >查询</el-button>
          <el-button @click="resSetSearch()">重置</el-button>
      </div>
     </div>
      <div class="page-table-box">
          <div class="pagetable-top clearfix">
              <el-button type="success" class="fl"><i class="iconfont icon-xiazai"></i>下载</el-button>
                <div class="block fr">
               <el-pagination  @size-change="handleSizeChange"   @current-change="handleCurrentChange" :current-page.sync="searchinfo.page_num" :page-size="searchinfo.page_size" layout="total, prev, pager, next" :total="searchinfo.total_records">
                </el-pagination>
              </div>
          </div>
          <!-- 固定列表格 -->
          <template>
            <el-table  :data="tableData"    style="width: 100%">
              <el-table-column fixed prop="open_group_name"  align="center" label="机构名称" >
              </el-table-column>
              <el-table-column prop="ic_no" align="center" label="卡号"  >
              </el-table-column>
              <el-table-column prop="user_name" align="center" label="姓名" >
              </el-table-column>
              <el-table-column  prop="cert_type" align="center" label="证件类型">
              </el-table-column>
              <el-table-column prop="cert_num" align="center" label="证件号" >
              </el-table-column>
              <el-table-column prop="state" align="center" label="作废类型" >
              </el-table-column>
               <el-table-column prop="open_time" align="center" label="发卡日期" >
              </el-table-column>
              <el-table-column prop="update_time" align="center" label="更新日期" >
              </el-table-column>
            </el-table>
          </template>
      </div>
   </section>
</template>
<script>
import {getwatsteCardList} from '../../axios/axios';
export default {
  name: '',
  data () {
    return {
        searchinfo:{
         page_num:1,
         page_size:8,
         total_records:0,
         ic_no:'',
         start_time:'',
         end_time:''
       },
       tableData: [
        ],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time:""
    }
  },
  mounted(){
      this.getwatsteCardList();
  },
  methods:{
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
     resSetSearch(){
        this.searchinfo.ic_no = "";
        this.time = "";
     },
      getwatsteCardList(page_num,page_size){
          let _this = this;
          let time = this.time;
          let params = {
            // 'group_id':_this.searchinfo.group_id,
            // 'group_id':_this.$store.state.loginInfo.group_id
            'ic_no':_this.searchinfo.ic_no,
            'page_num':(page_num)?(page_num):1,
            'page_size':(page_size)?(page_size):(_this.searchinfo.page_size),
            'start_time':time[0]?time[0]:'',
            'end_time':time[1]?time[1]:''
          };
          console.log(params);
          getwatsteCardList(params).then((res) => {
            console.log(res)
            if(res.code=="200000"){
                  this.tableData = res.data;
                  this.searchinfo.page_num = (res.page_info.page_num)*1;
                  this.searchinfo.page_size = (res.page_info.page_size)*1;
                  this.searchinfo.total_records = (res.page_info.total_records)*1;
            };
            //NProgress.done();
          });
      }
  }
}
</script>
