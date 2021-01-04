import plv from '../../../../lib/polyv-sdk/index';

Page({
  data: {
    indexTab: 2,
    options: {},
    detail: {},
    videoId: '',
    pptSize: {
      height: 700,
      width: 750
    },
    pptDelayTime: 5000,
    top: 0,
    left: 0,
    screen: {}
  },
  onLoad(options) {
    // let user_id=wx.getStorageSync("user_id");
    let user_info=wx.getStorageSync("user_info");
   let user_id = user_info.uid
      options.forceVideo = true;
      options.userid=user_id
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
  onUnload() {
    plv.destroy();
  },
});
