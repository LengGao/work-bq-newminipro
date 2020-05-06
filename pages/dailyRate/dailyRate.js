// pages/dailyRate/dailyRate.js
let app = getApp(), api = require("../../api.js"),util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    everyDate:[
      {
        name:'12',
        title:'累计打卡天数',
        desc:'天'
      },
      {
        name:'15:30',
        title:'本次打卡时间',
        desc:''
      },
      {
       name:'68',
       title:'今天打卡排行',
       desc:''
      }
    ],
    singleNum:10,
    successOPtion:'defaultOption',
    rate:0
  },
  goshare(){
    wx.navigateTo({
      url:'../dailyShare/dailyShare'
    })
  },
  goback(){
      
  },
  getinfo(){
    let that = this
    let option = {
      courseId: this.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getTodayStatus,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let allInfo = 'everyDate[0].name'
        let allInfo1 = 'everyDate[1].name'
        let allInfo2 = 'everyDate[2].name'
        that.setData({
           [allInfo]:res.punchCount,
           [allInfo1]:res.useTime,
           [allInfo2]:res.todayCount,
           rate:res.accuracy
        })
        let date= util.js_date_time(res.createTime )
        that.setData({
          time: date
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    console.log(options)
     this.setData({
       
       courseId:options.courseId
     });
     this.getinfo()
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