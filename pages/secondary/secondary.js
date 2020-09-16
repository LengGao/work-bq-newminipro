var app = getApp(), api = require("../../api.js"), tab = require("../tab-bar/tab-bar.js");

Page({
  data: {
    isIOS: app.globalData.isIOS,
    banner: [
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/01.jpg'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/02.jpg'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/03.jpg'
      },
      {
        url: 'https://minproimg.oss-cn-hangzhou.aliyuncs.com/images/04.jpg'
      }
    ],
    funsel: [
      {
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
    hotpoint: []
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
  checkAll(e, f) {
    wx.navigateTo({
      url: "../component/pages/pages/AllTestPir/AllTestPir?id=2&name=免费课程"
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
      fail: function (t) {
      },
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
      fail: function (t) {
      },
      complete: function () {
      }
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
    tab.tabbar("tabBar", 0, this, "shoponline");
    this.hotpoint(); this.freeCourse(); this.menu(); this.getMycourse()
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
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