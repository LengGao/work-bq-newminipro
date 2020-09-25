// pages/answerCard/answerCard.js
let app = getApp(), api = require("../../../../api.js")
Page({
  data: {
    multipleNum: 0,
    singleNum: 0,
    judgmentNum: 0,
    successOPtion: 'defaultOption',
    correct: [],
    radio: [],
    multi: [],
    judge: [],
    monikaoshi: false
  },
  goToTest() {
    wx.navigateBack({
      delta: 1
    })
  },
  gobefor(e) {
    console.log(e.currentTarget.dataset.index)
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2];
    let number = e.currentTarget.dataset.index// 前一个页面
    // console.log("beforePage");
    // console.log(beforePage);
    wx.navigateBack({
      success: function () {
        beforePage.wode(number); // 执行前一个页面的onLoad方法
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let course_id = options.courseId
    let chapter_id = options.chapter_id
    let exam_identity = options.exam_identity

    that.setData({
      monikaoshi: true
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    let option = {
      course_id: course_id,
      chapter_id: chapter_id,
      exam_identity: exam_identity
    }//以上为初始化加载参数
    app.encryption({//初始化加载函数获取所有题目
      url: api.default.answercard,
      data: option,
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          radio: res.radio,
          multi: res.multi,
          judge: res.judge,
          multipleNum: res.multi.length,
          singleNum: res.radio.length
        })
        // that.data.radio = res.radio
        // that.data.multi = res.multi
        // that.data.judge = res.judge
        console.log(that.data.multipleNum, that.data.singleNum)
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