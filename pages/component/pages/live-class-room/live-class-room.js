let app = getApp();
let api = require("../../../../api.js")
import plv from '../../../../lib/polyv-sdk/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {},
    channelId: '',
    userId: '',
    imgUrl:'',
    isOpenClass:false,
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
  if(options.live_class_id){
    this.setData({
      isOpenClass:true
    })
    this.getLiveClassThumbPosterUrl(options.live_class_id)
  }
  plv.init(options)
    .catch(err => { // error code
      console.error(err, err.message);
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    });
    this.setData({
      userId: options.viewerId,
      channelId: options.channelId,
    });
    this.polyvWechatAuth()

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
  //后端请求回调
  polyvWechatAuth() {
    var that = this
    let user_info = wx.getStorageSync("user_info");
    let option = {
      channelId: this.data.channelId,
      userId: parseInt(this.data.userId)
    }
    console.log(option)
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
    console.log(this.data.imgUrl)
    if(this.data.isOpenClass){
      return {
        title: '东培学堂正在直播免费公开课， 点击一起看吧！',
        imageUrl: this.data.imgUrl,
        path: `/pages/index/index`
      }
    }
  },
  // 生成公开课直播的分享图片
  getLiveClassThumbPosterUrl(live_class_id){
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    if(!uuid){
      wx.reLaunch({
        url: '../usersq/usersq',
      })
      return
    }
    app.encryption({
      url: api.default.getLiveClassThumbPosterUrl,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'get',
      dataType: "json",
      data:{
        live_class_id
      },
      success: (res) => {
        console.log(res)
        this.setData({
          imgUrl: res.url || {}
        })
      },
    })
  },
})