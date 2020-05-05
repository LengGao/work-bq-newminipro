// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    multipleNum:'',
    singleNum:'',
    judgmentNum:'',
    successOPtion:'defaultOption',
    correct:[]
  },
  goToTest(){
    wx.redirectTo({
      url: "../test/test"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let course_id = options.courseId
    let chapter_id = options.chapter_id
    let exam_identity = options.exam_identity
      wx.setNavigationBarTitle({
        title:options.name
      })
      let option = {
        course_id:course_id,
        chapter_id:chapter_id,
        exam_identity:exam_identity
      }//以上为初始化加载参数
      app.encryption({//初始化加载函数获取所有题目
        url: api.default.answercard,
        data: option,
        method: 'GET',
        dataType: "json",
        success: function (res) {
          console.log(res)
          that.setData({
              radio:res.radio,
              multi:res.multi,
              judge:res.judge
          })
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
  onUnload: function (option) {
   
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