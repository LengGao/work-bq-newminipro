// pages/component//pages/openClassReview/index.js
var app = getApp(),
  api = require("../../api"),
  wxParse = require("../../../../wxParse/wxParse.js");;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    playIndex: 0,
    tabData: [{
        name: '直播简介'
      },
      {
        name: '回顾视频'
      }
    ],
    videoDetail: {},
    videoList: [],
    videoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      liveClassId
    } = options
    this.getPublicClassVideoInfo(liveClassId)
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

  },
  getPublicClassVideoInfo(live_class_id) {
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    app.encryption({
      url: api.default.getPublicClassVideoInfo,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'get',
      dataType: "json",
      data: {
        live_class_id,
      },
      success: (res) => {
        wxParse.wxParse('article', 'html', res.detail.live_class_detail, this, 0)
        this.setData({
          videoDetail: res.detail || {},
          videoList: res.directory || []
        })
        if (res.directory.length) {
          this.setVideoUrl(0, res.directory[0].live_video_name)
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {}
    })
  },
  setVideoUrl(index, title) {
    let videoUrl = Array.isArray(this.data.videoList[index].media_info) ? '' : this.data.videoList[index].media_info.Mezzanine.FileURL
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      videoUrl
    })
  },
  onChecked(e) {
    let index = e.currentTarget.dataset.index
    let title = this.data.videoList[index].live_video_name
    this.setData({
      playIndex: index,
    })
    this.setVideoUrl(index, title)
  },
  onSwiperChange(e) {
    let {
      current
    } = e.detail
    this.setData({
      activeIndex: current
    })
  },
  onTabChange(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index
    })
  }
})