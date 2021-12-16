const app = getApp(),
  api = require("../../../../api.js")
Page({
  data: {
    playUrl: '',
    isShowControls: false,
    isShowPanel: false,
    animationData: {},
    initTime: 0,
    qualityNameMap: {
      'od': '原画',
      'hd': '超清',
      'sd': '高清',
      'ld': '标清',
    },
    qualityArr: [],
    speedArr: [{
        name: '2.0x',
        value: '2.0'
      },
      {
        name: '1.5x',
        value: '1.5'
      },
      {
        name: '1.25x',
        value: '1.25'
      },
      {
        name: '1.0x',
        value: '1.0'
      },
      {
        name: '0.8x',
        value: '0.8'
      },
      {
        name: '0.5x',
        value: '0.5'
      }
    ],
    isShowSpeed: false,
    activeSpeedValue: '1.0',
    isShowQuality: false,
    activeQualityValue: '',
    toggleQuality: false,
    activeChapterIndex: 0,
    activeVideoIndex: 0
  },
  currentPlayTime: 0,
  time: 1000 * 10,
  timer: null,
  startTime: 0,
  currentTime: 0,
  currentPlayId: "",
  hideTimer: null,
  currentPlayData: {},

  // onload
  onLoad: function ({
    id,
    scene
  }) {
    console.log(scene)
    if (scene) {
      let queryStr = decodeURIComponent(scene)
      id = this.getQueryString(queryStr, "id");
    }
    console.log(+id)
    this.initVideo()
    this.getUserAuth(() => {
      this.getSingleVideoInfo(id)
    }, id)
  },
  onShow: function () {},
  onHide: function () {},
  onShareAppMessage() {
    return {
      path: `/pages/component/pages/video-share/index?id=${this.currentPlayId}`,
      title: this.currentPlayData.title,
      imageUrl: this.currentPlayData.cover_url
    }
  },
  getQueryString(str, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = str.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  getUserAuth(callback, id) {
    wx.login({ // 判断是否授权，，没有则授权
      success: (res) => {
        let code = res.code
        if (code) {
          app.request({
            url: api.user.newLogin,
            data: {
              code,
              version: app.globalData.version
            },
            header: {
              'organization-id': app.globalData.organizationId
            },
            method: 'POST',
            success: (res) => {
              const data = res.data.param || {}
              // 错误码不为200去授权
              if (200 != res.code) {
                wx.setStorageSync("privateInfor", {
                  openid: data.openid,
                  session_key: data.session_key,
                  unionid: data.unionid,
                })
                wx.reLaunch({
                  url: `../usersq/usersq?videoId=${id}`,
                })
              } else {
                wx.setStorageSync("user_info", {
                  nickname: data.user_nicename,
                  avatar_url: data.user_img,
                  uid: data.uid,
                  uuid: data.uuid,
                  token: data.token,
                  mobile: data.telphone,
                  is_admin: data.is_admin,
                  info_show: data.info_show
                });
                callback && callback()
              }
            },
            fail: function (e) {
              wx.showModal({
                title: "警告",
                content: e.msg,
                showCancel: !1
              });
            },
          })
        }
      }
    })
  },
  urlValidate(row) {
    return !!(
      row.sd_play_url ||
      row.ld_play_url ||
      row.od_play_url ||
      row.hd_play_url
    );
  },
  // 获取视频信息
  getSingleVideoInfo(id) {
    const data = {
      id
    }
    app.encryption({
      url: api.video.getSingleVideoInfo,
      method: "GET",
      data,
      success: (res) => {
        const currentPlayData = res
        if (!this.urlValidate(currentPlayData)) {
          wx.showToast({
            title: '视频资源已失效',
            icon: 'none'
          })
          return
        }
        this.currentPlayData = currentPlayData
        this.setQualityArr(currentPlayData)
        this.setPlayUrl(currentPlayData)
        this.openVideoControl()
      },
    });
  },
  initVideo() {
    this.videoContext = wx.createVideoContext('video')
  },
  // 设置播放速率
  setPlaybackRate(value) {
    this.videoContext.playbackRate(+value)
  },
  // 设置播放位置
  setPlaySeek(value) {
    this.videoContext.seek(value)
    this.setData({
      initTime: value
    })
  },
  // 监听播放位置变化
  onTimeUpdate(e) {
    // 记录当前播放时间
    this.currentPlayTime = e.detail.currentTime
  },
  // 开始播放
  onPlay() {
    this.intervalSend()
  },
  // 暂停播放
  onPause() {
    this.stopSend()
  },
  // 播放结束
  onPlayEnd() {
    this.stopSend()
    this.startTime = 0
  },
  // 离开页面
  onUnload() {
    this.stopSend()
  },
  // 停止发送
  stopSend() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.sendData();
    }
  },
  // 间隔发送
  intervalSend() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.timer = setInterval(() => {
      this.sendData();
    }, this.time);
  },
  // 发送数据
  sendData() {
    this.currentTime = this.currentPlayTime;
    const data = {
      start: this.startTime,
      end: this.currentTime,
      id: this.currentPlayId,
    };
    const times = this.currentTime - this.startTime;
    // 时间差必须小于当前发送间隔时间的2.2倍且大于0，才视为有效数据
    if (times <= (this.time / 1000) * 2.2 && times > 0) {
      this.singleVideoRecord(data);
    }
    this.startTime = this.currentTime;
  },
  // 统计接口
  singleVideoRecord(data) {
    app.encryption({
      url: api.video.singleVideoRecord,
      method: "GET",
      data,
    });
  },
  // 根据当前视频信息，设置画质数组
  setQualityArr(data) {
    const qualityArr = []
    if (data.sd_play_url) {
      qualityArr.push({
        name: '高清',
        value: 'sd'
      })
    }
    if (data.od_play_url) {
      qualityArr.push({
        name: '原画',
        value: 'od'
      })
    }
    if (data.hd_play_url) {
      qualityArr.push({
        name: '超清',
        value: 'hd'
      })
    }
    if (data.ld_play_url) {
      qualityArr.push({
        name: '标清',
        value: 'ld'
      })
    }
    if (qualityArr.length) {
      this.setData({
        qualityArr,
        activeQualityValue: qualityArr[0].value
      })
    } else {
      wx.showToast({
        title: '无法播放',
        icon: 'error'
      })
    }
  },
  // 设置播放的URL
  setPlayUrl(currentPlayData, isToggleQuality) {
    // 切换画质不用重置时间
    if (!isToggleQuality) {
      this.startTime = +currentPlayData.last_second
      this.currentPlayId = currentPlayData.id
      wx.setNavigationBarTitle({
        title: currentPlayData.title
      });
    }
    let playUrl = ''
    switch (this.data.activeQualityValue) {
      case 'od':
        playUrl = currentPlayData.od_play_url
        break
      case 'hd':
        playUrl = currentPlayData.hd_play_url
        break
      case 'ld':
        playUrl = currentPlayData.ld_play_url
        break
      case 'sd':
        playUrl = currentPlayData.sd_play_url
        break
    }
    const currentTime = this.currentPlayTime
    this.setData({
      playUrl,
    }, () => {
      if (!isToggleQuality) {
        this.setData({
          activeSpeedValue: '1.0'
        })
        this.setPlaybackRate('1.0')
      }
      setTimeout(() => {
        this.setPlaySeek(isToggleQuality ? currentTime : this.startTime)
      }, 20);
    })
  },
  // 点击video标签
  openVideoControl() {
    // 如果画质面板是开的就先关闭
    this.data.isShowPanel && this.hideControlPanel()
  },
  //清晰度，速率跟随control一起显示隐藏
  onControlsToggle(e) {
    this.setData({
      isShowControls: e.detail.show
    })
  },
  // 切换播放速率
  handleSpeedChange(e) {
    const val = e.currentTarget.dataset.val;
    this.setData({
      activeSpeedValue: val
    })
    this.setPlaybackRate(val)
    this.hideControlPanel()
  },
  // 切换播放画质
  handleQualityChange(e) {
    const val = e.currentTarget.dataset.val;
    this.setData({
      activeQualityValue: val
    })
    this.setPlayUrl(this.currentPlayData, true)
    this.hideControlPanel()
  },
  // 点击播放速率
  hanldeSpeedClick() {
    this.setData({
      isShowSpeed: true,
      isShowQuality: false
    })
    this.showControlPanel()
  },
  // 点击画质
  hanldeQualityClick() {
    this.setData({
      isShowSpeed: false,
      isShowQuality: true
    })
    this.showControlPanel()
  },
  // 显示画质，速率面板
  showControlPanel() {
    this.animation = wx.createAnimation({
      delay: 0,
    })
    this.animation.translate(0, 0).step({
      duration: 300
    })
    this.setData({
      isShowPanel: true,
      animationData: this.animation.export()
    })
    this.timeOutHide()
  },
  // 自动隐藏
  timeOutHide() {
    this.hideTimer && clearTimeout(this.hideTimer)
    this.hideTimer = setTimeout(() => {
      this.hideControlPanel()
    }, 5000);
  },
  // 隐藏画质，速率面板
  hideControlPanel() {
    this.animation = wx.createAnimation({
      delay: 0,
    })
    this.animation.translate(100, 0).step({
      duration: 300
    })
    this.setData({
      isShowPanel: false,
      animationData: this.animation.export()
    })
  },
});