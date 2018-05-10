<template>
  <div id="myChart"></div>
</template>
<script>
  import echarts from 'echarts';  //  引入echarts
  export default{
    name: "EchartsBox",
    props: ['EchartsList'],
    data(){
      return {
          data:'',
      }
    },
    mounted(){
      this.drawLine();
    },
    watch:{
      EchartsList:function (val) {
        this.EchartsList = val;
        this.drawLine();
      }
    },
    methods: {
      drawLine() {
        console.log(this.EchartsList);
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['发卡量', '收费金额', '业务量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
              lineStyle: {
                color: '#1D8743',
                width: 2
              },

            },
            axisLabel: {
              textStyle: {
                color: '#8897AB'
              }
            }
          },
          yAxis: {
            type: 'value',
            min: 0.00,
            max: 400.00,
            axisLine: {
              lineStyle: {
                color: '#1D8743',
                width: 2
              },

            },
            axisLabel: {
              textStyle: {
                color: '#8897AB'
              }
            }
          },
          series: this.EchartsList
//            [
//            {
//              name: '发卡量',
//              type: 'line',
//              data: [120.00, 132.00, 101.00, 134.00, 90.00, 230.00, 210.00],
//            },
//            {
//              name: '收费金额',
//              type: 'line',
//              data: [220, 182, 191, 234, 290, 330, 310]
//            },
//            {
//              name: '业务量',
//              type: 'line',
//              data: [150, 232, 201, 154, 190, 330, 10]
//            }
//          ]
        });
      },
    },
  }
</script>
<style>
  #myChart {
    width: 100%;
    height: 100%;
  }
</style>
