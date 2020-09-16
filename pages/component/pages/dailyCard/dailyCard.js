// pages/dailyCard/dailyCard.js
let app = getApp(), api = require("../../../../api.js"), util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    everyDate: [
      {
        name: '12',
        title: '累计打卡天数',
        desc: '天'
      },
      {
        name: '15:30',
        title: '平均打卡时间',
        desc: ''
      },
      {
        name: '68',
        title: '今天打卡人数',
        desc: '人'
      }
    ],
    directions: [
      {
        name: '每天只能打卡一次，00:00更新数据'
      },
      {
        name: '每次推荐一个知识点，包括10个题目'
      },
      {
        name: '题目均为单选题，全部答完才可提交打卡'
      }
    ]
  },
  goAny() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../dailyRate/dailyRate?courseId=${courseId}`
    })
  },
  goback() {
    wx.reLaunch({
      url: '../../../../pages/index/index'
    })
  },
  gopri() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../daliyPri/daliyPri?courseId=${id}`
    })
  },
  getTodayStatus() {
    let that = this
    let option = {
      courseId: that.data.courseId
    }
    app.encryption({
      url: api.default.getTodayStatus,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        let allData = 'everyDate[0].name', allData1 = 'everyDate[1].name', allData2 = 'everyDate[2].name'
        if (res.data == undefined) {
          that.setData({
            [allData]: res.punchCount,
            [allData1]: res.useTime,
            [allData2]: res.todayCount,
            isCrard: res.isPunch,
            accuracy: res.accuracy
          })
        } else {

        }
      },
      fail: function (t) {
        return reject
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
      navH: app.globalData.navHeight,
      courseId: options.courseId
    })
    let date = util.getDates(1, new Date())
    console.log(date)
    this.setData({
      time: date,
    });
    this.getTodayStatus()

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