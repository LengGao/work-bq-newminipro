var app = getApp(),
  api = require("../../api.js"),
  tab = require("../tab-bar/tab-bar.js");

Page({
  data: {
    uid: 0,
    info_show: 0,
    isIOS: app.globalData.isIOS,

    banner: [{
      path:"../component/pages/course-detail/course-detail?courseId=18",
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/01.jpg'
      },
      {
        path:"../component/pages/course-detail/course-detail?courseId=19",
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/02.jpg'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/03.jpg'
      },
      {
        path:"../component/pages/course-detail/course-detail?courseId=45",
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/04.jpg'
      }
    ],
    funsel: [{
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/ruankaojisuanji.png',
        title: '软考',
        id: '1'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/jiaoshizigezheng.png',
        title: '会计师',
        id: '2'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/jingjishizhicheng.png',
        title: '经济师',
        id: '3'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/gongchengshizhicheng.png',
        title: '特种作业',
        id: '4'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/jiankangguanlishi.png',
        title: '健康管理师',
        id: '5'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/gongchengshizhicheng.png',
        title: '特种作业',
        id: '6'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/jiankangguanlishi.png',
        title: '健康管理师',
        id: '7'
      }
    ],
    freeCourse: [],
    hotpoint: [],
    openClassData: [],
    liveStatusMap: {
      0: '等待开播',
      1: '正在直播',
      2: '直播回顾',
      3: '直播结束'
    },
    userInfoData:{}
  },
  selectmenuAll() {
    this.setData({
      menustat: 0,
      c_id: 0,
      s_id: 0,
      t_id: 0,
      cat_list2: [],
      cat_list3: [],
    });
    this.getClassVideo(true);
  },
  godetails(e) {
    console.log(e.currentTarget.dataset.keys)
    wx.navigateTo({
      url: `../component/pages/AllTestPir/AllTestPir?id=${e.currentTarget.dataset.keys}&name=${e.currentTarget.dataset.name}`
    });
  },
  selectmenu: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: key.id,
      s_id: 0,
      t_id: 0,
      cat_list2: key.list,
      cat_list3: [],
    });
    this.getClassVideo(true);
  },
  selectmenu2: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: 0,
      s_id: key.id,
      t_id: 0,
      cat_list3: key.list,
    });
    this.getClassVideo(true);
  },
  selectmenu3: function (t) {
    let key = t.currentTarget.dataset.key;
    this.setData({
      menustat: key.id,
      c_id: 0,
      s_id: 0,
      t_id: key.id,
    });
    this.getClassVideo(true);
  },
  hotpoint() {
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url: api.default.hostcourse,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          hotpoint: res
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  getUserInfo(){
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    app.encryption({
      url: api.default.getUserInfo,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'get',
      dataType: "json",
      success: (res) => {
        this.setData({
          userInfoData: res || {}
        })
      },
    })
  },
  handleLiveTap(e){
    let currentIndex = e.currentTarget.dataset.index
    let currentData = this.data.openClassData[currentIndex]
    let liveStatus = currentData.public_class_status
    console.log(currentData)
    let userInfo = this.data.userInfoData || {}
    if(liveStatus === 2){
      wx.navigateTo({
        url: `../component/pages/openClassReview/index?liveClassId=${currentData.live_class_id}`
      })
      return
    }
    if((liveStatus === 1 || liveStatus === 0 )&& currentData.channel_id){
      wx.navigateTo({
        url: `../component/pages/live-class-room/live-class-room?channelId=${currentData.channel_id}&openId=${userInfo.openId}&userName=${userInfo.userName}&avatarUrl=${userInfo.avatarUrl}&viewerId=${userInfo.uid}&live_class_id=${currentData.live_class_id}`
      })
    }else{
      wx.showToast({
        icon:'error',
        title: liveStatus !=3?'直播尚未开始':'直播已结束',
      })
    }
  },
  getOpenClass() {
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    app.encryption({
      url: api.default.getOpenClass,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'POST',
      dataType: "json",
      data: {
        limit: 2,
        page: 1
      },
      success: (res) => {
        this.setData({
          openClassData:res.list || []
        })

      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  checkAll(e, f) {
    wx.navigateTo({
      url: "../component/pages/AllTestPir/AllTestPir?id=2&name=免费课程"
    });
  },
  checkAllOpenClass(e, f) {
    wx.navigateTo({
      url: "../component/pages/AllTestPir/AllTestPir?id=3&name=公开课"
    });
  },
  checkAlls(e, f) {
    wx.navigateTo({
      url: "../component/pages/AllTestPir/AllTestPir?id=1&name=热门推荐"
    });
  },
  freeCourse() {
    wx.showLoading({
      title: "加载中"
    });
    let uuid = wx.getStorageSync("user_info").uuid
    let token = wx.getStorageSync("user_info").token
    let that = this
    app.encryption({
      url: api.default.freecourse,
      header: {
        token: token,
        uuid: uuid
      },
      method: 'GET',
      dataType: "json",
      success: function (res) {
        console.log(res)
        that.setData({
          freeCourse: res
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  getMycourse() {
    let that = this
    app.encryption({
      url: api.default.ad,
      method: "GET",
      success: function (res) {
        console.log(res)
        that.banner(res[0].adGroupId)
        // if (res.data == undefined) {
        //   that.setData({
        //     myCourse: res,
        //     nomyCourse:true
        //   })
        // } else {
        //   that.setData({
        //     nomyCourse: false
        //   })
        // }
      },
      fail: function (t) {},
      complete: function () {

      }
    })
  },
  banner(adGroupId) {
    let that = this
    let option = {
      adGroupId: adGroupId
    }
    app.encryption({
      url: api.default.banner,
      method: "POST",
      data: option,
      success: function (res) {
        console.log(res)
        // if (res.data == undefined) {
        //   that.setData({
        //     myCourse: res,
        //     nomyCourse:true
        //   })
        // } else {
        //   that.setData({
        //     nomyCourse: false
        //   })
        // }
      },
      fail: function (t) {},
      complete: function () {}
    })
  },
  menu() {
    let that = this
    app.encryption({
      url: api.default.getindexcategory,
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          funsel: res
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  onLoad: function (t) {
    let user_info = wx.getStorageSync("user_info");
    if (user_info) {
      if (user_info.info_show == 1) {
        this.setData({
          uid: user_info.uid,
          info_show: user_info.info_show
        })
      }

    }
    console.log(this.data.uid)
    console.log(this.data.info_show)
    tab.tabbar("tabBar", 0, this, "shoponline");
    this.getUserInfo()
    this.getOpenClass()
    this.hotpoint();
    this.freeCourse();
    this.menu();
    this.getMycourse()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index"
    };
  },
  // 分类
  getClassList: function () {
    var a = this;
    wx.showLoading({
        title: "加载中"
      }),
      wx.request({
        url: e.video.category_list,
        method: "POST",
        data: {},
        success: function (t) {
          0 == t.code && a.setData({
            cat_list: t.data
          });
        },
        fail: function (t) {
          wx.showModal({
            title: "警告",
            content: t.errmsg,
            showCancel: !1
          });
        },
        complete: function () {
          wx.hideLoading();
        }
      });
  },
  tabBarRedirect: function (e) {
    wx.reLaunch({
      url: e.currentTarget.dataset.url
    });
  },
  onReachBottom() {
    console.log('页面已经滑动至底部')
  },
});