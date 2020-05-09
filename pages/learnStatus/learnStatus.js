import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
function initChart2(canvas, width, height, dpr) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#ff5b5d", "#ffcc2d", "#5b9cff"],
    series: [{
      name: '业务指标',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 25,
          shadowBlur: 0,
          color: [
            [0.3, '#ff5b5d'],
            [0.7, '#ffcc2d'],
            [1, '#5b9cff']
          ]
        },
        textStyle:{
          fontSize:8
        }
      },
      axisTick: { //刻度线样式（及短线样式）
        length : 6,
        distance:28,
        splitNumber:6
      },
      axisLabel:{
        show:true,
        distance:10
      },
      splitLine:{
        show:true,
        length:25,
      },
      detail:{
        formatter:'10%',
        textStyle:{
          fontSize:21
        }
      },
      data: [{
        value: 10,
        name: '',
      }]

    }]
  };
  // chart.setOption(option, true);
  return option;
}
function initChart(canvas, width, height, dpr) {
  var option = {
    title: {
      text: '最近7次模拟考试成绩',
      left: '30',
      top:'30',
      textStyle:{
        fontSize:'12'
      }
    },
    color: ["#37A2DA"],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18.5, 36.6, 65.6, 30.5, 78.6, 40.5, 33.4]
    }]
  };
  return option;
}
function initChart3(canvas, width, height, dpr) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }]
    }]
  };
  return option;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ecLine: {
      onInit: function (canvas, width, height){
        //初始化echarts元素，绑定到全局变量，方便更改数据
        const  mychartgauge = echarts.init(canvas, null, {
            width: width,
            height: height,
          
        });
        canvas.setChart(mychartgauge);
        mychartgauge.setOption(initChart2());
        return mychartgauge;
    }
  },
  ecLine2: {
    onInit: function (canvas, width, height){
      //初始化echarts元素，绑定到全局变量，方便更改数据
      const  mychartline = echarts.init(canvas, null, {
          width: width,
          height: height,
        
      });
      canvas.setChart(mychartline);
      mychartline.setOption(initChart());
      return mychartline;
  }
},
ecLine3: {
  onInit: function (canvas, width, height){
    //初始化echarts元素，绑定到全局变量，方便更改数据
    const  mychartline = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(mychartline);
    mychartline.setOption(initChart3());
    return mychartline;
}
},
    everyDate: [
      {
        name: '15:30',
        title: '挑战用时',

      },
      {
        name: '120',
        title: '挑战得分',

      },
      {
        name: '68',
        title: '挑战排名'
      }
    ]
  },
  onLoad(){
 
  
  },
  
  onReady() {
    
  }
});
