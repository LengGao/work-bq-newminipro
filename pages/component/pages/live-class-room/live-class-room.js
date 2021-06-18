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
    live_class_id: '',
    imgUrl: '',
    isOpenClass: false,
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
  
    if (options.live_class_id) {
      // 公开课直播需要配置分享
      this.setData({
        isOpenClass: true,
        live_class_id: options.live_class_id,
        channelId: options.channelId
      })
      this.getLiveClassThumbPosterUrl(options.live_class_id)
    }
    if (!options.viewerId) {
      this.getUserAuth()
    } else {
     
      this.initPLY(options)
    }
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
  polyvWechatAuth(data) {
    wx.request({
      url: api.default.polyvWechatAuth,
      data,
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
    if (this.data.isOpenClass) {
      return {
        title: '东培学堂正在直播免费公开课， 点击一起看吧！',
        imageUrl: this.data.imgUrl,
        path: `/pages/component/pages/live-class-room/live-class-room?channelId=${this.data.channelId}&live_class_id=${this.data.live_class_id}`
      }
    }
  },
  initPLY(options) {
    plv.init(options)
      .catch(err => { // error code
        console.error(err, err.message);
        wx.showToast({
          title: err.message,
          icon: 'none',
          duration: 2000
        });
      });
    this.polyvWechatAuth({
      channelId: options.channelId,
      userId: parseInt(options.viewerId)
    })
  },
  // 生成公开课直播的分享图片
  getLiveClassThumbPosterUrl(live_class_id) {

    app.encryption({
      url: api.default.getLiveClassThumbPosterUrl,
      method: 'get',
      dataType: "json",
      data: {
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
  getUserAuth() {
    wx.login({ // 判断是否授权，，没有则授权
      success: (res)=> {
        let code = res.code
        if (code) {
          app.request({
            url: api.user.newLogin,
            data: {
              code,
              version: app.globalData.version
            },
            method: 'POST',
            success: (res) => {
              const data = res.data || {}
              // 错误码不为200去授权
              if (200 != res.code) {
                wx.setStorageSync("privateInfor", {
                  openid: data.param.openid,
                  session_key: data.param.session_key,
                  unionid: data.param.unionid,
                })
                wx.reLaunch({
                  url: `../usersq/usersq?channelId=${this.data.channelId}&live_class_id=${this.data.live_class_id}`,
                })
              }else{
                this.initPLY({
                  viewerId: data.param.uid,
                  channelId:this.data.channelId,
                  openId:data.param.openid,
                  userName:data.param.user_realname || data.param.user_nicename,
                  avatarUrl:data.param.user_img
                })
              }
            },
            fail: function (e) {
              wx.showModal({
                title: "警告",
                content: e.msg,
                showCancel: !1
              });
            },
            complete: function (res) {
              
            }
          })
        }
      }
    })
  }
})