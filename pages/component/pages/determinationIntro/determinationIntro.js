// pages/yearTestIntro/yearTestIntro.js
let app = getApp();
let api = require("../../../../api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterName: ''
  },
  gokaoshi() {
    let chapterId = this.data.chapterId;
    let courseId = this.data.courseId;//courseID
    let chapterName = this.data.chapterName
    let exam_length = this.data.exam_length //考试时长
    wx.navigateTo({
      url: `../determinTestStart/determinTestStart?chapter_id=${chapterId}&courseId=${courseId}&chapterName=${chapterName}&exam_length=${exam_length}`
    })
  },
  gettruthinfo(options) {
    let that = this
    let option = {
      problem_course_id: options.courseId,
      problem_chapter_id: options.chapterId,
    }
    app.encryption({
      url: api.test.getSelfDeterminationExamConfig,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        try {
          if (res.info) {
            that.setData({
              exam_length: res.info.duration,
              pass_scores: res.info.pass_score,
              total_point: res.info.problem_score,
              judge: res.info.exam_extends.judge,
              multi: res.info.exam_extends.multiple,
              radio: res.info.exam_extends.single,
              fill_vacancy: res.info.exam_extends.fill_vacancy,
              brief: res.info.exam_extends.brief,
              scene: res.info.exam_extends.scene,
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
      chapterId: options.chapterId,
      courseId: options.courseId,
      chapterName: options.chapterName
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
  // onShareAppMessage: function () {

  // }
})