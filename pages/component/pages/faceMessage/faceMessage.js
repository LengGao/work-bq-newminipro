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
    courseId: 0,
    // nofaceShow:false,
    calendarShow: true,
    dayStyle: [],
    courseInfor: [],
    courseStatus: '',
    daytime: '',
    problem_course_id: '',
    pageTotal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let problem_course_id = wx.getStorageSync('problem_course_id').problem_course_id
    this.setData({
      problem_course_id: problem_course_id
    })
    this.doSomething()
    //初始化今天的日期点击事件
    let daytime = {
      detail: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    }
    console.log(daytime)
    this.afterTapDay(daytime, 0)
  },
  //加载更多
  loadMore() {
    console.log('xia拉加载')
    this.getSubscribeList()
  },

  //刷新处理
  refesh: function (e) {
    console.log('刷新')
    this.setData({
      hasRefesh: true,
      page: 1,
      hasMore: true,
    });
    this.getSubscribeList()
  },


  doSomething(a, b) {
    console.log('onload')
    let pro = new Promise((resolve, reject) => {
      let that = this
      let option = {
        problem_course_id: parseInt(this.data.problem_course_id),
      }
      console.log(option)
      app.encryption({
        url: api.default.getTimeList,
        method: "GET",
        data: option,
        success: function (res) {
          console.log(res)
          let datelist = res.list.map(item => {
            if (item.has_classroom > 0) {
              return item.date_time
            }
          })
          // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
          for (let i = 0; i < datelist.length; i++) {
            if (datelist[i] === undefined) {
              datelist.splice(i, 1)
              i = i - 1
            }
          }
          // console.log(datelist)
          var datenum = []
          var dayStyle3 = []
          datelist.forEach(item => {
            datenum = item.split('')
            let year = datenum[0] + datenum[1] + datenum[2] + datenum[3]
            let month = ''
            let day = ''
            if (datenum[4] == 0) {
              month = datenum[5]
            } else {
              month = datenum[4] + datenum[5]
            }
            if (datenum[6] == 0) {
              day = datenum[7]
            } else {
              day = datenum[6] + datenum[7]
            }
            let dayStyle = {
              year: year,
              month: month,
              day: day
            }
            dayStyle3.push(dayStyle)
          });
          resolve(dayStyle3)
          console.log(dayStyle3)
          that.setData({
            dayStyle: dayStyle3
          })

        },
        fail: function (t) {

        },
        complete: function () {

        }
      })
      console.log(this.data.dayStyle)

    })
    console.log(pro)
    pro.then((res) => {
      console.log(res)
      // console.log(13)
      this.afterCalendarRender(res)
    })


  },

  /**
   * 选择日期后执行的事件
   * currentSelect 当前点击的日期
   * allSelectedDays 选择的所有日期（当multi为true时，allSelectedDays有值）
   */
  onTapDay(e) {
    // console.log('onTapDay', e.detail)
  },
  //点击日期时触发
  afterTapDay(e, newdatatime) {
   
    //  console.log('afterTapDay', e.detail);
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
    this.getSubscribeList()
  },
  //点击月份时触发
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    let currentYear = e.detail.next.year
    let currentMonth = e.detail.next.month
    console.log(currentMonth, currentYear)
    this.doSomething(currentMonth, currentYear)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },

  // whenChangeWeek(e) {
  //   console.log('whenChangeWeek', e.detail);

  // },

  //点击下拉按钮更改页面样式
  dropdown() {
    console.log(111)
    this.setData({
      calendarShow: !this.data.calendarShow,
      'calendarConfig.hideHeadOnWeekMode': !this.data.calendarConfig.hideHeadOnWeekMode
    })

  },
  //获取时间轴
  // getTimeList(courseId, currentMonth, currentYear) {
  //   console.log('getTimeList')

  // },
  //面授课堂列表
  getSubscribeList() {
    let that = this
    let option = {
      problem_course_id: parseInt(this.data.problem_course_id),
      date_time: parseInt(this.data.daytime),
      page: this.data.page
    }
    if (!this.data.hasMore) return
    if(this.data.page==1){
      this.setData({
        hasRefesh: false,
      });
    }else{
      this.setData({
        hasRefesh: true,
      });
    }
    console.log(option)
    that.setData({
      newDataTime: this.data.daytime,
      hidden: false
    })
    app.encryption({
      url: api.default.getSubscribeList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let total = res.total
        let pageNum = Math.ceil(total / 20)
        that.setData({
          hidden: true
        })
      
        let courbox = res.list
        for (let k in courbox) {
          courbox[k].show_time = util.js_date_time(courbox[k].show_time)
          courbox[k].close_time = util.js_date_time(courbox[k].close_time)
          if (courbox[k].tips_type == 0 || courbox[k].tips_type == 1) {
            that.setData({
              courseStatus: 'courseStatus'
            })
          } else if (courbox[k].tips_type == 2 || courbox[k].tips_type == 3) {
            that.setData({
              courseStatus: 'courseStatus3'
            })
          } else {
            that.setData({
              courseStatus: 'courseStatus2'
            })
          }
        }
        if(pageNum<2){
          that.setData({
            courseInfor: courbox,
            hasRefesh: false,
            pageNum: pageNum, 
            hasMore:false,
            noContent:false ,
            page: that.data.page + 1
          })
         }
        if (that.data.page == 1) {
          that.setData({
            courseInfor: courbox,
            hasRefesh: false,
            pageNum: pageNum, 
             hasRefesh: false,
            page: that.data.page + 1,
         
          })
        } else if (that.data.page > 1 && that.data.page <= pageNum) {
         
          if (that.data.page == pageNum) {
            that.setData({
              hasMore: false,
            noContent:true 
            })
          }
          that.setData({
            courseInfor: that.data.courseInfor.concat(courbox),
            hasRefesh: false,
            pageNum: pageNum,
            page: that.data.page + 1
          })
        }


        // if (this.data.page > 1) {
        //   that.setData({
        //     courseInfor: this.data.courseInfor.concat(courbox),
        //     hasRefesh: false,
        //   })
        // } else {
        //   that.setData({
        //     courseInfor: courbox,
        //     hasRefesh: false,
        //   })
        // }
        // that.setData({
        //   courseInfor: courbox,
        //   hasRefesh: false,
        // })
        // console.log(this.data.courseInfor)


      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  tofaceDetail(e) {
    console.log(e.currentTarget)
    // let courseid = e.currentTarget.dataset.courseid
    // let datetime = e.currentTarget.dataset.datetime
    // let updatethisid = e.currentTarget.dataset.updatethisid
    // let subscribeStatushave = 1
    // let newDataTime = this.data.newDataTime
    let subscribe_classroom_id = e.currentTarget.dataset.subscribe_classroom_id

    // wx.navigateTo({
    //   url: `../faceDetail/faceDetail?subscribeId=${courseid}&datetime=${datetime}&subscribeStatushave=${subscribeStatushave}&updatethisid=${updatethisid}&newDataTime=${newDataTime}`
    // })
    wx.navigateTo({
      url: `../faceDetail/faceDetail?subscribe_classroom_id=${subscribe_classroom_id}`
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