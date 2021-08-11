function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
var e, a, o, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
var n = getApp(),
  s = require("../../../../api.js"),
  wxParse = require("../../../../wxParse/wxParse.js");
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
    problem_course_id: '', //题库id
    info_show: '',
    isIOS: n.globalData.isIOS,
    currentTab: 0,
    endTime: '2020-4-20 19:56:00', //2018/11/22 10:40:30这种格式也行
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
    personal: '2000',
    starIndex4: 4.2,
    state1: 0,
    flag2: !0,
    buypop: !0,
    teamx: !0,
    teampop: !0,
    show_modal: !1,
    countDownList: [],
    actEndTimeList: [],
    video_password: "",
    play_time: 0,
    trywatch_status: 0,
    is_trywatch: 0,
    video_source_list: [],
    current_chapter: 0,
    urls: ["https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/mall-goods002.jpg", "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/mall-goods001.jpg"],
    kaituan_id: "",
    collectIcon: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/ic-like000.png",
    audio_context: "",
    is_audio: 0,
    pintuan_time: 0,
    audioPlayStatus: 0,
    can_play: 0,
    detail_id: 0,
    listen_time: 0,
    // 新
    comment_list: [],
    p: 1,
    video: {},
    lessonId: '',
    learnTime: 0,
    // 阿里云
    page: 1,
    size: 5,
    userInfo: null,
    videoList: [],
    total: 0,
    loading: false,
    loadAll: false,
    currentResource: '',
    multiListShow: false,
    rateShow: false,
    currentRate: '1.0',
    videoPlaying: false,
    controlHidden: true,
    isSwitchDefinition: false,
    currentVideoId: '',
    currentPoster: '',
    currentVideoTitle: '',
    currentVideoResource: [],
    currentDefinition: '',
    isAndroid: false,
    fullScreenData: "",
    value2: '',
    startNum: '1',
    tag: '',
    isPay: true,
    SocketTask: null,
    testWorker: null,
    repeated: null,
    isHide: false,
    courseId: '',
    class_video_id: '',
    hideProgressMask: true,
    currentPlayData: {},
    activeChapterIndex: 0,
    activeVideoIndex: 0
  },
  // 扫脸相关
  videoVerifyNode: [],
  nextVerifyTime: null,
  prevVerifyTime: null,
  closeMaskVlaue: false,
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
  sureSomething() {
    console.log('123')
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
  select_team: function (t) {
    this.setData({
      state1: t.currentTarget.dataset.key
    });
  },
  fundTeam: function (t) {
    this.setData({
      kaituan_id: t.currentTarget.dataset.id,
      statete: t.currentTarget.dataset.key
    });
  },
  showpop2: function () {
    this.setData({
      flag2: !1
    });
  },
  hidepop2: function () {
    this.setData({
      flag2: !0
    });
  },
  showteam: function () {
    this.setData({
      teamx: !1
    });
  },
  hideteam: function () {
    this.setData({
      teamx: !0
    });
  },
  hidefund: function () {
    this.setData({
      teampop: !0
    });
  },
  ownbuy: function () {
    this.setData({
      buypop: !1
    });
  },
  ownbuyclose: function () {
    this.setData({
      buypop: !0
    });
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
  showGallery: function (e) {
    var a, o = e.currentTarget.dataset.current,
      i = this.data.urls;
    $wuxGallery.show((a = {
      current: o,
      urls: i
    }, t(a, "delete", function (t, e) {
      return e.splice(t, 1), this.setData({
        urls: e
      }), !0;
    }), t(a, "cancel", function () {
      return console.log("Close gallery");
    }), a));
  },
  previewImage: function (t) {
    var e = t.currentTarget.dataset.current;
    this.data.urls;
    wx.previewImage({
      urls: [e]
    });
  },
  countDown: function () {
    var that = this;
    var nowTime = new Date().getTime(); //现在时间（时间戳）
    var endTime = new Date(that.data.endTime).getTime(); //结束时间（时间戳）
    var time = (endTime - nowTime) / 1000; //距离结束的毫秒数
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    // console.log(day + "," + hou + "," + min + "," + sec)
    day = that.timeFormin(day),
      hou = that.timeFormin(hou),
      min = that.timeFormin(min),
      sec = that.timeFormin(sec)
    that.setData({
      day: that.timeFormat(day),
      hou: that.timeFormat(hou),
      min: that.timeFormat(min),
      sec: that.timeFormat(sec)
    })
    // 每1000ms刷新一次
    if (time > 0) {
      that.setData({
        countDown: true
      })
      setTimeout(this.countDown, 1000);
    } else {
      that.setData({
        countDown: false
      })
    }
  },
  coursedetail() {
    let that = this
    let option = {
      course_id: this.data.courseId
    }
    console.log(option)
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
  goPri() {
    let id = this.data.problem_course_id
    console.log(id)
    wx.navigateTo({
      url: `../chapter/chapter?courseId=${id}`
    })
  },

  //小于10的格式化函数（2变成02）
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //小于0的格式化函数（不会出现负数）
  timeFormin(param) {
    return param < 0 ? 0 : param;
  },
  toCourseDetail(e) {
    let course_id = e.currentTarget.dataset.course_id
    let video_collection_id = e.currentTarget.dataset.video_collection_id
    // console.log(course_id)
    // console.log(e.currentTarget)
    wx.navigateTo({
      url: `../course-detail/course-detail?courseId=${course_id}&video_collection_id=${video_collection_id}`
    })
    console.log('不会把')
  },
  // 记录播放课程视频
  courseVideoBehaviorRecord(){
    app.encryption({
      url: api.video.courseVideoBehaviorRecord,
      method: "GET",
      data: {
        course_video_lesson_id:this.currentPlayId
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
          course_type:res.course_type
        })
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
    // 设置扫脸相关参数
    this.videoVerifyNode = [...row.detect_time_point_data]
    console.log( this.videoVerifyNode)
    this.setVerifyTime()

    this.setData({
      hideProgressMask: !!row.is_fast,
      currentDefinition: currentVideoResource[0].definitionFormat,
      currentResource: currentVideoResource[0].url,
      currentVideoResource
    }, () => {
      this.courseVideoBehaviorRecord()
      setTimeout(() => {
        this.setPlaySeek(this.startTime)
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
          this.prevVerifyTime = this.nextVerifyTime
          this.setVerifyTime()
          this.videoContext.play()
        }
      }
    })
  },
  // 获取token去扫脸
  getEidToken(time_point) {
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
      }
    })
  },
  openFace(token) {
    startEid({
      data: { token },
      verifyDoneCallback: (res) => {
        const { token } = res;
        this.getEidResult(token)
      },
    });
  },
  // 设置播放位置
  setPlaySeek(value) {
    this.videoContext.seek(value)
  },
  // 监听播放位置变化
  onTimeUpdate(e) {
    let {currentTime} = e.detail
    this.data.videoplaying = true
    if (this.data.videoplaying && this.data.currentRate != 1.0) {
      this.videoContext.playbackRate(Number(this.data.currentRate))
    }
    // 到达验证时间去验证
    if (this.nextVerifyTime && currentTime >= this.nextVerifyTime) {
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
  // 视频切换
  handleVideoToggle(e) {
    this.stopSend()
    const index = e.currentTarget.dataset.index;
    const vIndex = e.currentTarget.dataset.vindex;
    const currentPlayData = this.data.chapterList[index].lesson_list[vIndex]
    if (this.data.activeChapterIndex === index && this.data.activeVideoIndex === vIndex) {
      return false
    }
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
  }, // onload
  getProgrammePosters() {
    let that = this
    let option = {
      courseId: this.data.courseId,
      scene: 'video_id=' + this.data.courseId,
      pages: 'pages/index/index'
    }
    app.encryption({
      url: api.default.getProgrammePosters,
      method: "GET",
      data: option,
      success: function (res) {
        that.setData({
          imgUrl: res.imgUrl
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
    let user_info = wx.getStorageSync("user_info");
    if (user_info) {
      this.setData({
        uid: user_info.uid,
        info_show: user_info.info_show
      })
    }
    clearInterval(this.timeOut);
    this.setData({
      courseId: option.courseId || this.data.courseId,
      video_collection_id: option.video_collection_id,
    });
    try {
      const res = wx.getSystemInfoSync()
      if (res.system.toLowerCase().indexOf('android') > -1) {
        this.data.isAndroid = true
      }
    } catch (e) {}
    // this.webSocket()//开启socket
    this.getCourse() //获取课程目录
    this.coursedetail() //获取课程介绍
    this.getcomment() //获取课程评论
    this.getProgrammePosters() //获取课程封面

  },
  onShow: function () {},
  onHide: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (res) {
    console.log(res)
    var t = this,
      e = wx.getStorageSync("user_info");
    // t.shareSuccess();
    return {
      title: t.data.video.title,
      path: "pages/component/pages/course-detail/course-detail?courseId=" + this.data.courseId + "&video_collection_id=" + this.data.video_collection_id,
      // imageUrl: t.data.video.share_ico ? t.data.video.share_ico : this.data.video.pic_url,
      success: function (t) {
        console.log("转发成功", t);
      },
      fail: function (t) {
        console.log("转发失败", t);
      }
    };
  },
 
  
  
  buyVideo: function () {
    var that = this,
      e = this.data.video;
    let d = this.data;
    (wx.showLoading({
        title: "提交中"
      }),
      app.encryption({
        url: api.default.wxauth,
        method: "POST",
        data: {
          course_id: that.data.courseId,
          shouldbe_price: that.data.courseInfo.onlinePrice,
          amount: that.data.courseInfo.originPrice
        },
        success: function (e) {
          console.log(e.wx_pay_data)
          let a = e.wx_pay_data
          wx.requestPayment({
            appId: a.appid,
            timeStamp: a.timeStamp,
            nonceStr: a.nonce_str,
            package: a.prepay_id,
            signType: a.signType,
            paySign: a.paySign,
            success: function (e) {
              console.log(e)

              wx.showToast({
                title: "订单支付成功",
                icon: "success"
              })
              that.getCourse() //获取课程目录
              that.coursedetail() //获取课程介绍
              that.getcomment() //获取课程评论
              that.getProgrammePosters() //获取课程封面
            },
            fail: function (t) {
              console.log(t)
              wx.showToast({
                title: "订单未支付",
                icon: 'none'
              });
            }
          });
          // 0 == e.code ? 
          // n.request({
          //   url: s.order.get_pay_data,
          //   method: "POST",
          //   data: {
          //     orderId: e.data.orderId,
          //     openid: wx.getStorageSync('openid')
          //   },
          //   success: function (e) {
          //     console.log(e);
          //     if (wx.hideLoading(), 0 == e.code) {
          //       var a = e.data;

          //     } else wx.showModal({
          //       title: "提示",
          //       content: e.msg,
          //       showCancel: !1
          //     });
          //   },
          //   complete() {
          //     wx.hideLoading();
          //   }
          // })
          //  : wx.showModal({
          //   title: "警告",
          //   content: e.msg,
          //   showCancel: !1
          // });
        },
        complete() {
          wx.hideLoading();
        }
      }));
  },
  shareSuccess: function () {
    var t = this;
    n.request({
      url: s.video.share_success,
      method: "POST",
      data: {
        video_id: t.data.video_id
      },
      success: function (t) {
        0 == t.errcode || wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      }
    });
  },
  sharePartner: function () {
    wx.navigateTo({
      url: "../pingou-detail/pingou-detail?detail_id=" + this.data.detail_id
    });
  },
  setCountDown: function () {
    var t = this,
      e = t.data.pintuan_time;
    if ((e -= 1) > 0) {
      var a = t.getFormat(e),
        i = a.dd + "天" + a.hh + ":" + a.mm + ":" + a.ss;
      t.setData({
        pintuan_time: e,
        formatTime: a,
        countDown: i
      }), o = setTimeout(t.setCountDown, 1e3);
    }
  },
  getFormat: function (t) {
    var e = parseInt(t),
      a = 0,
      o = 0,
      i = 0;
    return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (o = parseInt(a / 60),
        a = parseInt(a % 60), o > 24 && (i = parseInt(o / 24), o = parseInt(o % 24)))),
      e = e > 9 ? e : "0" + e, a = a > 9 ? a : "0" + a, o = o > 9 ? o : "0" + o, i = i > 9 ? i : "0" + i, {
        ss: e,
        mm: a,
        hh: o,
        dd: i
      };
  },
  // 阿里云

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
  onReady() {
    this.videoContext = wx.createVideoContext('videoPlayer')
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