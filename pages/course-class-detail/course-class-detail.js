function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
      value: a,
      enumerable: !0,
      configurable: !0,
      writable: !0
  }) : t[e] = a, t;
}

var e, a, o, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
  return typeof t;
} : function(t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

let app = getApp(), api = require("../../api.js"), d = require("../../wxParse/wxParse.js"),n =  getApp();

require("../../utils/util.js");
import { getToken, getVideoList, getVideoById } from '../../commons/service/index.js'

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
      urls: [ "../../images/mall-goods002.jpg", "../../images/mall-goods001.jpg" ],
      kaituan_id: "",
      collectIcon: "../../images/ic-like000.png",
      audio_context: "",
      is_audio: 0,
      pintuan_time: 0,
      audioPlayStatus: 0,
      can_play: 0,
      detail_id: 0,

      // 新
    comment_list:[],
    p:1,
    video:{},
    isPay:false,
    lessonId:'',
    learnTime:0,

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
  },
  timeOut:'',
  select_team: function(t) {
      this.setData({
          state1: t.currentTarget.dataset.key
      });
  },
  fundTeam: function(t) {
      this.setData({
          kaituan_id: t.currentTarget.dataset.id,
          statete: t.currentTarget.dataset.key
      });
  },
  showpop2: function() {
      this.setData({
          flag2: !1
      });
  },
  hidepop2: function() {
      this.setData({
          flag2: !0
      });
  },
  showteam: function() {
      this.setData({
          teamx: !1
      });
  },
  hideteam: function() {
      this.setData({
          teamx: !0
      });
  },
  create00: function() {
      this.setData({
          teampop: !1
      });
  },
  hidefund: function() {
      this.setData({
          teampop: !0
      });
  },
  ownbuy: function() {
      this.setData({
          buypop: !1
      });
  },
  ownbuyclose: function() {
      this.setData({
          buypop: !0
      });
  },
  tabFun: function(t) {
      var e = t.target.dataset.id;
      console.log("----" + e + "----");
      var a = {};
      a.curHdIndex = e, a.curBdIndex = e, this.setData({
          tabArr: a
      });
  },
  showGallery: function(e) {
      var a, o = e.currentTarget.dataset.current, i = this.data.urls;
      $wuxGallery.show((a = {
          current: o,
          urls: i
      }, t(a, "delete", function(t, e) {
          return e.splice(t, 1), this.setData({
              urls: e
          }), !0;
      }), t(a, "cancel", function() {
          return console.log("Close gallery");
      }), a));
  },
  previewImage: function(t) {
      var e = t.currentTarget.dataset.current;
      this.data.urls;
      wx.previewImage({
          urls: [ e ]
      });
  },
// onload
  onLoad: function(t = {}) {
    this.setData({
      video_id: t.video_id || this.data.video_id,
    });
    this.listen();
    this.getVideoInfo()
    // 阿里云
    // return;
    const res = wx.getSystemInfoSync()
    console.log(res.SDKVersion)
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
  onShow: function() {},
  onHide: function() {
  },
  onUnload: function () {
    clearInterval(this.timeOut);
    let option = {
      listen_id: this.data.lessonId,
      learn_time: this.data.currentTime,
      type: 2,
      video_mid: this.data.video_mid
    }

    app.encryption({
      url: api.default.videomember,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
      },
      fail: function (t) {
      },
      complete: function () {
      }
    })
    
  },
  
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
      var t = this, e = wx.getStorageSync("user_info");
    // t.shareSuccess();
      return  {
          title: t.data.video.title,
          // path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id + "&pid=" + e.user_id,
          path: "/pages/course-detail/course-detail?video_id=" + this.data.video_id,
          // imageUrl: t.data.video.share_ico ? t.data.video.share_ico : this.data.video.pic_url,
          success: function(t) {
              console.log("转发成功", t);
          },
          fail: function(t) {
              console.log("转发失败", t);
          }
      };
  },
  // 定时器，每隔10秒获取视频进度
editCourseLessonLearn: function() {

      var t = this;
      n.request({
        url: s.course.editLiveVideoLearn,
          method: "post",
          data: {
            videoId: t.data.lessonId,
            learnTime: t.data.currentTime,
          },
          success: function(e) {

          },
      });
  },
getVideoInfo: function() {
      wx.showLoading({
          title: "加载中"
      });
      var that = this, e = that.data.video_id;
      let option={
        class_id: e
      }
      console.log(option)
      app.encryption({
          url: api.default.getrevielive,
          method: "GET",
          data:option,
          success: function(e) {
            console.log(e)
                let chapter = e;
                chapter.forEach((v) => {
                  v.isShow = 0;
                })
                that.setData({
                    chapter
                });
                // that.listen()
                //  wx.setNavigationBarTitle({
                //    title: '直播回顾:' + video.title
                // })
                // that.data.lessonId ? that.learning(that.data.lessonId) : that.getLastlesson();
                // t.setData({
                //   isPay: true
                // })
                // if (video.isbuy == 1 || video.price == 0 ){          
                  that.setData({
                     isPay:false
                  })
          },
          complete: function(t) {
              wx.hideLoading();
          }
      });
  },
getLastlesson: function() {
      wx.showLoading({
          title: "加载中"
      });
      var t = this, e = t.data.video_id;
      n.request({
        url: s.course.getLastVideo,
          method: "GET",
          data: {
            class_id: e
          },
          success: function(e) {
            
              if (0 == e.code) {
                console.log(e);
                t.setData({
                  lessonId: e.data.videoId,
                  learnTime: e.data.learnTime,
                })
                t.learning(e.data.videoId);
              } 

          },
          complete: function(t) {
              wx.hideLoading();
          }
      });
  },
// learning 获取videoid
learning: function(id) {
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
          success: function(e) {
              // if (0 == e.code) {
                console.log(e)
                that.getPlayInfo(e.data.mediaId);
                wx.setNavigationBarTitle({
                  title: '直播回顾:' + e.data.title
                });
                var a = e.data.content + "<span> </span>";
                d.wxParse("content", "html", a, that, 5);
              // } 
          },
          complete: function(t) {
              wx.hideLoading();
          }
      });
  },
listen: function (t) {
    let that = this
    let option = {
      class_id: that.data.video_id
    }
    console.log(option)
    app.encryption({
      url: api.video.listen,
      method: "GET",
      data: option,
      success: function (res) {
        console.log(res)
        that.setData({
          learnTime:res.learn_time,
          lessonId:res.listen_id
        })
        console.log(that.data.learnTime)
       that.liveplayinfo(res.listen_id)
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
  }, 
  liveplayinfo(res){
    let that = this
    let options = {
      listen_id:res
    }
    console.log(options)
    app.encryption({
      url: api.default.liveplayinfo,
      method: "GET",
      data: options,
      success: function (res) {
        console.log(res)
        that.setData({
          video_mid: res.video_mid
        })
        that.playVideo(res)
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
          success: function(e) {

              if (0 == e.code) {
                t.playVideo(e.data);
              } 

          },
          complete: function(t) {
              wx.hideLoading();
          }
      });
  },
  getPintuanInfo: function() {
      var t = this, e = t.data.video_id;
      n.request({
          url: s.order.video_kaituan_list,
          method: "post",
          data: {
              video_id: ''
          },
          success: function(e) {
              if (0 == e.errcode && (t.setData({
                  creatteam: e.data
              }), e.data.length > 0)) {
                  var a = Date.parse(new Date()); 
                  a /= 1e3;
                  var o = parseInt(e.data[0].end_time) - a;
                  console.log(e.data[0].end_time), t.setData({
                      pintuan_time: o
                  }), t.setCountDown();
              }
          },
          complete: function(t) {
              console.log(t);
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
  getJointuanInfo: function() {
      var t = this, e = t.data.video_id;
      n.request({
          url: s.order.video_joinpintuan_list,
          method: "post",
          data: {
              video_id: e
          },
          success: function(e) {
              0 == e.errcode && (console.log(i(e.data)), "object" == i(e.data) ? t.setData({
                  team: e.data
              }) : t.setData({
                  detail_id: e.data
              }));
          },
          complete: function(t) {
              console.log(t);
          }
      });
  },
  kaituan: function() {
      var t = this, e = t.data.video_id;
      if (!t.data.kaituan_id) return wx.showToast({
          title: "请选择开团规模",
          icon: "none"
      }), !1;
      wx.showLoading({
          title: "提交中"
      }), n.request({
          url: s.order.video_kaituan,
          method: "post",
          data: {
              pintuan_id: t.data.kaituan_id,
              video_id: e
          },
          success: function(e) {
              0 == e.errcode ? n.request({
                  url: s.order.get_pay_data,
                  method: "post",
                  data: {
                      order_id: e.data.order_id,
                      pay_type: "WECHAT_PAY"
                  },
                  success: function(a) {
                      if (wx.hideLoading(), 0 == a.errcode) {
                          var o = a.data;
                          wx.requestPayment({
                              timeStamp: o.timeStamp,
                              nonceStr: o.nonceStr,
                              package: o.package,
                              signType: o.signType,
                              paySign: o.paySign,
                              success: function(a) {
                                  wx.showToast({
                                      title: "订单支付成功",
                                      icon: "success"
                                  }), t.hidefund(), wx.navigateTo({
                                      url: "../pingou-detail/pingou-detail?detail_id=" + e.data.detail_id
                                  });
                              },
                              fail: function(t) {
                                  wx.showToast({
                                      title: "订单未支付",
                                      image: "/images/icon-warning.png"
                                  });
                              }
                          });
                      } else wx.hideLoading(), wx.showModal({
                          title: "提示",
                          content: a.errmsg,
                          showCancel: !1
                      });
                  }
              }) : wx.showModal({
                  title: "提示",
                  content: e.errmsg
              });
          },
          complete: function(t) {
              wx.hideLoading();
          }
      });
  },
  loadComment: function(t) {
      var e = this;
      let d = this.data;
      n.request({
          url: s.user.comment_list,
          method: "POST",
          data: {
            course_id: e.data.video_id,
              // p: 1,
          },
          success: function(t) {
              0 == t.code ? e.setData({
                comment_list: d.comment_list.concat(t.data.comment) ,
                comment_page: t.data.commentCount
              }) : wx.showModal({
                  title: "提示",
                  content: t.errmsg
              });
          },
          fail: function(t) {
              wx.showModal({
                  title: "警告",
                  content: t.msg,
                  showCancel: !1
              });
          },
          complete: function() {
              wx.hideLoading();
          }
      });
  },
  getVideoByPassword: function() {
      var t = this, e = t.data.video_id;
      if (!t.data.video_password) return wx.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 2e3
      }), !1;
      wx.showLoading({
          title: "提交中"
      }), n.request({
          url: s.course.getLiveVideoDetail,
          method: "post",
          data: {
              video_id: e,
              password: t.data.video_password
          },
          success: function(e) {
              if (console.log(e.data), 0 == e.errcode) {
                  var a = t.data.video;
                  0 == e.data.AUTH ? wx.showToast({
                      title: "密码错误",
                      icon: "none",
                      duration: 2e3
                  }) : (a.AUTH = !0, t.setData({
                      video: a
                  }), wx.showToast({
                      title: "密码正确",
                      icon: "success",
                      duration: 1e3
                  }));
              } else wx.showToast({
                  title: "错误",
                  icon: "none",
                  duration: 2e3
              });
          }
      });
  },
  getVideoByBuy: function() {
      var t = this, e = t.data.video_id;
      n.request({
          url: s.course.getLiveVideoDetail,
          method: "post",
          data: {
              video_id: e
          },
          success: function(e) {
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
  buyVideo: function() {
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
                    icon:'none'
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
  getPassword: function(t) {
      console.log(t), this.setData({
          video_password: t.detail.value
      });
  },
  submitpassword: function(t) {
      this.getVideoByPassword(this.data.video_password), this.hidepop2();
  },
  buyVip: function() {
      wx.navigateTo({
          url: "/pages/member/member"
      });
  },
  backIndex: function(t) {
      wx.switchTab({
          url: "/pages/index/index"
      });
  },
  tryWatch: function() {
      var t = this;
      this.setData({
          trywatch_status: 1,
          is_trywatch: 1
      }), 1 == this.data.is_audio && (a.src = t.data.video.chapter[t.data.current_chapter].video_url);
  },
  // timeupdate: function(t) {
  //     var a = this, o = a.data.play_time;
  //     a.setData({
  //         play_time: o + .25
  //     }), 1 == a.data.trywatch_status && o >= 10 && (a.setData({
  //         trywatch_status: 0
  //     }), 1 == a.data.is_audio ? a.stopAudio() : ((e = wx.createVideoContext("video")).exitFullScreen(), 
  //     e.seek(0), e.pause()));
  // },
  select_date: function(t) {
    let self = this, d = this.data;
    // 已付款或免费
    let option = {
      listen_id: t.currentTarget.dataset.key,
      learn_time: this.data.currentTime,
      type: 2,
      video_mid: this.data.video_mid
    }
    console.log(option)
    app.encryption({
      url: api.default.videomember,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
      },
      fail: function (t) {
      },
      complete: function () {

      }
    })
    this.setData({
      lessonId: t.currentTarget.dataset.key,
      learnTime: 0
    })
    this.liveplayinfo(t.currentTarget.dataset.key)
    // this.onLoad();
  },
  collect: function() {
      var t = this;
      n.request({
          url: s.user.collect,
          method: "POST",
          data: {
              video_id: t.data.video_id
          },
          success: function(e) {
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
  // createAudio: function() {
  //     var t = this, e = wx.getBackgroundAudioManager();
  //     e.title = t.data.video.chapter[t.data.current_chapter].name, e.coverImgUrl = t.data.video.pic_url, 
  //     console.log(e), e.onTimeUpdate(t.timeupdate), e.onCanplay(t.canPlay), e.onPause(t.onPauseAudio), 
  //     e.onStop(t.onStopAudio), e.onEnded(t.endPlay), e.onPlay(t.onPalyAudio), a = e, t.setData({
  //         is_audio: 1
  //     });
  // },
  canPlay: function() {
      var t = this;
      wx.hideLoading(), t.setData({
          can_play: 1
      });
  },
  endPlay: function(t) {
      var e = this;
      wx.showToast({
          title: "播放结束"
      }), e.stopAudio();
  },
  onPalyAudio: function() {
      this.setData({
          audioPlayStatus: 1
      });
  },
  onPauseAudio: function() {
      this.setData({
          audioPlayStatus: 0
      });
  },
  onStopAudio: function() {
      this.setData({
          audioPlayStatus: 0
      });
  },
  pauseAudio: function() {
      var t = this;
      a.pause(), t.setData({
          audioPlayStatus: 0
      });
  },
  playAudio: function() {
      var t = this;
      console.log(a), a.play(), a.src || (a.src = t.data.video.chapter[t.data.current_chapter].video_url), 
      console.log(a), 0 == t.data.can_play && wx.showLoading({
          title: "缓冲中"
      });
  },
  stopAudio: function() {
      var t = this;
      a.stop(), t.setData({
          audioPlayStatus: 0
      });
  },
  shareSuccess: function() {
      var t = this;
      n.request({
          url: s.video.share_success,
          method: "POST",
          data: {
              video_id: t.data.video_id
          },
          success: function(t) {
              0 == t.errcode || wx.showModal({
                  title: "警告",
                  content: t.msg,
                  showCancel: !1
              });
          }
      });
  },
  sharePartner: function() {
      wx.navigateTo({
          url: "../pingou-detail/pingou-detail?detail_id=" + this.data.detail_id
      });
  },
  setCountDown: function() {
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
  getFormat: function(t) {
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
  console.log(data);
  // if (!this.videoContext) {
  //   this.videoContext = wx.createVideoContext('videoPlayer')
  // }
  // this.videoContext.stop()
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
      // this.videoContext.play()
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