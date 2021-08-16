var wxParse = require("../../../../wxParse/wxParse.js");
require("../../../../utils/util.js");
let app = getApp();
var api = require("../../../../api.js")
import {
  startEid
} from '../../../../mp_ecard_sdk/main';
Page({
  data: {
    course_type: '',
    uid: '',
    info_show: '',
    visible2: false,
    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2
    },
    chooseOrNot: -1,
    starIndex2: 0,
    starIndextext: '请选择星级',
    tips: [{
        name: '干货满满',
        number: '7',
        id: '0',
        chooseOrNot: '-1'
      },
      {
        name: '性价比高',
        number: '10',
        id: '1',
        chooseOrNot: '-1'
      },
      {
        name: '课堂气氛好',
        number: '20',
        id: '2',
        chooseOrNot: '-1'
      },
      {
        name: '体贴耐心',
        number: '5',
        id: '3',
        chooseOrNot: '-1'
      },
      {
        name: '声控福利',
        number: '14',
        id: '4',
        chooseOrNot: '-1'
      },
      {
        name: '学渣拯救者',
        number: '369',
        id: '5',
        chooseOrNot: '-1'
      },
      {
        name: '老师很幽默',
        number: '8',
        id: '6',
        chooseOrNot: '-1'
      }
    ],
    urls: ["https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/mall-goods002.jpg", "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/mall-goods001.jpg"],
    comment_list: [],
    currentResource: '',
    multiListShow: false,
    rateShow: false,
    currentRate: '1.0',
    videoPlaying: false,
    controlHidden: true,
    isSwitchDefinition: false,
    currentVideoResource: [],
    currentDefinition: '',
    fullScreenData: "",
    value2: '',
    startNum: '1',
    tag: '',
    isPay: true,
    courseId: '',
    hideProgressMask: true,
    currentPlayData: {},
    activeChapterIndex: 0,
    activeVideoIndex: 0,
    initTime:0
  },
  // 扫脸相关
  videoVerifyNode: [],
  nextVerifyTime: null,
  prevVerifyTime: null,
  closeMaskVlaue: false,
  tokenLoading: false,
  // 视频播放统计相关
  currentPlayTime: 0,
  time: 1000 * 10,
  timer: null,
  startTime: 0,
  currentTime: 0,
  currentPlayId: "",

  sumbitComment() {
    if (this.data.value2 == '') {
      wx.showToast({
        title: '请完善评价内容',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    let that = this
    let option = {
      course_id: parseInt(this.data.courseId),
      content: this.data.value2,
      star: parseInt(this.data.startNum),
      tag_id: this.data.tag,
    }
    console.log(option)
    app.encryption({
      url: api.default.submitcomment,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
        // if (res.data.code == 0) {
        wx.showToast({
          title: '发表评论成功！',
          icon: 'success',
          mask: true,
          duration: 1200,
          success: function () {
            that.setData({
              visible2: false,
              value2: ''
            });
          },
        })
        that.getcomment()
        // }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  chooseTips(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      tag: ''
    })
    let index = e.currentTarget.dataset.index
    let num = 'tips[' + index + '].chooseOrNot'
    console.log()
    if (this.data.tips[index].chooseOrNot != '-1') {
      this.setData({
        [num]: '-1'
      })
    } else {
      this.setData({
        [num]: e.currentTarget.dataset.index
      })
    }
    console.log(this.data.tips)
    for (let i of this.data.tips) {
      if (i.chooseOrNot != '-1') {
        this.setData({
          tag: this.data.tag.concat(i.id + ',')
        })
      }
    }
    console.log(this.data.tag)
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
    console.log(this.data.startNum)
    switch (index) {
      case 0:
        this.setData({
          'starIndextext': '课程体验较差',
          startNum: '0'
        })
        break;
      case 1:
        this.setData({
          'starIndextext': '课程体验较差',
          startNum: '1'
        })
        break;
      case 2:
        this.setData({
          'starIndextext': '课程感觉一般',
          startNum: '2'
        })
        break;
      case 3:
        this.setData({
          'starIndextext': '加油继续努力',
          startNum: '3'
        })
        break;
      case 4:
        this.setData({
          'starIndextext': '基本达到预期',
          startNum: '4'
        })
        break;
      case 5:
        this.setData({
          'starIndextext': '课程超级棒',
          startNum: '5'
        })
        break;
      default:
        this.setData({
          'starIndextext': '请选择课程评价',
          startNum: '0'
        })
    }
  },
  handleOpen2() {
    console.log('点击了评价对话框')
    // 进度条遮罩会挡住评价，所以打开评价时关闭它
    this.closeMaskVlaue = this.data.hideProgressMask
    if (!this.closeMaskVlaue) {
      this.setData({
        visible2: true,
        hideProgressMask: true
      });
    } else {
      this.setData({
        visible2: true,
      });
    }

  },
  handleClose2() {
    if (!this.closeMaskVlaue) {
      this.setData({
        visible2: false,
        value2: '',
        hideProgressMask: false
      });
    } else {
      this.setData({
        visible2: false,
        value2: ''
      });
    }
  },

  tabFun: function (t) {
    var e = t.target.dataset.id;
    console.log("----" + e + "----");
    var a = {};
    a.curHdIndex = e, a.curBdIndex = e,
      this.setData({
        tabArr: a
      });
  },

  previewImage: function (t) {
    var e = t.currentTarget.dataset.current;
    this.data.urls;
    wx.previewImage({
      urls: [e]
    });
  },

  coursedetail() {
    let that = this
    let option = {
      course_id: this.data.courseId
    }
    app.encryption({
      url: api.default.coursedetail,
      method: "GET",
      data: option,
      success: function (res) {
        let courseInfo = res;
        console.log(res)
        var a = courseInfo.about + "<span></span>";
        wxParse.wxParse("content", "html", a, that, 5);
        that.setData({
          courseInfo: res
        })
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  toCourseDetail(e) {
    let course_id = e.currentTarget.dataset.course_id
    wx.navigateTo({
      url: `../course-detail/course-detail?courseId=${course_id}`
    })
  },
  // 记录播放课程视频
  courseVideoBehaviorRecord() {
    app.encryption({
      url: api.video.courseVideoBehaviorRecord,
      method: "GET",
      data: {
        course_video_lesson_id: this.currentPlayId
      },
    })
  },
  // 获取课程视频目录
  getCourse() {
    let option = {
      course_id: this.data.courseId
    }
    app.encryption({
      url: api.default.getCourseVideoDirectory,
      method: "GET",
      data: option,
      success: (res) => {
        console.log(1111, res)
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
            isShow: index === activeChapterIndex,
          })),
          currentPlayData,
          activeChapterIndex,
          activeVideoIndex,
          course_type: res.course_type,
          isPay: true
        })
        if (currentPlayData.can_watch == 0) {
          wx.showToast({
            title: '该课时暂未免费开放',
            icon: 'none'
          })
          this.setData({
            isPay: false
          })
          return;
        }
        if (!this.urlValidate(currentPlayData)) {
          wx.showToast({
            title: '视频资源已失效',
            icon: 'none'
          })
          return
        }
        this.setPlayUrl(currentPlayData)
      },
      fail: function (t) {},
      complete: () => {}
    })
  },
  // 设置播放的URL
  setPlayUrl(row) {
    console.log(111111, row)
    const currentVideoResource = []
    if (row.ld_play_url) {
      currentVideoResource.push({
        definitionFormat: '标清',
        url: row.ld_play_url
      })
    }
    if (row.sd_play_url) {
      currentVideoResource.push({
        definitionFormat: '高清',
        url: row.sd_play_url
      })
    }
    if (row.hd_play_url) {
      currentVideoResource.push({
        definitionFormat: '超清',
        url: row.hd_play_url
      })
    }
    if (row.od_play_url) {
      currentVideoResource.push({
        definitionFormat: '原画',
        url: row.od_play_url
      })
    }
    this.startTime = +row.last_second
    this.currentPlayId = row.id
    wx.setNavigationBarTitle({
      title: row.title
    });


    this.setData({
      hideProgressMask: !!row.is_fast,
      currentDefinition: currentVideoResource[0].definitionFormat,
      currentResource: currentVideoResource[0].url,
      currentVideoResource
    }, () => {
      this.courseVideoBehaviorRecord()
      setTimeout(() => {
        console.log(this.startTime)
        this.setPlaySeek(this.startTime)
        // 设置扫脸相关参数
        this.videoVerifyNode = [...row.detect_time_point_data]
        console.log(this.videoVerifyNode)
        this.prevVerifyTime = null
        this.setVerifyTime()
      }, 20);
    })
  },
  onMoveMask() {
    wx.showToast({
      title: '当前视频不支持快进',
      icon: 'none'
    })
  },
  // 设置下次扫脸验证时间
  setVerifyTime() {
    this.nextVerifyTime = this.videoVerifyNode.shift()
  },
  // 获取扫脸结果
  getEidResult(token) {
    app.encryption({
      url: api.video.getEidResult,
      method: "get",
      data: {
        token
      },
      success: (res) => {
        console.log(res)
        // 扫脸成功继续播放
        if (res.status === 2) {
          this.prevVerifyTime =  this.nextVerifyTime
          this.setVerifyTime()
          this.videoContext.play()
        }
      }
    })
  },
  // 获取token去扫脸
  getEidToken(time_point) {
    if (this.tokenLoading) return
    this.tokenLoading = true
    app.encryption({
      url: api.video.getEidToken,
      method: "get",
      data: {
        course_video_lesson_id: this.currentPlayId,
        time_point
      },
      success: (res) => {
        console.log(res)
        // 待验证
        if (res.status === 1) {
          this.openFace(res.token)
        }
        // 已验证
        if (res.status === 2) {
          this.prevVerifyTime = time_point
          this.setVerifyTime()
          this.videoContext.play()
        }
      },
      complete: () => {
          this.tokenLoading = false
      }
    })
  },
  openFace(token) {
    startEid({
      data: {
        token
      },
      verifyDoneCallback: (res) => {
        const {
          token
        } = res;
        this.getEidResult(token)
      },
    });
  },
  // 设置播放位置
  setPlaySeek(value) {
    this.videoContext.seek(value)
    this.setData({
      initTime:value
    })
  },
  // 监听播放位置变化
  onTimeUpdate(e) {
    let {
      currentTime
    } = e.detail
    this.data.videoplaying = true
    if (this.data.videoplaying && this.data.currentRate != 1.0) {
      this.videoContext.playbackRate(Number(this.data.currentRate))
    }
    // 到达验证时间去验证
    if (this.nextVerifyTime && currentTime >= this.nextVerifyTime) {
      console.log('currentTime',currentTime)
      this.videoContext.pause();
      this.nextVerifyTime !== this.prevVerifyTime && this.getEidToken(this.nextVerifyTime)
    }
    // 记录当前播放时间
    this.currentPlayTime = currentTime
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
    this.setPlaySeek(0)
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
      course_video_lesson_id: this.currentPlayId,
    };
    const times = this.currentTime - this.startTime;
    // 时间差必须小于当前发送间隔时间的2.2倍且大于0，才视为有效数据
    if (times <= (this.time / 1000) * 2.2 && times > 0) {
      console.log(data)
      this.courseVideoRecord(data);
    }
    this.startTime = this.currentTime;
  },
  // 统计接口
  courseVideoRecord(data) {
    app.encryption({
      url: api.video.courseVideoRecord,
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
    this.data.chapterList[index].isShow = !this.data.chapterList[index].isShow
    this.setData({
      chapterList: this.data.chapterList
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
  // 视频切换
  handleVideoToggle(e) {
    const index = e.currentTarget.dataset.index;
    const vIndex = e.currentTarget.dataset.vindex;
    const currentPlayData = this.data.chapterList[index].lesson_list[vIndex]
    this.setData({
      isPay: true
    })
    if (currentPlayData.can_watch == 0) {
      wx.showToast({
        title: '该课时暂未免费开放',
        icon: 'none'
      })
      this.setData({
        isPay: false
      })
      return;
    }
    if (!this.urlValidate(currentPlayData)) {
      wx.showToast({
        title: '视频资源已失效',
        icon: 'none'
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
    this.setPlayUrl(currentPlayData)
  },
  getcomment() {
    let that = this
    let option = {
      course_id: this.data.courseId
    }
    console.log(option)
    app.encryption({
      url: api.default.getcomment,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        that.setData({
          comment_list: res
        })
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  changes(e) {
    this.setData({
      value2: e.detail.detail.value
    })
  },
  onLoad: function (option = {}) {
    console.log(option)
    this.videoContext = wx.createVideoContext('videoPlayer')
    let user_info = wx.getStorageSync("user_info");
    if (user_info) {
      this.setData({
        uid: user_info.uid,
        info_show: user_info.info_show
      })
    }
    this.setData({
      courseId: option.courseId || this.data.courseId,
    });
    this.getCourse() //获取课程目录
    this.coursedetail() //获取课程介绍
    this.getcomment() //获取课程评论

  },
  onReady() {},
  onShow: function () {},
  onHide: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (res) {
    return {
      title: this.data.currentPlayData.title,
      path: "pages/component/pages/course-detail/course-detail?courseId=" + this.data.courseId,
      // imageUrl: t.data.video.share_ico ? t.data.video.share_ico : this.data.video.pic_url,
      success: function (t) {
        console.log("转发成功", t);
      },
      fail: function (t) {
        console.log("转发失败", t);
      }
    };
  },
  closeControl() {
    this.setData({
      multiListShow: false,
      rateShow: false
    })
  },
  tapVideo(e) {
    this.setData({
      multiListShow: false,
      rateShow: false,
    })
  },
  switchResource() {
    console.log('switch')
    this.setData({
      multiListShow: true
    })
  },
  showSwitchRate(rate) {
    this.setData({
      rateShow: true
    })
  },
  switchRate(e) {
    let dataset = e.currentTarget.dataset
    let {
      rate
    } = dataset
    console.log(this.data.videoplaying)
    if (this.data.videoplaying) {
      this.videoContext.playbackRate(Number(rate))
    }
    this.setData({
      currentRate: rate,
      rateShow: false
    })
  },
  onControlsToggle(e) {
    this.setData({
      controlHidden: !e.detail.show
    })
  },
  // 超清高清标清
  switchDefinition(e) {
    this.data.isSwitchDefinition = true
    let dataset = e.currentTarget.dataset
    let {
      url,
      def
    } = dataset
    const currentTime = this.currentPlayTime
    this.setData({
      currentResource: url,
      currentDefinition: def,
      multiListShow: false,
    }, () => {
      this.videoContext.seek(currentTime)
    })
  },

  fullScreen(e) {
    let {
      fullScreen,
      direction
    } = e.detail
    console.log(e)
    let fullScreenData = ""
    if (fullScreen) {
      fullScreenData = " full-screen " + direction
    }
    this.setData({
      fullScreenData
    })
  },

});