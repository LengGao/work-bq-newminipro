let app = getApp();
let api = require("../../../../api.js")
import plv from '../../../../lib/polyv-sdk/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // forceVideo默认 false, 选择使用video组件或live-player组件直播
  options.forceVideo = false;
  // 聊天室自定义userId
  // options.userId = '1588755973413';
  // options.param4 = 'param4';
  // options.param5 = 'param5';
  plv.init(options)
    .catch(err => { // error code
      console.error(err, err.message);
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    });
  

  },
  onResize() {
    const plyWatch = this.selectComponent('#plvMpDemoWatch');
    plyWatch.handleResize();
  },
  onUnload() {
    plv.destroy();
  },
  // 用户被踢出
  handleUserBanned() {
    wx.showModal({
      title: '温馨提示',
      content: '您未被授权观看本直播',
      showCancel: false,
      complete: () => {
        wx.navigateBack({ url: '/pages/index/index' });
      }
    });
  },
  // 播放器错误
  handlePolyvError(e) {
    const err = e.detail;
    if (err.errorCode >= 30000 && err.errorCode < 40000) {
      wx.showToast({
        title: '播放器' + err.msg,
        icon: 'none',
        duration: 2000
      });
    }
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