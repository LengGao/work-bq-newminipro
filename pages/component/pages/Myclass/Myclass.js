// pages/AllTestPir/AllTestPir.js
let app = getApp()
let api = require("../../../../api.js")
let util = require("../../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nodata: false
  },
  getMyAllClassroom(options) {
    console.log('nimen')
    let that = this
    let courseId = options.courseId
    let option = {
      courseId: courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getMyAllClassroom,
      method: "GET",
      data: option,
      success: function (res) {
        res.forEach(res => {
          res.time = util.js_date_time(res.time)
        })
        that.setData({
          myclass: res
        })
        console.log('nimenhao', that.data.nodata)
        if (res.data != undefined) {
          that.setData({
            nodata: true
          })

        }

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
    this.getMyAllClassroom(options)

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