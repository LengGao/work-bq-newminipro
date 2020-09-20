var t = getApp(), e = require("../../../../api.js")

Page({
  data: {
    currentTab: 0,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    // 新
    video: [],
    pintuan_video: [],
    p: 1,
  },
  tabFun: function (t) {
    var e = t.target.dataset.id;
    console.log("----" + e + "----");
    var n = {};
    n.curHdIndex = e, n.curBdIndex = e, this.setData({
      tabArr: n
    });
  },
  onLoad: function (t) {
    console.log(t)
    t && t.tab && this.setData({
      currentTab: t.tab
    })
    //  n.tabbar("tabBar", 0, this, "mycourse");
  },
  onReady: function () { },
  onShow: function () {
    // this.getMyPintuanClass();
    this.getMyClass(true);
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      path: "../../../../pages/index/index?pid=" + wx.getStorageSync("user_info").user_id
    };
  },
  getMyClass: function (bool = false) {
    bool && this.setData({
      p: 1,
      video: [],
    })
    var n = this;
    let d = this.data;
    wx.showLoading({
      title: "加载中"
    }), t.request({
      url: e.video.getMyClassroomList,
      method: "POST",
      data: {
        p: d.p,
      },
      success: function (t) {
        0 == t.code && n.setData({
          video: d.video.concat(t.data.classroomList),
          p: ++d.p,
        });
      },
      fail: function (t) {
        wx.showModal({
          title: "警告",
          content: t.msg,
          showCancel: !1
        });
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  getMyPintuanClass: function () {
    var n = this;
    wx.showLoading({
      title: "加载中"
    }),
      t.request({
        url: e.video.my_pintuan_class,
        method: "POST",
        data: {},
        success: function (t) {
          0 == t.errcode && n.setData({
            pintuan_video: t.data
          });
        },
        fail: function (t) {
          wx.showModal({
            title: "警告",
            content: t.msg,
            showCancel: !1
          });
        },
        complete: function () {
          wx.hideLoading();
        }
      });
  },
  tabBarRedirect: function (t) {
    wx.redirectTo({
      url: t.currentTarget.dataset.url
    });
  },
  onReachBottom() {

    this.getMyClass();
  },
  toLive(e) {
    // console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    if (item.isLiveIng) {
      wx.navigateTo({
        url: "../live-class-room/live-class-room?video_id=" + item.id,
      })
    }

  },
});