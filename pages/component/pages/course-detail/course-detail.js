var wxParse = require("../../../../wxParse/wxParse.js");
require("../../../../utils/util.js");
let app = getApp();
var api = require("../../../../api.js")
import {
  startEid
} from '../../../../mp_ecard_sdk/main';
Page({
  data: {
    courseInfo: {},
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
    activeChapterIndex: 0,
    activeVideoIndex: 0,
    initTime: 0
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
  currentPlayId: "",
  currentPlayData: {},
  hideTimer: null,
  faceConifg: {},
  isFristPlay: true,
  faceLoading: false,
  isOnload: true,
  faceLoadingTimer: null,
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
        console.log(res)
        let courseInfo = res;
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
        console.log(res)
        if (res.course_type === 2) {
          // 全科班
          this.setData({
            chapterList: res.list,
            course_type: res.course_type,
          })
          return
        }
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
        const currentPlayData = this.currentPlayData = res.list[activeChapterIndex] ? res.list[activeChapterIndex].lesson_list[activeVideoIndex] : {}
        this.setData({
          chapterList: res.list.map((item, index) => ({
            ...item,
            isShow: index === activeChapterIndex,
          })),
          activeChapterIndex,
          activeVideoIndex,
          course_type: res.course_type,
          isPay: true
        })
        if (!res.list.length) {
          wx.showToast({
            title: '该课程无目录',
            icon: 'none'
          })
          return
        }
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
    this.startStudy()
    this.courseVideoBehaviorRecord()
    this.setRandomTime()
    this.setData({
      hideProgressMask: !!row.is_fast,
      currentDefinition: currentVideoResource[0].definitionFormat,
      currentResource: currentVideoResource[0].url,
      currentVideoResource
    }, () => {
      setTimeout(() => {
        this.setPlaySeek(this.startTime)
        this.isFristPlay = true
        this.faceLoading = false
        // 设置扫脸相关参数
        this.videoVerifyNode = [...row.detect_time_point_data]
        this.prevVerifyTime = null
        this.setVerifyTime()
        // strict：1 监管严格模式 不能拖拽进度
        if (this.faceConifg.strict == 1) {
          this.currentPlayTime = this.startTime
        }
      }, 20);
    })
  },
  onMoveMask() {
    wx.showToast({
      title: '当前视频不支持拖拽',
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
        // 扫脸成功继续播放
        if (res.status === 2) {
          this.prevVerifyTime = this.nextVerifyTime
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
      initTime: value
    })
  },

  // 监听播放位置变化
  onTimeUpdate(e) {
    let {
      currentTime,
      duration
    } = e.detail
    // strict：1 监管严格模式 不能拖拽进度
    if (this.faceConifg.strict == 1) {
      const ddif = Math.abs(currentTime - this.currentPlayTime)
      // console.log(ddif)
      if (ddif > 0.7 && this.currentPlayTime) {
        this.setPlaySeek(this.currentPlayTime)
        return
      }
    }
    // 记录当前播放时间
    this.currentPlayTime = currentTime
    this.data.videoplaying = true
    if (this.data.videoplaying && this.data.currentRate != 1.0) {
      this.videoContext.playbackRate(Number(this.data.currentRate))
    }
    // 到达验证时间去验证
    if (this.nextVerifyTime && currentTime >= this.nextVerifyTime) {
      this.videoContext.pause();
      this.nextVerifyTime !== this.prevVerifyTime && this.getEidToken(this.nextVerifyTime)
    }
    // 监管认证 去录视频
    if (this.faceConifg.videoPlayRecord) {
      const timeMap = {
        1: 0, // 视频开始
        2: 4, // 视频4/1
        3: 3, // 视频3/1
        4: 2 // 视频2/1
      }
      const timeMapValue = timeMap[this.faceConifg.recordVideoState]
      const targetTime = timeMapValue ? Math.floor(duration / timeMapValue) : 3
      // console.log(targetTime, currentTime)
      const difference = Math.abs(currentTime - targetTime)
      // console.log(difference)
      if (difference <= 0.4 && !this.faceLoading) {
        this.faceLoading = true
        this.videoContext.pause();
        wx.navigateTo({
          url: `../face/index?lesson_id=${this.currentPlayId}&type=3&recordVideoTime=${this.faceConifg.recordVideoTime}`
        })
      }
    }
    // 监管认证 去拍照，验证码
    if (this.isToFace) {
      // 开始就验证
      if (this.faceConifg.videoStartFace === 1 && this.isFristPlay) {
        this.isFristPlay = false
        this.whetherNeedFirstFaceDetect((res)=>{
          console.log('该视频是否第一次扫脸？',res)
          if(res.status == 1){
            this.toVerification(true)
          }
        })
        
      }
      console.log(currentTime)
      // 按时间点验证
      this.verificationTime.forEach(time => {
        const difference = Math.abs(currentTime - time)
        if (difference <= 0.4) {
          console.log(difference)
          this.toVerification()
        }
      })
    }

  },
  toVerification(isFrist) {
    // faceLoading 防止短时间重复
    if (this.faceLoading) {
      return
    }
    // 扫脸拍照
    if (this.faceConifg.videoOnHook == 2 || isFrist) {
      this.faceLoading = true
      this.getFaceCompareConfig((res) => {
        console.log('扫脸bizCode', res.bizCode,isFrist)
        if (res.bizCode) {
          this.videoContext.pause();
          wx.navigateTo({
            url: `../face/index?lesson_id=${this.currentPlayId}&type=2&video_time=${this.currentPlayTime}&strict=${this.faceConifg.strict}&bizCode=${res.bizCode}`
          })
        } else {
          this.faceLoading = false
        }
      })
    }
    // 验证码
    if (this.faceConifg.videoOnHook == 1 && !isFrist) {
      this.faceLoading = true
      this.getVerificationCode((res) => {
        console.log('验证码bizCode', res.bizCode)
        if (res.bizCode) {
          this.videoContext.pause();
          wx.navigateTo({
            url: `../verificationCode/index?lesson_id=${this.currentPlayId}&video_time=${this.currentPlayTime}&strict=${this.faceConifg.strict}&bizCode=${res.bizCode}&codeSrc=${res.verificationImagePath}`
          })
        } else {
          this.faceLoading = false
        }
      })
    }
  },
  // 获取视频是否是第一次扫脸
  whetherNeedFirstFaceDetect(success) {
    app.encryption({
      url: api.video.whetherNeedFirstFaceDetect,
      method: "GET",
      data: {
        course_video_lesson_id: this.currentPlayId
      },
      success
    });
  },
  // 扫脸 获取bizcode 
  getFaceCompareConfig(success) {
    app.encryption({
      url: api.video.getFaceCompareConfig,
      method: "GET",
      data: {
        course_video_lesson_id: this.currentPlayId
      },
      success
    });
  },
  // 获取验证码
  getVerificationCode(success) {
    app.encryption({
      url: api.video.getVerificationCode,
      method: "GET",
      data: {
        course_video_lesson_id: this.currentPlayId
      },
      success
    });
  },
  // 监管验证结束后重置loading 
  resetFaceLoading() {
    if (this.faceLoadingTimer || !this.faceLoading) {
      return
    }
    this.faceLoadingTimer = setTimeout(() => {
      this.faceLoading = false
      clearTimeout(this.faceLoadingTimer)
      this.faceLoadingTimer = null
    }, 1500);
  },
  // 开始播放
  onPlay() {
    this.intervalSend()
    this.resetFaceLoading()
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
    // strict：1 监管严格模式 不能拖拽进度
    if (this.faceConifg.strict == 1) {
      this.currentPlayTime = 0
    }
  },
  // 离开页面
  onUnload() {
    this.stopSend()
  },
  // 停止发送
  stopSend() {
    this.endStudy()
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
    if (this.superviseTimer) {
      clearInterval(this.superviseTimer);
      this.superviseTimer = null;
      this.studyHour(this.currentPlayTime)
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
    //监管认证发送视频时间 1分钟一次
    if (this.superviseTimer) {
      clearInterval(this.superviseTimer);
      this.superviseTimer = null;
    }
    this.superviseTimer = setInterval(() => {
      this.studyHour(this.currentPlayTime)
    }, 1000 * 60);
  },
  // 发送数据
  sendData() {
    const data = {
      start: this.startTime,
      end: this.currentPlayTime,
      course_video_lesson_id: this.currentPlayId,
    };
    const times = this.currentPlayTime - this.startTime;
    // 时间差必须小于当前发送间隔时间的2.2倍且大于0，才视为有效数据
    if (times <= (this.time / 1000) * 2.2 && times > 0) {
      this.courseVideoRecord(data);
    }
    this.startTime = this.currentPlayTime;
  },
  // 监管-统计接口
  studyHour(video_time) {
    if (!this.isToFace) {
      return
    }
    app.encryption({
      url: api.video.studyHour,
      method: "GET",
      data: {
        video_time,
        course_video_lesson_id: this.currentPlayId
      },
      success: (res) => {
        console.log('记录', res, video_time)
      }
    });
  },
  // 统计接口
  courseVideoRecord(data) {
    // faceError控制监管认证失败后，防止安卓返回触发
    if(this.faceError){
      return
    }
    console.log(data)
    app.encryption({
      url: api.video.courseVideoRecord,
      method: "GET",
      data,
      success: (res) => {}
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
    if (this.data.activeChapterIndex === index && this.data.activeVideoIndex === vIndex) {
      return
    }
    this.stopSend()
    const currentPlayData = this.currentPlayData = this.data.chapterList[index].lesson_list[vIndex]
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

    this.setData({
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
    this.courseJgPlatformConfig(option.courseId || this.data.courseId)
    this.getCourse() //获取课程目录
    this.coursedetail() //获取课程介绍
    this.getcomment() //获取课程评论
    this.isOnload = true
  },
  onReady() {},
  onShow() {
    // 监管验证需要的  验证失败就返回，不能继续看视频
    if (!this.isOnload && this.faceConifg.strict == 1 && this.faceLoading) {
      const faceSuccess = wx.getStorageSync('faceSuccess')
      if (!faceSuccess) {
        const data = {
          start: this.currentPlayTime - 4 >= 0 ? this.currentPlayTime - 4 : 0,
          end: this.currentPlayTime - 2 >= 0 ? this.currentPlayTime - 2 : 0,
          course_video_lesson_id: this.currentPlayId,
        };
        console.log('监管验证失败，时间返回2秒，下次接着触发验证', data)
        this.courseVideoRecord(data)
        this.faceError = true
        wx.navigateBack({
          delta: 1,
        })
      }else{
        this.videoContext.play();
      }
    }
    this.isOnload = false
  },
  onHide: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (res) {
    return {
      title: this.currentPlayData.title,
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
  idCardAuthentication() {
    if (!this.isToFace) {
      return
    }
    app.encryption({
      url: api.video.idCardAuthentication,
      method: "GET",
    })
  },
  startStudy() {
    if (!this.isToFace) {
      return
    }
    const data = {
      course_video_lesson_id: this.currentPlayId
    }
    app.encryption({
      url: api.video.startStudy,
      method: "GET",
      data,
    })
  },
  endStudy() {
    if (!this.isToFace) {
      return
    }
    const data = {
      course_video_lesson_id: this.currentPlayId
    }
    app.encryption({
      url: api.video.endStudy,
      method: "GET",
      data,
    })
  },
  toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    f = Math.floor(x * 100) / 100;
    return f;
  },
  setRandomTime() {
    // triggerType ===0 随机时间
    if (this.faceConifg.triggerType === 0) {
      this.verificationTime = []
      const {
        triggerValue
      } = this.faceConifg
      const totalTime = Math.floor(this.currentPlayData.origin_duration)
      for (let i = 1; i <= triggerValue; i++) {
        this.verificationTime.push(totalTime * (i / triggerValue).toFixed(2))
      }
      console.log('随机时间点', this.verificationTime)
    }

  },
  // 是否需要监管认证 0:不需要 1；照片 2：视频 3：验证码
  courseJgPlatformConfig(course_id) {
    const data = {
      course_id
    }
    app.encryption({
      url: api.video.courseJgPlatformConfig,
      method: "GET",
      data,
      success: (res) => {
        console.log(1111111, res)
        this.isToFace = res.status
        this.faceConifg = res
        this.idCardAuthentication()
        // 监管验证的时间点
        this.verificationTime = []

        // triggerType ===1 固定间隔时间
        if (res.triggerType === 1) {
          const count = res.triggerValue < 10 ? 50 : 20
          for (let i = 1; i < count; i++) {
            this.verificationTime.push(res.triggerValue * i * 60)
          }
        }
        // triggerType === 2 递增间隔时间
        if (res.triggerType === 2) {
          let value = 0
          for (let i = 1; i < 10; i++) {
            value = res.triggerValue * i + value
            this.verificationTime.push(value * 60)
          }
        }
        console.log('固定时间点', this.verificationTime)
      }
    })
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
    this.timeOutHide()
  },
  showSwitchRate(rate) {
    this.setData({
      rateShow: true
    })
    this.timeOutHide()
  },
  // 自动隐藏
  timeOutHide() {
    this.hideTimer && clearTimeout(this.hideTimer)
    this.hideTimer = setTimeout(() => {
      this.setData({
        multiListShow: false,
        rateShow: false,
      })
    }, 5000);
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
    this.setData({
      currentResource: url,
      currentDefinition: def,
      multiListShow: false,
    }, () => {
      this.videoContext.seek(this.currentPlayTime)
      this.setData({
        initTime: this.currentPlayTime
      })
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