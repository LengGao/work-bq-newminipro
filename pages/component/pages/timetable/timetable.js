let app = getApp(),
  api = require("../../../../api.js"),
  util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    page: 1,
    pageNum:'',
    hasMore: true,
    hasRefesh: false,
    noContent:false,
    //日历组件
    calendarConfig: {
      theme: 'elegant',
      markToday: '今',
      highlightToday: true,
      hideHeadOnWeekMode: false,
      showHandlerOnWeekMode: true,
      defaultDay: ''
    },
    calendarShow: true,
    dayStyle: [],
    courseInfor: [],
    daytime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getUserArrange()
    //初始化今天的日期点击事件
    const date = new Date()
    const daytime = {
      detail: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day:date.getDate()
      }
    }
    this.afterTapDay(daytime, 0)
  },
  //点击日期时触发
  afterTapDay(e, newdatatime) {
    function Appendzero(obj) {
      if (obj < 10) return "0" + "" + obj;
      else return obj;
    }
    let daytime
    if (newdatatime) {
      daytime = newdatatime
    } else {
      let month = Appendzero(e.detail.month) + ''
      let day = Appendzero(e.detail.day) + ''
      daytime = e.detail.year + month + day
    }
    this.setData({
      daytime: daytime,
      hasMore:true,
      page:1
    })
    this.getUserArrangeDetail(daytime)
  },
  //点击月份时触发
  whenChangeMonth(e) {
    let currentYear = e.detail.next.year
    let currentMonth = e.detail.next.month
    currentMonth = currentMonth<10?'0'+currentMonth:currentMonth
    const daytime = currentYear+''+currentMonth
    this.getUserArrange(daytime)
  },
  //点击下拉按钮更改页面样式
  dropdown() {
    this.setData({
      calendarShow: !this.data.calendarShow,
      'calendarConfig.hideHeadOnWeekMode': !this.data.calendarConfig.hideHeadOnWeekMode
    })
  },
  // 获取指定日期的课表
  getUserArrangeDetail(date) {
    let option = {
      date
    }
    app.encryption({
      url: api.test.getUserArrangeDetail,
      method: "GET",
      data: option,
      success:  (res)=> {
          this.setData({
            courseInfor:Array.isArray(res)?res:[]
          })
    }
    })
  },
  // 获取月份的课表
  getUserArrange(month) {
    let option = {
      month
    }
    app.encryption({
      url: api.test.getUserArrange,
      method: "GET",
      data: option,
      success:  (res)=> {
        const dateList =Array.isArray(res)? res.map(item=>{
          return {
            year:item.title.substr(0,4),
            month:item.title.substr(5,2),
            day:item.title.substr(8,2)
          }
        }):[]
        this.afterCalendarRender(dateList)
    }
    })
  },
  //日历渲染完成之后
  afterCalendarRender(daylist) {
    // 没有就延迟执行
    if(!this.calendar){
      setTimeout(()=>{
        this.afterCalendarRender(daylist)
      },50)
      return false
    }
    this.calendar.setTodoLabels({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#3AE755', // 待办点标记颜色
      // circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days: daylist
    });
  }
})