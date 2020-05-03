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

var n = getApp(), s = require("../../api.js"), d = require("../../wxParse/wxParse.js");

require("../../utils/util.js");
import { getToken, getVideoList, getVideoById } from '../../commons/service/index.js'

const serviceError = function (msg) {
  wx.showToast({
    title: msg || '获取数据出错',
    icon: 'none'
  })
}
let app = getApp();
var api = require("../../api.js")

Page({
  data: {
    isIOS: n.globalData.isIOS,
    currentTab: 0,
    endTime: '2020-4-20 19:56:00',//2018/11/22 10:40:30这种格式也行
    visible2: false,
    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2
    },
    chooseOrNot: -1,
    starIndex2: 0,
    starIndextext: '请选择星级',
    tips: [
      {
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
    video_id: "",
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

    // 新
    comment_list: [],
    p: 1,
    video: {},
    isPay: false,
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

    currentTime: 0,

    isSwitchDefinition: false,

    currentVideoId: '',
    currentPoster: '',
    currentVideoTitle: '',
    currentVideoResource: [],
    currentDefinition: '',
    isAndroid: false,
    fullScreenData: "",
    value2: ''
  },
  timeOut: '',
  chooseTips(e) {
    console.log(e.currentTarget.dataset.index)
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
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
    switch (index) {
      case 0:
        this.setData({
          'starIndextext': '课程体验较差'
        })
        break;
      case 1:
        this.setData({
          'starIndextext': '课程体验较差'
        })
        break;
      case 2:
        this.setData({
          'starIndextext': '课程感觉一般'
        })
        break;
      case 3:
        this.setData({
          'starIndextext': '加油继续努力'
        })
        break;
      case 4:
        this.setData({
          'starIndextext': '基本达到预期'
        })
        break;
      case 5:
        this.setData({
          'starIndextext': '课程超级棒'
        })
        break;
      default:
        this.setData({
          'starIndextext': '请选择课程评价'
        })
    }
  },
  handleOpen2() {
    console.log('点击了评价对话框')
    this.setData({
      visible2: true
    });
  },
  handleClose2() {
    this.setData({
      visible2: false,
      value2: ''
    });
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
    a.curHdIndex = e, a.curBdIndex = e, this.setData({
      tabArr: a
    });
  },
  showGallery: function (e) {
    var a, o = e.currentTarget.dataset.current, i = this.data.urls;
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
  // countDown: function () {
  //   var that = this;
  //   var nowTime = new Date().getTime();//现在时间（时间戳）
  //   var endTime = new Date(that.data.endTime).getTime();//结束时间（时间戳）
  //   var time = (endTime - nowTime) / 1000;//距离结束的毫秒数
  //   // 获取天、时、分、秒
  //   let day = parseInt(time / (60 * 60 * 24));
  //   let hou = parseInt(time % (60 * 60 * 24) / 3600);
  //   let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
  //   let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
  //   // console.log(day + "," + hou + "," + min + "," + sec)
  //   day = that.timeFormin(day),
  //     hou = that.timeFormin(hou),
  //     min = that.timeFormin(min),
  //     sec = that.timeFormin(sec)
  //   that.setData({
  //     day: that.timeFormat(day),
  //     hou: that.timeFormat(hou),
  //     min: that.timeFormat(min),
  //     sec: that.timeFormat(sec)
  //   })
  //   // 每1000ms刷新一次
  //   if (time > 0) {
  //     that.setData({
  //       countDown: true
  //     })
  //     setTimeout(this.countDown, 1000);
  //   } else {
  //     that.setData({
  //       countDown: false
  //     })
  //   }
  // },
  listen: function (t) {
    let that = this
    let option = {
      course_id: parseInt(t.video_id)
    }
    console.log(option)
    app.encryption({
      url: api.video.listen,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        if (res.data == undefined) {
          that.play(res.listen_id)
        } else {
          that.setData({
            myCourse: false
          })
        }
      },
      fail: function (t) {

      },
      complete: function () {

      }
    })
  },
  play(listen_id) {
    let that = this
    let option = {
      listen_id: listen_id
    }
    console.log(option)
    app.encryption({
      url: api.video.play,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        wx.setNavigationBarTitle({
          title: `视频：${res.media.mediaName}`
        });
        let option = {
          video_id: res.media.mediaId
        }
        app.encryption({
          url: api.video.getvideoinfo,
          method: "GET",
          data: option,
          success: function (res) {
            console.log(res)
            that.playVideo(res)
          }
        })
      },
      fail: function (t) {

      },
      complete: function () {

      }
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
  // onload
  onLoad: function (t = {}) {
    this.listen(t)//获取播放信息
    console.log(t)
    clearInterval(this.timeOut);
    this.setData({
      video_id: t.video_id || this.data.video_id,
    });
    // this.getVideoInfo();
    // this.loadComment();
    // 阿里云
    // return;
    const res = wx.getSystemInfoSync()
    console.log(res)
    // this.loadData()
    try {
      const res = wx.getSystemInfoSync()
      if (res.system.toLowerCase().indexOf('android') > -1) {
        this.data.isAndroid = true
      }
    } catch (e) {
      console.log(e)
    }
  },
  onShow: function () { },
  onHide: function () {
  },
  onUnload: function () {
    // 1 == this.data.video.style && a.stop();
    // clearTimeout(o);
    clearInterval(this.timeOut);
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    var t = this, e = wx.getStorageSync("user_info");
    // t.shareSuccess();
    return {
      title: t.data.video.title,
      // path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id + "&pid=" + e.user_id,
      path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id,
      // imageUrl: t.data.video.share_ico ? t.data.video.share_ico : this.data.video.pic_url,
      success: function (t) {
        console.log("转发成功", t);
      },
      fail: function (t) {
        console.log("转发失败", t);
      }
    };
  },
  canPlay: function () {
    var t = this;
    wx.hideLoading(), t.setData({
      can_play: 1
    });
  },
  endPlay: function (t) {
    var e = this;
    wx.showToast({
      title: "播放结束"
    }), e.stopAudio();
  },
  onPalyAudio: function () {
    this.setData({
      audioPlayStatus: 1
    });
  },
  onPauseAudio: function () {
    this.setData({
      audioPlayStatus: 0
    });
  },
  onStopAudio: function () {
    this.setData({
      audioPlayStatus: 0
    });
  },
  pauseAudio: function () {
    var t = this;
    a.pause(), t.setData({
      audioPlayStatus: 0
    });
  },
  playAudio: function () {
    var t = this;
    console.log(a), a.play(), a.src || (a.src = t.data.video.chapter[t.data.current_chapter].video_url),
      console.log(a), 0 == t.data.can_play && wx.showLoading({
        title: "缓冲中"
      });
  },
  stopAudio: function () {
    var t = this;
    a.stop(), t.setData({
      audioPlayStatus: 0
    });
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
    var t = this, e = t.data.pintuan_time;
    if ((e -= 1) > 0) {
      var a = t.getFormat(e), i = a.dd + "天" + a.hh + ":" + a.mm + ":" + a.ss;
      t.setData({
        pintuan_time: e,
        formatTime: a,
        countDown: i
      }), o = setTimeout(t.setCountDown, 1e3);
    }
  },
  getFormat: function (t) {
    var e = parseInt(t), a = 0, o = 0, i = 0;
    return e > 60 && (a = parseInt(e / 60), e = parseInt(e % 60), a > 60 && (o = parseInt(a / 60),
      a = parseInt(a % 60), o > 24 && (i = parseInt(o / 24), o = parseInt(o % 24)))),
      e = e > 9 ? e : "0" + e, a = a > 9 ? a : "0" + a, o = o > 9 ? o : "0" + o, i = i > 9 ? i : "0" + i,
    {
      ss: e,
      mm: a,
      hh: o,
      dd: i
    };
  },

  // 阿里云
  // 视频缓冲触发事件
  videoWaiting() {
    this.setData({
      controlHidden: true
    })
  },

  computedDef(definition) {
    let def = {
      FD: "流畅",
      LD: "标清",
      SD: "高清",
      HD: "超清",
      OD: "原画",
      "2K": "2K",
      "4K": "4K",
    }
    return def[definition]
  },

  videoPlayHandle(e) {
    console.log('videoPlayHandle')
    this.data.videoPlaying = true
    this.setData({
      controlHidden: false,
      multiListShow: false
    })
    this.videoContext.playbackRate(Number(this.data.currentRate))
    if (this.data.isSwitchDefinition) {
      console.log('seek')
      this.videoContext.seek(this.data.currentTime)
      this.data.isSwitchDefinition = false
    }

  },

  closeControl() {
    console.log(1111);
    this.setData({
      multiListShow: false,
      rateShow: false
    })
  },

  tapVideo(e) {
    console.log(e)
    console.log('tapVideo')
    this.setData({
      multiListShow: false,
      rateShow: false,
    })
    console.log(this.data.videoPlaying)
    // if (this.data.videoPlaying && !this.data.fullScreenData) {
    if (this.data.videoPlaying) {
      this.setData({
        controlHidden: !this.data.controlHidden
      })
    }
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
    let { rate } = dataset
    console.log(this.data.videoplaying)
    if (this.data.videoplaying) {
      this.videoContext.playbackRate(Number(rate))
    }
    this.setData({
      currentRate: rate,
      rateShow: false
    })
  },
  // 超清高清标清
  switchDefinition(e) {
    this.data.isSwitchDefinition = true

    let dataset = e.currentTarget.dataset
    let { url, def } = dataset

    this.setData({
      currentResource: url,
      currentDefinition: def,
      multiListShow: false,
    })
  },
  onReady() {
    this.videoContext = wx.createVideoContext('videoPlayer')
    console.log(this.videoContext)
  },
  onPullDownRefresh() {
    this.setData({
      loadAll: false,
      page: 1,
      total: 0,
      videoList: [],
    })
    this.loadData(() => {
      wx.stopPullDownRefresh()
    })
  },
  tapPlay(e) {
    let vid = e.currentTarget.dataset['vid']
    this.playVideo(vid)
  },
  playVideo(data) {
    this.data.videoPlaying = false
    let currentPoster = data.VideoBase.CoverURL
    let currentResource = data.PlayInfoList.PlayInfo[0].PlayURL
    let currentVideoTitle = data.VideoBase.Title
    let currentVideoResource = data.PlayInfoList.PlayInfo.map(item => {
      item.definitionFormat = this.computedDef(item.Definition)
      return item
    })
    this.setData({
      currentPoster,
      currentVideoTitle,
      currentResource,
      currentVideoResource,
      currentDefinition: currentVideoResource[0].definitionFormat
    })
   console.log(this.data.currentResource)
  },
  // 进度改变执行
  timeUpdate(e) {
    let { currentTime } = e.detail
    this.data.currentTime = currentTime
    this.data.videoplaying = true
    if (this.data.videoplaying && this.data.currentRate != 1.0) {
      // console.log(this.data.currentRate);
      this.videoContext.playbackRate(Number(this.data.currentRate))
    }
  },
  playPaused() {
    this.data.videoplaying = false
  },
  fullScreen(e) {
    let { fullScreen, direction } = e.detail
    console.log(e)
    let fullScreenData = ""
    if (fullScreen) {
      fullScreenData = " full-screen " + direction
      this.setData({ controlHidden: false })
    }
    console.log({ fullScreen, direction })
    this.setData({ fullScreenData })
    console.log(this.data.fullScreenData)
  },
  loadData(cb) {
    if (this.data.loadAll || this.data.loading) {
      return
    }
    if (this.data.userInfo !== null) {
      this.getVideoList(cb)
    } else {
      getToken({ url: '/user/randomUser' })
        .then(({ data }) => {
          console.log(data)
          this.data.userInfo = data
          this.getVideoList()
        })
        .catch(err => {
          serviceError('获取token失败')
          console.log(err)
        })
    }
  },
  getVideoList(cb) {
    this.loading = true
    if (this.data.userInfo === null) {
      reject(new Error('no user'))
    } else {
      let { token } = this.data.userInfo
      let { page, size } = this.data
      getVideoList({
        url: '/vod/getRecommendVideoList',
        data: {
          token,
          pageIndex: page,
          pageSize: size,
        }
      })
        .then(({ data }) => {

          if (page === 1) {
            this.playVideo(data.videoList[0].videoId)
          }

          this.loading = false
          let loadAll = false
          if ((page + 1) * size >= data.total) {
            loadAll = true
          }
          data.videoList.forEach(item => item.duration = this.getVideoTime(item.duration))
          this.setData({
            loadAll,
            total: data.total,
            page: page + 1,
            videoList: this.data.videoList.concat(data.videoList)
          })
          typeof cb === 'function' && cb();
        })
        .catch(err => {
          this.loading = false
          serviceError('获取视频列表失败')
          typeof cb === 'function' && cb();
        })
    }
  },
  getVideoTime(duration) {
    let secondTotal = Math.round(duration);

    let hour = Math.floor(secondTotal / 3600);
    let minute = Math.floor((secondTotal - hour * 3600) / 60);

    let second = secondTotal - hour * 3600 - minute * 60;

    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    return hour === 0 ? minute + ':' + second : hour + ':' + minute + ':' + second;
  }
});