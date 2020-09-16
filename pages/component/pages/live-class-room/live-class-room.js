var e, t = getApp(), api = require("../../../../api.js"), a = (require("../../../../commons/comment-chat/comment-chat.js"),
  !1), i = !1, wxParse = require("../../../../wxParse/wxParse.js"), app = getApp();

Page({
  data: {
    currentTab: 0,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    setinter: null,
    chapter: '',
    video_id: 0,
    flag: !0,
    flag2: !0,
    show_input_password: !0,
    showOrHidden: !1,
    clickevent: !1,
    playIcon: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/live-win01.png",
    collectIcon: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/ic-like00.png",
    playPusher: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/pusher-play.png",
    pusher: !0,
    comment_data: "",
    comment_img: "",
    video_password: "",
    isShowToast: !1,
    collect_loading: !1,
    c_id: 0,
    img_list: [],
    content: "",
    comment_count: 0,
    goods_loading: -1,
    page: 1,
    show_modal: !1,
    comment_list: [],
    scrollTop: 600,
    scrollHeight: 300,
    iscounting: !1,
    reward_count: 0,
    reward_list: [],
    fullScreen: !1,
    orientation: "vertical",
    useronload: !1,
    videoContext: {},
    liveContent: {},
    scroll_top: 0,
    current_comment_index: "",
    comment_ids: [],
    urls: [],
    for_video_id: 0,
    // 新
    isIOS: app.globalData.isIOS,
    chooseimg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/uploadimg.png',
    comment_placeholder: '说点什么吧~',
    client_list: [],
    comment_bottom: 0,
    SocketTask: '',
    SocketTaskcount: '',
    livePlayer: '',
    repeat: null,
    reconnecting: true,
    roomId: '',
  },
  tapVoicePlay: function () {
    d ? this.setData({
      playIcon: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/live-win02.png"
    }) : this.setData({
      playIcon: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/live-win01.png"
    }), d = !d;
  },
  togglePusher: function () {
    this.data.pusher;
    this.setData({
      pusher: !this.data.pusher
    });
  },
  pusherPlay: function () {
    r ? this.setData({
      playPusher: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/pusher-pause.png"
    }) : this.setData({
      playPusher: "https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/pusher-play.png"
    }), r = !r;
  },
  collect: function () {
    var e = this;
    t.request({
      url: o.user.collect,
      method: "POST",
      data: {
        video_id: e.data.video_id
      },
      success: function (t) {
        if (0 == t.errcode) {
          var o = e.data.video;
          1 == e.data.video.collect ? (o.collect = !1, e.setData({
            video: o
          }), wx.showToast({
            title: "取消收藏",
            icon: "success"
          })) : (o.collect = !0, e.setData({
            video: o
          }), wx.showToast({
            title: "收藏成功",
            icon: "success"
          }));
        } else wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      }
    });
  },
  tabFun: function (e) {
    var t = e.target.dataset.id;
    console.log("----" + t + "----");
    var o = {};
    o.curHdIndex = t, o.curBdIndex = t, this.setData({
      tabArr: o
    });
  },
  showpop: function () {
    this.setData({
      flag: !1
    });
  },
  showPasswordPop: function () {
    this.setData({
      show_input_password: !1
    });
  },
  hidePasswordPop: function () {
    this.setData({
      show_input_password: !0
    });
  },
  hidepop: function () {
    this.setData({
      flag: !0
    });
  },
  showpop2: function () {
    this.setData({
      flag: !0,
      flag2: !1
    });
  },
  tolivepay: function () {
    this.setData({
      flag2: !1
    });
  },
  hidepop2: function () {
    this.setData({
      flag2: !0,
      othermoney: ""
    });
  },
  onLoad: function (e) {
    console.log(e)
    this.setData({
      course_id: parseInt(e.video_id)
    });
    this.setData({
      video_id: e.video_id || this.data.video_id,
      uid: wx.getStorageSync('user_info').uid,

    });
    this.webSocket()
    this.getVideoInfo();
    this.livePlayer = wx.createLivePlayerContext('video-livePlayer');
    this.tvideo = wx.createLivePlayerContext('video-livePlayer');
  },
  clickClient(e) {
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if (item.tmp_client_id == this.data.user_client_id) {
      return;
    }
    this.setData({
      toClient: item,
      isCover: 0,
      chooseimg: item.header_img,
      comment_placeholder: '@' + item.client_name
    })
  },
  showCover() {
    this.setData({
      isCover: 1
    })
  },
  getVideoInfo: function () {
    let that = this
    let class_id = parseInt(that.data.course_id)
    wx.showLoading({
      title: "加载中"
    });
    let option = {
      class_id: class_id
    }
    console.log(option)
    app.encryption({
      url: api.default.getClassLiveInfo,
      method: "GET",
      data: option,
      success: function (e) {
        console.log(e)
        var a = e.about + "<span> </span>";
        wxParse.wxParse("content", "html", a, that, 5);
        that.setData({
          video_title: e.title,
          videoUrl: e.rtmpurl,
          roomId: e.roomId
        });
        // that.livemember(e.roomId)
        wx.setNavigationBarTitle({
          title: `直播：${e.title}`
        });
      },
      complete: function (t) {
        wx.hideLoading();
        that.CountwebSocket()
      }
    });
  },
  webSocket() {
    console.log('进入sock')
    let uid = wx.getStorageSync("user_info").uid
    let uuid = wx.getStorageSync("user_info").uuid
    let course_id = this.data.course_id
    let tokens = wx.getStorageSync("user_info").token
    console.log(course_id)
    // 创建Socket
    this.SocketTask = wx.connectSocket({
      // url: 'wss://api.beiqujy.com/wss',
      url: api.default.countSocket + `/chat?token=${tokens}&course_id=${course_id}&uid=${uid}&uuid=${uuid}&listen_id=123&type='students'&from=1`,
      // url: 'wss://testapi.abacc.cn/chat' + `?token=${tokens}&course_id=${course_id}&uid=${uid}&uuid=${uuid}&listen_id=123&type='students'&from=1`,
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
    console.log(this.SocketTask);
    // 监听webSocket错误
    this.SocketTask.onError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！')
      this.SocketTask.close();
    })
    // 监听WebSocket关闭
    this.SocketTask.onClose(res => {
      console.log('监听到 WebSocket 已关闭！' + ':' + res)
      this.reconnect();
    })
    // websocket打开
    this.SocketTask.onOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
      // let d = this.data;
      // let login_data =`{"uid":"${d.uid}","course_id":"${d.course_id}","content":"${comment_data}"}`;
      // this.socketSend(login_data);
    })
    // 收到websocket消息
    this.SocketTask.onMessage(res => {
      console.log('监听到 接收消息！' + ':' + res)
      console.log(JSON.parse(res.data));
      this.socketMessage(JSON.parse(res.data));
    })
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
      wx.showToast({
        title: "网络连接失败,请检查网络",
        icon: "none"
      });
    }
  },
  socketMessage(res) {
    console.log(res)
    if (res.code != 200) {
      return
    }
    let data = res;
    let comment_list = this.data.comment_list;
    let d = this.data;
    var hash = {};
    comment_list.push(data);
    console.log(comment_list);
    comment_list = comment_list.reduce(function (arr, current) {
      if (current.data.unionid) {
        hash[current.data.unionid] ? '' : hash[current.data.unionid] = true && arr.push(current);
      } else {
        arr.push(current)
      }
      return arr
    }, [])

    this.setData({
      comment_list
    })
    console.log(comment_list)
    this.setData({
      current_comment_index: 'comment_' + (d.comment_list.length - 1)
    })
  },
  // 重连
  reconnect() {
    if (!this.isHide) {
      console.log('重连');
      clearTimeout(this.socketTime);
      this.socketTime = setTimeout(() => {
        this.webSocket();
      }, 2000)
    }
  },
  doHideCover() {
    this.setData({
      isCover: 0,
      toClient: '',
      chooseimg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/uploadimg.png',
      comment_placeholder: '说点什么吧~'
    })
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
  select_date: function (t) {
    let self = this, d = this.data;
    // 已付款或免费
    if (d.video.isbuy == 1 || d.video.price == 0) {
      this.setData({
        lessonId: t.currentTarget.dataset.key,
        learnTime: 0
      })
      this.onLoad();
    } else {
      this.buyVideo();
    }

  },

  onShow: function () {
    if (this.SocketTask && this.SocketTask.readyState != 1 && this.isHide) {
      this.webSocket();
    }
    this.isHide = false;
    console.log('common  onShow');
  },
  onHide: function () {
    this.isHide = true;

    this.SocketTask && this.SocketTask.close();
    console.log('common  onHide');
  },
  // 购买课程
  buyVideo: function () {
    var t = this, e = t.data.video;
    let d = this.data;
    (wx.showLoading({
      title: "提交中"
    }), app.request({
      url: api.order.video,
      method: "POST",
      data: {
        courseId: d.video_id
      },
      success: function (e) {
        console.log(e), 0 == e.code ? app.request({
          url: api.order.get_pay_data,
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
  onUnload: function () {
    this.isHide = true;
    this.SocketTask && this.SocketTask.close();
    this.SocketTaskcount && this.SocketTaskcount.close();
    this.SocketTask2 && this.SocketTask2.close();
    clearInterval(this.repeat)
    this.repeat = null
  },
  play: function (e) {
    wx.redirectTo({
      url: "../video/video?id=" + e.currentTarget.dataset.id
    });
  },
  getVideoByPassword: function () {
    var e = this, a = e.data.video_id;
    if (!e.data.video_password) return wx.showToast({
      title: "请输入密码",
      icon: "none",
      duration: 2e3
    }), !1;
    wx.showLoading({
      title: "提交中"
    }), t.request({
      url: o.user.video,
      method: "post",
      data: {
        video_id: a,
        password: e.data.video_password
      },
      success: function (t) {
        if (0 == t.errcode) {
          var o = e.data.video;
          0 == t.data.AUTH ? wx.showToast({
            title: "密码错误",
            icon: "none",
            duration: 2e3
          }) : (o.AUTH = !0, e.setData({
            video: o
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
  getVideoByBuy: function () {
    var e = this, a = e.data.video_id;
    t.request({
      url: o.user.video,
      method: "post",
      data: {
        video_id: a
      },
      success: function (t) {
        if (0 == t.data.errcode) {
          var o = e.data.video;
          o.video_url = t.data.data.video_url, e.setData({
            video: o
          });
        } else wx.showToast({
          title: t.data.errmsg,
          icon: "none",
          duration: 2e3
        });
      }
    });
  },
  loadComment: function (e) {
    var i = this;
    a = !0, t.request({
      url: o.user.chat_list,
      data: {
        video_id: e,
        page: 1
      },
      success: function (e) {
        0 == e.code && i.setData({
          comment_list: e.data.list,
          comment_count: e.data.row_count,
          page_count: e.data.page_count,
          cc_count: e.data.cc_count,
          scrollview: "view" + e.data.cc_count,
          iscounting: !0
        });
      },
      fail: function (e) {
        wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading(), a = !1;
      }
    });
  },
  loadreward: function (e) {
    var a = this;
    t.request({
      url: o.user.reward_list,
      method: "POST",
      data: {
        video_id: e,
        page: 1
      },
      success: function (e) {
        0 == e.errcode && a.setData({
          reward_list: e.data.list,
          reward_count: e.data.reward_count
        });
      },
      fail: function (e) {
        wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      },
      complete: function () { }
    });
  },
  previewImg: function (e) {
    var t = this.data.comment_list, o = e.currentTarget.dataset.current, a = e.currentTarget.dataset.i, i = t[o].img, n = i[a];
    wx.previewImage({
      current: n,
      urls: i
    });
  },
  previewImg_c: function (e) {
    var t = this.data.comment_list, o = e.currentTarget.dataset.index, a = e.currentTarget.dataset.i, i = e.currentTarget.dataset.pic, n = t[o].children[a].img, s = n[i];
    wx.previewImage({
      current: s,
      urls: n
    });
  },
  formInput: function (e) {
    var t = this, o = e.currentTarget.dataset.index, a = t.data.video, i = a.form_list;
    i[o].value = e.detail.value, a.form_list = i, t.setData({
      video: a
    });
  },
  pause: function () {
    var e = this;
    wx.createVideoContext("video").pause(), e.setData({
      play: !1
    });
  },
  timeupdate: function (e) {
    var t = this, o = t.data.video_pay;
    if (0 != t.data.video.is_pay) {
      var a = wx.createVideoContext("video");
      e.detail.currentTime >= o.time && (a.seek(0), a.pause(), t.setData({
        play: !1
      }));
    }
  },
  getMoney: function (e) {
    var t = (t = (t = (t = e.detail.value).replace(/^\./g, "")).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3")).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    this.setData({
      othermoney: t
    });
  },
  getPassword: function (e) {
    this.setData({
      video_password: e.detail.value
    });
  },
  getComment: function (e) {

    if (e.detail.value.length > 0) {
      this.setData({
        showOrHidden: !0,
      })
    } else {
      this.setData({
        showOrHidden: !1,
      });
    }

  },
  paidprice: function (e) {
    e.detail.value.length > 0 ? this.setData({
      showOrHidden: !0,
      clickevent: !0
    }) : this.setData({
      showOrHidden: !1,
      clickevent: !1,
      state1: e.currentTarget.dataset.key + 1
    });
  },
  submitmoney: function (e) {
    var t = this, o = (t.data.video, t.data.othermoney);
    o.indexOf(".") < 0 && "" != o && (o = parseFloat(o)), wx.showLoading({
      title: "提交中"
    }), this.reward(o);
  },
  submitpassword: function (e) {
    this.getVideoByPassword(this.data.video_password), this.hidePasswordPop();
  },
  money: function (e) {
    var t = e.currentTarget.dataset.money;
    wx.showLoading({
      title: "提交中"
    }), this.reward(t);
  },
  reward: function (e) {
    var a = this, i = a.data.video;
    t.request({
      url: o.order.addreward,
      method: "POST",
      data: {
        video_id: i.id,
        price: e
      },
      success: function (e) {
        0 == e.errcode ? t.request({
          url: o.order.get_pay_data,
          method: "POST",
          data: {
            order_id: e.data.order_id,
            pay_type: "WECHAT_PAY"
          },
          success: function (e) {
            if (wx.hideLoading(), 0 == e.errcode) {
              var t = e.data;
              wx.requestPayment({
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: t.signType,
                paySign: t.paySign,
                success: function (e) {
                  wx.showToast({
                    title: "打赏成功",
                    icon: "success"
                  }), a.hidepop2(), a.hidepop(), setTimeout(function () {
                    a.loadreward(i.id);
                  }, 2e3);
                },
                fail: function (e) {
                  wx.showToast({
                    title: "订单未支付",
                    image: "/images/icon-warning.png"
                  });
                }
              });
            } else wx.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            });
          }
        }) : wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      }
    });
  },
  showModal: function () {
    this.setData({
      show_modal: !0
    });
  },
  closeModal: function () {
    this.setData({
      show_modal: !1
    });
  },
  buyVip: function () {
    wx.navigateTo({
      url: "../member/member"
    });
  },
  backIndex: function (e) {
    wx.switchTab({
      url: "../../../../pages/index/index"
    });
  },
  statechange: function (e) {
    console.log("live-player code:", e.detail.code);
  },
  error: function (e) {
    console.error("live-player error:", e.detail.errMsg);
  },
  // 全屏
  onFullScreenClick: function () {
    var self = this;
    console.log('点击了全屏')
    this.livePlayer.requestFullScreen({
      direction: 90,
      success: function (t) {
        self.setData({
          fullScreen: 1
        });
        setTimeout(() => {
          self.setData({
            isFullscreen: 0
          })
        }, 3000)
      }
    });
  },
  onFullScreenChange: function (e) {
    console.log(e.detail.fullScreen), this.setData({
      fullScreen: e.detail.fullScreen
    }), wx.showToast({
      icon: "none",
      title: this.data.fullScreen ? "全屏" : "退出全屏"
    });
  },
  initSocket: function () {
    var e = {
      video_id: this.data.video_id,
      acct_id: t.globalData.acct_id,
      openid: wx.getStorageSync("openid")
    };


    t.globalData.localSocket.send({
      data: JSON.stringify(e)
    });
  },
  submitMsg: function (e) {
    let uid = wx.getStorageSync("user_info").uid
    let uuid = wx.getStorageSync("user_info").uuid
    let course_id = this.data.course_id
    let tokens = wx.getStorageSync("user_info").token
    let d = this.data;
    let comment_data = e.detail.value.txt;
    if (!comment_data) return;
    let sendData = '';
    // token=${tokens}&course_id=${course_id}&uid=${uid}&uuid=${uuid}&listen_id='students'&type='students'&from=1
    sendData = `{"message":"${comment_data}","uid":${uid},"course_id":${course_id},"token":"${tokens}","listen_id":123,"uuid":${uuid},"from":1,"type":"students","event":1}`;
    console.log(sendData);
    this.socketSend(sendData);
    this.setData({
      comment_data: '',
      showOrHidden: false
    })

  },
  sendSocketMessage: function () {
    var e = this, o = {
      video_id: e.data.video_id,
      content: e.data.comment_data,
      upload_img: e.data.comment_img,
      acct_id: t.globalData.acct_id,
      user_id: wx.getStorageSync("openid")
    };
    console.log("通过 WebSocket 连接发送数据", JSON.stringify(o)), t.globalData.localSocket.send({
      data: JSON.stringify(o),
      success: function (t) {
        wx.showToast({
          title: "发送成功"
        }), e.setData({
          comment_data: ""
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "发送失败",
          icon: none
        });
      }
    });
  },
  chooseImg: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      success: function (t) {
        wx.showLoading({
          title: "发送中"
        })
        console.log(t);
        let tempFilePaths = t.tempFilePaths;

        wx.uploadFile({
          url: api.course.uploadImg,
          filePath: tempFilePaths[0],
          name: "imgFile",
          complete: function (e) {
            console.log(e);
            if (200 == e.statusCode) {
              var t = JSON.parse(e.data);
              0 == t.errcode ? (wx.showToast({
                title: "发送成功"
              }), a.setData({
                comment_img: t.data.url
              }), n(t.url)) : wx.showToast({
                title: "发送失败",
                icon: "none"
              });
            } else wx.showToast({
              title: "发送失败",
              icon: "none"
            });
          }
        });

      }
    })
    return;
    t.globalData.localSocket.close();
    var a = this, i = this.data.img_list, n = i.length;
    n >= 1 || (a.setData({
      comment_data: "",
      comment_img: ""
    }), wx.chooseImage({
      count: 1 - n,
      sizeType: ["compressed"],
      sourceType: ["album"],
      success: function (t) {
        function n(e) {
          a.webSocket(), wx.showLoading({
            title: "发送中"
          }), setTimeout(function () {
            a.sendSocketMessage(e);
          }, 2e3);
        }
        i = i.concat(t.tempFilePaths);
        e.detail.formId;
        if (0 == i.length) return wx.showModal({
          title: "提示",
          content: "请输入内容或上传图片",
          showCancel: !1
        }), !1;
        wx.showLoading({
          title: "正在提交",
          mask: !0
        }), function (e) {
          wx.uploadFile({
            url: o.default.upload_img,
            filePath: i[e],
            name: "image",
            complete: function (e) {
              if (200 == e.statusCode) {
                var t = JSON.parse(e.data);
                0 == t.errcode ? (wx.showToast({
                  title: "上传成功"
                }), a.setData({
                  comment_img: t.data.url
                }), n(t.url)) : wx.showToast({
                  title: "发送失败",
                  icon: "none"
                });
              } else wx.showToast({
                title: "发送失败",
                icon: "none"
              });
            }
          });
        }(0);
      }
    }));
  },
  orderVideo: function (e) {
    console.log(e.detail.formId), "the formId is a mock one" != e.detail.formId && this.setData({
      formIdString: e.detail.formId + "," + this.data.formIdString
    });
    var a = this.data.video;
    t.request({
      url: o.order.order_video,
      method: "POST",
      data: {
        video_id: a.id,
        form_id: e.detail.formId
      },
      success: function (e) {
        0 == e.errcode ? 1 == e.data.need_pay ? t.request({
          url: o.order.get_pay_data,
          method: "POST",
          data: {
            order_id: e.data.order_id,
            pay_type: "WECHAT_PAY"
          },
          success: function (e) {
            if (wx.hideLoading(), 0 == e.errcode) {
              var t = e.data;
              wx.requestPayment({
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: t.signType,
                paySign: t.paySign,
                success: function (e) {
                  wx.showToast({
                    title: "预约成功",
                    icon: "success"
                  });
                },
                fail: function (e) {
                  wx.showToast({
                    title: "订单未支付",
                    image: "/images/icon-warning.png"
                  });
                }
              });
            } else wx.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            });
          }
        }) : wx.showToast({
          title: e.data.msg,
          icon: "success"
        }) : wx.showModal({
          title: "警告",
          content: e.msg,
          showCancel: !1
        });
      }
    });
  },
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select("#comment_content").boundingClientRect(function (e) {
      wx.pageScrollTo({
        scrollTop: e.bottom
      });
    }).exec();
  },
  getCommentList: function () {
    var e = this;
    t.request({
      url: api.video.live_comment,
      method: "POST",
      data: {
        video_id: e.data.video_id
      },
      success: function (t) {
        0 == t.errcode ? e.setData({
          comment_list: t.data
        }) : wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      }
    });
  },
  previewImage: function (e) {
    console.log(e);
    var t = e.currentTarget.dataset.current;
    this.data.urls;
    wx.previewImage({
      urls: t
    });
  },

  doNetstatus(e) {
    console.log('网络状态');
    console.log(e);
  },
  bindnetstatus(e) {
    let that = this
    console.log('网络状态：', e)
    if (e.type == 'netstatus' && e.detail.info.netSpeed == 0) { //直播中断
      if (that.data.reconnecting) {
        wx.showToast({
          title: '当前直播异常，正在重新链接...',//提示文字
          duration: 2000,//显示时长
          mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
          success: function () { },//接口调用成功
          fail: function () { },  //接口调用失败的回调函数  
          complete: function () { } //接口调用结束的回调函数  
        })
        clearInterval(that.serinter)
        that.setinter = setInterval(function () {
          that.getsome()
        }, 5000)
      }
      that.setData({
        reconnecting: false
      })
    }
  },
  getsome() {
    let that = this
    console.log('welcome home')
    wx.request({
      url: api.default.getLiveStatus,
      data: {
        appname: that.data.course_id,
      },
      method: "GET",
      dataType: "json",
      success: function (n) {
        console.log(n)
        if (n.data.data.status == 200) {
          clearInterval(that.setinter)
          // that.onLoad()
          that.getVideoInfo();
          that.livePlayer = wx.createLivePlayerContext('video-livePlayer');
          that.tvideo = wx.createLivePlayerContext('video-livePlayer');

        }
      },
      fail: function (n) {

      },
      complete: function (n) {

      }
    });
  },
  dostatechange(e) {
    let that = this
    //   console.log('状态');
    //   let option = {
    //     appname:this.data.course_id
    //   }
    //   console.log(option)
    // app.encryption({
    //   url: api.video.getlivestatus,
    //   method: "GET",
    //   data: option,
    //   success: function (e) {
    //     console.log(e)
    //   },
    //   complete: function (t) {

    //   }
    // });
    // console.log(e);
  },
  doFullScreen(e) {
    console.log('全屏变化');
    console.log(e.detail.fullScreen);
    this.setData({
      isFullscreen: e.detail.fullScreen
    })
  },
  doExitFull() {
    this.tvideo.exitFullScreen();
  },
  doPause(e) {
    let self = this, d = this.data;
    // console.log(e.timeStamp);

    if (e.timeStamp - this.timeStamp < 500) {
      if (d.isPause) {
        this.tvideo.resume({
          success() {
            self.setData({
              isPause: 0
            })
          },
        });
      } else {
        this.tvideo.pause({
          success() {
            self.setData({
              isPause: 1
            })
          },
        });
      }

    } else {
      this.timeStamp = e.timeStamp;
    }
    self.setData({
      isFullscreen: 1
    })

    clearTimeout(this.time_t2);
    this.time_t2 = setTimeout(() => {
      self.setData({
        isFullscreen: 0
      })
    }, 3000)

  },
  doPauseBtn() {
    let self = this, d = this.data;
    if (d.isPause) {
      this.tvideo.resume({
        success() {
          self.setData({
            isPause: 0
          })
        },
      });
    } else {
      this.tvideo.pause({
        success() {
          self.setData({
            isPause: 1
          })
        },
      });
    }
  },
  doInputFocus(e) {
    this.setData({
      inputHeight: e.detail.height
    })
  },
  doInputBlur(e) {
    this.setData({
      inputHeight: 0
    })
  },
  oldwebSocket() {
    // 创建Socket
    this.SocketTask2 = wx.connectSocket({
      url: 'wss://api.beiqujy.com/wss',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
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

    }),
      this.SocketTask2.onError(res => {
        console.log('监听到 WebSocket 打开错误，请检查！')
        this.SocketTask2.close();
      })
    // 监听WebSocket关闭
    this.SocketTask2.onClose(res => {
      console.log('监听到 WebSocket 已关闭！' + ':' + res)
      this.reconnect2();
    })
    this.SocketTask2.onOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
      let d = this.data;
      let login_data = '{"type":"login","client_name":"' + wx.getStorageSync('user_info').nickName + '","room_id":"' + d.roomId + '","uid":"' + d.uid + '"}';
      this.socketSend2(login_data);

    })
  },
  socketSend2(data, fn) {
    console.log(this.SocketTask2);
    if (this.SocketTask2.readyState == 1) {
      this.SocketTask2.send({
        data: data
      })
      fn && fn();
    } else {
      this.SocketTask2.close();
      wx.showToast({
        title: "网络连接失败,请检查网络",
        icon: "none"
      });
    }
  },
  reconnect2() {
    if (!this.isHide) {
      console.log('reconnect2重连');
      clearTimeout(this.socketTime);
      this.socketTime = setTimeout(() => {
        this.oldwebSocket();
      }, 2000)
    }

  },
  CountwebSocket() {
    let that = this
    let uid = wx.getStorageSync("user_info").uid
    let tokens = wx.getStorageSync("user_info").token
    let roomId = that.data.roomId
    let class_id = that.data.course_id
    console.log(roomId, class_id)
    // 创建Socket
    that.SocketTaskcount = wx.connectSocket({
      // url: 'wss://api.beiqujy.com/wss',
      url: api.default.countSocket + `/count?token=${tokens}&uid=${uid}&type=3&from=1&room_id=${roomId}&class_id=${class_id}`,
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
    console.log(that.SocketTaskcount);
    // 监听webSocket错误
    that.SocketTaskcount.onError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！')
      that.SocketTaskcount.close();
    })
    // 监听WebSocket关闭
    that.SocketTaskcount.onClose(res => {
      console.log('监听到 WebSocket 已关闭！' + ':' + res)
      that.Countreconnect();
    })
    // websocket打开
    that.SocketTaskcount.onOpen(res => {
      console.log('监听到 WebSocket 连接已打开！')
      clearInterval(that.repeat)
      that.repeat = setInterval(() => {
        let roomId = that.data.roomId
        // let class_id = that.data.course_id
        let sendData = `{"token":"${tokens}","uid":${uid},"type":3,"from":1,"room_id":"${roomId}","class_id":${class_id}}`;
        console.log(sendData);
        that.CountsocketSend(sendData);
      }, 10000)
    })
    // 收到websocket消息
    this.SocketTaskcount.onMessage(res => {
      console.log('监听到接收消息！' + ':' + res.data)
      // this.socketMessage(JSON.parse(res.data));
    })
  },
  Countreconnect() {
    let that = this
    if (!this.isHide) {
      console.log('重连');
      clearInterval(this.repeat)
      clearTimeout(this.socketTimecount);
      this.socketTimecount = setTimeout(() => {
        that.CountwebSocket();
      }, 3000)
    }
  },
  CountsocketSend(data, fn) {

    if (this.SocketTaskcount.readyState == 1) {
      this.SocketTaskcount.send({
        data: data
      })
      fn && fn();
    } else {
      this.SocketTaskcount.close();
      wx.showToast({
        title: "网络连接失败,请检查网络",
        icon: "none"
      });
    }
  }
});