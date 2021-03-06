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
import {
  getToken,
  getVideoList,
  getVideoById
} from '../../../../commons/service/index.js'

const serviceError = function (msg) {
  wx.showToast({
    title: msg || '获取数据出错',
    icon: 'none'
  })
}
let app = getApp();
var api = require("../../../../api.js")
Page({
  data: {
    class_type: '',
    // videoOption : {
    //     mode: 'vod',
    //     vodVid:'879bbcba3973d9e27b430b5b406c0246_8',
    //     // mode: 'live',
    //     // uid: '879bbcba39', // 直播频道uid   userId
    //     // cid: '1609134574258_8', // 直播频道channelId
    //     // isAutoChange: true, // 自动切换直播和暂存。
    //     // vodsrc: '', // 指定回放地址。有暂存视频的情况下，传入暂存视频的mp4或者m3u8。
    //     // forceVideo: Boolean, // 是否强制使用video标签作为播放器，建议使用live-player
    //     // statistic: { // 播放器自定义统计参数, 如需添加param4、param5参数，详情见下面init方法详解
    //     //   param1: 'param1',
    //     //   // param2: 'param2',
    //     //   // param3: 'param3'
    //     // }
    //  },
    videoControls:true,
    uid: '',
    problem_course_id:'',//题库id
    info_show: '',
    isIOS: n.globalData.isIOS,
    currentTab: 0,
    endTime: '2020-4-20 19:56:00', //2018/11/22 10:40:30这种格式也行
    visible2: false,

    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2
    },
    live_class_id: '',
    live_id: '',
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
    currentTime: 0,
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
    video_cellection_id: ''
  },
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
  listen: function (t) {
    console.log(t)
    let that = this
    let option = {
      course_id: parseInt(t.courseId),
      live_id: that.data.live_id,
      video_collection_id: t.video_collection_id
    }
    console.log(option)
    app.encryption({
      url: api.video.getlastplayinfo,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        console.log(res.is_fast)
        let videoControls = ''
        if(res.is_fast ==1){
          videoControls =true
        }else{
          videoControls =false
        }
        that.setData({
          learnTime: res.data.listen_time,
          lessonId: res.listen_id,
          videoControls:videoControls,
          class_video_id: res.video_class_id
        })
        that.playVideo(res.data.play_info, res.data.listen_time)
        // if (res.data == undefined) {
        //   that.playVideo(res.data.play_info, res.data.listen_time)
        // } else {
        //   that.setData({
        //     myCourse: false
        //   })
        // }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  //获取题库id
  getALLData() {
    let that = this
    let courseId = this.data.courseId
    let option = {
      course_id: courseId
    }
    app.encryption({
      url: api.test.getAllData,
      method: "GET",
      data: option,
      success: function (res) {

        console.log(res)
      
       
        that.setData({
          problem_course_id: res.info.problem_course_id, //以此ID获取习题模式        
        })
       
      },
      fail: function (t) {},
      complete: function () {
        // wx.hideLoading()
      }
    })
  },
  play(listen_id, listen_time) {
    let that = this
    // that.setData({
    //   lessonId: listen_id,
    //   learnTime:listen_time
    // })
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
        that.setData({
          video_mid: res.video_mid,
        })
        //判断是否快进
        let videoControls = ''
        if(res.is_fast ==1){
          videoControls =true
        }else{
          videoControls =false
        }
        that.setData({
          videoControls: videoControls
        })
        if (res.free == 1 && res.buy == 1) { //免费或者已购买
          that.setData({
            isPay: true
          })
        } else {
          that.setData({
            isPay: false
          })
          wx.showToast({
            title: '该视频尚未免费开放',
            icon: 'none',
            duration: 2000
          })
          return
        }
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
            that.playVideo(res, listen_time)
          }
        })
      },
      fail: function (t) {},
      complete: function () {}
    })
    this.coursedetail()
    this.webSocket()
  },
  playVideo(data, listen_time) {
    clearInterval(this.repeated);
    clearInterval(this.socketTime)
    this.repeated = null
    this.SocketTask && this.SocketTask.close();
    this.webSocket()
    this.isHide = false
    this.data.videoPlaying = false
    let currentPoster = data.VideoBase.CoverURL
    let currentResource = data.PlayInfoList.PlayInfo[0].PlayURL
    let currentVideoTitle = data.VideoBase.Title
    let currentVideoResource = data.PlayInfoList.PlayInfo.map(item => {
      item.definitionFormat = this.computedDef(item.Definition)
      return item
    })
    console.log(currentVideoResource)
    this.setData({
      currentPoster,
      currentVideoTitle,
      currentResource,
      currentVideoResource,
      currentDefinition: currentVideoResource[0].definitionFormat
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
  //是否显示详细目录
  ifShow(e) {
    let index = e.currentTarget.dataset.index;
    let d = this.data;
    d.chapter[index].isShow = !d.chapter[index].isShow;
    this.setData({
      chapter: d.chapter
    })
  },
  toCourseDetail(e) {
    let course_id = e.currentTarget.dataset.course_id
    let video_collection_id = e.currentTarget.dataset.video_collection_id
    // console.log(course_id)
    // console.log(e.currentTarget)
    wx.navigateTo({
      url: `../course-detail/course-detail?video_id=${course_id}&courseId=${course_id}&video_collection_id=${video_collection_id}`
    })
    console.log('不会把')
  },

  webSocket() {
    let that = this
    let uid = wx.getStorageSync("user_info").uid
    let course_id = this.data.courseId
    let tokens = wx.getStorageSync("user_info").token
    let listen_time = this.data.currentTime
    let video_cellection_id = that.data.video_collection_id
    let class_video_id = that.data.class_video_id
    // 创建Socket
    that.SocketTask = wx.connectSocket({
      // url: 'wss://api.beiqujy.com/wss',
      url: api.default.sockForCount + `?token=${tokens}&students_user_id=${uid}&count_type=1&from=1&listen_time=${listen_time}&class_video_id=${class_video_id}&course_id=${course_id}&video_cellection_id=${video_cellection_id}`,
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
      console.log('监听到 WebSocket 已关闭！' + ':' + res)
      that.reconnect();
    })
    // websocket打开
    that.SocketTask.onOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
      clearInterval(that.repeated)
      that.repeated = setInterval(() => {
        let listen_time = that.data.currentTime
        let sendData = `{"token":"${tokens}","students_user_id":${uid},"count_type":1,"from":1,"listen_time":${listen_time},"video_cellection_id":${video_cellection_id},"class_video_id":${class_video_id}}`;
        console.log(sendData);
        that.socketSend(sendData);
      }, 10000)
      // let d = this.data;
      // let login_data =`{"uid":"${d.uid}","course_id":"${d.course_id}","content":"${comment_data}"}`;
      // this.socketSend(login_data);
    })
    // 收到websocket消息
    that.SocketTask.onMessage(res => {
      console.log('监听到 接收消息！' + ':' + res.data)
      // this.socketMessage(JSON.parse(res.data));
    })
  },
  reconnect() {
    let that = this
    clearInterval(that.repeated)
    if (!this.isHide) {
      console.log('重连');
      clearTimeout(this.socketTime);
      this.socketTime = setTimeout(() => {
        that.webSocket();
      }, 5000)
    }
  },
  socketSend(data, fn) {
    console.warn('SocketTask', this.SocketTask, data);
    if (this.SocketTask.readyState == 1) {
      this.SocketTask.send({
        data: data
      })
      fn && fn();
    } else {
      this.SocketTask.close();
      // wx.showToast({
      //   title: "网络连接失败,请检查网络",
      //   icon: "none"
      // });
    }
  },
  getCourse() {
    let that = this
    let option = {
      courseId: this.data.courseId
    }
    app.encryption({
      url: api.default.chapterList,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)

        if (res.class_type) {
          var arr = []
          let data = res
          // delete data.class_type;
          for(let i  in data){
            console.log(i)
            if(i=='class_type'){}else{
              arr.push(data[i])
            }
          }
          // arr.push(data)
           console.log(arr)
          // let arr = Array.from(data)
          console.log(arr); 
          console.log( res.class_type); 
          that.setData({
            chapter: arr,
            class_type: res.class_type
          })
         
        } else {
          that.setData({
            chapter: res
          })
        }

      },
      fail: function (t) {},
      complete: function () {}
    })
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
    let user_info = wx.getStorageSync("user_info");
    if (user_info) {
      this.setData({
        uid: user_info.uid,
        info_show: user_info.info_show
      })
    }
    console.log(option)
    // console.log(this.data.uid)
    // console.log(option.video_collection_id)
    clearInterval(this.timeOut);
    this.setData({
      video_id: option.video_id || this.data.video_id,
      courseId: option.courseId || this.data.courseId,
      // problem_course_id:option.problem_course_id,
      live_id: option.live_id,
      live_class_id: option.live_class_id,
      video_collection_id: option.video_collection_id,

    });
    console.log(option)
    this.getALLData()//获取题库id
     this.listen(option)//获取播放信息
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
  onUnload: function () {
    this.isHide = true;
    wx.closeSocket();
    clearInterval(this.repeated);
    clearInterval(this.socketTime)
    this.repeated = null
  },
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (res) {
    console.log(res)
    var t = this, e = wx.getStorageSync("user_info");
    // t.shareSuccess();
    return {
      title: t.data.video.title,
      // path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id + "&pid=" + e.user_id,
      path: "pages/component/pages/course-detail/course-detail?video_id=" + this.data.video_id+"&courseId="+ this.data.courseId+"&live_id="+ this.data.live_id+"& live_class_id="+ this.data. live_class_id+"&video_collection_id="+ this.data.video_collection_id,
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
    a.play(), a.src || (a.src = t.data.video.chapter[t.data.current_chapter].video_url),
      0 == t.data.can_play && wx.showLoading({
        title: "缓冲中"
      });
  },
  stopAudio: function () {
    var t = this;
    a.stop(), t.setData({
      audioPlayStatus: 0
    });
  },
  select_date: function (t) {
    console.log(t)
    wx.closeSocket();
    this.isHide = true;
    this.setData({
      lessonId: t.currentTarget.dataset.key,
      learnTime: 0,
      class_video_id: t.currentTarget.dataset.key
    })
    // this.onLoad()
    this.play(t.currentTarget.dataset.key)

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
      SD: "高清 ",
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
  // 进度改变执行
  timeUpdate(e) {
    let {
      currentTime
    } = e.detail
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
    let {
      fullScreen,
      direction
    } = e.detail
    console.log(e)
    let fullScreenData = ""
    if (fullScreen) {
      fullScreenData = " full-screen " + direction
      this.setData({
        controlHidden: false
      })
    }
    console.log({
      fullScreen,
      direction
    })
    this.setData({
      fullScreenData
    })
    console.log(this.data.fullScreenData)
  },
  loadData(cb) {
    if (this.data.loadAll || this.data.loading) {
      return
    }
    if (this.data.userInfo !== null) {
      this.getVideoList(cb)
    } else {
      getToken({
          url: '/user/randomUser'
        })
        .then(({
          data
        }) => {
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
      let {
        token
      } = this.data.userInfo
      let {
        page,
        size
      } = this.data
      getVideoList({
          url: '/vod/getRecommendVideoList',
          data: {
            token,
            pageIndex: page,
            pageSize: size,
          }
        }).then(({
          data
        }) => {

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
  // onShareAppMessage: function (res) {
  //   let that = this
  //   return {
  //     title: '东培学堂',
  //     path: '../../../../pages/index/index',
  //     imageUrl: that.data.imgUrl,
  //     success: function (shareTickets) {
  //       console.log(shareTickets)
  //       console.info(shareTickets + '成功');
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       console.log(res + '失败');
  //       // 转发失败
  //     },
  //     complete: function (res) {}
  //   }
  // }
});