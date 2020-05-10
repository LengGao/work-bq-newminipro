import * as echarts from '../../ec-canvas/echarts';
let app = getApp();
var api = require("../../api.js");
function initChart2(data, canvas, width, height, dpr) {
  console.log(data)
  var option = {
    backgroundColor: "#ffffff",
    color: ["#ff5b5d", "#ffcc2d", "#5b9cff"],
    series: [{
      name: '业务指标',
      type: 'gauge',
      detail: {
        formatter: data + '%'
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
        textStyle: {
          fontSize: 8
        }
      },
      axisTick: { //刻度线样式（及短线样式）
        length: 6,
        distance: 28,
        splitNumber: 6
      },
      axisLabel: {
        show: true,
        distance: 10
      },
      splitLine: {
        show: true,
        length: 25,
      },
      detail: {
        formatter: data + '%',
        textStyle: {
          fontSize: 21
        }
      },
      data: [{
        value: data,
        name: '',
      }]

    }]
  };
  // chart.setOption(option, true);
  return option;
}
function initChart(data, canvas, width, height, dpr) {
  var option = {
    title: {
      text: '最近7次模拟考试成绩',
      left: '30',
      top: '30',
      textStyle: {
        fontSize: '12'
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
      data: data.mark
    }]
  };
  return option;
}
function initChart3(data, canvas, width, height, dpr) {
  var option = {
    series: [
      {
        name: '做题正确率',
        type: 'pie',
        radius: ['50%', '55%'],
        avoidLabelOverlap: false,
        silent: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
          }
        },
        labelLine: {
          show: false
        },
        hoverAnimation: false,
        data: [
          {
            value: data.single, name: '单选题', itemStyle: {
              color: '#41E58A', borderWidth: 1
            }
          },
          {
            value: (100 - data.single), name: '多选题', itemStyle: {
              color: '#EEEEEE', borderWidth: 1
            }
          },
        ]
      }
    ]
  };

  return option;
}
function initChart4(data, canvas, width, height, dpr) {
  var option = {
    series: [
      {
        name: '做题正确率',
        type: 'pie',
        radius: ['50%', '55%'],
        avoidLabelOverlap: false,
        silent: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
          }
        },
        labelLine: {
          show: false
        },
        hoverAnimation: false,
        data: [
          {
            value: data.multiple, name: '单选题', itemStyle: {
              color: '#199FFF', borderWidth: 1
            }
          },
          {
            value: (100 -data.multiple), name: '多选题', itemStyle: {
              color: '#EEEEEE', borderWidth: 1
            }
          },
        ]
      }
    ]
  };

  return option;
}
function initChart5(data, canvas, width, height, dpr) {
  var option = {
    series: [
      {
        name: '做题正确率',
        type: 'pie',
        radius: ['50%', '55%'],
        avoidLabelOverlap: false,
        silent: true,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
          }
        },
        labelLine: {
          show: false
        },
        hoverAnimation: false,
        data: [
          {
            value: data.judgment, name: '单选题', itemStyle: {
              color: '#E65DFF', borderWidth: 1
            }
          },
          {
            value: (100-data.judgment), name: '多选题', itemStyle: {
              color: '#EEEEEE', borderWidth: 1
            }
          },
        ]
      }
    ]
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
      lazyLoad: true,
    },
    ecLine2: {
      lazyLoad: true,

    },
    ecLine3: {
      lazyLoad: true
    },
    ecLine4: {
      lazyLoad: true
    },
    ecLine5: {
      lazyLoad: true
    },
    everyDate: [
      {
        name: '15:30',
        title: '累计刷题天数',

      },
      {
        name: '120',
        title: '观看视频时间',

      },
      {
        name: '68',
        title: '参加直播场次'
      }
    ],
    practise: [
      {
        name: '15:30',
        title: '刷题总数量',

      },
      {
        name: '120',
        title: '累计收藏题数',

      },
      {
        name: '68',
        title: '累计错题题数'
      }
    ],
    UserInfo: null
  },
  onLoad(optinos) {
    console.log(optinos)
    let c1 = wx.getStorageSync('courseId').courseId
    let courseId = optinos.courseId == "undefined" ? c1 : optinos.courseId
    this.setData({
      courseId:courseId,
      navH: app.globalData.navHeight,
    })
    console.log()
    this.ecComponent = this.selectComponent('#mychart-dom-gauge');
    this.eclineComponent = this.selectComponent('#mychart-dom-line');
    this.ecpie1Component = this.selectComponent('#mychart-dom-pie1');
    this.ecpie2Component = this.selectComponent('#mychart-dom-pie2');
    this.ecpie3Component = this.selectComponent('#mychart-dom-pie3');
    //这里是获取url中get方式传递的参数 比如 http://xx.com?scode=11
    this.getLearningReports()
  },
  goback(){
    wx.reLaunch({
      url:  `../personal-center/personal-center`
    })
  },
  getLearningReports() {
    let that = this
    let courseId = that.data.courseId
    console.log(courseId)
    let option = {
      courseId: courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getLearningReports,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let everyDate0 = 'everyDate[0].name'
        let everyDate1 = 'everyDate[1].name'
        let everyDate2 = 'everyDate[2].name'
        let Practise0 = 'practise[0].name'
        let Practise1 = 'practise[1].name'
        let Practise2 = 'practise[2].name'
        console.log(res.Practise.collection,res.Practise.error)
        that.setData({
          [everyDate0]: res.Practise.day,
          [everyDate1]: res.Top.watchTime,
          [everyDate2]: res.Top.liveNumer,
          [Practise0]: res.Practise.total,
          [Practise1]: res.Practise.collection,
          [Practise2]: res.Practise.error,
          Challenge: res.Challenge,
          UserInfo: res.UserInfo,
          MockExamination: res.MockExamination,
          Practise: res.Practise,
          Punch: res.Punch,
          Top: res.Top
        })
        that.ecComponent.init((canvas, width, height) => {
          const mychartline = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(mychartline);
          mychartline.setOption(initChart2(res.Practise.accuracy));
          return mychartline;
        })
        that.eclineComponent.init((canvas, width, height) => {
          const mychartline = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(mychartline);
          mychartline.setOption(initChart(res.MockExamination));
          return mychartline;
        })
        that.ecpie1Component.init((canvas, width, height) => {
          const mychartline = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(mychartline);
          mychartline.setOption(initChart3(res.MockExamination));
          return mychartline;
        })
        that.ecpie2Component.init((canvas, width, height) => {
          const mychartline = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(mychartline);
          mychartline.setOption(initChart4(res.MockExamination));
          return mychartline;
        })
        that.ecpie3Component.init((canvas, width, height) => {
          const mychartline = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(mychartline);
          mychartline.setOption(initChart5(res.MockExamination));
          return mychartline;
        })
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  onInit: function (canvas, width, height) {
    //初始化echarts元素，绑定到全局变量，方便更改数据
    const mychartline = echarts.init(canvas, null, {
      width: width,
      height: height,

    });
    canvas.setChart(mychartline);
    mychartline.setOption(initChart());
    return mychartline;
  },
  onReady() {}
});
