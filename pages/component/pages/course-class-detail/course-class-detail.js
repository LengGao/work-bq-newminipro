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
let app = getApp(), api = require("../../../../api.js"), d = require("../../../../wxParse/wxParse.js"), n = getApp();
require("../../../../utils/util.js");
import { getToken, getVideoList, getVideoById } from '../../../../commons/service/index.js'
const serviceError = function (msg) {
  wx.showToast({
    title: msg || '获取数据出错',
    icon: 'none'
  })
}
Page({
  data: {
    isIOS: n.globalData.isIOS,
    currentTab: 0,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
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
    urls: ["../../images/mall-goods002.jpg", "../../images/mall-goods001.jpg"],
    collectIcon: "../../images/ic-like000.png",
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
    isHide: false,
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
    repeating: null,
    socketTime:null,
    fullScreenData: "",
    SocketTask: '',
    chapterActiveIndex:'',
    progress_min:0,
  },
  timeOut: '',
  tabFun: function (t) {
    var e = t.target.dataset.id;
    var a = {};
    a.curHdIndex = e, a.curBdIndex = e, this.setData({
      tabArr: a
    });
  },
  // onload
  onLoad: function (t = {}) {
    console.log(t)
    this.setData({
      video_id: t.video_id || this.data.video_id,
      live_id:t.live_id,
      live_class_id:t.live_class_id
    });
    this.listen();
    this.getVideoInfo()
    try {
      const res = wx.getSystemInfoSync()
      if (res.system.toLowerCase().indexOf('android') > -1) {
        this.data.isAndroid = true
      }
    } catch (e) {
    }
  },
  onShow: function () { },
  onHide: function () {
  },
  // 根据播放的id设置选中的章节
  setChapterActive(){
    let index = ''
    this.data.chapter.forEach((v,i) => {
      if(v.live_video_arr && v.live_video_arr.length){
        v.live_video_arr.forEach((child)=>{
          if(child.live_video_id === this.data.live_video_id){
            index = i
          }
        })
      }
    })
    this.setData({
      chapterActiveIndex:index
    });   
  },
  getVideoInfo: function () {
    wx.showLoading({
      title: "加载中"
    });
    var that = this, e = that.data.video_id;
    let option = {
      class_id: e,
      live_id:that.data.live_id,
      live_class_id:that.data.live_class_id
    }
    app.encryption({
      url: api.default.getrevielive,
      method: "GET",
      data: option,
      success:  (e)=> {
        console.log(e)
        let chapter = e;
        chapter.forEach((v) => {
          v.isShow = 0;
        })
        that.setData({
          chapter
        });    
        that.setData({
          isPay: false
        })
        this.setChapterActive()
      },
      complete: function (t) {
        wx.hideLoading();
      }
    });
  },
  // learning 获取videoid
  learning: function (id) {
    wx.showLoading({
      title: "加载中"
    });
    var that = this, e = that.data.video_id;
    n.request({
      url: s.course.liveVideoLearning,
      method: "GET",
      data: {
        videoId: id
      },
      success: function (e) {
        // if (0 == e.code) {
        console.log(e)
        that.getPlayInfo(e.data.mediaId);
        var a = e.data.content + "<span> </span>";
        d.wxParse("content", "html", a, that, 5);
        // } 
      },
      complete: function (t) {
        wx.hideLoading();
      }
    });
  },
  listen: function (t) {
    let that = this
    let option = {
      live_class_id:that.data.live_class_id,
      live_id:that.data.live_id
    }
    console.log(option)
    app.encryption({
      url: api.video.getlastplayinfo,
      method: "GET",
      data: option,
      success: function (res) {
        console.log( 11111111)
        console.log( res)
        wx.setNavigationBarTitle({
          title: `${res.live_video_name}`
        });
        var a = res.live_video_des;
        d.wxParse("content", "html", a, that, 5);
        that.setData({
          learnTime: res.live_video_learn_time,
          progress_min: res.live_video_learn_time,
          live_video_des:res.live_video_des,
          video:res.live_video_name,
          courseId:res.course_id,
          live_video_id:res.live_video_id,
          class_room_id:res.class_room_id,
          live_id:res.live_id
        })
        that.playVideo(res)
        
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
  },
  liveplayinfo(res) {
    let that = this
    let options = {
      listen_id: res,
      media_int_id:that.data.media_int_id,
      live_video_id:that.data.live_video_id,
      
    }
    console.log(options)
    app.encryption({
      url: api.default.liveplayinfo,
      method: "GET",
      data: options,
      success: function (res) {
        console.log(res)
        wx.setNavigationBarTitle({
          title: `${res.live_video_name}`
        });
        var a = res.live_video_des;
        d.wxParse("content", "html", a, that, 5);
        that.setData({
          video_mid: res.video_mid,
          live_id:res.live_id
        })
        that.playVideo(res)
        that.setChapterActive()
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
  },
  // getPlayInfo 获取到加密视频
  getPlayInfo: function (videoId) {
    wx.showLoading({
      title: "加载中"
    });
    var t = this, e = t.data.video_id;
    n.request({
      url: s.course.getPlayInfo,
      method: "get",
      data: {
        videoId: videoId
      },
      success: function (e) {
        if (0 == e.code) {
          t.playVideo(e.data);
        }

      },
      complete: function (t) {
        wx.hideLoading();
      }
    });
  },
  //是否显示详细目录
  ifShow(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.chapter[index].isShow = !d.chapter[index].isShow;
    this.setData({
      chapter: d.chapter
    })
  },
  getVideoByBuy: function () {
    var t = this, e = t.data.video_id;
    n.request({
      url: s.course.getLiveVideoDetail,
      method: "post",
      data: {
        video_id: e
      },
      success: function (e) {
        if (0 == e.data.errcode) {
          var a = t.data.video;
          a.video_url = e.data.data.video_url, t.setData({
            video: a
          });
        } else wx.showToast({
          title: e.data.errmsg,
          icon: "none",
          duration: 2e3
        });
      }
    });
  },
  // 购买课程
  buyVideo: function () {
    var t = this, e = t.data.video;
    let d = this.data;
    (wx.showLoading({
      title: "提交中"
    }), n.request({
      url: s.order.video,
      method: "POST",
      data: {
        courseId: d.video_id
      },
      success: function (e) {
        console.log(e), 0 == e.code ? n.request({
          url: s.order.get_pay_data,
          method: "POST",
          data: {
            orderId: e.data.orderId,
            openid: wx.getStorageSync('openid')
          },
          success: function (e) {
            console.log(e);
            if (wx.hideLoading(), 0 == e.code) {
              var a = e.data;
              wx.requestPayment({
                timeStamp: a.timeStamp,
                nonceStr: a.nonceStr,
                package: a.package,
                signType: a.signType,
                paySign: a.paySign,
                success: function (e) {
                  wx.showToast({
                    title: "订单支付成功",
                    icon: "success"
                  })
                  t.onLoad();
                },
                fail: function (t) {
                  wx.showToast({
                    title: "订单未支付",
                    icon: 'none'
                  });
                }
              });
            } else wx.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            });
          },
          complete() {
            wx.hideLoading();
          }
        }) : wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      },
      complete() {
        wx.hideLoading();
      }
    }));
  },
  getPassword: function (t) {
    console.log(t), this.setData({
      video_password: t.detail.value
    });
  },
  tryWatch: function () {
    var t = this;
    this.setData({
      trywatch_status: 1,
      is_trywatch: 1
    }), 1 == this.data.is_audio && (a.src = t.data.video.chapter[t.data.current_chapter].video_url);
  },
  select_date: function (t) {
    clearInterval(this.repeating);
    this.repeating = null
    // this.SocketTask && this.SocketTask.close();
    this.setData({
      lessonId: t.currentTarget.dataset.key,
      learnTime: 0,
      progress_min:  0,
      roomId: t.currentTarget.dataset.roomid,
      media_int_id:t.currentTarget.dataset.key,
      live_video_id:t.currentTarget.dataset.roomid
    })
    this.liveplayinfo(t.currentTarget.dataset.key)
  },
  collect: function () {
    var t = this;
    n.request({
      url: s.user.collect,
      method: "POST",
      data: {
        video_id: t.data.video_id
      },
      success: function (e) {
        if (0 == e.errcode) {
          var a = t.data.video;
          1 == t.data.video.collect ? (a.collect = !1, t.setData({
            video: a
          }), wx.showToast({
            title: "取消收藏",
            icon: "success"
          })) : (a.collect = !0, t.setData({
            video: a
          }), wx.showToast({
            title: "收藏成功",
            icon: "success"
          }));
        } else wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      }
    });
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
      // HD: "超清",
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
    //当执行到此处时，说明视频一开始播放则经行初始化socket,然后开始执行socket链接
    clearInterval(this.repeating);
    clearInterval(this.socketTime)
    this.repeating = null
    this.SocketTask && this.SocketTask.close();
    this.webSocket()
    console.log(data);
    this.data.videoPlaying = false
    let currentPoster = data.play_info.VideoBase.CoverURL
    let currentResource = data.play_info.PlayInfoList.PlayInfo[0].PlayURL
    let currentVideoTitle = data.play_info.VideoBase.Title
    let currentVideoResource = data.play_info.PlayInfoList.PlayInfo.map(item => {
      item.definitionFormat = this.computedDef(item.Definition)
      return item
    })
    this.setData({
      currentPoster,
      currentVideoTitle,
      currentResource,
      currentVideoResource,
      currentDefinition: currentVideoResource[0].definitionFormat,
      learnTime: data.live_video_learn_time || 0,
      progress_min:   data.live_video_learn_time || 0,
    })
  },
  // 进度改变执行
  timeUpdate(e) {
    let { currentTime } = e.detail
    this.data.currentTime = currentTime
    this.data.videoplaying = true
    if (this.data.videoplaying && this.data.currentRate != 1.0) {
      this.videoContext.playbackRate(Number(this.data.currentRate))
    }
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
  webSocket() {
    let that = this
    let uid = wx.getStorageSync("user_info").uid
    let listen_id = this.data.lessonId
    let tokens = wx.getStorageSync("user_info").token
    let listen_time = this.data.currentTime
    let live_video_id = this.data.live_video_id
    let video_cellection_id = that.data.live_class_id
    let courseId = this.data.courseId
    let live_id = this.data.live_id
    // 创建Socket
    that.SocketTask = wx.connectSocket({
      url:  api.default.sockForCount + `?token=${tokens}&students_user_id=${uid}&count_type=2&from=1&listen_id=${listen_id}&listen_time=${listen_time}&class_video_id=${live_video_id}&course_id=${courseId}&video_cellection_id=${video_cellection_id}&live_id=${live_id}`,
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        console.log('网络异常');
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
    // 监听webSocket错误
    that.SocketTask.onError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！')
      that.SocketTask.close();
    })
    // 监听WebSocket关闭
    that.SocketTask.onClose(res => {
      console.log('监听到 WebSocket 已关闭！' + ':' + res )
      that.reconnect();
    })
    // websocket打开
    that.SocketTask.onOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
      this.intervalSendData()
    })
    // 收到websocket消息
    that.SocketTask.onMessage(res => {
      console.log('监听到 接收消息！' + ':' + res.data)
    })
  },
   // 播放器暂停
 playPaused() {
  clearInterval(this.repeating)
  this.data.videoplaying = false
  this.isHide &&  this.sendData()
},
     // 播放
handleVideoPlay(){
      // 开启定时器 发送数据
    this.intervalSendData()
  },
  // 定时发送数据
  intervalSendData(){
    clearInterval(this.repeating)
    this.repeating = setInterval(() => {
        this.sendData()
      }, 10000)
  },
  // 发送数据
  sendData(){
    const listen_time = this.data.currentTime
    const progress_min = this.data.progress_min
    const progress_max = this.data.currentTime
    const tokens = wx.getStorageSync("user_info").token
    const courseId = this.data.courseId
    const uid = wx.getStorageSync("user_info").uid
    const video_cellection_id = this.data.live_class_id
    const live_id = this.data.live_id
    const live_video_id = this.data.live_video_id
    const class_id =this.data.class_room_id
    console.log(progress_max)
    const sendData = `{"progress_min":${progress_min},"progress_max":${progress_max},"course_id":"${courseId}","token":"${tokens}","students_user_id":${uid},"count_type":2,"from":1,"listen_time":${listen_time},"class_id":${class_id},"live_video_id":${live_video_id},"video_cellection_id":${video_cellection_id},"live_id":${live_id}}`;
    this.socketSend(sendData);
    this.setData({
      progress_min:progress_max
    })
  },
  reconnect() {
    let that = this
    clearInterval(that.repeating)
    console.log(this.isHide)
    if (!this.isHide) {
      console.log('重连');
      clearTimeout(that.socketTime);
      that.socketTime = setTimeout(() => {
        that.webSocket();
      }, 2000)
    }
  },
  socketSend(data, fn) {
    let that = this
    if (that.SocketTask.readyState == 1) {
      that.SocketTask.send({
        data: data
      })
      fn && fn();
    } else {
      that.SocketTask.close();
      wx.showToast({
        title: "网络连接失败,请检查网络",
        icon: "none"
      });
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
  },
  onUnload: function () {
    this.isHide = true;
    clearInterval(this.repeating);
    clearInterval(this.socketTime)
    this.repeating = null
    this.SocketTask && this.SocketTask.close();
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () { },
  onShareAppMessage: function () {
    var t = this, e = wx.getStorageSync("user_info");
    return {
      title: t.data.video.title,
      path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id,
      success: function (t) {
        console.log("转发成功", t);
      },
      fail: function (t) {
        console.log("转发失败", t);
      }
    };
  },
});