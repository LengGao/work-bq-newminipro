// pages/virTest/virTest.js
let app = getApp();
let api = require("../../../../api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    datas: true,
    courseId: ''
  },
  goback(){
    wx.reLaunch({
      url:  `../../../personal-center/personal-center`
    })
  },
  gointro(e) {
    console.log(e)
    let chapterId = e.currentTarget.dataset.chapterid
    let courseId = this.data.courseId
    let chapterName = e.currentTarget.dataset.chaptername
    const index = e.currentTarget.dataset.index
    const { has_exam ,id } = this.data.history[index] || {}
    if(has_exam == 1 && id){
      wx.showModal({
       title:'提示',
       content:'当前试卷已完成考试',
       confirmText:'查看解析',
       confirmColor:'#199fff',
       cancelText:'关闭',
       success(e){
          e.confirm &&  wx.navigateTo({
            url: `../yearTestScroll/yearTestScroll?real_topic_log_id=${id}&chapterName=${chapterName}&course_id=${courseId}&type=4&exam_length=10`
          })
        }
      })
      return
    }
    wx.navigateTo({
      url: `../determinationIntro/determinationIntro?chapterId=${chapterId}&courseId=${courseId}&chapterName=${chapterName}`
    })
  },
  getyearTest() {
    let option = {
      problem_course_id: this.data.courseId,
      chapter_type:'3'
    }, that = this
    app.encryption({
      url:  api.test.getChapter,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        try {
          that.setData({
            history: res.list
          })
        } catch (err) {
          wx.showToast({
            title: '获取自主真题失败',//提示文字
            duration: 1500,//显示时长
            mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon: 'none', //图标，支持"success"、"loading"  
            success: function () { },//接口调用成功
            fail: function () { },  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
          })
        }
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      courseId: options.courseId
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
    this.getyearTest()//加载历年真题
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