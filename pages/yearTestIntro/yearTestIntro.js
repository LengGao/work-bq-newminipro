// pages/yearTestIntro/yearTestIntro.js
let app = getApp();
let api = require("../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterName:''
  },
  goshuati(){
    let chapterId = this.data.chapterId;
    let courseId = this.data.courseId;
    let chapterName = this.data.chapterName
    wx.navigateTo({
      url: `../yearTestPir/yearTestPir?chapterId=${chapterId}&courseId=${courseId}&chapterName=${chapterName}`
   })
  },
  gokaoshi(){
    let chapterId = this.data.chapterId;
    let courseId = this.data.courseId;
    let chapterName = this.data.chapterName
    wx.navigateTo({
      url: `../yearTestStart/yearTestStart?chapterId=${chapterId}&courseId=${courseId}&chapterName=${chapterName}`
   })
  },
  gettruthinfo(options){
    let that = this
    let option = {
      course_id: options.courseId,
      chapter_id:options.chapterId
    }
     app.encryption({
      url: api.default.gettruthinfo,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        try {
          if(res.exam_length){
            that.setData({
              exam_length:res.exam_length,
              pass_scores:res.pass_scores,
              total_point:res.total_point,
              judge:res.question_info.judge,
              multi:res.question_info.multi,
              radio:res.question_info.radio,
              
            })
          }
        } catch (err) {
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
    this.setData({
      chapterId:options.chapterId,
      courseId:options.courseId,
      chapterName:options.chapterName
    })
    this.gettruthinfo(options)
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