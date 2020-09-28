// pages/challengRate/challengRate.js
let app = getApp(), api = require("../../../../api.js"), util = require("../../../../utils/util.js"), pages = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: [
      {
        name: '排名'
      },
      {
        name: '姓名'
      },
      {
        name: '得分'
      },
      {
        name: '用时'
      }
    ],
    infos: [],
    userInfo: []
  },
  MyRankeEdition() {
    var that = this;
    wx.showLoading({
      title: "加载中..."
    });
    let option = {
      problem_course_id: that.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.test.getTodayChallengeForMyself,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        // let times = util.setTimes(res.info.use_time)
        // if (res.data == undefined) {
        // }
        that.setData({
          userInfo:res.info
        })
      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.errmsg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  getRankeEdition() {
    var that = this;
    wx.showLoading({
      title: "加载中..."
    });
    pages = pages + 1
    let option = {
      problem_course_id:this.data.courseId,
      page:pages
    }
    console.log(option)
    app.encryption({
      url: api.test.getChallengeRankList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        that.data.infos.push.apply(that.data.infos,res.list)
        that.setData({
          infos: that.data.infos
        })
        console.log(that.data.infos)
      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.errmsg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  gochallengPri() {
    let id = this.data.courseId
    wx.navigateTo({
      url: `../challengPri/challengPri?courseId=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let date = util.getDates(1, new Date())
    console.log(date)
    this.setData({
      courseId: options.courseId,
      time: date
    })
    this.MyRankeEdition()
    this.getRankeEdition()

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
     this.getRankeEdition()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})