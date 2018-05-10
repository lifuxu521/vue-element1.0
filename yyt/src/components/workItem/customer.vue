<template>
  <section>
    <div class="pageinfo-top">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="info-top-lf"><i class="info-icon info-user" :style="{backgroundImage: 'url(' + icon + ')'}"></i>
            </div>
            <div class="info-top-rt">
              <span class="infotext-top">昨日发卡数量</span>
              <span class="infotext-center">{{query_day_open_amount}}</span>
              <span class="infotext-bottom">本月发卡数量：{{query_month_open_amount}}</span>
              <!--<span class="infotext-bottom">{{}}</span>-->
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="info-top-lf"><i class="info-icon info-yetcharge"
                                        :style="{backgroundImage: 'url(' + icon + ')'}"></i></div>
            <div class="info-top-rt">
              <span class="infotext-top">昨日收费金额</span>
              <span class="infotext-center">￥{{query_day_pay_amount}}</span>
              <span class="infotext-bottom">本月合计金额：￥{{query_month_pay_amount}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="info-top-lf"><i class="info-icon info-yesbusiness"
                                        :style="{backgroundImage: 'url(' + icon + ')'}"></i></div>
            <div class="info-top-rt">
              <span class="infotext-top">昨日业务笔数</span>
              <span class="infotext-center">{{query_day_busi_amount}}笔</span>
              <span class="infotext-bottom">本月合计笔数：{{query_month_busi_amount}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pageinfo-tab">
      <!--<ul class="clearfix">-->
      <!--<li v-for="(item,index) in tabToggleData" :class="item.display ? 'active' : ''" @click="tabToggleClick(index)">-->
      <!--{{item.title}}-->
      <!--</li>-->
      <!--</ul>-->
    </div>
    <div class="pageinfo-chart">
      <div v-show="tabtoggleNum == 0" :style="{height: 336+'px'}">
        <div style="text-align: left" class="page_nav">
          <el-date-picker v-model="value1" type="daterange" align="right" unlink-panels range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"
                          format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="EchartsprevData" >
          </el-date-picker>
        </div>
        <EchartsBox v-bind:EchartsList='EchartsList'></EchartsBox>
      </div>
    </div>
    <div class="page-table-box">
      <div class="pagetable-top clearfix">
        <el-button type="success" class="fl"><i class="iconfont icon-xiazai"></i>下载</el-button>
        <div class="block fr">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next"
                         :total="1000">
          </el-pagination>
        </div>
      </div>
      <!-- 固定列表格 -->
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="date" align="center" label="卡号">
          </el-table-column>
          <el-table-column prop="name" align="center" label="姓名">
          </el-table-column>
          <el-table-column prop="province" align="center" label="证件类型">
          </el-table-column>
          <el-table-column prop="city" align="center" label="证件号">
          </el-table-column>
          <el-table-column prop="address" align="center" label="状态">
          </el-table-column>
          <el-table-column prop="zip" align="center" label="发卡日期">
          </el-table-column>
          <el-table-column prop="time" align="center" label="注销日期">
          </el-table-column>
          <!-- <el-table-column fixed="right"  label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </template>
    </div>
  </section>
</template>
<script>
  import icon from '@/assets/icon.png'
  import util from '../../../static/commonJs/util'
  import {requestDayData,requestMonthData} from '../../axios/axios';
  import EchartsBox from '@/components/workItem/EchartsBox';  //引入 ehcarts 图表
  export default {
    name: '',
    components: {
      EchartsBox
    },
    data () {
      return {
        pickerOptions2: {
          shortcuts: [
            {
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
        value1: '',
        icon: icon,
        currentPage: 5,
        tableData: [
         ],
        tabToggleData: [
          {title: '发卡量统计', display: true},
          {title: '缴费金额统计', display: false},
          {title: '业务量统计', display: false},
        ],
        tabtoggleNum: 0,
        query_day_open_amount: '',
        query_day_pay_amount: '',
        query_day_busi_amount: '',
        query_month_open_amount: '',
        query_month_pay_amount: '',
        query_month_busi_amount: '',
        EchartsList:[],
      }
    },
    mounted(){
      this.getprevData();
      this.getprevMonth();
    //this.EchartsprevData();

    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getprevData(){
        let curDate = new Date();
        let preDate = util.formatDate.format(new Date(curDate.getTime() - 24 * 60 * 60 * 1000), 'yyyyMMdd'); //前一天
        let params1 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "open",
          "start_day": '20180422',
          "end_day": '20180422'
        };
        requestDayData(params1).then(res => {
          this.query_day_open_amount = res.data[0].Amount?res.data[0].Amount:0 + '张'
        });
        let params2 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "pay",
          "start_day": '20180422',
          "end_day": '20180422'
        };
        requestDayData(params2).then(res => {
          this.query_day_pay_amount = res.data[0].Amount?res.data[0].Amount:0
        });
        let params3 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "busi",
          "start_day": '20180422',
          "end_day": '20180422'
        };
        requestDayData(params3).then(res => {
//            console.log(res)
          this.query_day_busi_amount = res.data[0].Amount?res.data[0].Amount:0;
        });
        // post  /card/rpt/close/query_day
      },
      getprevMonth(){
        let curDate = new Date();
        let preMonth = util.formatDate.format(new Date(curDate.getTime() - 24 * 60 * 60 * 1000), 'yyyyMM');
        let thisDate = curDate.getDate();
//        console.log(preMonth-1);
        if (thisDate == 1) {

        } else {
          let params1 = {
            'group_id': this.$store.state.loginInfo.group_id,
            "buis_type": "open",
            "start_day": preMonth,
            "end_day": preMonth
          };
          requestMonthData(params1).then(res => {
            this.query_month_open_amount = res.data[0].Amount?res.data[0].Amount:0;
          });
          let params2 = {
            'group_id': this.$store.state.loginInfo.group_id,
            "buis_type": "pay",
            "start_day": preMonth,
            "end_day": preMonth
          };
          requestMonthData(params2).then(res => {
            this.query_month_pay_amount = res.data[0].Amount?res.data[0].Amount:0;
          });
          let params3 = {
            'group_id': this.$store.state.loginInfo.group_id,
            "buis_type": "busi",
            "start_day": preMonth,
            "end_day": preMonth
          };
          requestMonthData(params3).then(res => {
            this.query_month_busi_amount = res.data[0].Amount?res.data[0].Amount:0;
          });
        }

      },
      EchartsprevData(val){
        this.EchartsList = [];
        let reg = /-| |:/g;
        let start_day = val[0].replace(reg, '');
        let end_day = val[1].replace(reg, '');
        let params1 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "open",
          "start_day": start_day,
          "end_day": end_day
        };
        requestDayData(params1).then(res => {
          let obj = {};
          let data = [];
          obj.name = '发卡量';
          obj.type = 'line';
          obj.data = data;
          res.data.map((i) => {
//            console.log(i)
            data.push(i.Amount)
          });
//          console.log(obj);
          this.EchartsList.push(obj);
//          console.log(this.EchartsList)
        });
        let params2 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "busi",
          "start_day": start_day,
          "end_day": end_day
        };
        requestDayData(params2).then(res => {
          let obj_busi = {};
          let data = [];
          obj_busi.name = '业务量';
          obj_busi.type = 'line';
          obj_busi.data = data;
          res.data.map((a) => {
//            console.log(i)
            data.push(a.Amount)
          });
          this.EchartsList.push(obj_busi);
        });
        let params3 = {
          'group_id': this.$store.state.loginInfo.group_id,
          "buis_type": "pay",
          "start_day": start_day,
          "end_day": end_day
        };
        requestDayData(params3).then(res => {
          let obj_pay = {};
          let data = [];
          obj_pay.name = '收费金额';
          obj_pay.type = 'line';
          obj_pay.data = data;
          res.data.map((a) => {
//            console.log(i)
            data.push(a.Amount)
          });
          this.EchartsList.push(obj_pay);
        });
        console.log(this.EchartsList)
      },
      tabToggleClick(key){
        this.tabToggleData.map((item, index) => {
          item.display = false;
          if (key == index) {
            this.tabtoggleNum = key;
            item.display = true;
          }
        })
      },
    }
  }
</script>
<style>
  .pageinfo-chart {
    margin: 0 19px;
    background: #ffffff;
    height: 438px;
    border: 1px solid #E2E2E2;
  }

  .page_nav {
    margin-top: 10px;
    border-bottom: 1px solid #9CA8B9;
    height: 50px;
  }
</style>
