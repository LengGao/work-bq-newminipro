
let app = getApp(), api = require("../../api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:0,
    // nofaceShow:false,
    calendarShow:true,
    dayStyle: [
      { month: 'current', day:18, color: 'white', background: '#AAD4F5' }, 
    ],
    courseInfor: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let courseId  =wx.getStorageSync('courseId').courseId
    this.setData({
      courseId:courseId
    })
    this.getTimeList(courseId)

    // console.log(this.data.courseInfor.length<=0)
    // if(this.data.courseInfor.length<=0){
    //   console.log(111)
    //   this.setData({
    //     nofaceShow:'true'
    //   })    }else{
    //     this.setData({
    //       nofaceShow:false
    //     })   
    //   }
  },
  //点击下拉按钮更改页面样式
  dropdown(){
    console.log(111)
    this.setData({
      calendarShow:!this.data.calendarShow
    })
   
  },
  //获取时间轴
  getTimeList(courseId,currentMonth,currentYear){
    let that = this
    let option= {
      courseId:courseId,
      month:currentMonth-0,
       year:currentYear-0
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
        for (let i = 0; i < datelist.length; i++) {
          if (datelist[i] === undefined) {
            datelist.splice(i, 1)
            i = i - 1          // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
          }
        }
        var datenum =[]
        var dayStyle3=[]
        datelist.forEach(item => {
          datenum= item.split('')
          let dateindex =''
          if(datenum[6]==0){
            dateindex=datenum[7]
          }else{
            dateindex=datenum[6]+datenum[7]
          }
          console.log(dateindex)
          let dayStyle2=  { month: 'current', day:dateindex-0, color: '#199FFF', background: '#FFF' }
          dayStyle3.push(dayStyle2) 
        });
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
  },
  //面授课堂列表
  getSubscribeList(courseId,daytime){
    let that = this
    let option= {
      courseId:courseId,
      dateTime:daytime-0
    }
    console.log(option)
   
    app.encryption({
      url: api.default.getSubscribeList,
      method: "GET",
      data:option,
      success: function (res) {
        that.setData({
          courseInfor:res.list
        })
       

        console.log(res.list)
      },
      fail: function (t) {
      
      },
      complete: function () {

      }
    })
  },
  
   //给点击的日期设置一个背景颜色
   dayClick: function (event) {
     console.log(event)
    function Appendzero(obj)
    {
        if(obj<10) return "0" +""+ obj;
        else return obj;
    }
     console.log(event.detail)
     let month=Appendzero(event.detail.month)+''
     let day = Appendzero(event.detail.day)+''
     let daytime = event.detail.year+month+day
     let courseId  =wx.getStorageSync('courseId').courseId
     this.getSubscribeList(courseId, daytime) 
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[0].day`;
    let changeBg = `dayStyle[0].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "red"
    })
  },
  //点击下一个月事件
  next: function (event) {
    
    let currentMonth=event.detail.currentMonth
    let currentYear=event.detail.currentYear
   this.getTimeList(this.data.courseId ,currentMonth,currentYear)
    console.log(currentYear);

},
 //点击下一个月事件
 prev: function (event) {
  let currentMonth=event.detail.currentMonth
  let currentYear=event.detail.currentYear
 this.getTimeList(this.data.courseId ,currentMonth,currentYear)
},
//点击日历标题日期选择器事件:dateChange
dateChange: function (event) {
  let currentMonth=event.detail.currentMonth
  let currentYear=event.detail.currentYear
 this.getTimeList(this.data.courseId ,currentMonth,currentYear)
},
  tofaceDetail(e){
    console.log(e)
    let courseid =e.currentTarget.dataset.courseid
    let datetime =e.currentTarget.dataset.datetime
    let subscribeStatushave = 1
    console.log(datetime)
    wx.navigateTo({
      url: `../faceDetail/faceDetail?subscribeId=${courseid}&datetime=${datetime}&subscribeStatushave=${subscribeStatushave}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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