const app = getApp(),
  api = require("../../../../api.js")
Page({
  data: {
    chapterList: [],
    playUrl: '',
    isShowControls: false,
    isShowPanel: false,
    animationData: {},
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
    currentPlayData: [],
    currentPlayTime: 0,
    toggleQuality: false,
    activeChapterIndex: 0,
    activeVideoIndex: 0
  },
  // onload
  onLoad: function ({classroom_id}) {
    this.initVideo()
    this.getChapterList(classroom_id)
  },
  onShow: function () {},
  onHide: function () {},
  // 获取视频章节列表
  getChapterList(classroom_id) {
    const data = {
      classroom_id
    }
    app.encryption({
      url: api.video.getClassroomVideoDirectory,
      method: "GET",
      data,
      success: (res) => {
        // 默认打开第一个
        const currentPlayData = res[0].lesson_list[0]
        this.setData({
          chapterList: (res || []).map((item, index) => ({
            ...item,
            isUp: index === 0,
          })),
          currentPlayData
        })
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
  },
  // 监听播放位置变化
  onTimeUpdate(e) {
     // 切换画质用的，保证切换后设置播放时间
    this.data.toggleQuality && this.setData({
      toggleQuality: false,
      currentPlayTime: e.detail.currentTime
    })
  },
  // 章节展开
  handleChapterClick(e) {
    const index = e.currentTarget.dataset.index;
    this.data.chapterList[index].isUp = !this.data.chapterList[index].isUp
    this.setData({
      chapterList: this.data.chapterList
    })
  },
  // 视频选中
  handleVideoToggle(e) {
    const index = e.currentTarget.dataset.index;
    const vIndex = e.currentTarget.dataset.vindex;
    const currentPlayData = this.data.chapterList[index].lesson_list[vIndex]
    this.setData({
      currentPlayData,
      currentPlayTime: 0,
      activeChapterIndex: index,
      activeVideoIndex: vIndex,
    })
    this.setQualityArr(currentPlayData)
    this.setPlayUrl(currentPlayData)
    this.openVideoControl()
  },
  // 根据当前视频信息，设置画质数组
  setQualityArr(data){
    const qualityArr = []
    if(data.sd_play_url){
      qualityArr.push({
        name: '高清',
        value: 'sd'
      })
    }
    if(data.od_play_url){
      qualityArr.push({
        name: '原画',
        value: 'od'
      })
    }
    if(data.hd_play_url){
      qualityArr.push({
        name: '超清',
        value: 'hd'
      })
    }
    if(data.ld_play_url){
      qualityArr.push({
        name: '标清',
        value: 'ld'
      })
    }
    this.setData({
      qualityArr,
      activeQualityValue:qualityArr[0].value
    })
  },
  // 设置播放的URL
  setPlayUrl(currentPlayData, toggleQuality = false) {
    // 切换画质用的，保证切换后设置播放时间
    this.setData({
      toggleQuality
    })
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
    setTimeout(() => {
      this.setData({
        playUrl,
      }, () => {
        this.setPlaySeek(this.data.currentPlayTime)
      })
    }, 300);
  },
  // 点击video标签
  openVideoControl() {
    // 如果画质面板是开的就先关闭
      this.data.isShowPanel && this.hideControlPanel()
  },
  //清晰度，速率跟随control一起显示隐藏
  onControlsToggle(e){
    this.setData({
      isShowControls:e.detail.show
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
    this.setPlayUrl(this.data.currentPlayData, true)
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