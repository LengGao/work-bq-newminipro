import plv from '../../../../lib/polyv-sdk/index';
let app = getApp();
let api = require("../../../../api.js")

Page({
  data: {
    channelId: '',
    userId: '',
    indexTab: 2,
    options: {},
    detail: {},
  },
  onLoad(options) {
    this.setData({
      userId: options.viewerId,
      channelId: options.channelId,
    });
    this.polyvWechatAuth()
    // let user_id=wx.getStorageSync("user_id");
    // let user_info=wx.getStorageSync("user_info");
    // let user_id = user_info.userId
    // options.forceVideo = true;
    // options.viewerId=user_id
    console.log(options)
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

  //polyv组件需要的方法
  onResize() {
    const plyWatch = this.selectComponent('#plvMpDemoWatch');
    plyWatch.handleResize();
  },
  // 用户被踢出
  handleUserBanned() {
    wx.showModal({
      title: '温馨提示',
      content: '您未被授权观看本直播',
      showCancel: false,
      complete: () => {
        wx.navigateBack({
          url: '/pages/index/index'
        });
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
  //后端请求回调
  polyvWechatAuth() {
    var that = this
    let user_info = wx.getStorageSync("user_info");
    let option = {
      channelId: this.data.channelId,
      userId: parseInt(this.data.userId)
    }
    console.log()
    wx.request({
      url: api.default.polyvWechatAuth,
      data: option,
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res)
      }
    });
  },
  onUnload() {
    plv.destroy();
  },
});