// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum: '',
    singleNum: '',
    judgmentNum: '',
    successOPtion: 'defaultOption',
    correct: []
  },
  goToTest() {
    wx.redirectTo({
      url: "../test/test"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let multipleNum = JSON.parse(options.multipleNum)
    let singleNum = JSON.parse(options.singleNum)
    let judgmentNum = JSON.parse(options.judgmentNum)
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name
    })
    let option = {
      dailyId: parseInt(options.dailyId)
    }//以上为初始化加载参数
    console.log(option)
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.getDailyPunchFacePlate,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res, typeof (res.data))
        if (typeof (res.data) != 'undefined') {
          console.log('1')
          that.setData({
            multipleNum: multipleNum,
            singleNum: singleNum,
            judgmentNum: judgmentNum
          })
        } else {
          console.log('2')
          for (let i of singleNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          for (let i of multipleNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          for (let i of judgmentNum) {
            for (let j of res) {
              if (i.problemId == j.problemId) {
                i.correct = j.rightStatus
              }
            }
          }
          that.setData({
            multipleNum: multipleNum,
            singleNum: singleNum,
            judgmentNum: judgmentNum
          })
        }
        console.log(that.data.singleNum)
      },
      fail: function (n) {
        console.log('初始化失败')
      }
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