<template>
   <section>
     <div class="page-funcarea clearfix">
      <div class="block fl">
           <el-date-picker   v-model="time"  type="datetimerange"  :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  align="right" value-format="yyyyMMdd"></el-date-picker>
      </div>
      <div class="pageFuncarea-ipt fl clearfix">
              <span for="" class="fl">所属机构：</span>
                <el-select v-model="searchinfo.group_id" filterable placeholder="请选择所属机构">
                      <el-option
                        v-for="item in groupOptions"
                        :key="item.value"
                        :label="item.group_name"
                        :value="item.group_id">
                      </el-option>
                 </el-select>
      </div>
      <div class="pageFuncarea-ipt fl clearfix">
              <span for="" class="fl">卡号：</span><el-input  placeholder="请输入卡号"  v-model="searchinfo.ic_no" class="fl"></el-input>
      </div>
      <div class="pageFuncarea-btn clearfix fl">
          <el-button type="success" @click="getGroupFeeList()">查询</el-button>
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
              <el-table-column fixed prop="close_month"  align="center" label="结算月份">
              </el-table-column>
              <el-table-column prop="pay_amt" align="center" label="缴费金额" >
              </el-table-column>
              <el-table-column prop="recharge_amt" align="center" label="充值金额" >
              </el-table-column>
              <el-table-column  prop="adjust_amt" align="center" label="调整金额" >
              </el-table-column>
              <el-table-column prop="close_amt" align="center" label="结余金额" >
              </el-table-column>
              <el-table-column prop="zip" align="center" label="状态" >
              </el-table-column>
              <el-table-column fixed="right"  label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small">明细下载</el-button>
                  <el-button type="text" size="small">审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
      </div>
   </section>
</template>
<script>
import {getGroupFeeList,getGroupList} from '../../axios/axios';
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
      groupOptions: [],
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
    this.getGroupList();
    // .then(res=>{
    //          let data = res.data;
    //          if(data.code=="200000"){
                
    //          }
    //       });
     this.getGroupFeeList();
  },
  methods:{
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      resSetSearch(){
        this.time = "";
        this.searchinfo.ic_no = "";
        this.searchinfo.group_id = "";
     },
     getGroupList(page_num,page_size){
        let _this = this;
        let time = this.time;
        let params ={
          'page_size':-1
        };
        console.log(params)
        getGroupList(params).then((res) => {
           console.log(res)
           if(res.code=="200000"){
                this.groupOptions = res.data;
           };
        });
      },
      getGroupFeeList(page_num,page_size){
        let _this = this;
        let time = this.time;
        let params = {
           'group_id':_this.searchinfo.group_id,
           'ic_no':_this.searchinfo.ic_no,
           'page_num':(page_num)?(page_num):1,
           'page_size':(page_size)?(page_size):(_this.searchinfo.page_size),
           'start_time':time[0]?time[0]:'',
           'end_time':time[1]?time[1]:''
        };
        console.log(params)
        getGroupFeeList(params).then((res) => {
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
