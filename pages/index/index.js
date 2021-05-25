require("../../utils/requestapi.js");
let app = getApp();
var api = require("../../api.js"),
  t = (require("../../utils/util.js"), require("../tab-bar/tab-bar.js"));
Page({
  data: {
    isIOS: app.globalData.isIOS,
    visible1: false,
    region_type: '',
    channelId: '',
    openId: '',
    userName: '',
    avatarUrl: '',
    viewerId: '',
    userid: '',
    moveParams: {
      scrollLeft: 0
    },
    banner: [],
    biaoti: '',
    actions1: [],
    courseId: '',
    menuTop: '',
    accuracy: 0,
    course_list: [{
      name: '初级会计师',
      id: '0'
    }],
    topmenu: [{
        name: '收藏夹',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/cuotiji.png',
        number: '0',
        num: '2'
      },
      {
        name: '错题集',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/xingxing.png',
        number: '0',
        num: '1'
      },
      {
        name: '做题历史',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/lishi.png',
        number: '0',
        num: '0'
      }
    ],
    fun_list: [{
        name: '章节练习',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/zhangjielianxi.png',
        action: 'prictive'
      },
      {
        name: '历年真题',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/linianzhenti.png',
        action: 'yearText'
      },
      {
        name: '模拟考试',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/monikaoshi.png',
        action: 'virText'
      },
      {
        name: '刷题挑战',
        img: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/shuatitiaozhan.png',
        action: 'changll'
      },
    ],
    defaultImg: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/avatar-def%402x.png',
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    index: 0, //选择的下拉列表下标
    menustat: 0,
    triangle: !0,
    cat_list2: [],
    cat_list3: [],
    c_id: 0,
    s_id: 0,
    t_id: 0,
    type: 0,
    noACtion: 0,
    myCourse: [],
    optionsGo: 'toliveclass',
    nomyCourse: true,
    noliving: true,
    images: {},
    allData: {},
    indexMaskShow: true,
    problem_course_id: '',
    live_class_id: '',
    video_collection_id: ''
  },
  handleLiveClick(){
    console.log(111111111)
    if(this.allData && this.allData.live_status==1){
      this.toliveclass()
    }else{
      this.goTestvideo()
    }
  },
  subscribe(num) {
    var num = num
    var that = this
    var message = ''
    var message2 = ''
    //需要订阅的消息模板，在微信公众平台手动配置获取模板ID
    if (num == 2) {
      message = 'V316Od-eT4_0PodWKepDexz_uJGrGI4Zg-9FiTpXYTI'
      message2 = ''
    } else {
      message = 'uURG_sarlVw6GDtD-svdPEp4GufnIO8v1Mxko6X5T_A'
      message2 = 'kV8yNkdehzes3xXdKogqBruwS_upSmtTFKFke41MguU'
    }
    // let message = 'uURG_sarlVw6GDtD-svdPEp4GufnIO8v1Mxko6X5T_A'
    var arr_template = [];
    if (message != '') arr_template.push(message);
    if (message2 != '') arr_template.push(message2);
    //如果总是拒绝（subscriptionsSetting，2.10.1库才支持）
    if (this.versionCompare('2.10.1')) {
      console.log('这里司法所发的')
      wx.getSetting({
        withSubscriptions: true, //是否同时获取用户订阅消息的订阅状态，默认不获取
        success: (res) => {
          console.log(res)
          if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings &&
            res.subscriptionsSetting.itemSettings[arr_template[0]] == "reject") {
            //打开设置去设置
            this.openConfirm('检测到您没打开推送权限，是否去设置打开？')
          } else {
            console.log(message, message2)
            wx.requestSubscribeMessage({
              tmplIds: arr_template,
              success: (res) => {
                if (num == 2) {
                  //直播和回顾同时存在时,点击直播回顾跳转到班级直播
                   console.log(this.data.allData.live_status)
                  if(this.data.allData.live_status==1){
                    let courseId = this.data.banjiID  
                    wx.reLaunch({
                      url: `../component/pages/Myclass/Myclass?courseId=${courseId}`
                    })
                  }else{
                    //只有回顾时直接跳转回顾页
                    let courseId = this.data.banjiID
                    let live_id = this.data.live_id
                    let course_id = this.data.course_id
                    let live_class_id = this.data.live_class_id
                    console.log(live_id,live_class_id)
                    wx.reLaunch({
                      url: `../component/pages/course-class-detail/course-class-detail?live_id=${live_id}&live_class_id=${live_class_id}`
                    })
                  }
                
                } else {
                  wx.reLaunch({
                    url: num.currentTarget.dataset.url
                  });
                }
                if (res[arr_template[0]] == 'accept') {
                  //用户允许

                }
              },
              fail: (res) => {
                console.info(res)
              },
            })

          }


        }
      })
    } else if (this.versionCompare('2.4.4')) {
      console.log('这里')
      wx.requestSubscribeMessage({
        tmplIds: [message, message2],
        success: (res) => {
          if (num == 2) {
            let courseId = this.data.banjiID
            let live_id = this.data.live_id
            let course_id = this.data.course_id
            let live_class_id = this.data.live_class_id
            wx.reLaunch({
              url: `../component/pages/course-class-detail/course-class-detail?live_id=${live_id}&live_class_id=${live_class_id}`
            })
          }
          if (res[message] == 'accept') {
            //用户允许    
          }
          wx.reLaunch({
            url: num.currentTarget.dataset.url
          });
        },
        fail: (res) => {
          console.info(res)
        },
      })
      that.setData({
        indexMaskShow: false
      })

    }
  },
  //打开设置
  openConfirm(message) {
    wx.showModal({
      content: message,
      confirmText: "确认",
      cancelText: "取消",
      success: (res) => {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              console.log(res.authSetting)
            },
            fail: (error) => {
              console.log(error)
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  //基础库版本比较
  versionCompare(v) {
    const version = wx.getSystemInfoSync().SDKVersion
    if (this.compareVersion(version, v) >= 0) {
      return true
    } else {
      return false
    }
  },
  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  },
  gocollection(number) {

    let courseId = this.data.courseId
    wx.navigateTo({
      url: `../component/pages/collectionAll/collectionAll?number=${number.currentTarget.dataset.number}&courseId=${courseId}`
    })
  },
  errorFunction(e) {
    if (e.type == "error") {
      let imgList = this.data.myCourse
      imgList['teacherImage'] = this.data.defaultImg //错误图片替换为默认图片
      this.setData({
        myCourse: imgList
      })
    }
  },
  errorLiving(e) {
    if (e.type == "error") {
      let imgList = this.data.living
      imgList['img'] = this.data.defaultImg //错误图片替换为默认图片
      this.setData({
        living: imgList
      })
    }
  },
  // 点击下拉显示框
  prictive() {
    let id = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/chapter/chapter?courseId=${id}`
    })
  },
  yearText() {
    let courseId = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/yearTest/yearTest?courseId=${courseId}`
    })
  },
  virText() {
    let id = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/virTest/virTest?courseId=${id}`
    })
  },
  changll() {
    let courseId = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/dailyChallenge/dailyChallenge?courseId=${courseId}`
    })
  },
  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  toliveclass() {
    let video_id = this.data.banjiID
    let live_id = this.data.live_id
    let course_id = this.data.course_id
    let live_class_id = this.data.live_class_id
    let channelId = this.data.channelId
    let openId = this.data.openId
    let userName = this.data.userName
    let avatarUrl = this.data.avatarUrl
    let viewerId = this.data.viewerId
    const tmplId2 = 'V316Od-eT4_0PodWKepDexz_uJGrGI4Zg-9FiTpXYTI' // 模板消息ID
    
    if(this.data.region_type ==2){//判断是否为海外用户并限制
      wx.showModal({
        content: '系统检测到您使用的是海外网络地址，请切换成国内线路再进入直播间',
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            this.onLoad()
          } else {
            console.log('用户点击取消')
          }
        }
      });
    }else{
    wx.requestSubscribeMessage({
      tmplIds: [tmplId2],
      success(res) {
        if (res[tmplId2] === 'accept') {
          // 用户点击【允许】
          wx.navigateTo({
            url: `../component/pages/live-class-room/live-class-room?channelId=${channelId}&openId=${openId}&userName=${userName}&avatarUrl=${avatarUrl}&viewerId=${viewerId}`
          })
        } else if (res[tmplId2] === 'reject') {
          wx.showModal({
            title: '提示',
            confirmText: '重新授权',
            cancelText: '不要通知',
            content: '拒绝订阅消息授权后将无法收到通知,是否继续',
            success: function (res) {
              if (res.confirm) {
                // 重新授权
                that.toliveclass()
              } else {
                wx.navigateTo({
                  url: `../component/pages/live-class-room/live-class-room?channelId=${channelId}&openId=${openId}&userName=${userName}&avatarUrl=${avatarUrl}&viewerId=${viewerId}`
                })

              }
            }
          })
          // 用户点击【取消】
        }
      }
    })
  }
  },
  toVideoroom() {

    let video_id = this.data.myCourse['courseId']
    let live_id = this.data.live_id
    let live_class_id = this.data.live_class_id
    let video_collection_id = this.data.video_collection_id
    let problem_course_id = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/course-detail/course-detail?live_id=${live_id}&courseId=${video_id}&live_class_id=${live_class_id}&video_collection_id=${video_collection_id}&problem_course_id=${problem_course_id}`
    })
  },
  handleClickItem1({
    detail
  }) {
    if (this.data.noACtion) {
      this.setData({
        visible1: false
      });
      return
    }
    const index = detail.index;
    this.setData({
      courseId: this.data.actions1[index].name,
      biaoti: this.data.actions1[index].name,
      visible1: false,
      courseId: this.data.actions1[index].courseId
    });
  },
  selectTap() {
    this.setData({
      visible1: true,
    });
  },
  clickin() {
    let id = this.data.problem_course_id
    wx.navigateTo({
      url: `../component/pages/dailyCard/dailyCard?courseId=${id}`
    })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      triangle: !this.data.triangle
    });
  },
  getRect(ele) {
    //获取点击元素的信息,ele为传入的id
    var that = this;
    //节点查询
    wx.createSelectorQuery().select(ele).boundingClientRect(function (rect) {
      let moveParams = that.data.moveParams;
      moveParams.subLeft = rect.left;
      moveParams.subHalfWidth = rect.width / 2;
      that.moveTo();
    }).exec()
  },
  moveTo: function () {
    let subLeft = this.data.moveParams.subLeft;
    let screenHalfWidth = 750 / 2;
    let subHalfWidth = this.data.moveParams.subHalfWidth;
    let scrollLeft = this.data.moveParams.scrollLeft;
    let distance = subLeft - (screenHalfWidth - subHalfWidth);
    scrollLeft = distance;
    this.setData({
      scrollLeft: scrollLeft
    })
  },
  selectmenu: function (t) {
    let courseId
    let that = this
    if (typeof (t) == 'number') {
      courseId = t
    } else {
      let ele = 'scroll-item-' + t.currentTarget.dataset.index
      this.getRect('#' + ele);
      courseId = t.currentTarget.dataset.key.course_id
    }
    this.setData({
      menuTop: courseId,
      courseId: courseId,
      nomyCourse: true
    });
    this.data.course_list.forEach((item) => {
      if (item.haschoose = true) {
        item.haschoose = false
      }
    })
    let indexOf = this.data.course_list.findIndex(item => item.course_id === courseId)
    this.data.course_list[indexOf].haschoose = true
    wx.setStorageSync('topInfo', this.data.course_list) //点击事件，点击后更新缓存。
    wx.setStorageSync("courseId", {
      courseId: courseId
    });
    that.getALLData()
  },
  addStory() {
    wx.navigateTo({
      url: '../component/pages/addCourse/addCourse'
    })
  },
  scrollMove(e) {
    let moveParams = this.data.moveParams;
    moveParams.scrollLeft = e.detail.scrollLeft;
    this.setData({
      moveParams: moveParams
    })
  },
  gettopINfor() {
    let that = this
    app.encryption({
      url: api.test.getCollectionCourses,
      method: "GET",
      success: function (res) {
        res = res.list
        for (let i = 0; i < res.length; i++) {
          res[i].name = res[i].course_name
        }
        that.setData({
          course_list: res,
          menuTop: res[0].course_id,
          courseId: res[0].course_id,
          biaoti: res[0].course_name
        })
        if (wx.getStorageSync('topInfo')) {
          wx.getStorageSync('topInfo').forEach((item) => {
            if (item.haschoose) {
              that.setData({
                menuTop: item.course_id,
                courseId: item.course_id,
                biaoti: item.course_name
              })
            }
          })
        }
        that.getALLData();

      },
      fail: function (t) {},
      complete: function () {
        // that.getALLData();
        //首此进入需要出发选中头部事件
        that.selectmenu(that.data.courseId)
      }
    })
  },
  getALLData() {
    let that = this
    let courseId = this.data.menuTop
    let option = {
      course_id: courseId
    }
    app.encryption({
      url: api.test.getAllData,
      method: "GET",
      data: option,
      success: function (res) {

        console.log(res)
        let problem_course_id = res.info.problem_course_id
        wx.setStorageSync("problem_course_id", {
          problem_course_id: problem_course_id
        });
        let topmenu0 = 'topmenu[0].number'
        let topmenu1 = 'topmenu[1].number'
        let topmenu2 = 'topmenu[2].number'
        that.setData({
          [topmenu0]: res.info.favorites,
          [topmenu1]: res.info.fail_question,
          [topmenu2]: res.info.history,
          accuracy: res.info.correct_rate,
          allData: res.info,
          problem_course_id: res.info.problem_course_id, //以此ID获取习题模式
          live_id: res.info.live_id,
          course_id: res.info.course_id,
          avatarUrl: res.info.avatarUrl,
          openId: res.info.openId,
          userName: res.info.userName,
          channelId: res.info.channelId,
          viewerId: res.info.uid,

          live_class_id: res.info.classroom_info.live_class_id,
          video_collection_id: res.info.video_info.video_collection_id
        })
        wx.setStorageSync("problem_course_id", {
          problem_course_id: res.info.problem_course_id
        });
        if (res.info.has_video == 0) {
          that.setData({
            nomyCourse: false
          })
        } else {
          that.setData({
            myCourse: res.info.video_info
          })
        }
        if (res.info.has_classroom == 0) {
          that.setData({
            noliving: false,
          })
        } else {
          if (res.info.live_status != 1) {
            that.setData({
              optionsGo: 'goTestvideo'
            })
          } else {
            that.setData({
              optionsGo: 'toliveclass'
            })
          }
          that.setData({
            living: res.info.classroom_info,
            noliving: true
          })
        }
      },
      fail: function (t) {},
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  getSubject() {
    let that = this
    let courseId = this.data.menuTop
    let option = {
      courseId: courseId
    }
    app.encryption({
      url: api.default.getSubject,
      method: "GET",
      data: option,
      success: function (res) {
        if (res.data == undefined) {
          for (let i = 0; i < res.length; i++) {
            res[i].name = res[i].courseName
          }
          that.setData({
            biaoti: res[0].courseName,
            actions1: res,
            courseId: res[0].courseId,
            noACtion: 0
          })
        } else {
          that.setData({
            actions1: [],
            noACtion: 1
          })
        }
      },
      fail: function (t) {
        return reject()
      },
      complete: function () {

      }
    })
  },
  goTestvideo() {
    // console.log(222)
    // if(this.data.region_type ==2&&this.data.optionsGo =='toliveclass'){
    //   wx.showModal({
    //     content: '系统检测到您使用的是海外网络地址，请切换成国内线路再进入直播间',
    //     confirmText: "确认",
    //     cancelText: "取消",
    //     success: (res) => {
    //       if (res.confirm) {
    //         this.onLoad()
    //       } else {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   });
    // }else{
    //   this.subscribe(2)
    // }
    this.subscribe(2)
  },
  goindex() {
    wx.navigateTo({
      url: '../secondary/secondary'
    });
  },
  getHomePanel() {
    console.log('微信小程序，此处应该触发头部接口')
    this.gettopINfor()
  },
  //获取用户ip
  getapi: function () {
    var _this = this;
    // 获取IP地址
    wx.request({
      url: 'https://tianqiapi.com/ip/',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          ip: res.data.ip
        });
      }
    });
  },

  onLoad: function (e) {
    this.getapi();

    wx.getSetting({
      withSubscriptions: true, // 是否同时获取用户订阅消息的订阅状态
      success(res) {
        console.log(res)
        const mainSwitch = res.subscriptionsSetting.mainSwitch // 订阅消息总开关
        const itemSettings = res.subscriptionsSetting.itemSettings // 每一项开关（类型：对象）
        // 总开关为开，且itemSettings为空或者对应模板id的值为空，则展示订阅消息引导卡片

        if (mainSwitch && (!itemSettings )) {
          // 显示或隐藏订阅按钮等逻辑操作
          console.log('订阅')
          this.setData({
            indexMaskShow: false
          })
        }
      }
    })
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    let limit_admin = wx.getStorageSync('limit_admin');
    console.log(limit_admin);
    let now = new Date().getTime();
    console.log(now);
    if (typeof (limit_admin) == "number" && (now - limit_admin) / 1000 < 3600) {
      //一个小时不再请求；
      //请求本地存储的用户
      app.globalData.info_show = 1;
      that.gettopINfor();
    } else {
      let promise = new Promise((resolve, reject) => {
        wx.login({ // 判断是否授权，，没有则授权
          success: function (n) {
            if (n.code) {
              var t = n.code;
              console.log(t);
              app.request({
                url: api.user.newLogin,
                data: {
                  code: t,
                  version: 40
                },
                method: 'POST',
                success: function (e) {
                  console.log(e);
                  that.setData({
                    region_type: e.data.param.region_type

                  })
                  // console.log(that.data.region_type)
                  if (e.data.param.info_show) {
                    app.globalData.info_show = 1;
                  }
                  if (e.code == '10001') {
                    wx.showModal({
                      title: "警告",
                      content: e.message,
                      showCancel: !1,
                      success: function () {
                        wx.reLaunch({
                          url: '../index/index'
                        })
                      }
                    })
                  }
                  wx.setStorageSync("user_info", {
                    nickname: e.data.param.user_nicename,
                    avatar_url: e.data.param.user_img,
                    uid: e.data.param.uid,
                    uuid: e.data.param.uuid,
                    token: e.data.param.token,
                    mobile: e.data.param.telphone,
                    is_admin: e.data.param.is_admin,
                    info_show: e.data.param.info_show
                  });
                  //增加本地存储管理员的信息；
                  let local_admin = wx.getStorageSync("local_admin");
                  if (typeof (local_admin) == "undefined" || local_admin == '' || e.data.param.is_admin == 1) {
                    wx.setStorageSync("local_admin", {
                      is_root: parseInt(e.data.param.is_admin) == 1 ? 1 : 0,
                      is_uid: e.data.param.uid,
                      is_token: e.data.param.token,
                      is_uuid: e.data.param.uuid
                    });
                  }

                },
                fail: function (e) {
                  wx.showModal({
                    title: "警告",
                    content: e.msg,
                    showCancel: !1
                  });
                },
                complete: function () {
                  return resolve()
                }
              })
            }
          }
        })
      })

      promise.then(function (resolve, reject) {
        that.gettopINfor(resolve, reject)
      });
    }
    e && wx.setStorageSync("tmp_options", e), t.tabbar("tabBar", 0, this, "home")

  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index?"
    };
  },
  tabBarRedirect: function (e) {
    console.log(e.currentTarget.dataset.url)
    console.log(e.currentTarget.dataset.key)
    let key = e.currentTarget.dataset.key
    if (key == 0 || key == 1) {
      this.subscribe(e)
    } else {
      wx.reLaunch({
        url: e.currentTarget.dataset.url
      });
    }



  }
});