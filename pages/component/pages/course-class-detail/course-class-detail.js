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
    currentPlayData: {},
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
  // onload
  onLoad: function ({
    classroom_id
  }) {
    this.initVideo()
    this.getChapterList(classroom_id)
  },
  onShow: function () {},
  onHide: function () {},
  // 记录播放班级视频
  classroomVideoBehaviorRecord(){
    app.encryption({
      url: api.video.classroomVideoBehaviorRecord,
      method: "GET",
      data: {
        classroom_video_lesson_id:this.currentPlayId
      },
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
        const lastCid = res.last_data.chapter_id;
        const lastVid = res.last_data.lesson_id;
        let activeChapterIndex = 0
        let activeVideoIndex = 0
        res.list.forEach((item, index) => {
          if (item.id === lastCid) {
            activeChapterIndex = index;
            item.lesson_list.forEach((child, cIndex) => {
              if (child.id === lastVid) {
                activeVideoIndex = cIndex;
              }
            });
          }
        });
        const currentPlayData = res.list[activeChapterIndex].lesson_list[activeVideoIndex]
        this.setData({
          chapterList: res.list.map((item, index) => ({
            ...item,
            isUp: index === activeChapterIndex,
          })),
          currentPlayData,
          activeChapterIndex,
          activeVideoIndex
        })
        if(!this.urlValidate(currentPlayData)){
          wx.showToast({
            title: '视频资源已失效',
            icon:'none'
          })
          return
        }
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
      // 停止的时候修改当前播放的这条的last_second
      this.data.chapterList[this.data.activeChapterIndex].lesson_list[
        this.data.activeVideoIndex
      ].last_second = this.currentPlayTime;
      this.setData({
        chapterList: this.data.chapterList
      })
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
      classroom_video_lesson_id: this.currentPlayId,
    };
    const times = this.currentTime - this.startTime;
    // 时间差必须小于当前发送间隔时间的2.2倍且大于0，才视为有效数据
    if (times <= (this.time / 1000) * 2.2 && times > 0) {
      this.classroomVideoRecord(data);
    }
    this.startTime = this.currentTime;
  },
  // 统计接口
  classroomVideoRecord(data) {
    app.encryption({
      url: api.video.classroomVideoRecord,
      method: "GET",
      data,
      success: (res) => {
        // console.log(res)
      }
    });
  },
  // 章节展开
  handleChapterClick(e) {
    const index = e.currentTarget.dataset.index;
    this.data.chapterList[index].isUp = !this.data.chapterList[index].isUp
    this.setData({
      chapterList: this.data.chapterList
    })
  },
  // 视频切换
  handleVideoToggle(e) {
    const index = e.currentTarget.dataset.index;
    const vIndex = e.currentTarget.dataset.vindex;
    const currentPlayData = this.data.chapterList[index].lesson_list[vIndex]
    if(!this.urlValidate(currentPlayData)){
      wx.showToast({
        title: '视频资源已失效',
        icon:'none'
      })
      return
    }
    if (this.data.activeChapterIndex === index && this.data.activeVideoIndex === vIndex) {
      return 
    }
    this.stopSend()
    this.setData({
      currentPlayData,
      activeChapterIndex: index,
      activeVideoIndex: vIndex,
    })
    this.setQualityArr(currentPlayData)
    this.setPlayUrl(currentPlayData)
    this.openVideoControl()
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
      !isToggleQuality && this.classroomVideoBehaviorRecord()
      // 如果是切换画质就是设置当前时间
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