
let app = getApp(), api = require("../../api.js"),util =  require("../../utils/util.js")
 import { getCurrentYM } from '../calendar/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //日历组件
    calendarConfig:{
      theme: 'elegant',
      markToday: '今',
      highlightToday: true,
      hideHeadOnWeekMode: false, 
      showHandlerOnWeekMode: true,
      defaultDay: ''
    },

    courseId:0,
    // nofaceShow:false,
    calendarShow:true,
    dayStyle: [],
    courseInfor: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   this.doSomething()
   //初始化今天的日期点击事件
   let daytime = {detail:{year:new Date().getFullYear(),month:new Date().getMonth()+1,day:new Date().getDate()}}
   console.log(daytime)
  this.afterTapDay(daytime,0)
  },
  doSomething(a,b){
    let courseId  =wx.getStorageSync('courseId').courseId
    this.setData({
      courseId:courseId
    })
    console.log('onload')
   
    let pro = new Promise((resolve, reject) => {
      let that = this
    let option= {
      courseId:courseId,
      month:a-0,
       year:b-0
    }
    console.log(option)
    app.encryption({
      url: api.default.getTimeList,
      method: "GET",
      data:option,
      success: function (res) {
       console.log(res.list)
      let datelist=  res.list.map(item=>{
          if(item.hasClass>0){
            return item.dateTime
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
        var datenum =[]
        var dayStyle3=[]
        datelist.forEach(item => {
          datenum= item.split('')
          let year = datenum[0]+datenum[1]+datenum[2]+datenum[3]
          let month = ''
          let day = ''
          if(datenum[4]==0){
            month=datenum[5]
          }else{
            month=datenum[4]+datenum[5]
          }
          if(datenum[6]==0){
            day=datenum[7]
          }else{
            day=datenum[6]+datenum[7]
          }
          let dayStyle=  {year: year,month: month,day: day }
          dayStyle3.push(dayStyle)
        });
        resolve(dayStyle3)
         console.log(dayStyle3)
        that.setData({
          dayStyle:dayStyle3
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
  onTapDay(e){
    // console.log('onTapDay', e.detail)
  },
  //点击日期时触发
  afterTapDay(e,newdatatime) {
    console.log('初始话',newdatatime)
  //  console.log('afterTapDay', e.detail);
   function Appendzero(obj){
        if(obj<10) return "0" +""+ obj;
        else return obj;
    }
     let daytime
     if(newdatatime){
       daytime = newdatatime
     }else{
      let month=Appendzero(e.detail.month)+''
      let day = Appendzero(e.detail.day)+''
      daytime = e.detail.year+month+day
     }
     console.log(daytime)
     let courseId  =wx.getStorageSync('courseId').courseId
   this.getSubscribeList(courseId, daytime) 
  },
  //点击月份时触发
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    let currentYear=e.detail.next.year
    let currentMonth=e.detail.next.month
    console.log(currentMonth,currentYear)
    this.doSomething(currentMonth,currentYear)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
 
  // whenChangeWeek(e) {
  //   console.log('whenChangeWeek', e.detail);
    
  // },
 
  //点击下拉按钮更改页面样式
  dropdown(){
    console.log(111)
    this.setData({
      calendarShow:!this.data.calendarShow,
      'calendarConfig.hideHeadOnWeekMode':!this.data.calendarConfig.hideHeadOnWeekMode
    })
   
  },
  //获取时间轴
  getTimeList(courseId,currentMonth,currentYear){
    console.log('getTimeList')
   
  },
  //面授课堂列表
  getSubscribeList(courseId,daytime){
    let that = this
    let option= {
      courseId:courseId,
      dateTime:daytime-0
    }
    console.log(option)
   that.setData({
     newDataTime:daytime-0
   })
    app.encryption({
      url: api.default.getSubscribeList,
      method: "GET",
      data:option,
      success: function (res) {
        console.log(res.list)
      let courbox =res.list
      console.log(courbox==undefined)
      if(courbox==undefined){
        courbox=[]
      }
        for(let k in courbox)
        {
          courbox[k].timeInfo = util.dateToSubstr2(courbox[k].dateTime,courbox[k].startTime,courbox[k].endTime)
        }
        that.setData({
          courseInfor:courbox
        })
       

       
      },
      fail: function (t) {
      
      },
      complete: function () {

      }
    })
  },
  
   //给点击的日期设置一个背景颜色
  //  dayClick: function (event) {
  //    console.log(event)
  //   function Appendzero(obj)
  //   {
  //       if(obj<10) return "0" +""+ obj;
  //       else return obj;
  //   }
  //    console.log(event.detail)
  //    let month=Appendzero(event.detail.month)+''
  //    let day = Appendzero(event.detail.day)+''
  //    let daytime = event.detail.year+month+day
  //    let courseId  =wx.getStorageSync('courseId').courseId
  //    this.getSubscribeList(courseId, daytime) 
  //   let clickDay = event.detail.day;
  //   let changeDay = `dayStyle[0].day`;
  //   let changeBg = `dayStyle[0].background`;
  //   this.setData({
  //     [changeDay]: clickDay,
  //     [changeBg]: "red"
  //   })
  // },
  //点击下一个月事件
//   next: function (event) {
    
//     let currentMonth=event.detail.currentMonth
//     let currentYear=event.detail.currentYear
//    this.getTimeList(this.data.courseId ,currentMonth,currentYear)
//     console.log(currentYear);

// },
 //点击下一个月事件
//  prev: function (event) {
//   let currentMonth=event.detail.currentMonth
//   let currentYear=event.detail.currentYear
//  this.getTimeList(this.data.courseId ,currentMonth,currentYear)
// },



//点击日历标题日期选择器事件:dateChange
// dateChange: function (event) {
//   let currentMonth=event.detail.currentMonth
//   let currentYear=event.detail.currentYear
//  this.getTimeList(this.data.courseId ,currentMonth,currentYear)
// },
  tofaceDetail(e){
    console.log(e.currentTarget.dataset)
    let courseid =e.currentTarget.dataset.courseid
    let datetime =e.currentTarget.dataset.datetime
    let updatethisid= e.currentTarget.dataset.updatethisid
    let subscribeStatushave = 1
    let newDataTime = this.data.newDataTime
    console.log(datetime)
    wx.navigateTo({
      url: `../faceDetail/faceDetail?subscribeId=${courseid}&datetime=${datetime}&subscribeStatushave=${subscribeStatushave}&updatethisid=${updatethisid}&newDataTime=${newDataTime}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //日历渲染完成之后
  afterCalendarRender(daylist){
    console.log(111)
    let that =this
    console.log(this.data.dayStyle)
    this.calendar.setTodoLabels({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#3AE755', // 待办点标记颜色
      // circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days:daylist
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.doSomething()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})