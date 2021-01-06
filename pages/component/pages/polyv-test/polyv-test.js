let app = getApp();
let api = require("../../../../api.js")
import plv from '../../../../lib/polyv-sdk/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel_id: '',
    uid: '',
    url: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_info = wx.getStorageSync("user_info");
    this.setData({
      uid: user_info.uid,
      channel_id: options.channelId,
    });
    this.getLiveUrls()
  

  },
  getLiveUrls() {
    var that = this
    let user_info = wx.getStorageSync("user_info");
    let option = {
      channel_id: this.data.channel_id,
      user_id: user_info.uid
    }
    app.encryption({
      url: api.default.getLiveUrls,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
        that.setData({
          url: res.url
        })
        console.log(that.data.url)
      },
      fail: function (t) {},
      complete: function () {}
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